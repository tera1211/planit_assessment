///<reference types="cypress"/>

import { navigateTo } from '../support/page_objects/headerMenu';
import { onContactPage } from '../support/page_objects/contactPage';
import { onShopPage } from '../support/page_objects/shopPage';
import { onCartPage } from '../support/page_objects/cartPage';

describe('contact form test', () => {

  beforeEach('open application', () => {
    cy.visit('/');
    //click 'contact' on header menu
    navigateTo.contactPage();
  });

  it('Test case 1: should validate mandatory fields', () => {
    //1. Click submit button
    onContactPage.submitForm();
    //2. Verify error messages
    //forename
    onContactPage.checkFornameErr();
    //Email
    onContactPage.checkEmailErr();
    //Message
    onContactPage.checkMessageErr();
    //Populate mandatory fields
    onContactPage.populateMandatoryFields();
    //3. Validate errors are gone
    //forename
    onContactPage.checkNoForenameErr();
    //Email
    onContactPage.checkNoEmailErr();
    //Message
    onContactPage.checkNoMessageErr();
  })

  it('Test case 2: should be able to submit form',()=>{
    //Populate mandatory fields
    onContactPage.populateMandatoryFields();
    //Click Submit button
    onContactPage.submitForm();
    //Validate successful submission message
    onContactPage.validateSubmission()
  });
});

describe('shopping function test',()=>{
  it('Test case 3: cart page test',()=>{
    cy.visit('/');
    //go to shop page
    navigateTo.shopPage();
    //Buy 2 Stuffed Frog, 5 Fluffy Bunny, 3 Valentine Bear
    onShopPage.selectProducts('Stuffed Frog', 2);
    onShopPage.selectProducts('Fluffy Bunny', 5);
    onShopPage.selectProducts('Valentine Bear', 3);

    //go to cart page
    navigateTo.cartPage();
    //Verify the subtotal for each product is correct
    onCartPage.checkSubtotal();
    //Verify the price for each product
    onCartPage.checkProductPrice();
    //Verify that total = sum(sub totals)
    onCartPage.checkTotal();
  })
})