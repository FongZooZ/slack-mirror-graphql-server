const express = require('express')
const bodyParser = require('body-parser')
const { graphqlExpress, graphiqlExpress } = require('apollo-server-express')
const mongoose = require('mongoose')

const db = require('./core/db')
db.init()

const schema = require('./app/schema')
const config = require('./core/config')

const app = express()

app.use('/graphql', bodyParser.json(), graphqlExpress({ schema }))
app.use('/graphiql', graphiqlExpress({ endpointURL: '/graphql' }))

const main = async () => {
  try {
    await mongoose.connect(config.db.host, config.db.options)
  } catch (err) {
    console.error(err)
    process.exit(1)
  }

  app.listen(3000, () => {
    console.log('🚀🚀🚀 Go to http://localhost:3000/graphiql to run queries!')
  })
}

main()