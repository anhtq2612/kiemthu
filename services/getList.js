// import request from '../utils/request'
import * as request from '../utils/request'

const GET_LIST_PRODUCT = 'api/v2/menu'

export const ListApiServices = {
  getListProduct: (params) => {
    const res = request.GET(GET_LIST_PRODUCT, { params })
    return res
  },
}
