var http = require('http')
var fs = require('fs')
var url = require('url')
var port = process.argv[2]

if (!port) {
    console.log('请指定端口号')
    process.exit(1)
}

var server = http.createServer(function (request, response) {
    var parsedUrl = url.parse(request.url, true)
    var pathWithQuery = request.url
    var queryString = ''
    if (pathWithQuery.indexOf('?') >= 0) {
        queryString = pathWithQuery.substring(pathWithQuery.indexOf('?'))
    }
    var path = parsedUrl.pathname
    var query = parsedUrl.query
    var method = request.method

    /******** 从这里开始看，上面不要看 ************/

    console.log('发请求过来啦！路径（带查询参数）为：' + pathWithQuery)


    response.statusCode = 200
    response.setHeader('Content-Type', 'text/html;charset=utf-8')
    // 默认首页
    const filePath = path === `/` ? `./public/index.html` : path
    const index = path.indexOf(`.`)
    const suffix = filePath.substring(index) //如果省略 indexEnd，substring 提取字符一直到字符串末尾。
    const fileTypes = {
        '.html':'text/html',
        '.css':'text/css',
        '.js':'text/javascript',
        '.png':'image/png',
        '.jpg':'image/jpeg',
        '.json':'text/json'
    }
    response.setHeader(`content-Type`,`${fileTypes[suffix] || `text/html`};charset=utf-8`)
    let content
    try{
        content = fs.readFileSync(`./public${filePath}`)  // 根据请求拼接路径
    }catch (error){
        content = `文件不存在`
        response.statusCode = 400
    }
    response.write(content)
    response.end()


        /******** 代码结束，下面不要看 ************/
    }
)
    server.listen(port)
    console.log('监听 ' + port + ' 成功\n打开 http://localhost:' + port)

