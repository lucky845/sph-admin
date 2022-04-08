import request from '@/utils/request'

export default {

  getPageList(page, limit) {
    return request({
      url: `/product/querySkuInfoByPage/${page}/${limit}`,
      method: 'get'
    })
  },

  // 保存Sku
  saveSkuInfo(skuForm) {
    return request({
      url: '/product/saveSkuInfo',
      method: 'post',
      data: skuForm
    })
  },

  // 商品上架
  onSale(skuId) {
    return request({
      url: `/product/onSale/${skuId}`,
      method: 'get'
    })
  },

  // 商品下架
  cancelSale(skuId) {
    return request({
      url: `/product/offSale/${skuId}`,
      method: 'get'
    })
  }
}
