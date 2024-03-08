const { GraphQLError } = require('graphql')
const jwt = require('jsonwebtoken')
const { PubSub } = require('graphql-subscriptions')
const pubsub = new PubSub()

const Author = require('./models/author')
const Book = require('./models/book')
const User = require('./models/user')

const resolvers = {
  Query: {
    bookCount: async () => Book.collection.countDocuments(),

    authorCount: () => Author.collection.countDocuments(),

    allBooks: async (root, args) => {
      const author = await Author.findOne({ name: args.author })
      if (args.author && args.genre) {
        return author ? Book.find({ 'author': author.id, 'genres': args.genre }).populate('author') : []
      } else if (args.author) {
        return author ? Book.find({ 'author': author.id }).populate('author') : []
      } else if (args.genre) {
        return Book.find({ 'genres': args.genre }).populate('author')
      }
      return Book.find({}).populate('author')
    },

    allAuthors: async () => { 
      return Author.find({}).populate('bookCount')
    },

    me: (root, args, context) => {
      return context.currentUser
    }
  },

  Book: {
    title: (root) => root.title,
    author: (root) => root.author,
    published: (root) => root.published,
    genres: (root) => root.genres,
    id: (root) => root.id
  },
  Mutation: {
    addBook: async (root, args, { currentUser }) => {
      if (!currentUser) {
        throw new GraphQLError('Not authenticated!', {
          extensions: {
            code: 'BAD_USER_INPUT',
          }
        })
      }

      let author = await Author.findOne({ name: args.author })

      if (!author) {
        author = new Author({ name: args.author, bookCount: 1 })
        await author.save()
          .catch(error => {
            throw new GraphQLError('Saving new author failed', {
              extensions: {
                code: 'BAD_USER_INPUT',
                invalidArgs: args.author,
                error
              }
            })
          }
        )
      } else {
        author.bookCount += 1
        await author.save()
      }

      const book = new Book({ ...args, author: author })

      try {
        await book.save()
      } catch (error) {
        throw new GraphQLError('Saving book failed', {
          extensions: {
            code: 'BAD_USER_INPUT',
            invalidArgs: args.title,
            error
          }
        })
      }

      pubsub.publish('BOOK_ADDED', { bookAdded: book })

      return book
    },

    editAuthor: async (root, args, { currentUser }) => {
      if (!currentUser) {
        throw new GraphQLError('Not authenticated!', {
          extensions: {
            code: 'BAD_USER_INPUT',
          }
        })
      }

      const author = await Author.findOne({ name: args.name })

      if (author) {
        author.born = args.setBornTo
        return author.save()
      } return null
    },

    createUser: async (root, args) => {
      const user = new User({
        username: args.username,
        favoriteGenre: args.favoriteGenre })

      return user.save()
        .catch(error => {
          throw GraphQLError('Creating the user failed', {
          extensions: {
            code: 'BAD_USER_INPUT',
            invalidArgs: args.name,
            error
          }})
        })
    },

    login: async (root, args) => {
      const user = await User.findOne({ username: args.username })

      if (!user || args.password !== 'secret') {
        throw new GraphQLError('Wrong credentials!', {
          extensions: {
            code: 'BAD_USER_INPUT'
          }
        })        
      }
  
      const userForToken = {
        username: user.username,
        id: user._id,
      }
  
      return { value: jwt.sign(userForToken, process.env.JWT_SECRET) }
    }
  },
  Subscription: {
      bookAdded: {
        subscribe: () => pubsub.asyncIterator('BOOK_ADDED')
      },
  }
}

module.exports = resolvers