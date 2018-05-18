const { makeExecutableSchema } = require('graphql-tools')

const schemas = require('./schemas')
const resolvers = require('./resolvers')

const RootQuery = `
  type RootQuery {
    message(limit: Int, page: Int): [Message]
  }
`

const SchemaDefinition = `
  schema {
    query: RootQuery
  }
`

module.exports = makeExecutableSchema({
  typeDefs: [
    SchemaDefinition, RootQuery, ...schemas
  ],
  resolvers
})