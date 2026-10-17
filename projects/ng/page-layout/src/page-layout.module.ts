//
// page-layout.module.ts — @carrasco-leo/ng/page-layout
// ~/projects/ng/page-layout/src
//

import { NgModule } from '@angular/core';

import { ClPageLayout } from './page-layout';
import { ClPageLayoutTopbar } from './page-layout-topbar';
import { ClPageLayoutTopbarLink } from './page-layout-topbar-link';
import { ClPageLayoutSidenav } from './page-layout-sidenav';
import { ClPageLayoutSidenavLink } from './page-layout-sidenav-link';

import {
	ClPageLayoutCategory,
	ClPageLayoutTemplate,
	ClPageLayoutSidenavLinks,
	ClPageLayoutSidenavTitle,
	ClPageLayoutSidenavLinkContent,
	ClPageLayoutToolbar,
	ClPageLayoutSidenavHeader,
	ClPageLayoutSidenavFooter,
	ClPageLayoutBody,
} from './directives';

const ALL_COMPONENTS: any[] = [
	ClPageLayout,
	ClPageLayoutTopbar,
	ClPageLayoutTopbarLink,
	ClPageLayoutSidenav,
	ClPageLayoutSidenavLink,
	ClPageLayoutCategory,
	ClPageLayoutTemplate,
	ClPageLayoutSidenavLinks,
	ClPageLayoutSidenavTitle,
	ClPageLayoutSidenavLinkContent,
	ClPageLayoutToolbar,
	ClPageLayoutSidenavHeader,
	ClPageLayoutSidenavFooter,
	ClPageLayoutBody,
];

@NgModule({
	imports: [ALL_COMPONENTS],
	exports: [ALL_COMPONENTS],
})
export class ClPageLayoutModule {}
