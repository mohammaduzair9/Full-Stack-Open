describe('Blog app', function() {
  beforeEach(function() {
    cy.request('POST', `${Cypress.env('BACKEND')}/testing/reset`)
    const user1 = {
      name: 'John Doe',
      username: 'john',
      password: 'doe'
    }
    const user2 = {
      name: 'Test User',
      username: 'testuser',
      password: 'test'
    }
    cy.request('POST', `${Cypress.env('BACKEND')}/users`, user1)
    cy.request('POST', `${Cypress.env('BACKEND')}/users`, user2)
    cy.visit('')
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
      cy.contains('John Doe logged in').should('not.exist')
    })
  })

  describe('When logged in', function() {
    beforeEach(function() {
      cy.login({ username: 'john', password: 'doe' })
    })

    it('A blog can be created', function() {
      cy.contains('create new blog').click()
      cy.get('#title').type('test blog through cypress')
      cy.get('#author').type('test author')
      cy.get('#url').type('www.test.com')
      cy.get('#create-blog-button').click()
      cy.contains('test blog through cypress')
    })

    describe('and a blog exists', function () {
      beforeEach(function () {
        cy.createBlog({
          title: 'test blog through cypress',
          author: 'test author',
          url: 'www.test.com'
        })
      })

      it('it can be liked', function () {
        cy.contains('test blog through cypress')
          .contains('view')
          .click()

        cy.contains('test blog through cypress').parent().find('.like-button').as('likeButton')
        cy.get('@likeButton').click()

        cy.contains('1')
          .contains('like')
      })

      it('it can be deleted by the user who created it', function () {
        cy.contains('test blog through cypress')
          .contains('view')
          .click()

        cy.contains('test blog through cypress').parent().find('.remove-button').as('removeButton')
        cy.get('@removeButton').click()

        cy.contains('test blog through cypress').should('not.exist')
      })

      it('only the creator can see the delete button of a blog, not anyone else', function () {
        cy.login({ username: 'testuser', password: 'test' })

        cy.contains('test blog through cypress')
          .contains('view')
          .click()

        cy.contains('test blog through cypress').parent()
          .contains('remove')
          .should('not.exist')

      })
    })
  })

})