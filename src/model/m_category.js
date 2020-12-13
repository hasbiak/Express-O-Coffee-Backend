const connection = require('../config/mysql')

module.exports = {
  getCategoryModel: () => {
    return new Promise((resolve, reject) => {
      connection.query('SELECT * FROM category', (error, result) => {
        !error ? resolve(result) : reject(new Error(error))
      })
    })
  },
  getCategoryByIdModel: (id) => {
    return new Promise((resolve, reject) => {
      connection.query(
        'SELECT * FROM category WHERE category_id = ?',
        id,
        (error, result) => {
          !error ? resolve(result) : reject(error)
        }
      )
    })
  },
  getCategoryByNameModel: (name) => {
    return new Promise((resolve, reject) => {
      connection.query(
        `SELECT * FROM category WHERE category_name = '${name}'`,
        (error, result) => {
          !error ? resolve(result) : reject(new Error(error))
        }
      )
    })
  },
  postCategoryModel: (setData) => {
    return new Promise((resolve, reject) => {
      connection.query(
        'INSERT INTO category SET ?',
        setData,
        (error, result) => {
          if (!error) {
            const newResult = {
              category_id: result.insertId,
              ...setData
            }
            resolve(newResult)
          } else {
            reject(new Error(error))
          }
        }
      )
    })
  },
  patchCategoryModel: (setData, id) => {
    return new Promise((resolve, reject) => {
      connection.query(
        'UPDATE category SET ? WHERE category_id = ?',
        [setData, id],
        (error, result) => {
          if (!error) {
            const newResult = {
              category_id: id,
              ...setData
            }
            resolve(newResult)
          } else {
            reject(new Error(error))
          }
        }
      )
    })
  },
  deleteCategoryModel: (id) => {
    return new Promise((resolve, reject) => {
      connection.query(
        'DELETE FROM category WHERE category_id = ?',
        id,
        (error, result) => {
          if (!error) {
            const newResult = {
              id: id
            }
            resolve(newResult)
          } else {
            reject(new Error(error))
          }
        }
      )
    })
  }
}
