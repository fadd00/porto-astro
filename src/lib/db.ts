import { createClient } from '@libsql/client';

const url = import.meta.env.TURSO_DATABASE_URL;
const authToken = import.meta.env.TURSO_AUTH_TOKEN;

// Create db client — null when credentials are missing (file: URLs are not supported by /web)
let db: ReturnType<typeof createClient> | null = null;

if (url && authToken) {
    try {
        db = createClient({ url, authToken });
    } catch (error) {
        console.error('Failed to initialize database client:', error);
    }
} else {
    console.warn('Missing TURSO_DATABASE_URL or TURSO_AUTH_TOKEN. Database features will not work.');
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
