const Message = `
  type Message {
    # message type
    type: String
    # user info
    user: User
    # message in plain text
    text: String
    # timestamp in unix epoch
    ts: String
    # relative time
    time: String
    # reactions list
    reactions: [Reaction]
    # thread
    thread: Thread
    parent_user_id: String
  }

  type Reaction {
    name: String
    users: [User]
    count: Int
  }

  type ThreadMessage {
    type: String
    user: User
    text: String
    ts: String
    reactions: [Reaction]
  }

  type Thread {
    ts: String
    reply_count: Int
    messages: [ThreadMessage]
  }
`

module.exports = Message