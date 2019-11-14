module.exports = {
  local: {
    VUE_APP_BASE_URL: 'http://dev.hkjindian.com:8900',
    LINKED_MALL_BASE_URL: 'https://pages.tmall.com/wow/wt/act/lm-partner-login?',

    /**
     * 注: 此参数如自己做 urlencode 需要处理 %3D、%2F 为 %3d、%2f 等小写问题.
     * 原地址: https://pre-wormhole.tmall.com/wow/wt/act/qiaofudayuan?wh_biz=tm&env=wapa
     * &env=wapa 表示预发布环境, 去掉此参数则表示正式环境.
     */
    LINKED_MALL_GOTO_URL: 'https%3a%2f%2fpages.tmall.com%2fwow%2fwt%2fact%2fqiaofudayuan%3fwh_biz%3dtm',
    LINKED_MALL_bizId: 'LMALL201910180001',
    LINKED_MALL_bizUid: '17004044917089927'
  },
  dev: {
    VUE_APP_BASE_URL: 'http://dev.hkjindian.com:8900',
    LINKED_MALL_BASE_URL: 'https://pages.tmall.com/wow/wt/act/lm-partner-login?',
    LINKED_MALL_GOTO_URL: 'https%3a%2f%2fpages.tmall.com%2fwow%2fwt%2fact%2fqiaofudayuan%3fwh_biz%3dtm',
    LINKED_MALL_bizId: 'LMALL201910180001',
    LINKED_MALL_bizUid: '17004044917089927'
  },
  sit: {
    VUE_APP_BASE_URL: 'http://dev.hkjindian.com:8900',
    LINKED_MALL_BASE_URL: 'https://pages.tmall.com/wow/wt/act/lm-partner-login?',
    LINKED_MALL_GOTO_URL: 'https%3a%2f%2fpages.tmall.com%2fwow%2fwt%2fact%2fqiaofudayuan%3fwh_biz%3dtm',
    LINKED_MALL_bizId: 'LMALL201910180001',
    LINKED_MALL_bizUid: '17004044917089927'
  },
  prod: {
    VUE_APP_BASE_URL: 'http://dev.hkjindian.com:8900',
    LINKED_MALL_BASE_URL: 'https://pages.tmall.com/wow/wt/act/lm-partner-login?',
    LINKED_MALL_GOTO_URL: 'https%3a%2f%2fpages.tmall.com%2fwow%2fwt%2fact%2fqiaofudayuan%3fwh_biz%3dtm',
    LINKED_MALL_bizId: 'LMALL201910180001',
    LINKED_MALL_bizUid: '17004044917089927'
  }
};
