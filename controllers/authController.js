import User from '../models/User.js'

const register = async (req,res) => {
  const { username, password } = req.body

  if (!username || !password) {
    res.status(400).json({ msg: 'Please provide all values.' })
    return
  }

  const userExists = await User.findOne({
    where: {
      username: username
    }
  })

  if (userExists) {
    res.status(500).json({ msg: 'User already exists.' })
    return
  }

  const user = await User.create(req.body)
  const token = user.createJWT()

  res.status(200).json({
    user: {
      username: user.username
    },
    token
  })
}

const getAllUsers = async (req,res) => {
  const users = await User.findAll()

  res.status(200).json(users)
}

const updateUser = async (req,res) => {
  const { id } = req.params
  const { username } = req.body

  if (!id) {
    res.status(400).json({ msg: 'Please provide an id' })
    return
  }

  if (!username) {
    res.status(400).json({ msg: 'Please provide a username' })
    return
  }

  const user = await User.findByPk(id)
  if (!user) {
    res.status(404).json({ msg: `No user with id: ${id}` })
    return
  }

  user.username = username
  await user.save()

  const token = user.createJWT()

  res.status(200).json({
    user: {
      username: user.username
    },
    token
  })
}

const deleteUser = async (req,res) => {
  const { id } = req.params

  if (!id) {
    res.status(400).json({ msg: 'Please provide an id' })
    return
  }

  const deletedUser = await User.destroy({
      where: {
        id: id
      }
    }
  )

  if(!deletedUser) {
    res.status(404).json({ msg: `No user with id: ${id}` })
    return
  }

  res.status(200).json({ msg: 'User successfully deleted'})
}

export { register, getAllUsers, updateUser, deleteUser }