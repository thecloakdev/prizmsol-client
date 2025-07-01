import { type NextRequest } from 'next/server';
import RedirectMiddleware from './middlewares/redirect';

export async function middleware(request: NextRequest) {
    return RedirectMiddleware(request);
}
