const router = require('express').Router()
const {
  getCategory,
  getCategoryByID,
  postCategory,
  patchCategory,
  deleteCategory
} = require('../controller/c_category')

router.get('/', getCategory)
router.get('/:id', getCategoryByID)
router.post('/', postCategory)
router.patch('/:id', patchCategory)

router.delete('/:id', deleteCategory)

module.exports = router
