import request from '@/utils/request'

export default {

  // 查找一级分类
  getCategory1() {
    return request({
      url: '/product/getCategory1',
      method: 'get'
    })
  },

  // 查找二级分类
  getCategory2(category1Id) {
    return request({
      url: '/product/getCategory2/' + category1Id,
      method: 'get'
    })
  },

  // 查找三级分类
  getCategory3(category2Id) {
    return request({
      url: '/product/getCategory3/' + category2Id,
      method: 'get'
    })
  },

  // 查找品牌
  getTrademarkList() {
    return request({
      url: '/product/brand/getAllBrand',
      method: 'get'
    })
  },

  // 根据分类id获取属性列表
  getAttrInfoList(category1Id, category2Id, category3Id) {
    return request({
      url: '/product/getPlatformPropertyByCategoryId/' + category1Id + '/' + category2Id + '/' + category3Id,
      method: 'get'
    })
  },

  // 根据属性id获取属性值列表
  getAttrValueList(propertyKeyId) {
    return request({
      url: '/product/getPropertyValueByPropertyKeyId/' + propertyKeyId,
      method: 'get'
    })
  },

  // 保存属性
  saveAttrInfo(attrForm) {
    return request({
      url: '/product/savePlatformProperty',
      method: 'post',
      data: attrForm
    })
  }
}
