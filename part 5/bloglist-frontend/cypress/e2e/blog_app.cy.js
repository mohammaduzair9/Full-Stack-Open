describe('Blog app', function() {
  beforeEach(function() {
    cy.request('POST', 'http://localhost:3003/api/testing/reset')
    const user = {
      name: 'John Doe',
      username: 'john',
      password: 'doe'
    }
    cy.request('POST', 'http://localhost:3003/api/users/', user)
    cy.visit('http://localhost:5173')
  })

  it('Login form is shown', function() {
    cy.contains('Log in to application')
    cy.contains('username')
    cy.contains('password')
    cy.get('#username').type('user')
    cy.get('#password').type('pass')
    cy.get('#login-button').click()
  })

  describe('Login',function() {

    it('succeeds with correct credentials', function() {
      cy.contains('login')
      cy.get('#username').type('john')
      cy.get('#password').type('doe')
      cy.get('#login-button').click()

      cy.contains('John Doe logged in')
    })

    it('fails with wrong credentials', function() {
      cy.contains('login')
      cy.get('#username').type('john')
      cy.get('#password').type('wrong')
      cy.get('#login-button').click()

      cy.get('.error')
        .should('contain', 'wrong username or password')
        .and('have.css', 'color', 'rgb(255, 0, 0)')
        .and('have.css', 'border-style', 'solid')

      cy.get('html').should('not.contain', 'John Doe logged in')
    })
  })
})