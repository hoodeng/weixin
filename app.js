App({
  onLaunch: function (options) {
  },

  globalData: {
  },

  orderObject : {
//     orderCctName	String(16)	是	订单联系人姓名
// orderCctMobile	String(32)	是	订单联系人手机号码
// topCatId	Integer	是	服务类目ID
// svrId	Integer	是	服务类型ID
// cstName	String(32)	是	客户信息 – 姓名
// cstMobile	String(32)	是	客户信息 – 手机号码
// cstAddrProvCode	String(16)	是	客户信息 – 地址 –省份code
// cstAddrCityCode	String(16)	是	客户信息 – 地址 –城市code
// cstAddrAreaCode	String(16)	是	客户信息 – 地址 –区 / 县code
// cstAddrDistrict	String(64)	是	客户信息 – 地址 –街道信息
// bldLift	Integer	否	客户信息 –是否有电梯，1：是，0：否
// bldFloor	String(8)	否	客户信息 –楼层（无电梯时需要填入）
// verify	Integer	否	客户信息 –是否需要核销，1：是，0：否
// exprStatus	Integer	否	物流信息 –物流是否到达，1：是，0：否
// exprComId	Integer	否	物流信息 –物流公司ID
// exprOrderNo	String(32)	否	物流信息 –物流运单号
// pkCctName	String(16)	否	取货信息- 取货联系人姓名
// pkCctMobile	String(32)	否	取货信息- 取货联系人手机号码
// pkAddrProvCode	String(16)	否	取货信息–取货地址 –省份code
// pkAddrCityCode	String(16)	否	取货信息–取货地址 –城市code
// pkAddrAreaCode	String(16)	否	取货信息–取货地址 –区 / 县code
// pkAddrDistrict	String(64)	否	取货信息–取货 地址 –街道信息
// preFrPay	Intege String(64)r	否	取货信息–是否代付运费，1：是，0：否
// pkgNum	Integer	否	取货信息–包裹件数
// specialReq	String(1024)	否	特殊需要备注
// Items	List< OrderItem > 是

//OrderItem 对象数据
//     subCatId	Integer	是	
// leafCatId	Integer	否	
// img	String(256)	否	
// itemNum	Integer	是	
// model	String(32)	是	
// width	Integer	否	
// height	Integer	否	
// length	Integer	否	
// weight	Float	否	
// req	String(256)	否	

  }
})