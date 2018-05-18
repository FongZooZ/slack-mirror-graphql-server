const mongoose = require('mongoose')
const axios = require('axios')

const db = require('./core/db')
const config = require('./core/config')

db.init()

const User = mongoose.model('User')
const Message = mongoose.model('Message')

const connectDb = async () => {
  try {
    await mongoose.connect(config.db.host, config.db.options)
  } catch (err) {
    console.error(err)
    process.exit(1)
  }
}

connectDb()

const SLACK_URL = 'https://slack.com'
const GROUP_HISTORY_ENDPOINT = 'api/groups.history'
const USER_INFO_ENDPOINT = 'api/users.info'

const handleError = msg => {
  console.error(msg)
  return process.exit(1)
}

// TODO:
// - Clear DB
// - Pagination and get all messages
const fetchMessages = async (token, channelId, count) => {
  if (!token || !channelId) {
    console.error('Invalid input')
    return process.exit(1)
  }

  const COUNT = 1000
  count = count ? count : COUNT

  let data
  try {
    const options = {
      method: 'get',
      url: `${SLACK_URL}/${GROUP_HISTORY_ENDPOINT}?channel=${channelId}&count=${count}`,
      headers: { Authorization: `Bearer ${token}` }
    }
    const response = await axios(options)
    data = response.data
  } catch (err) {
    handleError(err)
  }

  if (!data.ok) return handleError(data.error)
  if (!data.messages || !Array.isArray(data.messages) || !data.messages.length) return handleError('No messages was found')

  const { messages } = data

  for (const msg of messages) {
    const message = new Message(msg)
    await message.save()
  }
  console.log('Done!')

  process.exit()
}

const fetchUsers = () => {
  process.exit()
}

const cmd = process.argv[2]

/* eslint-disable indent */
switch (cmd) {
  case 'fetch_messages':
    fetchMessages(process.argv[3], process.argv[4], process.argv[5])
    break
  case 'fetch_users':
    fetchUsers(process.argv[3])
    break
  default:
    console.log('Task not found')
    process.exit()
}
/* eslint-enable indent */
