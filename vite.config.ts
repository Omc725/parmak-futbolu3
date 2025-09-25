import path from 'path';
import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';
import { VitePWA } from 'vite-plugin-pwa';

export default defineConfig(({ mode }) => {
    const env = loadEnv(mode, '.', '');
    const base = '/parmak-futbolu3/';
    return {
      base: base,
      server: {
        port: 3000,
        host: '0.0.0.0',
      },
      plugins: [
        react(),
        VitePWA({
          registerType: 'autoUpdate',
          // PWA eklentisinin manifesti oluşturmasını sağlıyoruz.
          // Bu, dosya yollarının doğru yönetilmesini garanti eder.
          manifest: {
            name: "Parmak Futbolu",
            short_name: "Parmak Futbolu",
            description: "Hızlı tempolu bir langırt oyunu! Takımını seç, yapay zekaya karşı lig ve turnuva modlarında mücadele et ve şampiyon ol!",
            theme_color: "#2c3e50",
            background_color: "#2c3e50",
            display: "standalone",
            scope: base,
            start_url: base,
            icons: [
              {
                src: "icon-144.png", // Eklenti, 'base' yolunu otomatik olarak ekleyecektir.
                sizes: "144x144",
                type: "image/png"
              },
              {
                src: "icon-192.png",
                sizes: "192x192",
                type: "image/png"
              },
              {
                src: "icon-512.png",
                sizes: "512x512",
                type: "image/png",
                purpose: "any maskable"
              }
            ]
          },
          // İkonların servis çalışanı tarafından önbelleğe alınmasını sağlıyoruz.
          // Bu ikonların 'public' klasöründe olması gerekir.
          workbox: {
             globPatterns: ['**/*.{js,css,html,ico,png,svg}']
          }
        })
      ],
      define: {
        'process.env.API_KEY': JSON.stringify(env.GEMINI_API_KEY),
        'process.env.GEMINI_API_KEY': JSON.stringify(env.GEMINI_API_KEY)
      },
      resolve: {
        alias: {
          // Fix for "Property 'cwd' does not exist on type 'Process'" error.
          // path.resolve('.') resolves to the current working directory, same as path.resolve(process.cwd(), '.').
          '@': path.resolve('.'),
        }
      }
    };
});