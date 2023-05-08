const router = require('express').Router();
const { Tag, Product, ProductTag } = require('../../models');

// The `/api/tags` endpoint

router.get('/', async (req, res) => {
  // find all tags
  // be sure to include its associated Product data
  try {
    const productTag = await Tag.findAll({
      include: [{ model: Product }, { model: ProductTag }]
    });
    res.status(200).json(productTag);
  } catch (err) {
    res.status(500).json(err)
  }
});

router.get('/:id', async (req, res) => {
  // find a single tag by its `id`
  // be sure to include its associated Product data
  try {
    const productTag = await Tag.findByPk(req.params.id, {
      include: [{ model: Product }, { model: ProductTag }]
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
  // create a new tag
  try {
    const productTag = await Tag.create({
      id: req.body.id,
      tag_name: req.body.tag_name
    });
    res.status(200).json(productTag);
  } catch (err) {
    res.status(400).json(err);
  }

});

router.put('/:id', async (req, res) => {
  // update a tag's name by its `id` value
  //TODO: check work
  try {
    const tagName = await Tag.update(
      {
        id: req.body.id,
        tag_name: req.body.tag_name
      },
      {
        where: {
          id: req.params.id
        },
    });
    if (!tagName) {
      res.status(400).json({ message: 'No product found with this Tag ID' });
      return;
    }
    res.status(200).json(tagName);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.delete('/:id', async (req, res) => {
  // delete on tag by its `id` value
  //TODO: check work
  try {
    const tagName = await Tag.destroy({
      where: {
        id: req.params.id
      }
    });
    if (!tagName) {
      res.status(400).json({ message: 'No product found with this Tag ID' });
      return;
    }
    res.status(200).json(tagName);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
