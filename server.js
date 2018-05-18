const express = require('express')
const bodyParser = require('body-parser')
const { graphqlExpress, graphiqlExpress } = require('apollo-server-express')
const mongoose = require('mongoose')

const schema = require('./app/schema')
const db = require('./core/db')
const config = require('./core/config')

db.init()

// Initialize the app
const app = express()

// The GraphQL endpoint
app.use('/graphql', bodyParser.json(), graphqlExpress({ schema }))

// GraphiQL, a visual editor for queries
app.use('/graphiql', graphiqlExpress({ endpointURL: '/graphql' }))

const main = async () => {
  try {
    await mongoose.connect(config.db.host, config.db.options)
  } catch (err) {
    console.error(err)
    process.exit(1)
  }

  // Start the server
  app.listen(3000, () => {
    console.log('🚀🚀🚀 Go to http://localhost:3000/graphiql to run queries!')
  })
}

main()