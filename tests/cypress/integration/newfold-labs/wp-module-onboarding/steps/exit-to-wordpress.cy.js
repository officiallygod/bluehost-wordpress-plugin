// <reference types="Cypress" />

describe('Exit to WordPress', function () {

    before(() => {
        cy.setCustomerData();
        cy.visit('wp-admin/?page=nfd-onboarding&flow=ecommerce#/ecommerce/step/products');
		// cy.injectAxe();
    });

    // it('Is Accessible', () => {
	// 	cy.checkA11y();
	// });

    it("Go to the Page where the Drawer contains Exit to WordPress Button", () => {
        var drawer_status = cy.get('.nfd-onboarding-drawer__panel-scroll-container').scrollIntoView().should('not.be.visible');
        var noExitToWPLabel = cy.get('.nfd-onboarding-etw__trigger').should('not.exist');
        if(drawer_status || noExitToWPLabel) {
            cy.get('.navigation-buttons_next').click();
        }
        cy.url().should('not.contain', '/ecommerce/step/products');
        cy.get('.nfd-onboarding-etw__trigger').click();
        cy.get('.components-modal__content').should('be.visible');
    });

    it('Check if heading and paragraph content exists', () => {
        cy.get('h1.components-modal__header-heading').should('be.visible');
        cy.get('.components-modal__content > p').should('be.visible');
    });

    it("Stay on Onboarding Page when 'X'/Continue is clicked", () => {
        cy.url().then((currUrl) => {
            // When 'X' is clicked
            cy.get('.components-modal__header > .components-button').click();
            cy.url().should('equal', currUrl);

            // When 'Continue' is clicked
            cy.get('.nfd-onboarding-etw__trigger').click();
            cy.get('.nfd-onboarding-etw__buttons > .is-secondary').click();
            cy.url().should('equal', currUrl);
        })
    });

    it('Exit to WordPress Page', () => {
        cy.get('.nfd-onboarding-etw__trigger').click();
        cy.get('.nfd-onboarding-etw__buttons > .is-primary').click();
        cy.wait(5000);
        cy.url().should('contain', '/home/store/general');
    });

    after(() => {
        cy.clearCustomerData();
    });
});