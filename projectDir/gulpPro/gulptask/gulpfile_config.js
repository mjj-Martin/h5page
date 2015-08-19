module.exports = function (){

	var config = {
		// 开发环境下 静态资源目录
		imgDir : "",
		htmlDir : "",
		jsDir : "",
		cssDir : "",

		// 输出目录
		imgDestDir : "",
		htmlDestDir : "",
		jsDestDir   : "",
		cssDestDir : "",

		// 专题年份地址
		ztDir : "./2015/",
		// 组件库地址
		componentDir : "./component/",

		// 图片压缩设置
		image : {

			// png图片压缩质量,1-7 默认3
            optimizationLevel : 3,

            //图片压缩质量
            quality: '65-80'
		},

		css : {
			// 选择前缀兼容版本号
			browsers : ["last 3 version"]
		},

		http : {

			// 服务器根目录
			root:"./../",
		}

	}

	return config;
}