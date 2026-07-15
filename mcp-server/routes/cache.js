const express = require('express');
const router = express.Router();
const multer = require('multer');
const { S3Client, PutObjectCommand, HeadObjectCommand } = require('@aws-sdk/client-s3');

// ============================================
// R2 CONFIGURATION
// ============================================

const R2_CONFIG = {
  accountId: process.env.CLOUDFLARE_ACCOUNT_ID,
  accessKeyId: process.env.CLOUDFLARE_R2_ACCESS_KEY_ID,
  secretAccessKey: process.env.CLOUDFLARE_R2_SECRET_ACCESS_KEY,
  bucket: 'engquest-audio',
  cachePrefix: 'ai_tutor_cache'
};

// Initialize S3 client for Cloudflare R2
const r2Client = new S3Client({
  region: 'auto',
  endpoint: `https://${R2_CONFIG.accountId}.r2.cloudflarestorage.com`,
  credentials: {
    accessKeyId: R2_CONFIG.accessKeyId,
    secretAccessKey: R2_CONFIG.secretAccessKey
  }
});

// Multer configuration for audio uploads
const upload = multer({
  storage: multer.memoryStorage(),
  limits: {
    fileSize: 5 * 1024 * 1024 // 5MB max (audio files are usually < 500KB)
  },
  fileFilter: (req, file, cb) => {
    const allowedMimeTypes = ['audio/mpeg', 'audio/mp3', 'audio/wav', 'audio/webm'];
    if (allowedMimeTypes.includes(file.mimetype)) {
      cb(null, true);
    } else {
      cb(new Error('Only audio files are allowed (mp3, wav, webm)'));
    }
  }
});

// ============================================
// API ENDPOINTS
// ============================================

/**
 * POST /api/cache/audio
 * Upload generated audio to R2 CDN cache
 * 
 * Body: multipart/form-data
 * - audio: audio file (mp3/wav/webm)
 * - cacheKey: cache key (e.g., "a1b2c3d4ef56.mp3")
 * 
 * Returns:
 * {
 *   success: true,
 *   cacheKey: "a1b2c3d4ef56.mp3",
 *   r2Url: "https://pub-XXX.r2.dev/ai_tutor_cache/a1b2c3d4ef56.mp3"
 * }
 */
router.post('/audio', upload.single('audio'), async (req, res) => {
  try {
    const { cacheKey } = req.body;
    const audioFile = req.file;
    
    if (!audioFile) {
      return res.status(400).json({
        success: false,
        message: 'Audio file is required'
      });
    }
    
    if (!cacheKey) {
      return res.status(400).json({
        success: false,
        message: 'cacheKey is required'
      });
    }
    
    // Validate cache key format (should be 16-char hex + .mp3)
    if (!/^[a-f0-9]{16}\.mp3$/.test(cacheKey)) {
      return res.status(400).json({
        success: false,
        message: 'Invalid cacheKey format (expected: 16-char hex + .mp3)'
      });
    }
    
    console.log(`📤 Uploading to R2 cache: ${cacheKey}`);
    
    // Check if R2 credentials are configured
    if (!R2_CONFIG.accessKeyId || !R2_CONFIG.secretAccessKey) {
      console.error('❌ R2 credentials not configured');
      return res.status(500).json({
        success: false,
        message: 'R2 cache not configured on server'
      });
    }
    
    // Upload to R2
    const r2Key = `${R2_CONFIG.cachePrefix}/${cacheKey}`;
    
    const command = new PutObjectCommand({
      Bucket: R2_CONFIG.bucket,
      Key: r2Key,
      Body: audioFile.buffer,
      ContentType: audioFile.mimetype,
      CacheControl: 'public, max-age=31536000, immutable' // Cache for 1 year
    });
    
    await r2Client.send(command);
    
    console.log(`✅ Uploaded to R2: ${r2Key}`);
    
    // Return R2 CDN URL
    const cdnUrl = process.env.R2_CDN_URL || 'https://pub-8f917d02000c4be2a7214afb8d12abd3.r2.dev';
    const r2Url = `${cdnUrl}/${r2Key}`;
    
    res.json({
      success: true,
      cacheKey,
      r2Url,
      size: audioFile.size
    });
    
  } catch (error) {
    console.error('❌ R2 cache upload error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to upload to R2 cache',
      error: error.message
    });
  }
});

/**
 * GET /api/cache/audio/:cacheKey
 * Check if audio exists in R2 cache
 * 
 * Returns:
 * {
 *   exists: true/false,
 *   r2Url: "https://pub-XXX.r2.dev/ai_tutor_cache/a1b2c3d4ef56.mp3" (if exists)
 * }
 */
router.get('/audio/:cacheKey', async (req, res) => {
  try {
    const { cacheKey } = req.params;
    
    // Validate cache key format
    if (!/^[a-f0-9]{16}\.mp3$/.test(cacheKey)) {
      return res.status(400).json({
        success: false,
        message: 'Invalid cacheKey format'
      });
    }
    
    const r2Key = `${R2_CONFIG.cachePrefix}/${cacheKey}`;
    
    // Check if file exists in R2
    const command = new HeadObjectCommand({
      Bucket: R2_CONFIG.bucket,
      Key: r2Key
    });
    
    try {
      await r2Client.send(command);
      
      // File exists
      const cdnUrl = process.env.R2_CDN_URL || 'https://pub-8f917d02000c4be2a7214afb8d12abd3.r2.dev';
      const r2Url = `${cdnUrl}/${r2Key}`;
      
      res.json({
        exists: true,
        r2Url
      });
    } catch (error) {
      if (error.name === 'NotFound') {
        // File doesn't exist
        res.json({
          exists: false
        });
      } else {
        throw error;
      }
    }
    
  } catch (error) {
    console.error('❌ R2 cache check error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to check R2 cache',
      error: error.message
    });
  }
});

/**
 * DELETE /api/cache/audio/:cacheKey
 * Delete audio from R2 cache (admin only)
 * 
 * Requires authentication + admin role
 */
router.delete('/audio/:cacheKey', async (req, res) => {
  try {
    // TODO: Add authentication middleware
    // For now, return 403 to prevent accidental deletion
    return res.status(403).json({
      success: false,
      message: 'Cache deletion not implemented (admin only)'
    });
    
  } catch (error) {
    console.error('❌ R2 cache delete error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to delete from R2 cache',
      error: error.message
    });
  }
});

module.exports = router;
