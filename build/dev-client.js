// 事件触发
const hotClient = require('webpack-hot-middleware/client?noInfo=true&reload=true')

hotClient.subscribe(e => {
	if ('reload' === e.action){
		window.location.reload()
	}
})
