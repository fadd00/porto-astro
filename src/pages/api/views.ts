import type { APIRoute } from 'astro';
import { db } from '../../lib/db';

export const GET: APIRoute = async () => {
    try {
        // Increment count
        await db.execute("UPDATE views SET count = count + 1 WHERE id = 1;");

        // Get the new count
        const { rows } = await db.execute("SELECT count FROM views WHERE id = 1;");
        const views = rows[0]?.count ?? 0;

        return new Response(
            JSON.stringify({ views }),
            { status: 200, headers: { 'Content-Type': 'application/json' } }
        );
    } catch (error) {
        console.error('Failed to fetch or update views:', error);
        return new Response(
            JSON.stringify({ error: 'Could not retrieve view count.' }),
            { status: 500, headers: { 'Content-Type': 'application/json' } }
        );
    }
};
