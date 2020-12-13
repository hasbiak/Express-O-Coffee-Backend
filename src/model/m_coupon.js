const connection = require('../config/mysql')

module.exports = {
  getCouponModel: () => {
    return new Promise((resolve, reject) => {
      connection.query('SELECT * FROM coupon', (error, result) => {
        !error ? resolve(result) : reject(new Error(error))``
      })
    })
  },
  postCouponModel: (setData) => {
    return new Promise((resolve, reject) => {
      connection.query('INSERT INTO coupon SET ?', setData, (error, result) => {
        if (!error) {
          const newData = {
            coupon_id: result.insertId,
            ...setData
          }
          resolve(newData)
        } else {
          reject(new Error(error))
        }
      })
    })
  },
  getCouponByIdModel: (id) => {
    return new Promise((resolve, reject) => {
      connection.query(
        'SELECT * FROM coupon WHERE coupon_id = ?',
        id,
        (error, result) => {
          !error ? resolve(result) : reject(new Error(error))
        }
      )
    })
  },
  updateCouponModel: (newData, id) => {
    return new Promise((resolve, reject) => {
      connection.query(
        'UPDATE coupon SET ? WHERE coupon_id = ?',
        [newData, id],
        (error, result) => {
          if (!error) {
            const updateData = {
              coupon_id: id,
              ...newData
            }
            resolve(updateData)
          } else {
            console.log(error)
            reject(new Error(error))
          }
        }
      )
    })
  },
  deleteCouponModel: (newData, id) => {
    return new Promise((resolve, reject) => {
      connection.query(
        'UPDATE coupon SET ? WHERE coupon_id = ?',
        [newData, id],
        (error, result) => {
          !error ? resolve(result) : reject(new Error(error))
        }
      )
    })
  }
}
