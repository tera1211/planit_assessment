// import { indexOf } from 'cypress/types/lodash';

export class CartPage{

    checkSubtotal(){
        //get unit prices and convert to array
        cy.get('table.cart-items td:nth-child(2)').then((unitPricesRow)=>{
            const unitPrices=
              unitPricesRow
                .toArray()
                .map((el) => el.innerText)
                .map((s) => s.replace('$', ''))
                .map(parseFloat);
            //get quantities and convert to array
            cy.get('table.cart-items td:nth-child(3)').children('input').then(qtyRow=>{
                const quantities=qtyRow.toArray().map(el=>el.value).map(parseFloat)
                
                //create new array of (unit price x quantity) 
                const prod= unitPrices.map((num,idx)=> num * quantities[idx])
                
                //get subtotals and convert to array
                cy.get('table.cart-items td:nth-child(4)').then(subtotalRow=>{
                   const subtotals = subtotalRow
                     .toArray()
                     .map((el) => el.innerText)
                     .map((s) => s.replace('$', ''))
                     .map(parseFloat);

                    //check if the calculation results array are equal to subtotals array
                    expect(prod).to.deep.eq(subtotals)
                });
            });
        })
    }

    checkTotal(){
        cy.get('table.cart-items td:nth-child(4)').then(subtotalRow=>{
            const subtotals = subtotalRow
                .toArray()
                .map((el) => el.innerText)
                .map((s) => s.replace('$', ''))
                .map(parseFloat);
            const sum= Cypress._.sum(subtotals)
            cy.get('.total.ng-binding').invoke('text').then(totalInText=>{
                const total = parseFloat(totalInText.substring((totalInText.indexOf(':')+2)))
                expect(sum).equals(total)
            })
        })
    }

    checkProductPrice(){
        //get product name on cart page
        cy.get('table.cart-items tbody tr td:nth-child(1)').each(($el) => {
            const productName=$el.text()
            //get price of the product on cart page
            cy.get('td:nth-child(1)').contains(productName).siblings('td').eq(0).invoke('text').then(priceOnCartPage=>{
                //check if the price of each product on cart page is the same as in shop page
                cy.visit('/#/shop');
                cy.contains(productName).find('.product-price').invoke('text').then(priceOnShopPage=>{
                    expect(priceOnCartPage).equals(priceOnShopPage)
                })
                cy.visit('/#/cart');
            });

        });
    }
}

export const onCartPage = new CartPage()