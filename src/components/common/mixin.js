import {
	getStyle
} from '../../config/mUtils'

import {
	imgBaseUrl,
	adImgBaseUrl
} from '../../config/env'


export const loadMore = {
	directives: {
		'load-more': {
			bind: (el, binding) => {
				let windowHeight = window.screen.height;
				let height;
				let setTop;
				let paddingBottom;
				let marginBottom;
				let requestFram;
				let oldScrollTop;
				let scrollEl;
				let heightEl;
				let scrollType = el.attributes.type && el.attributes.type.value;
				let scrollReduce = 2;
				if (scrollType == 2) {
					scrollEl = el;
					heightEl = el.children[0];
				} else {
					scrollEl = document.body;
					heightEl = el;
				}

				el.addEventListener('touchstart', () => {
					height = heightEl.clientHeight;
					if (scrollType == 2) {
						height = height
					}
					setTop = el.offsetTop;
					paddingBottom = getStyle(el, 'paddingBottom');
					marginBottom = getStyle(el, 'marginBottom');
				}, false)

				el.addEventListener('touchmove', () => {
					loadMore();
				}, false)

				el.addEventListener('touchend', () => {
					oldScrollTop = scrollEl.scrollTop;
					moveEnd();
				}, false)

				const moveEnd = () => {
					requestFram = requestAnimationFrame(() => {
						if (scrollEl.scrollTop != oldScrollTop) {
							oldScrollTop = scrollEl.scrollTop;
							moveEnd()
						} else {
							cancelAnimationFrame(requestFram);
							height = heightEl.clientHeight;
							loadMore();
						}
					})
				}
				const loadMore = () => {
					if (scrollEl.scrollTop + windowHeight >= height + setTop + paddingBottom + marginBottom - scrollReduce) {
						binding.value();
					}
				}
			}
		}
	}
};

export const getImgPath = {
	methods: {
			//传递过来的图片地址需要处理后才能正常使用
			getImgPath(path) {
				if (path) {
					return imgBaseUrl + path
				} else {
					return '/static/dandan_placeholder_img.png'
				}
			},
		}
};

export const getAdImgPath = {
	methods: {
		//传递过来的图片地址需要处理后才能正常使用
			getAdImgPath(path) {
				if (path) {
					return adImgBaseUrl + path
				} else {
					return '/static/dandan_placeholder_img.png'
				}
			},
	}
};
