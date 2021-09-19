/// <reference types="cypress" />
describe('Add to Cart Functionality', () => {
  context('Cart Actions', () => {
    beforeEach(() => {
      cy.visit('/');
    })
  
    it('Add items to cart', () => {
      cy.get('[data-cy=add-to-cart-2]').click();
      cy.get('[data-cy=add-to-cart-3]').click();
      cy.get('[data-cy=badge-count]').should('have.text', '2');
      cy.wait(1200) // wait for 1.2 seconds for better observing purpose
  // Check the items in the shopping cart'
      cy.get('[data-cy=open-cart]').click();
      cy.wait(1200) // wait for 1.2 seconds
      cy.get('[data-cy=item-name]').should('contain', 'ABBAYE DU MONT DES CATS');
      cy.get('[data-cy=item-name]').should('contain', 'ADELOST');
      cy.wait(1200) // wait for 1.2 seconds
   
  //process the purchase request
      cy.get('[data-cy=purchase-request]').click()  

  //check the success message after purchase done
      cy.on('window:alert', (text) => {
        expect(text).to.contains('Your item(s) has been successfully placed!');
      })
    })
  })
})
  




