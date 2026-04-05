import { startAppServer } from '../../_shared/appServer.js';
import { appFeatures } from './designSystem.js';

const { default: apiRoutes } = await import('../routes/apiRoutes.js');

await startAppServer({
	routesDir: new URL('../src/app/routes/', import.meta.url),
	apiRouter: apiRoutes,
	features: appFeatures,
	port: Number(process.env.PORT) || 3004,
	name: 'test-data',
});
