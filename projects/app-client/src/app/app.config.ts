//
// app.config.ts — __HEADER_NAME__
// ~/projects/app-client/src/app
//

import type { ApplicationConfig } from '@angular/core';

import {
	providerAngularDefaultConfig,
	provideMaterialDefaultConfig,
	providerAppAuth,
} from './providers';

export const APP_CONFIG: ApplicationConfig = {
	providers: [
		providerAngularDefaultConfig(),
		provideMaterialDefaultConfig(),
		providerAppAuth(),
	],
};
