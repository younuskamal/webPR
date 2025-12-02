const db = require('./config/db');

const setupDatabase = async () => {
    try {
        console.log('Creating tables...');

        await db.query(`
      CREATE TABLE IF NOT EXISTS services (
        id SERIAL PRIMARY KEY,
        title VARCHAR(255) NOT NULL,
        description TEXT,
        price DECIMAL(10, 2),
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );
    `);

        console.log('Tables created. Seeding data...');

        // Check if data exists
        const check = await db.query('SELECT count(*) FROM services');
        if (parseInt(check.rows[0].count) === 0) {
            await db.query(`
        INSERT INTO services (title, description, price) VALUES
        ('Company Formation', 'Complete setup of your business entity', 10000),
        ('Investor Services', 'Support for foreign investors', 15000),
        ('HR Consulting', 'Strategic HR planning and structure', 5000);
      `);
            console.log('Data seeded successfully.');
        } else {
            console.log('Data already exists, skipping seed.');
        }

        process.exit(0);
    } catch (err) {
        console.error('Error setting up database:', err);
        process.exit(1);
    }
};

setupDatabase();
