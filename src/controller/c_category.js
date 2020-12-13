const {
  getCategoryModel,
  getCategoryByIdModel,
  getCategoryByNameModel,
  postCategoryModel,
  patchCategoryModel,
  deleteCategoryModel
} = require('../model/m_category')
const helper = require('../helper/response')

module.exports = {
  getCategory: async (request, response) => {
    try {
      const { search } = request.query
      if (search === '' || !search) {
        const result = await getCategoryModel()
        return helper.response(
          response,
          200,
          'Success Get All Category',
          result
        )
      } else {
        const result = await getCategoryByNameModel(search)
        return helper.response(
          response,
          200,
          'Success Get Category Name',
          result
        )
      }
    } catch (error) {
      return helper.response(response, 404, 'Bad Request', error)
    }
  },
  getCategoryByID: async (request, response) => {
    try {
      const { id } = request.params
      const result = await getCategoryByIdModel(id)
      if (result.length > 0) {
        return helper.response(
          response,
          200,
          `Success Get Data By Id ${id}`,
          result
        )
      } else {
        return helper.response(response, 404, `Category By Id: ${id} Not Found`)
      }
    } catch (error) {
      return helper.response(response, 404, 'Bad Request', error)
    }
  },
  postCategory: async (request, response) => {
    if (
      request.body.category_name === undefined ||
      request.body.category_name === null ||
      request.body.category_name === ''
    ) {
      return helper.response(response, 404, 'Category name must be filled')
    } else if (
      request.body.category_status === undefined ||
      request.body.category_status === null ||
      request.body.category_status === ''
    ) {
      return helper.response(response, 404, 'Category status must be filled')
    }
    try {
      const setData = {
        category_name: request.body.category_name,
        category_created_at: new Date(),
        category_updated_at: new Date(),
        category_status: request.body.category_status
      }
      const result = await postCategoryModel(setData)
      return helper.response(response, 200, 'Success Post Category', result)
    } catch (error) {
      return helper.response(response, 404, 'Bad Request', error)
    }
  },
  patchCategory: async (request, response) => {
    if (
      request.body.category_name === undefined ||
      request.body.category_name === null ||
      request.body.category_name === ''
    ) {
      return helper.response(response, 404, 'Category name must be filled')
    } else if (
      request.body.category_status === undefined ||
      request.body.category_status === null ||
      request.body.category_status === ''
    ) {
      return helper.response(response, 404, 'Category status must be filled')
    }
    try {
      const { id } = request.params
      const { category_name, category_status } = request.body
      const setData = {
        category_name,
        category_updated_at: new Date(),
        category_status
      }
      const checkId = await getCategoryByIdModel(id)
      if (checkId.length > 0) {
        const result = await patchCategoryModel(setData, id)
        return helper.response(
          response,
          200,
          'Success Category Updated',
          result
        )
      } else {
        return helper.response(response, 404, `Category By Id: ${id} Not Found`)
      }
    } catch (error) {
      return helper.response(response, 404, 'Bad Request', error)
    }
  },
  deleteCategory: async (request, response) => {
    try {
      const { id } = request.params
      const result = await deleteCategoryModel(id)
      return helper.response(response, 200, 'Success Category Deleted', result)
    } catch (error) {
      return helper.response(response, 404, 'Bad Request', error)
    }
  }
}
