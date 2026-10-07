//
// app.routes.ts — carrasco-leo
// ~/projects/app-client/src/app
//

import type { Routes } from '@angular/router';

import { AppSetup } from './app-setup';

export const ROUTES: Routes = [
	{ path: '', canActivate: [AppSetup], children: [
		// put your routes here just after AppSetup guard
	] },
];
