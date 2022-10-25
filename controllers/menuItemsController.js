import MenuItem from '../models/MenuItem.js'

const createMenuItem = async (req,res) => {
  const { title, category, price, description } = req.body

  if (!title || !category || !price || !description) {
    res.status(400).json({ msg: 'Please provide all values.' })
    return
  }

  const menuItem = await MenuItem.create(req.body)

  res.status(200).json(menuItem)
}

const getAllMenuItems = async (req,res) => {
  const menuItems = await MenuItem.findAll()

  res.status(200).json(menuItems)
}

const deleteMenuItem = async (req,res) => {
  const { id } = req.params

  if (!id) {
    res.status(400).json({ msg: 'Please provide an id' })
    return
  }

  const deletedMenuItem = await MenuItem.destroy({
      where: {
        id: id
      }
    }
  )

  if(!deletedMenuItem) {
    res.status(404).json({ msg: `No menu item with id: ${id}` })
    return
  }

  res.status(200).json(deletedMenuItem)
}

export { createMenuItem, getAllMenuItems, deleteMenuItem }