// <reference types="Cypress" />

export const HeadingSubheading = ( ) => {
    cy.get('.nfd-main-heading__title').should('be.visible');
    cy.get('.nfd-main-heading__subtitle').should('be.visible');
}
