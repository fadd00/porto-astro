import { createClient } from '@libsql/client';

const url = import.meta.env.TURSO_DATABASE_URL;
const authToken = import.meta.env.TURSO_AUTH_TOKEN;

// Create db client with error handling
let db: ReturnType<typeof createClient>;

try {
    if (!url || !authToken) {
        console.error('Missing Turso credentials. Database features will not work.');
        // Create a dummy client to prevent crashes
        throw new Error('Database not configured');
    }

    db = createClient({
        url,
        authToken,
    });
} catch (error) {
    console.error('Failed to initialize database client:', error);
    // Create a safe fallback - this will error on use but won't crash on import
    db = createClient({
        url: 'file:local.db',
        authToken: 'dummy',
    });
}

export { db };

// Setup database tables (call this manually in API routes if needed)
export async function setupDatabase() {
    try {
        await db.batch([
            `CREATE TABLE IF NOT EXISTS views (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        count INTEGER NOT NULL DEFAULT 1
      );`,
            `CREATE TABLE IF NOT EXISTS guestbook (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT NOT NULL,
        message TEXT NOT NULL,
        createdAt DATETIME DEFAULT CURRENT_TIMESTAMP
      );`,
            // Seed the views table if it's empty
            `INSERT INTO views (count) SELECT 0 WHERE NOT EXISTS (SELECT 1 FROM views);`
        ], 'write');
        console.log('Database setup complete.');
        return true;
    } catch (error) {
        console.error('Error setting up database:', error);
        return false;
    }
}
