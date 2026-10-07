//
// angular-default-config.provider.ts — __HEADER_NAME__
// ~/projects/app-client/src/app/providers
//

import type { Provider, EnvironmentProviders } from '@angular/core';

import { provideZoneChangeDetection } from '@angular/core';
import { provideHttpClient, withXhr } from '@angular/common/http';
import { provideRouter, withHashLocation, withRouterConfig } from '@angular/router';

import { ROUTES } from '../app.routes';

export function providerAngularDefaultConfig(): Provider[] | EnvironmentProviders[] {
	return [
		provideZoneChangeDetection(),
		provideHttpClient(withXhr()),
		provideRouter(ROUTES, withHashLocation(), withRouterConfig({
			paramsInheritanceStrategy: 'always',
		})),
	];
}
