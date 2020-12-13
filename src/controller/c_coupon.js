const {
  getCouponModel,
  postCouponModel,
  updateCouponModel,
  getCouponByIdModel,
  deleteCouponModel
} = require('../model/m_coupon')
const helper = require('../helper/response')

module.exports = {
  getCoupon: async (req, res) => {
    try {
      const result = await getCouponModel()
      console.log(result)
    } catch (error) {
      return helper.response(res, 404, 'Bad Request', error)
    }
  },
  postCoupon: async (req, res) => {
    try {
      const {
        cupon_name,
        cupon_discount,
        cupon_description,
        cupon_status
      } = req.body

      const setData = {
        cupon_name,
        cupon_discount,
        cupon_description,
        cupon_status
      }
      const result = await postCouponModel(setData)
      return helper.response(res, 200, 'Coupon Has Been Created', result)
    } catch (error) {
      return helper.response(res, 404, 'Bad Request', error)
    }
  },
  updateProduct: async (req, res) => {
    try {
      const { id } = req.params
      const {
        cupon_name,
        cupon_discount,
        cupon_description,
        cupon_status
      } = req.body

      const newData = {
        cupon_name,
        cupon_discount,
        cupon_description,
        cupon_updated_at: new Date(),
        cupon_status
      }

      const checkId = await getCouponByIdModel(id)
      if (checkId.length <= 0) {
        return helper.response(res, 404, 'Coupon Not Found')
      } else {
        const result = await updateCouponModel(newData, id)
        return helper.response(res, 200, 'Coupon Has Been Updated', result)
      }
    } catch (error) {
      return helper.response(res, 400, 'Failed Update Coupon', error)
    }
  },
  deleteCoupon: async (req, res) => {
    try {
      const { id } = req.params
      const checkId = await getCouponByIdModel(id)
      console.log(checkId)
      if (checkId.length <= 0) {
        return helper.response(res, 404, 'Coupon Not Found')
      } else {
        const newData = {
          ...checkId[0],
          cupon_status: 0
        }
        await deleteCouponModel(newData, id)
        return helper.response(res, 200, 'Success Delete Data')
      }
    } catch (error) {
      return helper.response(res, 400, 'Failed Delete Coupon', error)
    }
  },
  getCouponById: async (req, res) => {
    try {
      const { id } = req.params
      const result = await getCouponByIdModel(id)
      return helper.response(res, 200, ' Success Get Data Coupon', result)
    } catch (error) {
      return helper.response(res, 404, 'Coupon Not Found', error)
    }
  }
}
