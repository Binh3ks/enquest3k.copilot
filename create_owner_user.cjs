const { Pool } = require('pg');
const bcrypt = require('bcryptjs');

const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'engquest3k',
  password: 'password',
  port: 5432,
});

async function createOwnerUser() {
  const client = await pool.connect();
  
  try {
    console.log('🔐 Creating owner user with super_admin rights...');
    
    const username = 'owner';
    const password = 'owner123';
    const email = 'owner@engquest.com';
    
    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);
    
    // Check if user exists
    const checkUser = await client.query(
      'SELECT * FROM users WHERE username = $1',
      [username]
    );
    
    if (checkUser.rows.length > 0) {
      console.log('⚠️  Owner user already exists, updating...');
      
      // Update existing user
      await client.query(
        `UPDATE users 
         SET password = $1, 
             email = $2, 
             role = 'super_admin',
             updated_at = NOW()
         WHERE username = $3`,
        [hashedPassword, email, username]
      );
      
      console.log('✅ Owner user updated successfully!');
    } else {
      // Create new user
      await client.query(
        `INSERT INTO users (username, password, email, role, created_at, updated_at)
         VALUES ($1, $2, $3, 'super_admin', NOW(), NOW())`,
        [username, hashedPassword, email]
      );
      
      console.log('✅ Owner user created successfully!');
    }
    
    console.log('\n📋 Login credentials:');
    console.log('   Username: owner');
    console.log('   Password: owner123');
    console.log('   Role: super_admin');
    console.log('\n🎯 You can now:');
    console.log('   • Access Admin Shield');
    console.log('   • Create new users');
    console.log('   • Access Teacher Panel');
    console.log('   • View Dashboard & Studio Tools');
    
  } catch (error) {
    console.error('❌ Error creating owner user:', error);
    throw error;
  } finally {
    client.release();
    await pool.end();
  }
}

createOwnerUser()
  .then(() => process.exit(0))
  .catch(err => {
    console.error(err);
    process.exit(1);
  });
