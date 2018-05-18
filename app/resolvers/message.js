const mongoose = require('mongoose')
const moment = require('moment')

const User = mongoose.model('User')
const Message = mongoose.model('Message')

module.exports = {
  Message: {
    user: async ({user}) => {
      const userInfo = await User.findOne({id: user})

      let data
      if (!userInfo) {
        data = null
      } else {
        data = {
          id: userInfo.id,
          name: userInfo.real_name,
          real_name: userInfo.real_name,
          email: userInfo.profile.email,
          avatars: [{
            image_24: userInfo.profile.image_24,
            image_32: userInfo.profile.image_24,
            image_48: userInfo.profile.image_24,
            image_72: userInfo.profile.image_24,
            image_192: userInfo.profile.image_24,
            image_512: userInfo.profile.image_24,
          }]
        }
      }

      return data
    },
    time: ({ts}) => {
      return moment.unix(ts).fromNow()
    },
    thread: async ({thread_ts, user}) => {
      if (!thread_ts) return
      const cond = { thread_ts, parent_user_id: user }
      const sort = { ts: 1 }

      const messages = await Message.find(cond).sort(sort)

      const data = {
        ts: thread_ts,
        messages
      }

      return data
    }
  }
}