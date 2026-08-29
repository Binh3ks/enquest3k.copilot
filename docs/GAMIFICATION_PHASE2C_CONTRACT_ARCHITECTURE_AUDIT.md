# 🏛️ ENGQUEST3K — GAMIFICATION PHASE 2C: CONTRACT & ARCHITECTURE AUDIT REPORT

**Audit Date:** 2026-08-29  
**Role Alignment:** Antigravity (Implementation Engineer & Investigator) | ChatGPT (Strategic QA Reviewer)  
**Governing Standard:** W33 Golden Learning & Assessment Standard v1.0.0 (Cryptographically Frozen)  
**Audit Stage:** PRE-IMPLEMENTATION FORENSIC AUDIT FOR PHASE 2C  

---

## 🎯 1. EXECUTIVE SUMMARY

Phase 2C hardens the **Mascot Shop Concurrency** and enforces **Word Treasury Learner Isolation**:
1. **Mascot Shop Spending Mutex (`RISK-P2-001` - P1)**: `buyNovaItem` currently executes without Web Locks mutual exclusion or disk balance verification. In concurrent multi-tab or rapid double-click scenarios, this creates a potential race condition permitting double-spending or negative balance.
2. **Mascot Gear Equip Concurrency (`SPEC-P2-002`)**: `equipNovaItem` toggles cosmetics. It does not alter XP but requires clean store synchronization.
3. **Word Treasury Learner Namespacing (`RISK-P2-002` - P2 & `SPEC-P2-003`)**: `wordMemoryBank.js` currently stores all SRS vocabulary in a global un-namespaced key (`engquest_word_bank`). When switching users, Learner B inherits Learner A's vocabulary collection and review schedule.

---

## 🛍️ 2. MASCOT SHOP TRANSACTION FLOW & RACE ANALYSIS

### A. Current Unprotected Flow:
```text
buyNovaItem(item)
    ├─ Read in-memory state: currentXP = state.userXP || 0
    ├─ Validate: if (currentXP < item.price) return false
    ├─ Validate: if (purchasedNovaItems.includes(item.id)) return false
    ├─ Calculate: newXP = currentXP - item.price
    ├─ Mutate in-memory state: set({ userXP: newXP, purchasedNovaItems: [...] })
    └─ Return success
```

### B. Race Condition Scenario:
- Learner has $600\text{ XP}$.
- Tab A invokes `buyNovaItem({ id: 'crown', price: 500 })`.
- Tab B invokes `buyNovaItem({ id: 'cape', price: 600 })` simultaneously.
- Without Web Locks, Tab B reads in-memory `userXP = 600` before Tab A's disk write completes. Both purchases succeed, totaling $1100\text{ XP}$ spent from a $600\text{ XP}$ initial balance.

### C. Required Mutex Architecture:
```text
buyNovaItem(item)
    │
    ▼ (Acquires `engquest_xp_lock_${uid}`)
┌─────────────────────────────────────────────────────────────────────────────┐
│ Critical Section:                                                           │
│ 1. Read latest disk balance (localStorage `engquest-user-storage`)          │
│ 2. Sync balance: currentBalance = diskState.userXP                          │
│ 3. Sync inventory: effectivePurchased = merge(inMemory, diskPurchased)       │
│ 4. Validate: if (currentBalance < item.price) return { success: false }     │
│ 5. Validate: if (effectivePurchased.includes(item.id)) return false         │
│ 6. Deduct: newTotalXP = currentBalance - item.price                         │
│ 7. Mutate & Persist: set({ userXP: newTotalXP, purchasedNovaItems: [...] }) │
│ 8. Return { success: true, newTotalXP, purchasedItem: item.id }             │
└─────────────────────────────────────────────────────────────────────────────┘
    │
    ▼ (Automatic Lock Release)
```

---

## 📖 3. WORD TREASURY DATA-FLOW & ISOLATION MAP

### A. Current Shared Path:
```text
wordMemoryBank.js ──> localStorage.getItem('engquest_word_bank') [GLOBAL]
```
- Global in-memory `_cache` and static key `engquest_word_bank` leak data across user accounts on the same machine.

### B. Learner-Scoped Isolated Path:
```text
Learner A ──> resolveStorageKey(userA) ──> localStorage.getItem('engquest_word_bank_userA') ──> _caches.get('engquest_word_bank_userA')
Learner B ──> resolveStorageKey(userB) ──> localStorage.getItem('engquest_word_bank_userB') ──> _caches.get('engquest_word_bank_userB')
```

### C. Migration Policy for Legacy Data:
- If `engquest_word_bank_${uid}` is absent, but legacy `engquest_word_bank` exists:
  - For logged-in learner (`uid !== 'anonymous'`), migrate legacy records into `engquest_word_bank_${uid}` on first load so user progress is preserved.

---

## 📊 4. FINDINGS & SPEC GAP REGISTER FOR PHASE 2C

| Finding ID | Severity | Area | Description | Target Remediation |
| :--- | :---: | :---: | :--- | :--- |
| **RISK-P2-001** | **P1** | Shop | `buyNovaItem` lacking Web Locks mutex & disk balance verification | Wrap in `navigator.locks.request('engquest_xp_lock_${uid}')` |
| **RISK-P2-002** | **P2** | Treasury | Un-namespaced `engquest_word_bank` storage key | Namespace as `engquest_word_bank_${uid}` with multi-cache map |
| **SPEC-P2-002** | **Spec** | Shop | Mascot Shop multi-tab equip race | In-memory + disk gear merge on toggle |
| **SPEC-P2-003** | **Spec** | Treasury | Multi-user Word Treasury segregation | Explicit per-learner storage keys & cache eviction |

---

## 🛡️ 5. LEARNING CORE ISOLATION CHECK

- `NovaMascotStore.jsx` and `wordMemoryBank.js` have **0 reverse dependencies** into `src/data/weeks/` assessment engines or answer verification algorithms.
- Word Treasury functions remain read-only vocabulary exploration and SRS flashcards.
