// Mock.mock(rurl, template)
Mock.mock("baidu.com", {
	"code":4000,
	"msg":"成功",
	"data|10":[
		{
			"id|10" : 1,
			"d1|1" : ["张阳","张三","呵呵哒","萌萌哒"],
			"d2|1":["医院1","医院2","医院3","医院4"],
			"type|1":["开通","没开通"],
			"quanzhi|50-100":100,
			"time":Random.datetime('yyyy/M/d H:m')
		}
	]
})