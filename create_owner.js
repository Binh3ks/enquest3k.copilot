import bcrypt from 'bcrypt';
import pkg from 'pg';
const { Pool } = pkg;

const pool = new Pool({
  user: 'binhnguyen',
  host: 'localhost',
  database: 'engquest3k',
  password: '',
  port: 5432,
});

async function createOwner() {
  try {
    // Hash password
    const hashedPassword = await bcrypt.hash('owner123', 10);
    
    // Check if owner exists
    const checkUser = await pool.query(
      'SELECT id FROM users WHERE username = $1',
      ['owner']
    );
    
    if (checkUser.rows.length > 0) {
      // Update existing user
      await pool.query(
        `UPDATE users 
         SET password = $1, role = $2, email = $3 
         WHERE username = $4`,
        [hashedPassword, 'super_admin', 'owner@engquest.com', 'owner']
      );
      console.log('✅ Updated existing owner user with super_admin role');
    } else {
      // Create new user
      await pool.query(
        `INSERT INTO users (username, password, email, role, created_at) 
         VALUES ($1, $2, $3, $4, NOW())`,
        ['owner', hashedPassword, 'owner@engquest.com', 'super_admin']
      );
      console.log('✅ Created new owner user with super_admin role');
    }
    
    // Verify
    const result = await pool.query(
      'SELECT id, username, email, role FROM users WHERE username = $1',
      ['owner']
    );
    
    console.log('\n📋 Owner user details:');
    console.log(result.rows[0]);
    console.log('\n🔑 Credentials:');
    console.log('Username: owner');
    console.log('Password: owner123');
    console.log('Role: super_admin');
    
    await pool.end();
    process.exit(0);
  } catch (error) {
    console.error('❌ Error creating owner:', error);
    await pool.end();
    process.exit(1);
  }
}

createOwner();
