import Position from '../models/Position.js'

const createPosition = async (req,res) => {
  const { title } = req.body

  if (!title) {
    res.status(400).json({ msg: 'Please provide a position title.' })
    return
  }

  const position = await Position.create(req.body)

  res.status(200).json(position)
}

const getAllPositions = async (req,res) => {
  const positions = await Position.findAll()

  res.status(200).json(positions)
}

const getPositionById = async (req,res) => {
  const { id } = req.params

  if (!id) {
    res.status(400).json({ msg: 'Please provide an id' })
    return
  }

  const position = await Position.findByPk(id)

  if (!position) {
    res.status(404).json({ msg: `No position with id: ${id}` })
    return
  }

  res.status(200).json(position)
}

const updatePosition = async (req,res) => {
  const { id } = req.params
  const { title } = req.body

  if (!id) {
    res.status(400).json({ msg: 'Please provide an id' })
    return
  }

  if (!title) {
    res.status(400).json({ msg: 'Please provide a title' })
    return
  }

  const position = await Position.findByPk(id)
  if (!position) {
    res.status(404).json({ msg: `No position with id: ${id}` })
    return
  }

  const updatedPosition = await Position.update(req.body,
    {
      where: {
        id: id
      }
    }
  )

  res.status(200).json(updatedPosition)
}

const deletePosition = async (req,res) => {
  const { id } = req.params

  if (!id) {
    res.status(400).json({ msg: 'Please provide an id' })
    return
  }

  const deletedPosition = await Position.destroy({
      where: {
        id: id
      }
    }
  )

  if(!deletedPosition) {
    res.status(404).json({ msg: `No position with id: ${id}` })
    return
  }

  res.status(200).json({ msg: 'Position successfully deleted'})
}

export { createPosition, getAllPositions, getPositionById, updatePosition, deletePosition }