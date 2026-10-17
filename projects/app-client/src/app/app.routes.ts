//
// app.routes.ts — carrasco-leo
// ~/projects/app-client/src/app
//

import type { Routes } from '@angular/router';

import { AppSetup } from './app-setup';

import { HomepageController } from './controllers/@homepage';

export const ROUTES: Routes = [
	{ path: '', canActivate: [AppSetup], children: [
		// put your routes here just after AppSetup guard
		{ path: '', pathMatch: 'full', component: HomepageController },

		{ path: '**', children: [] },
	] },
];
