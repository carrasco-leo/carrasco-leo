//
// app.component.ts — carrasco-leo
// ~/projects/app-client/src/app
//

import { Component, ViewEncapsulation, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';

@Component({
	selector:            'app-root',
	templateUrl:         './app.component.html',
	styleUrl:            './app.component.scss',
	encapsulation:       ViewEncapsulation.None,
	preserveWhitespaces: true,

	imports: [
		RouterOutlet,
	],
})
export class AppComponent
{
}
