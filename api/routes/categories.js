const router = require('express').Router();
const Category = require('../models/Category');

router.post('/', async (req, res) => {
  try {
    const categoryName = req.body.name;
    const duplicate = await Category.findOne({ name: categoryName });
    if (duplicate) {
      res
        .status(400)
        .json(`A category with the name ${categoryName} already exists`);
    } else {
      const category = new Category({ name: categoryName });
      const newCategory = await category.save();
      res.status(200).json(newCategory);
    }
  } catch (err) {
    res.status(500).json(err.message);
  }
});

router.get('/', async (req, res) => {
  try {
    const categories = await Category.find();
    res.status(200).json(categories);
  } catch (err) {
    res.status(500).json(err.message);
  }
});

module.exports = router;
