import type { APIRoute } from 'astro';
import { db } from '../../lib/db';

export const GET: APIRoute = async () => {
    try {
        const { rows } = await db.execute(
            "SELECT id, name, message, createdAt FROM guestbook ORDER BY createdAt DESC;"
        );

        return new Response(
            JSON.stringify(rows),
            { status: 200, headers: { 'Content-Type': 'application/json' } }
        );
    } catch (error) {
        console.error('Failed to fetch guestbook entries:', error);
        return new Response(
            JSON.stringify({ error: 'Could not retrieve guestbook entries.' }),
            { status: 500, headers: { 'Content-Type': 'application/json' } }
        );
    }
};

export const POST: APIRoute = async ({ request }) => {
    try {
        const body = await request.json();
        const { name, message } = body;

        if (!name || !message) {
            return new Response(
                JSON.stringify({ error: 'Name and message are required.' }),
                { status: 400, headers: { 'Content-Type': 'application/json' } }
            );
        }

        await db.execute({
            sql: "INSERT INTO guestbook (name, message) VALUES (?, ?);",
            args: [name, message],
        });

        return new Response(
            JSON.stringify({ message: 'Guestbook entry added successfully!' }),
            { status: 200, headers: { 'Content-Type': 'application/json' } }
        );
    } catch (error) {
        console.error('Failed to add guestbook entry:', error);
        return new Response(
            JSON.stringify({ error: 'Could not add guestbook entry.' }),
            { status: 500, headers: { 'Content-Type': 'application/json' } }
        );
    }
};
