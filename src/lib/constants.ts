export const COMMAND_PREFIX = 'publisher';
export const API_URL = process.env.NODE_ENV === "development"
? 'http://localhost:5173/api/'
: 'http://markdown-publisher-service.vercel.app/api/';
