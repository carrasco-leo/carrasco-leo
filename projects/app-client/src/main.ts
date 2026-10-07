//
// main.ts — __HEADER_NAME__
// ~/projects/app-client/src
//

import { bootstrapApplication } from '@angular/platform-browser';

import { APP_CONFIG } from './app/app.config';
import { AppComponent } from './app/app.component';

bootstrapApplication(AppComponent, APP_CONFIG)
	.catch((error) => console.error(error));
