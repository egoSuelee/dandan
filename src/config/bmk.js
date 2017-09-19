(function(doc, win) {
    var docEl = doc.documentElement,
        loadbmk = function() {
            var bmkApi = document.createElement("script");
			bmkApi.type = 'text/javascript';
			bmkApi.async = true;
			bmkApi.charset = 'utf-8';
			bmkApi.src = 'http://api.map.baidu.com/getscript?v=2.0&ak=84A50KgjGf7KsAtgNpVxBQkddhkYfB5K&services=&t=';
			root_s.parentNode.insertBefore(bmkApi, root_s);
        };
    if (!doc.addEventListener) return;
    doc.addEventListener('DOMContentLoaded', loadbmk, false);
})(document, window);