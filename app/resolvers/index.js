const messageResolver = require('./message')
const userResolver = require('./user')
const rootResolver = require('./root')

module.exports = {
  ...rootResolver,
  ...messageResolver,
  ...userResolver
}