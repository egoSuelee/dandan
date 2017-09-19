
Date.prototype.Format = function (fmt) { 
 var o = {
 	"M+": this.getMonth() + 1, //月份 
	"d+": this.getDate(), //日 
	"h+": this.getHours(), //小时 
	"m+": this.getMinutes(), //分 
	"s+": this.getSeconds(), //秒 
	"q+": Math.floor((this.getMonth() + 3) / 3), //季度 
	"S": this.getMilliseconds() //毫秒 
 };
 if (/(y+)/.test(fmt)) fmt = fmt.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
 for (var k in o)
 if (new RegExp("(" + k + ")").test(fmt)) fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
 return fmt;
}

/**
 * 保存小数点后两位
 */
export const toDecimal = (value) => {
	if (!value) return;
	if (typeof value === 'string') {
		floatV = parseFloat(value);
		return floatV
	}
}

/*
*	时间辅助函数
*/

export const getToday = (formatString) => {
	let date = new Date();
	if (formatString) {
		return date.Format(formatString);
	} 
	return date;
}

export const getTomorrow = (formatString) => {
	let now = new Date();
	let tomorrow = new Date();
	tomorrow.setTime(now.getTime()+24*60*60*1000);
	if (formatString) {
		return tomorrow.Format(formatString);
	}
	return tomorrow.toLocaleTimeString();
}

