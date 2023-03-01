// <reference types="Cypress" />

import { DrawerActivityForMenu } from "../../wp-module-support/drawer.cy";
import { GetHeadingTitle } from "../../wp-module-support/header.cy";
import { CheckHelpPanelLinks, CheckIllustrationPanel, CheckInfoPanel, CheckIntroPanel } from '../../wp-module-support/sidebar.cy';

describe( 'Homepage Styles Page', function () {
	before( () => {
		// cy.exec('npx wp-env run cli wp theme activate yith-wonder');
		cy.visit(
			'wp-admin/?page=nfd-onboarding&flow=ecommerce#/wp-setup/step/design/homepage-menu'
		);
		// cy.injectAxe();
	} );

	it( 'Is Accessible', () => {
		cy.wait( 15000 );
	} );

	it( 'Check if Header and Subheader shows up', () => {
		GetHeadingTitle();
	} );

	it( 'Check Drawer Activity', () => {
		DrawerActivityForMenu('Onboarding Menu', ':nth-child(3)', 'Homepage Layouts');
	} );

	it( 'Check to make sure sidebar opens, content is in place and close sidebar', () => {
		CheckIntroPanel('.nfd-onboarding-sidebar-learn-more__design-homepage', 'Home Page');
		CheckIllustrationPanel();
		CheckInfoPanel(2);
		CheckHelpPanelLinks();
	} );

	it( 'Check if Homepage Styles exist and are selectable', () => {
		let previewCount = 0;
		const className = '.homepage_preview__list__item';
		const arr = cy.get( className );

		arr.each( () => {
			cy.get( className ).eq( previewCount ).click();
			cy.get( className )
				.eq( previewCount )
				.find( className.concat( '__title-bar--selected' ) )
				.should( 'be.visible' );
			previewCount += 1;
		} );
	} );
} );
