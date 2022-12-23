export class HeaderMenu{
    shopPage(){
        cy.get('#nav-shop').click()
    }
    contactPage(){
        cy.get('#nav-contact').click()
    }
    cartPage(){
        cy.get('#nav-cart').click()
    }

}

export const navigateTo = new HeaderMenu()