import { defineConfig } from 'vite';
import laravel from 'laravel-vite-plugin';
import tailwindcss from '@tailwindcss/vite';

export default defineConfig({
    oxc: { jsx: { runtime: 'automatic' } },
    plugins: [
        laravel({ input: ['resources/css/app.css', 'resources/js/app.js', 'resources/js/admin/main.tsx'], refresh: true }),
        tailwindcss(),
    ],
    server: { host: '127.0.0.1', watch: { ignored: ['**/storage/framework/views/**'] } },
});
