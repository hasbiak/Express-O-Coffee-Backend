const router = require('./routes/r_product')
const product = require('./routes/r_product')

router.use('/product', product)

module.exports = router
