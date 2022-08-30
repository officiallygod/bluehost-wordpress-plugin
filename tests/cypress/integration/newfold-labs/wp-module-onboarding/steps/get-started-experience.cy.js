// <reference types="Cypress" />

describe('Start Setup WP Experience Page', function () {

	before(() => {
        cy.setCustomerData();
		cy.visit('wp-admin/?page=nfd-onboarding&flow=ecommerce#/wp-setup/step/get-started/experience');
		// cy.injectAxe();
	});

    // it('Is Accessible', () => {
	// 	cy.checkA11y();
	// });

    it('Check if the Suppressed Drawer does not open on clicking Toggle Button', () => {
        cy.wait(3000);
        cy.get('.nfd-onboarding-drawer__toggle-button').click().and('have.class','is-suppressed');
        cy.get('.nfd-onboarding-drawer__panel-scroll-container').scrollIntoView().should('not.be.visible');
    });

    it('Check if Headers Load', () => {
        cy.get('.nfd-step-card-heading').should('exist').and('be.visible');
        cy.get('.nfd-step-card-subheading-other').should('exist').and('be.visible');
        cy.get('.nfd-step-card-question').should('exist').and('be.visible');
    });

    it('Check if Radio Options load', () => {
        cy.get('.components-radio-control__option')
        .should('exist')
        .and('be.visible')
        .and('have.length', 3);
    });

    it('Enable Continue Button based on the radio button selected', () => {
        // Continue Setup Button disabled when no radio button is clicked
        cy.get('.nfd-card-button').should('be.disabled');
        cy.url().should('contain', 'get-started/experience');

        // Radio button clicked and highlighted, enabling the Continue Setup Button
        cy.get('[type="radio"]').check('1', { force: true });
        cy.get('[type=radio]:checked').should('have.css', 'background-color', 'rgb(53, 117, 211)');
        cy.get('.nfd-card-button').should('not.be.disabled').click();
        cy.url().should('not.contain', 'get-started/experience');
        cy.go('back');
    });

    it('Checks if all the radio control buttons are enabled', () => {
        cy.get('.components-radio-control__option')
        .each(($radioControl) => {
            cy.wrap($radioControl).find('input').should('not.be.disabled');
        });
    });

    it('Navigation Buttons Landing on expected pages', () => {
        cy.get('.navigation-buttons_next').click();
        cy.url().should('not.include', '/get-started/experience');
        cy.go('back');

        cy.get('.navigation-buttons_back').click();
        cy.url().should('not.include', '/get-started/experience');
        cy.go('back');
    });

    it('Check Need Help Tag and Hire Experts URL', () => {
        cy.get('.nfd-card-need-help-tag').scrollIntoView().should('be.visible');
        cy.get('.nfd-card-need-help-tag > a').should('exist').should('have.attr', 'href');
    });

    after(() => {
        cy.clearCustomerData();
    });
});