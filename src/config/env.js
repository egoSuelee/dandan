/*
* 配置一些基础环境变量
* baseUrl: 域名地址
* routerMode: 路由模式
* imgBaseUrl: 图片所在域名地址
*/

let baseUrl; 
let routerMode;
// const imgBaseUrl = 'http://lufawj.iask.in:1237/Simple_onlineManger/images/Goods/';

const imgBaseUrl = 'http://www.jclingshou.com:50174/Simple_onlineManger/images/Goods/';
const adImgBaseUrl = "http://www.jclingshou.com:50174/Simple_onlineManger/images/Advertisement/"

if (process.env.NODE_ENV == 'development') {
	baseUrl = '';
	routerMode = 'hash'
}else{
	baseUrl = '';
	routerMode = 'hash'
}

export {
	baseUrl,
	routerMode,
	imgBaseUrl,
	adImgBaseUrl
}








