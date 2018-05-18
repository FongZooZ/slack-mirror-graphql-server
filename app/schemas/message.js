const Message = `
  type Message {
    type: String
    user: User
    text: String
    ts: String
    reactions: [Reaction]
    thread: Thread
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