const mongoose = require('mongoose')

const Schema = mongoose.Schema

const MessageSchema = new Schema({
  type: String,
  user: String,
  text: String,
  edited: {
    user: String,
    ts: String
  },
  thread_ts: String,
  parent_user_id: String,
  ts: String,
  replies: [{
    user: String,
    ts: String
  }],
  reactions: [{
    name: String,
    users: [String],
    count: Number
  }],
  reply_count: Number
})

MessageSchema.index({ user: 1, ts: 1 })
MessageSchema.index({ ts: -1 })

module.exports = mongoose.model('Message', MessageSchema)