let url_config = {
	HOST:''
}

if(process.env.NODE_ENV === 'development'){
	url_config.HOST = 'https://www.buzuodesign.com'
}else{
	// 生产环境
	url_config.HOST = 'https://api-applets.yymember.com'
}

export default url_config