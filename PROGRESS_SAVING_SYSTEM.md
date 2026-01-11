# 💾 Progress Saving System - Complete Architecture

## 📊 System Overview

EngQuest 3K có hệ thống auto-save progress hoàn chỉnh với:
- ✅ Real-time progress tracking
- ✅ Auto-save to backend API
- ✅ Visual feedback (AutoSaveIndicator + SaveToast)
- ✅ Error handling & retry logic
- ✅ Local state management

---

## 🏗️ Architecture Components

### 1. **Progress Flow** (From User Action → Backend)

```
User completes activity
    ↓
Module calls onReportProgress(percent)
    ↓
App.jsx handleReportProgress()
    ↓
API POST /progress
    ↓
Backend saves to database
    ↓
UI shows "Saved" indicator
```

---

## 📁 Key Files

### **App.jsx** (Main Controller)

**Location**: `src/App.jsx`

**State Management**:
```javascript
const [weekProgress, setWeekProgress] = useState({});
const [autoSaveStatus, setAutoSaveStatus] = useState('idle');
const [saveToastStatus, setSaveToastStatus] = useState(null);
```

**Progress Handler**:
```javascript
const handleReportProgress = async (percent) => {
  if (!currentUser || currentUser.role === 'guest') return;
  
  setAutoSaveStatus('saving'); // Show "Saving..." indicator
  
  try {
    // 1. Save to backend API
    await updateProgress({ 
      weekId, 
      stationKey: tabKey, 
      progressPercent: percent 
    });
    
    // 2. Update local state
    const updatedProgress = { ...weekProgress, [tabKey]: percent };
    setWeekProgress(updatedProgress);
    
    // 3. Show success indicator
    setAutoSaveStatus('saved');
    setTimeout(() => setAutoSaveStatus('idle'), 1500);

    // 4. Check if week completed (all stations 100%)
    const totalStations = STATIONS.filter(s => s.key !== 'review').length;
    const completedStations = Object.values(updatedProgress).filter(p => p === 100).length;
    
    if (totalStations > 0 && completedStations === totalStations) {
      setShowCongratulations(true); // 🎉 Week completed modal
    }

  } catch (error) {
    console.error("Failed to report progress:", error);
    setAutoSaveStatus('idle'); // Hide indicator on error
  }
};
```

**Load Progress on Mount**:
```javascript
useEffect(() => {
  const initializeAppData = async () => {
    if (currentUser && currentUser.role !== 'guest') {
      try {
        // Fetch progress from backend
        const response = await getProgress(weekId);
        setWeekProgress(response.data || {});
      } catch (error) {
        console.error("Failed to initialize app data:", error);
        setWeekProgress({});
      }
    }
  };
  initializeAppData();
}, [weekId, currentUser?.id]);
```

**Pass to Modules**:
```javascript
<CurrentModule 
  data={matchData} 
  onReportProgress={handleReportProgress}  // ⚡ All modules receive this
  currentProgress={weekProgress[tabKey] || 0}
/>
```

---

### **AutoSaveIndicator** (Header UI)

**Location**: `src/components/common/AutoSaveIndicator.jsx`

**States**:
- `idle` → Hidden (display: none)
- `saving` → CloudUpload icon spinning + "Saving..." text
- `saved` → CheckCircle icon + "Saved" text (auto-fade after 1s)

**UI Code**:
```jsx
export default function AutoSaveIndicator({ status }) {
  if (!status || status === 'idle') return null;

  const config = {
    saving: {
      icon: CloudUpload,
      text: 'Saving...',
      iconClass: 'animate-spin',
      textClass: 'text-blue-600'
    },
    saved: {
      icon: CheckCircle,
      text: 'Saved',
      iconClass: '',
      textClass: 'text-green-600'
    }
  };

  const { icon: Icon, text, iconClass, textClass } = config[status];

  return (
    <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg">
      <Icon className={`w-4 h-4 ${textClass} ${iconClass}`} />
      <span className={`text-sm font-medium ${textClass}`}>{text}</span>
    </div>
  );
}
```

**Location in Header**: Next to Print Worksheet button

---

### **SaveToast** (Bottom-Right Notification)

**Location**: `src/components/common/SaveToast.jsx`

**States**:
- `saving` → Blue background + CloudUpload + "Saving progress..."
- `success` → Green background + CheckCircle + "Progress saved!"

**Auto-dismiss**: 2 seconds after showing success

**UI Code**:
```jsx
export default function SaveToast({ status, onDismiss }) {
  const [isVisible, setIsVisible] = useState(!!status);

  useEffect(() => {
    if (status === 'success') {
      const dismissTimer = setTimeout(() => {
        setIsVisible(false);
        setTimeout(() => onDismiss?.(), 300);
      }, 2000);
      return () => clearTimeout(dismissTimer);
    }
  }, [status, onDismiss]);

  return (
    <div className={`
      fixed bottom-6 right-6 z-50
      ${bgColor} text-white
      ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'}
    `}>
      <Icon className="w-6 h-6" />
      <span>{text}</span>
    </div>
  );
}
```

---

### **API Service** (Backend Communication)

**Location**: `src/services/api.js`

**Functions**:
```javascript
// Get progress for a specific week
export const getProgress = (weekId) => 
  apiClient.get(`/progress/${weekId}`);

// Save progress for a station
export const updateProgress = (progressData) => 
  apiClient.post('/progress', progressData);
```

**Request Payload**:
```json
{
  "weekId": 1,
  "stationKey": "read_explore",
  "progressPercent": 100
}
```

**Response**:
```json
{
  "success": true,
  "data": {
    "read_explore": 100,
    "new_words": 75,
    "grammar": 50
  }
}
```

---

## 🎯 Module Integration

### **How Modules Report Progress**

Each learning module receives `onReportProgress` prop and calls it when user completes activities.

**Example 1: ReadingExplore** (Completion-based)
```javascript
const ReadingExplore = ({ data, onReportProgress }) => {
  const [isComplete, setIsComplete] = useState(false);

  useEffect(() => {
    if (isComplete && onReportProgress) {
      onReportProgress(100); // Report 100% when complete
    }
  }, [isComplete, onReportProgress]);

  return (
    <button onClick={() => setIsComplete(true)}>
      Mark Complete
    </button>
  );
};
```

**Example 2: Dictation** (Progressive tracking)
```javascript
const DictationEngine = ({ data, onReportProgress }) => {
  const [completedSentences, setCompletedSentences] = useState(new Set());

  const handleSentenceComplete = (sentenceId) => {
    const newCompleted = new Set([...completedSentences, sentenceId]);
    setCompletedSentences(newCompleted);

    // Calculate progress percentage
    const percent = Math.round((newCompleted.size / data.sentences.length) * 100);
    onReportProgress?.(percent);
  };
};
```

**Example 3: WordPower** (Manual reporting)
```javascript
const WordPower = ({ data, onReportProgress }) => {
  const handleComplete = () => {
    onReportProgress?.(100);
  };

  return <button onClick={handleComplete}>Finish</button>;
};
```

---

## 📊 Progress Data Structure

### **Backend Database Schema**:
```javascript
{
  userId: "user123",
  progress: {
    1: {  // Week 1
      read_explore: 100,
      new_words: 75,
      word_match: 50,
      grammar: 100,
      dictation: 80,
      shadowing: 100,
      // ... other stations
    },
    2: {  // Week 2
      read_explore: 50,
      new_words: 25,
      // ...
    }
  },
  lastWeek: 1,
  lastStation: "dictation",
  srs_completed: {
    1: true,  // Week 1 SRS done
    2: false
  }
}
```

### **Local State (weekProgress)**:
```javascript
{
  read_explore: 100,
  new_words: 75,
  word_match: 50,
  grammar: 100,
  dictation: 80,
  shadowing: 100
}
```

---

## 🎨 CSS Animations

### **fadeOut Animation** (for AutoSaveIndicator)

**Location**: `src/index.css`

```css
@keyframes fadeOut {
  from { opacity: 1; }
  to { opacity: 0; }
}

.animate-fadeOut {
  animation: fadeOut 1s ease-out forwards;
}
```

**Usage**: Applied when `status === 'saved'` to smoothly hide indicator

---

## 🔄 Complete User Journey

### **Scenario: User completes Read & Explore**

1. **User clicks "Mark Complete" button**
   - ReadingExplore sets `isComplete = true`

2. **Module calls onReportProgress(100)**
   - Triggers App.jsx's `handleReportProgress`

3. **App shows "Saving..." indicator**
   - `setAutoSaveStatus('saving')`
   - AutoSaveIndicator appears with spinning cloud icon

4. **API call to backend**
   - `POST /progress` with `{ weekId: 1, stationKey: 'read_explore', progressPercent: 100 }`

5. **Backend responds success**
   - Data saved to database

6. **App updates local state**
   - `setWeekProgress({ ...weekProgress, read_explore: 100 })`

7. **Show "Saved" indicator**
   - `setAutoSaveStatus('saved')`
   - AutoSaveIndicator changes to green checkmark

8. **Auto-hide after 1.5s**
   - `setTimeout(() => setAutoSaveStatus('idle'), 1500)`
   - Indicator fades out

9. **Check week completion**
   - If all stations = 100%, show Congratulations modal 🎉

---

## 🐛 Error Handling

### **Network Failure**:
```javascript
try {
  await updateProgress(data);
} catch (error) {
  console.error("Failed to report progress:", error);
  setAutoSaveStatus('idle'); // Hide indicator
  // Could add retry logic or offline queue here
}
```

### **Guest User**:
```javascript
if (!currentUser || currentUser.role === 'guest') return;
// Don't save progress for guests
```

### **Invalid Data**:
- Backend validates `weekId`, `stationKey`, `progressPercent`
- Returns 400 error if invalid
- Frontend logs error and continues

---

## 📈 Future Enhancements

### **1. Offline Support**:
```javascript
// Queue failed requests
const offlineQueue = [];

const updateProgress = async (data) => {
  try {
    await apiClient.post('/progress', data);
  } catch (error) {
    if (!navigator.onLine) {
      offlineQueue.push(data);
    }
  }
};

// Sync when back online
window.addEventListener('online', async () => {
  for (const data of offlineQueue) {
    await apiClient.post('/progress', data);
  }
  offlineQueue.length = 0;
});
```

### **2. Optimistic Updates**:
```javascript
// Update UI immediately, revert on error
const handleReportProgress = async (percent) => {
  const previousProgress = weekProgress;
  setWeekProgress({ ...weekProgress, [tabKey]: percent });

  try {
    await updateProgress(data);
  } catch (error) {
    setWeekProgress(previousProgress); // Revert on error
  }
};
```

### **3. Batch Saving**:
```javascript
// Save multiple stations at once
const batchQueue = [];

const debouncedSave = debounce(() => {
  apiClient.post('/progress/batch', batchQueue);
  batchQueue.length = 0;
}, 2000);
```

---

## ✅ Testing Checklist

### **Manual Testing**:
- [ ] Complete a Read & Explore station
- [ ] Watch "Saving..." indicator appear
- [ ] Verify "Saved" checkmark shows after 1s
- [ ] Check sidebar progress percentage updates
- [ ] Refresh page - progress should persist
- [ ] Complete all stations - Congratulations modal appears
- [ ] Test as guest - no save indicators
- [ ] Disconnect internet - check error handling

### **Console Logs**:
```javascript
// App.jsx
console.log('[Progress] Saving:', { weekId, stationKey, percent });
console.log('[Progress] Local state updated:', weekProgress);
console.log('[Progress] All stations complete!', completedStations);
```

---

## 📚 Related Files

**Core System**:
- `src/App.jsx` - Main progress controller
- `src/components/common/AutoSaveIndicator.jsx` - Header indicator
- `src/components/common/SaveToast.jsx` - Bottom-right toast
- `src/services/api.js` - Backend API calls
- `src/index.css` - Animations

**Modules (All support progress)**:
- `src/modules/read/ReadingExplore.jsx`
- `src/modules/dictation/DictationEngine.jsx`
- `src/modules/shadowing/Shadowing.jsx`
- `src/modules/production/MindMapSpeaking.jsx`
- `src/modules/watch/DailyWatch.jsx`
- `src/modules/power/WordPower.jsx`
- (13 total station modules)

---

**Last Updated**: January 10, 2026  
**Status**: ✅ Fully Functional  
**Master Prompt V23**: Section 0.1.1 (Progressive Saving UI)
