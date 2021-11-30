const router = require('express').Router();
const { Category, Product } = require('../../models');

// The `/api/categories` endpoint
router.get('/', async (req, res) => {
  // find all categories
  // be sure to include its associated Products
  try {
    const categoryData = await Category.findAll({
      include: [{ model: Product }]
    });
    res.json(categoryData);
}
  catch (err) {
    res.status(500).json(err);
}
});

router.get('/:id', async (req, res) => {
  // console.log("GET API categories", req.params.id);
  // find one category by its `id` value
  // be sure to include its associated Products
  try {
    const categoryData = await Category.findByPk(req.params.id, {
        include: [{ model: Product }]
    });
    res.json(categoryData);
}
catch (err) {
    res.status(500).json(err);
}
});

router.post('/', async (req, res) => {
  // console.log("Create new category", req.body);
  // create a new category
  const newCategory = {
    category_name: req.body.category_name
};
try {
    const categoryData = await Category.create(newCategory);
    res.json(categoryData);
}
catch (err) {
    console.log(err);
    res.status(500).json({ error: 'error with submission' });
}
});

router.put('/:id', async (req, res) => {
  // update a category by its `id` value
  try {
    const categoryData = await Category.update(req.body, {
      where: {
        id: req.params.id,
      },
    });
    console.log(categoryData[0]);
    if (!categoryData[0]) {
      res.status(404).json({ message: 'Category does not exist or was not updated correctly' });
      return;
    }
    res.status(200).json(categoryData);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.delete('/:id', async (req, res) => {
  // delete a category by its `id` value
  const categoryUpdatedID = req.params.id;
    try {
      const categoryData = await Category.destroy({
        where: {
          id: categoryUpdatedID
        }
      });
        res.json(categoryData);
        }
        catch (err) {
          res.status(500).json(err);
        }
});

module.exports = router;