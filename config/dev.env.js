var merge = require('webpack-merge')
var prodEnv = require('./prod.env')

module.exports = merge(prodEnv, {
  NODE_ENV: '"development"',
  // API_ROOT: '"https://bird.ioliu.cn/v1?url=http://lufawj.iask.in:1237"'
  // API_ROOT: '"https://bird.ioliu.cn/v1?url=http://zhaoqiuyang.xicp.net:26338"'
  API_ROOT: '"https://bird.ioliu.cn/v1?url=http://www.jclingshou.com:50174"'
})
