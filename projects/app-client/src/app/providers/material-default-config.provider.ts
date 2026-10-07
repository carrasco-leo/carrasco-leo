//
// material-default-config.provider.ts — __HEADER_NAME__
// ~/projects/app-client/src/app/providers
//

import type { Provider } from '@angular/core';
import { MAT_DIALOG_DEFAULT_OPTIONS, MatDialogConfig } from '@angular/material/dialog';
import { MAT_TABS_CONFIG } from '@angular/material/tabs';
import { MAT_FORM_FIELD_DEFAULT_OPTIONS } from '@angular/material/form-field';

/**
 * Provide Angular Material default config
 */
export function provideMaterialDefaultConfig(): Provider[] {
	return [
		{ provide: MAT_DIALOG_DEFAULT_OPTIONS, useValue: {
			...new MatDialogConfig(),
			width: '640px',
		} },

		{ provide: MAT_TABS_CONFIG, useValue: {
			animationDuration: '0ms',
		} },

		{ provide: MAT_FORM_FIELD_DEFAULT_OPTIONS, useValue: {
			floatLabel: 'always',
		} },
	];
}
