const router = require('express').Router();
const { Tag, Product, ProductTag } = require('../../models');

// The `/api/tags` endpoint

router.get('/', async (req, res) => {
  // Find all tags and include its associated Product data
  try {
    const productTag = await Tag.findAll({
      include: [{ model: Product }]
    });
    res.status(200).json(productTag);
  } catch (err) {
    res.status(500).json(err)
  }
});

router.get('/:id', async (req, res) => {
  // Find a single tag by its `id` and include its associated Product data
  try {
    const productTag = await Tag.findByPk(req.params.id, {
      include: [{ model: Product }]
    });
    if (!productTag) {
      res.status(400).json({ message: 'No tag with that id!'});
      return;
    }
    res.status(200).json(productTag);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.post('/', async (req, res) => {
  // Create a new tag
  try {
    const productTag = await Tag.create(req.body);
    res.status(200).json(productTag);
  } catch (err) {
    res.status(400).json(err);
  }

});

router.put('/:id', async (req, res) => {
  // Update a tag's name by its `id` value
  try {
    const productTag = await Tag.update(
      {
        tag_name: req.body.tag_name
      },
      {
        where: {
          id: req.params.id
        },
    });
    if (!productTag) {
      res.status(400).json({ message: 'No product found with this Tag ID' });
      return;
    }
    res.status(200).json(productTag);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.delete('/:id', async (req, res) => {
  // Delete on tag by its `id` value
  try {
    const productTag = await Tag.destroy({
      where: {
        id: req.params.id
      }
    });
    if (!productTag) {
      res.status(400).json({ message: 'No product found with this Tag ID' });
      return;
    }
    res.status(200).json(productTag);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
