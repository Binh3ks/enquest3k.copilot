const bcrypt = require('bcryptjs');
const { Pool } = require('pg');

const pool = new Pool({
  user: 'engquest_user',
  host: 'localhost',
  database: 'engquest_db',
  password: 'engquest_pass',
  port: 5432,
});

async function createOwnerAdmin() {
  try {
    // Hash password
    const hashedPassword = await bcrypt.hash('owner123', 10);
    
    // Check if owner exists
    const existingUser = await pool.query(
      'SELECT id FROM users WHERE name = $1',
      ['owner']
    );
    
    if (existingUser.rows.length > 0) {
      // Update existing user
      await pool.query(
        `UPDATE users 
         SET password = $1, role = $2, email = $3
         WHERE name = $4`,
        [hashedPassword, 'super_admin', 'owner@engquest.com', 'owner']
      );
      console.log('✅ Updated existing user "owner" with super_admin role');
    } else {
      // Create new user
      await pool.query(
        `INSERT INTO users (name, password, email, role, stats) 
         VALUES ($1, $2, $3, $4, $5)`,
        ['owner', hashedPassword, 'owner@engquest.com', 'super_admin', JSON.stringify({
          stars: 0,
          level: 1,
          streak: 0,
          completedWeeks: []
        })]
      );
      console.log('✅ Created new user "owner" with super_admin role');
    }
    
    console.log('\n📋 Login credentials:');
    console.log('   Username: owner');
    console.log('   Password: owner123');
    console.log('   Role: super_admin');
    console.log('\n✨ You can now:');
    console.log('   - Access Admin Shield');
    console.log('   - Access Teacher Panel');
    console.log('   - Create other users');
    console.log('   - View all dashboards');
    
    await pool.end();
  } catch (error) {
    console.error('❌ Error creating owner admin:', error);
    process.exit(1);
  }
}

createOwnerAdmin();
