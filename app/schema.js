const { makeExecutableSchema } = require('graphql-tools')

const schema = require('./schemas')

const RootQuery = `
  type RootQuery {
    message(count: Int, page: Int): Message
  }
`

const SchemaDefinition = `
  schema {
    query: RootQuery
  }
`

module.exports = makeExecutableSchema({
  typeDefs: [
    SchemaDefinition, RootQuery, ...schema
  ],
  resolvers: {}
})