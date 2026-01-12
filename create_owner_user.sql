-- Create super admin owner user
-- Password: owner123 (bcrypt hashed)

INSERT INTO users (name, email, password_hash, role, created_at, updated_at)
VALUES (
  'owner',
  'owner@engquest.com',
  '$2b$10$YourHashedPasswordHere',  -- Will be generated properly
  'super_admin',
  NOW(),
  NOW()
)
ON CONFLICT (email) DO UPDATE 
SET 
  password_hash = EXCLUDED.password_hash,
  role = 'super_admin',
  updated_at = NOW();
