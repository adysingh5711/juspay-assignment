import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [react()],
    server: {
        port: 3000,
        open: true
    },
    build: {
        outDir: 'build',
        sourcemap: false,
        minify: 'terser',
        terserOptions: {
            compress: {
                drop_console: true,
                drop_debugger: true,
            },
        },
        rollupOptions: {
            output: {
                manualChunks: {
                    // Vendor chunks for better caching
                    'react-vendor': ['react', 'react-dom', 'react-router-dom'],

                    // UI library chunks (if you add any UI libraries later)
                    'ui-vendor': [],

                    // Route-based chunks - broken down for better optimization
                    'dashboard-home-core': [
                        './src/modules/main/home/components/home'
                    ],
                    'dashboard-home-charts': [
                        './src/modules/main/home/projections-vs-actuals-graph/components/projections-vs-actual-graph',
                        './src/modules/main/home/revenue-graph/components/revenue-graph',
                        './src/modules/main/home/total-sales-pie-chart/components/total-sales-pie-chart'
                    ],
                    'dashboard-home-data': [
                        './src/modules/main/home/overall-details/components/overall-details',
                        './src/modules/main/home/revenue-by-location-map/components/revenue-by-location-map',
                        './src/modules/main/home/top-selling-products-table/components/top-selling-products'
                    ],
                    'dashboard-orders': [
                        './src/modules/main/order-list/components/order-list',
                        './src/modules/main/order-list/components/order-list-header',
                        './src/modules/main/order-list/components/order-list-table',
                        './src/modules/main/order-list/components/order-list-pagination'
                    ],

                    // Shared components
                    'shared-components': [
                        './src/modules/components/layout-container',
                        './src/modules/left-sidebar/components/left-sidebar',
                        './src/modules/right-sidebar/components/right-sidebar',
                        './src/modules/navbar/components/navbar'
                    ],

                    // Context providers
                    'contexts': [
                        './src/modules/contexts/theme-context',
                        './src/modules/contexts/left-sidebar-context',
                        './src/modules/contexts/right-sidebar-context',
                        './src/modules/contexts/right-sidebar-sections-context'
                    ]
                }
            }
        },
        // Increase chunk size warning limit to 1000kb for better optimization
        chunkSizeWarningLimit: 1000
    },
    define: {
        // Define any global constants here if needed
    }
})
