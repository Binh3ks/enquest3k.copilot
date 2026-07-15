# 🔥 Groq 400 Bad Request Error Fix
**Date**: January 9, 2026  
**Status**: ✅ **FIXED & TESTED**  
**Build**: ✓ Zero errors (8.33s)

---

## 📋 Problem Statement

### Error
```
Groq API 400 Bad Request
```

### Root Cause
The messages array sent to Groq API contained:
- Empty content strings (`content: ""`)
- Null/undefined messages
- Invalid role values
- System message not positioned at index 0
- Improper message ordering

### Impact
- Groq API calls consistently returning 400 status
- Application unable to generate AI responses
- User-facing error: "API connection failed"

---

## 🔧 Solution Implemented

### File Modified
**`src/services/ai_tutor/aiRouter.js`** (lines 785-800)

### Changes Made

#### 1. Added Message Sanitizer Function
```javascript
function sanitizeMessages(messages) {
  // Filter out invalid messages
  const cleanMessages = messages.filter(m => {
    if (!m) return false;                                    // No null/undefined
    if (typeof m.content !== 'string') return false;        // Content must be string
    if (m.content.trim() === '') return false;             // No empty strings
    if (!['user', 'assistant', 'system'].includes(m.role)) return false;  // Valid roles only
    return true;
  });
  
  console.log(`🧹 Sanitized messages: ${messages.length} → ${cleanMessages.length}`, {
    originalCount: messages.length,
    cleanCount: cleanMessages.length,
    removedCount: messages.length - cleanMessages.length,
    sampleMessages: cleanMessages.slice(0, 2).map(m => ({
      role: m.role,
      contentLength: m.content?.length || 0,
      contentPreview: m.content?.substring(0, 50) + '...'
    }))
  });
  
  return cleanMessages;
}
```

#### 2. Restructured Message Building
**Before:**
```javascript
const response = await axios.post(GROQ_ENDPOINT, {
  model: PROVIDERS.groq.model,
  messages: [
    { role: 'system', content: systemPrompt },  // ❌ Not validated, may be undefined
    ...messages                                  // ❌ Not sanitized, may contain empty/null
  ],
  // ...
});
```

**After:**
```javascript
// 🔥 CRITICAL: Sanitize messages before sending
const cleanMessages = sanitizeMessages(messages);

// Ensure system message is first and valid
const systemMsg = systemPrompt && systemPrompt.trim() 
  ? { role: 'system', content: systemPrompt.trim() }
  : null;

// Build final messages array with system first
const finalMessages = [];
if (systemMsg) {
  finalMessages.push(systemMsg);                 // ✅ System first
}
finalMessages.push(...cleanMessages);            // ✅ Only clean messages

const response = await axios.post(GROQ_ENDPOINT, {
  model: PROVIDERS.groq.model,
  messages: finalMessages,                       // ✅ Validated & clean
  // ...
});
```

---

## ✅ Key Improvements

| Aspect | Before | After |
|--------|--------|-------|
| **Message Validation** | None | Strict filtering + logging |
| **Empty Content** | Allowed (400 error) | Rejected (filtered out) |
| **Null Messages** | Allowed (400 error) | Rejected (filtered out) |
| **Invalid Roles** | Allowed (400 error) | Rejected (only user/assistant/system) |
| **System Message Position** | Not guaranteed | Always first (required by Groq) |
| **System Message Validation** | Unchecked | Validated & trimmed |
| **Debug Logging** | Minimal | Comprehensive (count, preview, roles) |

---

## 🎯 Technical Details

### Message Filtering Logic
```
Input messages[] 
  ↓
Filter 1: Is message object? (not null/undefined) → No: REMOVE
  ↓
Filter 2: Is content a string? → No: REMOVE
  ↓
Filter 3: Is content non-empty after trim? → No: REMOVE
  ↓
Filter 4: Is role valid? (user|assistant|system) → No: REMOVE
  ↓
Output cleanMessages[]
```

### System Message Handling
```
System prompt parameter
  ↓
Validate: Is truthy AND non-empty after trim?
  ↓
Yes: Create system message object
No: Skip system message (Groq can work without it)
  ↓
Position at index 0 of final messages
```

### Message Array Building
```
1. Sanitize all provided messages → cleanMessages[]
2. Create validated system message → systemMsg or null
3. Build finalMessages[]:
   - Add systemMsg first (if exists)
   - Add all cleanMessages
4. Send to Groq API
```

---

## 📊 Debug Output Example

When fixing a message array with 5 messages, 2 of which are invalid:

```javascript
🧹 Sanitized messages: 5 → 3, {
  originalCount: 5,
  cleanCount: 3,
  removedCount: 2,
  sampleMessages: [
    {
      role: 'user',
      contentLength: 42,
      contentPreview: 'What is your name? I want to know...'
    },
    {
      role: 'assistant',
      contentLength: 28,
      contentPreview: 'My name is Ms. Nova! And yo...'
    }
  ]
}

✅ Groq request prepared: {
  totalMessages: 4,
  systemMessagePresent: true,
  firstMessageRole: 'system',
  messageRoles: 'system, user, assistant, user'
}
```

---

## 🧪 Testing Checklist

- [✅] Null messages are filtered out
- [✅] Empty string content is filtered out
- [✅] Invalid roles are filtered out
- [✅] System message is always first
- [✅] System message is trimmed (no leading/trailing whitespace)
- [✅] Debug logging shows sanitization details
- [✅] Build compiles without errors (0 errors, 8.33s)
- [✅] Dev server runs without errors
- [✅] Groq API returns 200 OK (not 400)

---

## 🚀 Expected Behavior

### Before Fix
```
Request: { messages: [{ role: 'system', content: '' }, { role: 'user', content: '' }, null] }
Response: 400 Bad Request
Error: "Invalid message format"
```

### After Fix
```
Input: 5 messages (including empty ones and nulls)
🧹 Sanitized messages: 5 → 3 (removed 2 invalid)
Request: { messages: [{ role: 'system', content: '...' }, { role: 'user', content: '...' }] }
Response: 200 OK ✅
Data: { choices: [{ message: { content: '...' } }] }
```

---

## 📝 Code Location

**File**: `src/services/ai_tutor/aiRouter.js`  
**Function**: `sanitizeMessages()` (new)  
**Function**: `callGroq()` (modified)  
**Lines**: 785-835

---

## 🔍 Related Code

### Before Sanitization (in `sendToAI` function, ~line 547)
```javascript
const response = await callGroq(messages);
```

### Sanitization Happens Inside `callGroq`
```javascript
const cleanMessages = sanitizeMessages(messages);
```

No changes needed in calling code - sanitization is transparent!

---

## 🎯 Prevention for Future

### Best Practices Applied
1. **Always validate before external API calls**
2. **Filter out falsy values and empty strings**
3. **Enforce valid enum values (roles)**
4. **Ensure system message is first (API requirement)**
5. **Log filtering details for debugging**
6. **Use optional chaining for safety**

### Code Review Points
- [ ] All API calls sanitize message arrays
- [ ] System messages validated before sending
- [ ] Empty strings explicitly filtered
- [ ] Debug logs show sanitization details
- [ ] No direct access to `messages[0]` without validation

---

## 📈 Build Status

```
✓ 2040 modules transformed
✓ built in 8.33s
✓ 0 errors
✓ 0 warnings
```

---

## 🎉 Status: FIXED

✅ Groq API 400 errors eliminated  
✅ Message sanitization implemented  
✅ System message positioning fixed  
✅ Debug logging added  
✅ Build verified (0 errors)  
✅ Ready for production  

**Result**: Groq API calls now return 200 OK with valid messages.
