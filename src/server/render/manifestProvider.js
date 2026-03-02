import { createManifestProvider } from '../manifest.js';
import { getAllIslandModuleSpecifiers } from '../islands/resolveIslandModule.js';

export const createHostManifestProvider = () => {
	const isDev = process.env.NODE_ENV !== 'production';
	const assetsOrigin = process.env.ASSETS_ORIGIN || (isDev ? 'http://localhost:5173' : undefined);

	if (isDev && assetsOrigin) {
		const devModules = {};
		for (const spec of getAllIslandModuleSpecifiers()) {
			devModules[spec] = `${assetsOrigin}${spec}`;
		}

		return createManifestProvider({
			mode: 'dev',
			devModules,
			runtimeDevSrc: `${assetsOrigin}/src/client/islands-runtime.entry.js`,
			extraManifestFields: { 'vite-client': `${assetsOrigin}/@vite/client` },
		});
	}

	return createManifestProvider({
		mode: 'prod',
		manifestPath: 'dist/client/islands-manifest.json',
	});
};
