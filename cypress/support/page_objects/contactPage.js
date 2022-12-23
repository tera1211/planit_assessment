export class ContactPage{
    //Check error message in each field
    checkFornameErr(){
        cy.get('#forename-err').should('have.text', 'Forename is required');
    }
    checkEmailErr(){
        cy.get('#email-err').should('have.text', 'Email is required');
    }
    checkMessageErr(){
        cy.get('#message-err').should('have.text', 'Message is required');
    }

    //Enter value in the field
    enterForename(){
        cy.get('#forename').type('John');
    }
    enterEmail(){
        cy.get('#email').type('example@test.com');
    }
    enterMessage(){
        cy.get('#message').type('This is a test')
    }
    //function to populates mandatory fields(forename, email & message)
    populateMandatoryFields(){
        this.enterForename();
        this.enterEmail();
        this.enterMessage();
    }

    //Check non-existence of error message
    checkNoForenameErr(){
        cy.get('#forename-err').should('not.exist');
    }
    checkNoEmailErr(){
        cy.get('#email-err').should('not.exist');
    }
    checkNoMessageErr(){
        cy.get('#message-err').should('not.exist');
    }
    //click submit button
    submitForm(){
        cy.get('.btn-contact').contains('Submit').click()
    }

    //validate successful submission
    validateSubmission(){
        cy.wait(10000);
        cy.get('.alert-success').should(
          'have.text',
          '\n\t\tThanks John, we appreciate your feedback.\n\t'
        );
    }
}

export const onContactPage = new ContactPage()