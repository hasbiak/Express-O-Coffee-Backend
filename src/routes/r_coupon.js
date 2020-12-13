const router = require('express').Router()

const {
  getCoupon,
  postCoupon,
  updateProduct,
  deleteCoupon,
  getCouponById
} = require('../controller/c_coupon')

router.get('/', getCoupon)
router.get('/:id', getCouponById)
router.post('/', postCoupon)
router.patch('/:id', updateProduct)
router.delete('/:id', deleteCoupon)

module.exports = router
