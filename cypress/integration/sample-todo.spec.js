describe('example to-do app', () => {
    beforeEach(() => {
        cy.visit('/')
    })



    // it('displays two todo items by default', () => {
    //     cy.get('.example-card').should('have.length', 2)
    // })


    it('add new card', () => {
        getInputByLabel('Name: ').type('Sanjay')
        // cy.contains('first-name','Sanjay');
        getInputByLabel('Surname: ').type('Kumar')
        getInputByLabel('description: ').type('Tech Lead');
        cy.contains('button', 'ADD CARD').click();
        // cy.get('.')
    })
    it('check if the element got added', () => {
        // cy.get('.example-card').should('have.length', 3);
        cy.get('.example-card').last().contains('.mat-card-title', 'Sanjay')
        // cy.get('.')
    })
    it("Delete the last object using api", () => {
        cy.request("http://localhost:5000/api/card")
            .then((response) => {
                expect(response.body).has.property("success", true);
                const body = (response.body)
                // expect(response.body.data).to.have.length(3)
                const boardId = body.data[body.data.length - 1]._id;
                removeCard(boardId)
                console.log(boardId);
            })
    })

    it("Add a new  object", () => {
        var user = { "name": "james", "surname": "finn", "description": "tester" }
        cy.request('POST','http://localhost:5000/api/card',user).then((response)=>{
            expect(response.body).has.property("success", true);
            const body = (response.body)
            expect(body.data.name).equal(user.name)
            // expect(response.body.data).to.have.length(3)
        })
    })

    it('delete the last element using button', () => {
        // cy.get('.example-card').should('have.length', 2);
        cy.get('.example-card').last().contains('button', 'DELETE').click();
        // cy.contains('button', 'DELETE').click();
        // cy.get('.')

    })

})

const removeCard = (boardId) => {
    cy.request({
        method: 'DELETE',
        url: `http://localhost:5000/api/card/` + boardId,
    }).then((response) => {
        expect(response.body).has.property("success", true);
        // expect(response.body.data).to.have.length(2)
    })
}

const getInputByLabel = (label) => {
    return cy
        .contains('label', label)
        .invoke('attr', 'for')
        .then((id) => {
            cy.get('#' + id)
        })
}
