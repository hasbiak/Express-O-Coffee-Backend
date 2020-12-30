const router = require('express').Router()

const product = require('./routes/r_product')
const category = require('./routes/r_category')
const coupon = require('./routes/r_coupon')
const history = require('./routes/r_history')

router.use('/product', product)
router.use('/category', category)
router.use('/coupon', coupon)
router.use('/history', history)

module.exports = router
