import request from '@/utils/request'

const api_name = '/product'

export default {

  getPageList(page, limit, category3Id) {
    return request({
      url: `${api_name}/queryProductSpuByPage/${page}/${limit}/${category3Id}`,
      method: 'get',
    })
  },

  // 根据三级分类id获取属性列表
  getSpuList(category3Id) {
    return request({
      url: '/product/spuList/' + category3Id,
      method: 'get'
    })
  },

  // 保存Spu
  saveSpuInfo(spuForm) {
    return request({
      url: '/product/saveProductSpu',
      method: 'post',
      data: spuForm
    })
  },

  // 获取基本销售属性列表
  getBaseSaleAttrList() {
    return request({
      url: '/product/queryAllSaleProperty',
      method: 'get'
    })
  },

  // 根据spuId获取销售属性列表
  getSpuSaleAttrList(productId) {
    return request({
      url: '/product/querySalePropertyByProductId/' + productId,
      method: 'get'
    })
  },

  // 根据spuId获取图片列表
  getSpuImageList(productId) {
    return request({
      url: '/product/queryProductImageByProductId/' + productId,
      method: 'get'
    })
  }
}
