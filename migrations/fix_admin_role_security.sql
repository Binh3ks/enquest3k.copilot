-- Fix Admin Role Security Issue
-- Date: March 4, 2026
-- 
-- PROBLEM: Some users were created with role='admin' which gave them
--          full super_admin privileges (create/delete users, manage system)
-- 
-- SOLUTION: Convert all 'admin' role users to 'teacher' role (view-only)
--           Only 'super_admin' should have full privileges

-- Step 1: Check which users have 'admin' role
SELECT id, username, role, plan, created_at 
FROM users 
WHERE role = 'admin';

-- Step 2: UPDATE all 'admin' users to 'teacher' role
UPDATE users 
SET role = 'teacher' 
WHERE role = 'admin' 
  AND username != 'owner';  -- Safety: Don't touch owner account

-- Step 3: Verify the fix
SELECT id, username, role, plan 
FROM users 
WHERE role IN ('admin', 'teacher', 'super_admin')
ORDER BY role, username;

-- Expected result:
-- - Lebatai: role='teacher' (was 'admin')
-- - Kay: role='student' (unchanged)
-- - owner: role='super_admin' (unchanged)

-- NOTES:
-- - 'teacher' role: Can view student list (read-only)
-- - 'super_admin' role: Full system control (owner only)
-- - 'student' role: Normal user access
