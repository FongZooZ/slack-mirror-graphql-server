const mongoose = require('mongoose')

const Message = mongoose.model('Message')

const RootQuery = {
  message: async (source, args, context) => {
    let { limit, page } = args
    limit = Math.abs(limit) || 100
    page = Math.abs(page) || 1
    const skip = (page - 1) * limit

    const cond = {
      parent_user_id: { $exists: false }
    }
    const sort = { ts: -1 }

    const message = await Message.find(cond).limit(limit).skip(skip).sort(sort)
    return message
  }
}

module.exports = {
  RootQuery
}