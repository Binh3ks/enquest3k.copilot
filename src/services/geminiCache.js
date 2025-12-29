/**
 * Gemini API Response Cache & Rate Limiter
 * Reduces API calls by caching responses and managing request rate
 */

class GeminiCache {
  constructor() {
    this.cache = new Map();
    this.requestTimes = [];
    this.maxRequestsPerMinute = 50; // Safe limit (free tier = 60/min)
    this.maxRequestsPerDay = 1200; // Safe limit (free tier = 1500/day)
    this.cacheDuration = 10 * 60 * 1000; // 10 minutes
    this.dailyResetTime = this.getTodayResetTime();
    
    // Load daily counter from localStorage
    this.loadDailyCounter();
  }

  getTodayResetTime() {
    const now = new Date();
    const tomorrow = new Date(now.getFullYear(), now.getMonth(), now.getDate() + 1);
    return tomorrow.getTime();
  }

  loadDailyCounter() {
    const stored = localStorage.getItem('gemini_daily_count');
    if (stored) {
      const data = JSON.parse(stored);
      const now = Date.now();
      
      // Reset if it's a new day
      if (now >= data.resetTime) {
        this.dailyCount = 0;
        this.dailyResetTime = this.getTodayResetTime();
        this.saveDailyCounter();
      } else {
        this.dailyCount = data.count || 0;
        this.dailyResetTime = data.resetTime;
      }
    } else {
      this.dailyCount = 0;
      this.saveDailyCounter();
    }
  }

  saveDailyCounter() {
    localStorage.setItem('gemini_daily_count', JSON.stringify({
      count: this.dailyCount,
      resetTime: this.dailyResetTime
    }));
  }

  generateCacheKey(functionName, params) {
    // Create a stable cache key from function name and params
    const sortedParams = Object.keys(params).sort().reduce((acc, key) => {
      if (key !== 'conversationHistory' && key !== 'debateHistory' && key !== 'previousProblems') {
        acc[key] = params[key];
      }
      return acc;
    }, {});
    return `${functionName}_${JSON.stringify(sortedParams)}`;
  }

  get(key) {
    const cached = this.cache.get(key);
    if (cached && Date.now() - cached.timestamp < this.cacheDuration) {
      console.log(`[Cache HIT] ${key.substring(0, 50)}...`);
      return cached.data;
    }
    return null;
  }

  set(key, data) {
    this.cache.set(key, {
      data,
      timestamp: Date.now()
    });
    
    // Clean old cache entries (keep only last 100)
    if (this.cache.size > 100) {
      const firstKey = this.cache.keys().next().value;
      this.cache.delete(firstKey);
    }
  }

  async checkRateLimit() {
    const now = Date.now();
    
    // Check daily limit
    if (now >= this.dailyResetTime) {
      this.dailyCount = 0;
      this.dailyResetTime = this.getTodayResetTime();
      this.saveDailyCounter();
    }

    if (this.dailyCount >= this.maxRequestsPerDay) {
      console.warn(`[Rate Limit] Daily quota reached: ${this.dailyCount}/${this.maxRequestsPerDay}`);
      throw new Error('DAILY_QUOTA_EXCEEDED');
    }

    // Clean old request times (older than 1 minute)
    this.requestTimes = this.requestTimes.filter(time => now - time < 60000);

    // Check per-minute limit
    if (this.requestTimes.length >= this.maxRequestsPerMinute) {
      const oldestRequest = this.requestTimes[0];
      const waitTime = 60000 - (now - oldestRequest);
      console.warn(`[Rate Limit] Too many requests. Wait ${Math.ceil(waitTime / 1000)}s`);
      
      // Wait until we can make a request
      await new Promise(resolve => setTimeout(resolve, waitTime + 100));
      return this.checkRateLimit(); // Recheck after waiting
    }

    // Record this request
    this.requestTimes.push(now);
    this.dailyCount++;
    this.saveDailyCounter();
    
    console.log(`[Rate Limit] OK - Minute: ${this.requestTimes.length}/${this.maxRequestsPerMinute}, Day: ${this.dailyCount}/${this.maxRequestsPerDay}`);
  }

  getRemainingQuota() {
    return {
      perMinute: this.maxRequestsPerMinute - this.requestTimes.filter(t => Date.now() - t < 60000).length,
      perDay: this.maxRequestsPerDay - this.dailyCount,
      resetTime: new Date(this.dailyResetTime).toLocaleTimeString()
    };
  }

  clearCache() {
    this.cache.clear();
    console.log('[Cache] Cleared all cached responses');
  }
}

// Singleton instance
const geminiCache = new GeminiCache();

export default geminiCache;
