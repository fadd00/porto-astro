import type { APIRoute } from 'astro';
import { Resend } from 'resend';

const resend = new Resend(import.meta.env.RESEND_API_KEY);

export const POST: APIRoute = async ({ request }) => {
    try {
        const body = await request.json();
        const { name, email, message } = body;

        // Validation
        if (!name || !email || !message) {
            return new Response(
                JSON.stringify({ error: 'Name, email, and message are required' }),
                { status: 400, headers: { 'Content-Type': 'application/json' } }
            );
        }

        // Send email using Resend
        const { data, error } = await resend.emails.send({
            from: 'onboarding@resend.dev',
            to: ['andhikahutama9@gmail.com'],
            subject: `New message from ${name} on your portfolio`,
            html: `<p>You have a new message from:</p>
             <p><strong>Name:</strong> ${name}</p>
             <p><strong>Email:</strong> ${email}</p>
             <p><strong>Message:</strong></p>
             <p>${message}</p>`,
        });

        if (error) {
            console.error('Resend API Error:', error);
            return new Response(
                JSON.stringify({ error: 'Error sending email' }),
                { status: 500, headers: { 'Content-Type': 'application/json' } }
            );
        }

        return new Response(
            JSON.stringify({ message: 'Email sent successfully!', data }),
            { status: 200, headers: { 'Content-Type': 'application/json' } }
        );
    } catch (err) {
        console.error('Server Error:', err);
        return new Response(
            JSON.stringify({ error: 'Internal Server Error' }),
            { status: 500, headers: { 'Content-Type': 'application/json' } }
        );
    }
};
