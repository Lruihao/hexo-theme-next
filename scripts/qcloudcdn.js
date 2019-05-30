const qcloudSDK = require('qcloud-cdn-node-sdk');

qcloudSDK.config({
    secretId: '',
    secretKey: ''
})

qcloudSDK.request('RefreshCdnDir', {
	'dirs.1': 'https://lruihao.cn' 
}, (res) => {
    console.log(res)
})