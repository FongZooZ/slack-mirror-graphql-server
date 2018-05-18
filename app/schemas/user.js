const User = `
  type User {
    id: String,
    name: String,
    real_name: String
    email: String
    avatars: UserAvatar
  }

  type UserAvatar {
    hash: String
    image_24: String
    image_32: String
    image_48: String
    image_72: String
    image_192: String
    image_512: String
  }
`

module.exports = User