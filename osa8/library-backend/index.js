const { ApolloServer } = require('@apollo/server')
const { startStandaloneServer } = require('@apollo/server/standalone')

const mongoose = require('mongoose')
mongoose.set('strictQuery', false)
const Author = require('./models/author')
const Book = require('./models/book')

require('dotenv').config()

const MONGODB_URI = process.env.MONGODB_URI

console.log('connecting to', MONGODB_URI)

mongoose.connect(MONGODB_URI)
  .then(() => {
    console.log('connected to MongoDB')
  })
  .catch((error) => {
    console.log('error connection to MongoDB:', error.message)
  })

const typeDefs = `
  type Book {
    title: String!
    published: Int!
    author: Author!
    genres: [String!]!
    id: ID!
  }

  type Author {
    name: String!
    born: Int
    id: ID!
    bookCount: Int!
  }

  type Query {
    bookCount: Int!
    authorCount: Int!
    allBooks(author: String, genre: String): [Book!]!
    allAuthors: [Author!]!
  }

  type Mutation {
    addBook(
      title: String!
      author: String!
      published: Int!
      genres: [String!]!
    ): Book
    editAuthor(
      name: String!
      setBornTo: Int!
    ): Author
  }
`

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
    allAuthors: async () => { return Author.find({}) }
  },
  Author: {
    bookCount: async (root) => {
      const allBooks = await Book.find({})
      return allBooks.filter(b => b.author.toString() === root.id).length
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
    addBook: async (root, args) => {
      let author

      const existing_author = await Author.findOne({ name: args.author })
      const existing_book = await Book.findOne({ title: args.title })

      if (existing_book) {
        return null
      }

      if (!existing_author) {
        author = new Author({ name: args.author })
        await author.save()
      }

      const book = new Book({ ...args, author: existing_author || author })
      return book.save()
    },
    editAuthor: async (root, args) => {
      const author = await Author.findOne({ name: args.name })
      if (author) {
        author.born = args.setBornTo
        return author.save()
      } return null
    }
  }
}


const server = new ApolloServer({
  typeDefs,
  resolvers,
})

startStandaloneServer(server, {
  listen: { port: 4000 },
}).then(({ url }) => {
  console.log(`Server ready at ${url}`)
})