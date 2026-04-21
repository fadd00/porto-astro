// Stub for node-fetch — redirects to Cloudflare Workers' native global fetch.
// This prevents node-fetch from loading node:http, node:https, etc.
export default globalThis.fetch.bind(globalThis);
export const { Headers, Request, Response, FormData } = globalThis;
