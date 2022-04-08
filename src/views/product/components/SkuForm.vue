<template>
  <div>

    <!--基本表单-->
    <el-form :model="skuForm" label-width="150px">

      <el-form-item label="spu名称">
        <span>{{ productName }} </span>
      </el-form-item>

      <el-form-item label="sku名称">
        <el-input v-model="skuForm.skuName"/>
      </el-form-item>

      <el-form-item label="商品价格">
        <el-input v-model="skuForm.price"/>
      </el-form-item>

      <el-form-item label="商品重量（千克)">
        <el-input v-model="skuForm.weight"/>
      </el-form-item>

      <el-form-item label="商品规格描述">
        <el-input v-model="skuForm.skuDesc" :rows="5" type="textarea"/>
      </el-form-item>

    </el-form>

    <!--平台属性表单-->
    <el-divider></el-divider>
    <el-form :model="skuForm" :inline="true" label-width="150px" class="demo-form-inline">
      <el-form-item
        v-for="(attrInfo, index) in attrInfoList"
        :key="attrInfo.id"
        :label="attrInfo.propertyKey">

        <el-select
          v-model="skuAttrValueListTemp[index]"
          placeholder="请选择">
          <el-option
            v-for="attrValue in attrInfo.propertyValueList"
            :key="attrValue.id"
            :label="attrValue.propertyValue"
            :value="attrInfo.id+'|'+attrValue.id"/>
        </el-select>
      </el-form-item>
    </el-form>

    <!--销售属性表单-->
    <el-form :model="skuForm" :inline="true" label-width="150px" class="demo-form-inline">
      <el-form-item
        v-for="(saleAttr, index) in saleAttrList"
        :key="saleAttr.salePropertyKeyId"
        :label="saleAttr.salePropertyKeyName">

        <el-select
          v-model="skuSaleAttrValueListTemp[index]"
          placeholder="请选择">
          <el-option
            v-for="spuSaleAttrValue in saleAttr.salePropertyValueList"
            :key="spuSaleAttrValue.id"
            :label="spuSaleAttrValue.salePropertyValueName"
            :value="spuSaleAttrValue.id+'|'+spuSaleAttrValue.salePropertyValueName+'|'+ saleAttr.salePropertyKeyId+'|'+saleAttr.salePropertyKeyName"/>
        </el-select>
      </el-form-item>
    </el-form>

    <!-- 图片列表 -->
    <el-table
      v-loading="skuImageListLoading"
      ref="skuImageListTable"
      :data="skuImageList"
      element-loading-text="数据正在加载......"
      border
      fit
      highlight-current-row
      @selection-change="handleSelectionChange">
      <el-table-column align="center" label="序号" width="100">
        <template slot-scope="scope">
          {{ scope.$index + 1 }}
        </template>
      </el-table-column>
      <el-table-column label="图片" width="200">
        <template slot-scope="scope">
          <img :src="scope.row.imageUrl" :alt="scope.row.imageName" width="178">
        </template>
      </el-table-column>
      <el-table-column label="图片名称">
        <template slot-scope="scope">
          {{ scope.row.imageName }}
        </template>
      </el-table-column>
      <el-table-column
        type="selection"
        width="55"/>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-tag v-if="scope.row.default" size="mini" type="success">默认</el-tag>
          <el-button v-else type="primary" size="mini" @click="setDefault(scope.row)">设为默认</el-button>
        </template>
      </el-table-column>
    </el-table>

    <!--表单按钮-->
    <el-form :model="skuForm" label-width="150px">
      <!--按钮-->
      <div style="margin-top:22px;">
        <el-button type="primary" size="mini" @click="saveSkuInfo()">保存</el-button>
        <el-button type="default" size="mini" @click="backToSpuList()">返回</el-button>
      </div>
    </el-form>

  </div>
</template>

<script>
import prop from '@/api/baseinfo/prop'
import spu from '@/api/product/spu'
import sku from '@/api/product/sku'

export default {

  props: {
    productName: {
      type: String,
      default: null
    }
  },

  data() {
    return {
      productId: 0,
      category1Id: 0,
      category2Id: 0,
      category3Id: 0,
      brandId: 0,
      // Sku表单数据
      skuForm: {
        id: null,
        productId: null,
        price: null,
        skuName: null,
        weight: null,
        skuDesc: null,
        category3Id: null,
        brandId: null,

        skuPlatformPropertyValueList: [],
        skuSalePropertyValueList: [],
        skuImageList: [],
        skuDefaultImg: null
      },

      // 平台属性列表数据
      attrInfoList: [],
      // 销售属性列表数据
      saleAttrList: [],
      // 图片列表数据
      skuImageList: [],
      // 图片列表多选选中的数据
      multipleSelectionSkuImageList: [],
      skuImageListLoading: false,

      // 当前sku的平台属性：格式：attrId|propertyValueId
      skuAttrValueListTemp: [],
      // 当前sku的销售属性：格式：saleAttrValueId|salePropertyValueName|salePropertyKeyId|salePropertyKeyName
      skuSaleAttrValueListTemp: []
    }
  },

  methods: {

    init(productId, category1Id, category2Id, category3Id, brandId) {
      this.productId = productId
      this.category1Id = category1Id
      this.category2Id = category2Id
      this.category3Id = category3Id
      this.brandId = brandId
      // Sku表单数据
      this.skuForm = {
        id: null,
        productId: null,
        price: null,
        skuName: null,
        weight: null,
        skuDesc: null,
        category3Id: null,

        skuPlatformPropertyValueList: [],
        skuSalePropertyValueList: [],
        skuImageList: [],
        skuDefaultImg: null
      }

      // 获取平台属性列表
      this.getAttrInfoList()
      // 获取销售属性列表
      this.getSaleAttrList(productId)
      // 获取图片列表
      this.getSpuImageList(productId)
    },

    // 获取平台属性列表
    getAttrInfoList() {
      // 查询数据
      prop.getAttrInfoList(this.category1Id, this.category2Id, this.category3Id).then(response => {
        this.attrInfoList = response.data
      })
    },

    // 获取销售属性列表
    getSaleAttrList(productId) {
      // 查询数据
      spu.getSpuSaleAttrList(productId).then(response => {
        this.saleAttrList = response.data
      })
    },

    // 获取图片列表
    getSpuImageList(productId) {
      // 查询数据
      spu.getSpuImageList(productId).then(response => {
        this.skuImageList = response.data
      })
    },

    // 设为默认
    setDefault(row) {
      this.skuImageList.forEach(skuImage => {
        skuImage.default = false
      })
      row.default = true
    },

    // 图片多选的数据
    handleSelectionChange(val) {
      this.multipleSelectionSkuImageList = val
    },

    // 保存Sku
    saveSkuInfo() {
      this.skuForm.category3Id = this.category3Id
      this.skuForm.productId = this.productId
      this.skuForm.brandId = this.brandId

      // 填充平台属性
      this.skuForm.skuPlatformPropertyValueList = []
      this.skuAttrValueListTemp.forEach(skuAttrValueTemp => {
        const arr = skuAttrValueTemp.split('|')
        const skuAttrValue = {
          propertyKeyId: arr[0],
          propertyValueId: arr[1]
        }
        this.skuForm.skuPlatformPropertyValueList.push(skuAttrValue)
      })

      // 填充销售属性
      this.skuForm.skuSalePropertyValueList = []
      this.skuSaleAttrValueListTemp.forEach(skuSaleAttrValueTemp => {
        const arr = skuSaleAttrValueTemp.split('|')
        const skuSaleAttrValue = {
          salePropertyValueId: arr[0],
          salePropertyValueName: arr[1],
          salePropertyKeyId: arr[2],
          salePropertyKeyName: arr[3]
        }
        this.skuForm.skuSalePropertyValueList.push(skuSaleAttrValue)
      })

      // 填充图片列表
      this.skuForm.skuImageList = []
      this.multipleSelectionSkuImageList.forEach(skuImageTemp => {
        const skuImage = {
          productImageId: skuImageTemp.id,
          imageName: skuImageTemp.imageName,
          imageUrl: skuImageTemp.imageUrl,
          isDefault: skuImageTemp.default ? 1 : 0
        }
        this.skuForm.skuImageList.push(skuImage)

        if (skuImageTemp.default) {
          this.skuForm.skuDefaultImg = skuImageTemp.imageUrl
        }
      })

      // console.log(this.skuForm)
      console.log(JSON.stringify(this.skuForm))
      sku.saveSkuInfo(this.skuForm).then(response => {
        // 调用父组件监听函数
        this.$emit('listenOnSave')
      })
    },

    // 返回Spu列表页面
    backToSpuList() {
      this.$emit('listenOnClose')
    }
  }
}
</script>

