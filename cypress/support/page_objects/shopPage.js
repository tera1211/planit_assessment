export class ShopPage{

    selectProducts(productName,num){
        cy.contains(productName).siblings('p').find('.btn.btn-success').then(purchaseBtn=>{
            for(let i=0;i<num; i++){
                cy.wrap(purchaseBtn).click()
            }
        })
    }

}

export const onShopPage=new ShopPage()