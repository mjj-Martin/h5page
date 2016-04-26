var Mock = require('mockjs')

module.exports = function(app){

	app.get('/app',function(req,res){
		var data = Mock.mock({
			'data|3':[
				{
					'number1|1-100.1-10': 1,
				     "string|1-10": "★"
				}
			]
		})
	    res.json(data);
	})

	app.post('/api',function(req,res){

	})
}