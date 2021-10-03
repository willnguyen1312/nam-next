describe('Homepage', () => {
    beforeEach(() => {
        cy.visit('/');
    });

    it('Should have correct button', () => {
        cy.findByRole('button', { name: /Hello there/i }).should('exist');
    });
});
