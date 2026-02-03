import client from 'prom-client';

// métricas default (CPU, memoria, event loop, etc.)
client.collectDefaultMetrics({ labels: { app: 'node-api', env: 'prod'} });

// métrica ejemplo: contador de requests
export const httpRequestCounter = new client.Counter({
    name: 'http_requests_total',
    help: 'Total number of HTTP requests',
    labelNames: ['method', 'route', 'status'],
});

export const register = client.register;