import { useState } from 'react';

export default function ContactForm() {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [message, setMessage] = useState('');
    const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setStatus('submitting');
        
        try {
            const res = await fetch('/api/send', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ name, email, message })
            });
            
            if (res.ok) {
                setStatus('success');
                setName('');
                setEmail('');
                setMessage('');
            } else {
                setStatus('error');
            }
        } catch (error) {
            setStatus('error');
        }
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-6">
            <div>
                <label htmlFor="name" className="block text-gray-200 mb-2">Name</label>
                <input
                    id="name"
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full bg-gray-700 border border-gray-600 rounded-lg px-4 py-3 text-gray-200 focus:outline-none focus:border-rose-400 focus:ring-1 focus:ring-rose-400"
                />
            </div>
            <div>
                <label htmlFor="email" className="block text-gray-200 mb-2">Email</label>
                <input
                    id="email"
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full bg-gray-700 border border-gray-600 rounded-lg px-4 py-3 text-gray-200 focus:outline-none focus:border-rose-400 focus:ring-1 focus:ring-rose-400"
                />
            </div>
            <div>
                <label htmlFor="message" className="block text-gray-200 mb-2">Message</label>
                <textarea
                    id="message"
                    required
                    rows={4}
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    className="w-full bg-gray-700 border border-gray-600 rounded-lg px-4 py-3 text-gray-200 focus:outline-none focus:border-rose-400 focus:ring-1 focus:ring-rose-400"
                ></textarea>
            </div>
            <button
                type="submit"
                disabled={status === 'submitting'}
                className="w-full bg-rose-600 hover:bg-rose-700 text-white font-medium py-3 px-6 rounded-lg transition-colors disabled:opacity-50"
            >
                {status === 'submitting' ? 'Sending...' : 'Send Message'}
            </button>
            {status === 'success' && <p className="text-green-400 text-sm mt-2">Message sent successfully!</p>}
            {status === 'error' && <p className="text-red-400 text-sm mt-2">Failed to send message. Please try again.</p>}
        </form>
    );
}