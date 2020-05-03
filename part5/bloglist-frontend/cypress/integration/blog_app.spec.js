describe('Blog app', function() {
  beforeEach(function() {
    cy.request('POST', 'http://localhost:3000/api/testing/reset')
    const user = {
      name: 'Daniel Lewis',
      username: 'dan',
      password: 'sekret'
    }
    cy.request('POST', 'http://localhost:3000/api/users/', user)
    cy.visit('http://localhost:3000')
  })

  it('Login from is shown', function() {
    cy.get('h2').should('contain', 'Log in to application')
  })

  describe('Login', function () {
    it('succeeds with correct credentials', function() {
      cy.get('#username').type('dan')
      cy.get('#password').type('sekret')
      cy.get('#login-button').click()

      cy.contains('Daniel Lewis logged in')
    })

    it('fails with wrong credentials', function() {
      cy.get('#username').type('dan')
      cy.get('#password').type('wrong')
      cy.get('#login-button').click()

      cy.get('.error')
        .should('contain', 'Wrong credentials')
        .and('have.css', 'color', 'rgb(255, 0, 0)')
        .and('have.css', 'border-style', 'solid')

      cy.get('html').should('not.contain', 'Daniel Lewis logged in')
    })
  })

  describe('When logged in', function() {
    beforeEach(function() {
      cy.login({ username: 'dan', password: 'sekret' })
    })

    it('A blog can be created', function() {
      cy.contains('new blog').click()
      cy.get('#title').type('Go To Statement Considered Harmful')
      cy.get('#author').type('Edsger W. Dijkstra')
      cy.get('#url').type('https://example.com/blog')
      cy.contains('add').click()

      cy.get('html').should('contain', 'Go To Statement Considered Harmful Edsger W. Dijkstra')
    })

    describe('Delete', function() {
      beforeEach(function() {
        cy.createBlog({ title: 'React patterns', author: 'Michael Chan', url: 'https://reactpatterns.com/', likes: 7 })
      })

      it('A blog can be deleted', function() {
        cy.get('html').should('contain', 'React patterns Michael Chan')
        cy.contains('show').click()
        cy.contains('remove').click()
        cy.get('html').not().should('contain', 'React patterns Michael Chan')
        cy.get('.notification')
          .should('contain', 'blog deleted')
          .and('have.css', 'color', 'rgb(0, 128, 0)')
          .and('have.css', 'border-style', 'solid')
      })

      it('Another users blog cannot be deleted', function() {
        const user = {
          name: 'Bizzaro Siwel',
          username: 'leinad',
          password: 'sekret'
        }
        cy.request('POST', 'http://localhost:3000/api/users/', user)
        cy.login({ username: 'leinad', password: 'sekret' })
        cy.createBlog({ title: 'Go To Statement Considered Harmful', author: 'Edsger W. Dijkstra', url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html', likes: 5 })
        cy.login({ username: 'dan', password: 'sekret' })
        cy.contains('Go To Statement Considered Harmful').parent().as('blogOfInterest')
        cy.get('@blogOfInterest').contains('show').click()
        cy.get('@blogOfInterest').not().contains('remove')
      })
    })

    describe('When several blogs exist', function() {
      beforeEach(function() {
        cy.createBlog({ title: 'React patterns', author: 'Michael Chan', url: 'https://reactpatterns.com/', likes: 7 })
        cy.createBlog({ title: 'Go To Statement Considered Harmful', author: 'Edsger W. Dijkstra', url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html', likes: 5 })
        cy.createBlog({ title: 'Canonical string reduction', author: 'Edsger W. Dijkstra', url: 'http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html', likes: 12 })
        cy.createBlog({ title: 'First class tests', author: 'Robert C. Martin', url: 'http://blog.cleancoder.com/uncle-bob/2017/05/05/TestDefinitions.html', likes: 10 })
      })

      it('A user can like a blog', function() {
        cy.contains('React patterns Michael Chan').parent().as('blogOfInterest')
        cy.get('@blogOfInterest').contains('show').click()
        cy.get('@blogOfInterest').find('.likes').as('likesDiv')
        cy.get('@likesDiv').should('contain', '7')
        cy.get('@likesDiv').find('.like-button').click()
        cy.get('@likesDiv').should('contain', '8')
      })

      it('Blogs are sorted by order of likes', function() {
        cy.get('.likes').then((likes) => {
          var biggestLikes = parseInt(likes[0].innerText)
          // console.log(biggestLikes)
          for (var i = 1; i < likes.length; i++) {
            const curLikes = parseInt(likes[i].innerText)
            // console.log(curLikes)
            if (curLikes > biggestLikes)
              return false
            biggestLikes = curLikes
          }
          return true
        }).should('equals', true)
      })
    })
  })
})