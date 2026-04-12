const { Pool } = require('pg');
const bcrypt = require('bcryptjs');

const pool = new Pool({
  user: 'engquest_user',
  host: 'localhost',
  database: 'engquest_db',
  password: 'engquest_pass',
  port: 5432,
});

(async () => {
  const client = await pool.connect();
  try {
    console.log('🔐 Creating owner user with super_admin rights...');
    
    const hashedPassword = await bcrypt.hash('owner123', 10);
    
    const result = await client.query(`
      INSERT INTO users (username, password_hash, email, role, created_at, last_login, plan)
      VALUES ('owner', $1, 'owner@engquest.com', 'super_admin', NOW(), NOW(), 'premium')
      ON CONFLICT (username) DO UPDATE 
      SET password_hash = EXCLUDED.password_hash, role = 'super_admin', last_login = NOW()
      RETURNING id, username, email, role, created_at
    `, [hashedPassword]);
    
    console.log('✅ Owner user created/updated successfully!');
    console.log('\n📋 Login credentials:');
    console.log('   Username: owner');
    console.log('   Password: owner123');
    console.log('   Role:', result.rows[0].role);
    console.log('   User ID:', result.rows[0].id);
    console.log('\n🎯 You can now access:');
    console.log('   • Admin Shield');
    console.log('   • Teacher Panel');
    console.log('   • Dashboard & Studio Tools');
    
  } catch (error) {
    console.error('❌ Error:', error.message);
    throw error;
  } finally {
    client.release();
    await pool.end();
  }
})();
