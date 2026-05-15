#!/usr/bin/env python3
"""Comprehensive audit: check all weeks for reading passages + grammar focus."""
import json, os

def ex_start_of(content):
    """Find where exercises start in READING INPUT content."""
    for i, l in enumerate(content):
        s = str(l).strip()
        if s.startswith('Title:') or s.startswith('['):
            return i
        # Stage N — xxx pattern
        if s.startswith('Stage') and len(s) > 5 and s[5:].strip()[:1].isdigit():
            return i
    return -1

def audit_week(wnum, src_dir):
    path = os.path.join(src_dir, f'W{wnum}.json')
    if not os.path.exists(path):
        return None, [f'MISSING_FILE:{src_dir}']
    try:
        data = json.load(open(path))
    except Exception as e:
        return None, [f'JSON_ERROR:{e}']

    issues = []
    info = {}

    for sess_key in ['sessions', 'sessions_2', 'sessions_5']:
        sessions = data.get(sess_key)
        if not sessions:
            continue
        for si, sess in enumerate(sessions):
            parts = sess.get('parts', [])

            # Check reading passage
            reading_parts = [(pi, p) for pi, p in enumerate(parts)
                             if 'READING INPUT' in (p.get('title') or '').upper()]
            for pi, rp in reading_parts:
                content = rp.get('content', [])
                ex = ex_start_of(content)
                passage_count = len([l for l in content[:ex] if str(l).strip()]) if ex > 0 else 0
                k = f'[{sess_key}][S{si}][P{pi}]'
                info[k] = {'title': (rp.get('title') or '')[:60], 'passage': passage_count, 'ex': ex, 'clen': len(content)}
                if passage_count == 0:
                    issues.append(f'NO_PASSAGE {k} ex={ex} clen={len(content)}')

            # Check Grammar Focus
            gf_parts = [(pi, p) for pi, p in enumerate(parts)
                        if 'GRAMMAR FOCUS' in (p.get('title') or '').upper()]
            for pi, gp in gf_parts:
                content = gp.get('content', [])
                has_rule = any('📌' in str(l) for l in content)
                k = f'[{sess_key}][S{si}][P{pi}]GF'
                info[k] = {'title': (gp.get('title') or '')[:60], 'gf_lines': len(content), 'has_rule': has_rule}
                if len(content) == 0:
                    issues.append(f'GF_EMPTY {k}')
                elif not has_rule:
                    issues.append(f'GF_NO_RULE {k} lines={len(content)}')

            # Check if any READING INPUT part exists at all (only for sessions key)
            if sess_key == 'sessions' and si == 0:
                has_reading = any('READING INPUT' in (p.get('title') or '').upper() for p in parts)
                has_gf = any('GRAMMAR FOCUS' in (p.get('title') or '').upper() for p in parts)
                if not has_reading:
                    issues.append(f'NO_READING_INPUT_PART [sessions][S{si}]')
                if not has_gf:
                    issues.append(f'NO_GRAMMAR_FOCUS_PART [sessions][S{si}]')

    return info, issues

def check_sync(wnum):
    pub = f'public/data/lessons/W{wnum}.json'
    srv = f'mcp-server/data/lessons/W{wnum}.json'
    if not os.path.exists(srv):
        return 'MCP_MISSING'
    try:
        d_pub = json.load(open(pub))
        d_srv = json.load(open(srv))
        if d_pub == d_srv:
            return 'IN_SYNC'
        else:
            return 'OUT_OF_SYNC'
    except:
        return 'ERROR'

os.chdir('/Users/binhnguyen/Downloads/Engquest3k')

all_issues = {}
sync_issues = []

print(f"{'W':>3} | {'Sync':<12} | {'Issues'}")
print("-" * 100)

for w in range(1, 54):
    pub_path = f'public/data/lessons/W{w}.json'
    if not os.path.exists(pub_path):
        print(f"W{w:>2} | MISSING PUBLIC FILE")
        continue

    info, issues = audit_week(w, 'public/data/lessons')
    sync = check_sync(w)
    if sync != 'IN_SYNC':
        sync_issues.append((w, sync))

    status = f"[{sync}]"
    if issues:
        all_issues[w] = issues
        for iss in issues:
            print(f"W{w:>2} | {status:<12} | ❌ {iss}")
    else:
        if sync != 'IN_SYNC':
            print(f"W{w:>2} | {status:<12} | ⚠️  SYNC ISSUE ONLY")
        else:
            print(f"W{w:>2} | {status:<12} | ✅ OK")

print("\n=== SYNC ISSUES ===")
for w, s in sync_issues:
    print(f"  W{w:>2}: {s}")

print(f"\n=== WEEKS WITH CONTENT ISSUES ({len(all_issues)}) ===")
for w, issues in sorted(all_issues.items()):
    print(f"  W{w:>2}: {', '.join(issues[:3])}")

print(f"\nTotal sync issues: {len(sync_issues)}")
print(f"Total content issue weeks: {len(all_issues)}")
