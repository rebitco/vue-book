let http = require('http');
let fs = require('fs');
let url = require('url');

//获取轮播图
let sliders = require('./sliders.js');
let pageSize = 5; //每页5条

//读取数据
function read(cb) {
  fs.readFile('./book.json', 'utf8', function (error, data) {
    if(error || data.length === 0){
      cb([]); //如果请求出错, 或者没数据, 则返回空数组
    } else {
      cb(JSON.parse(data));
    };
  });
};

//写入数据
function write(data, cb) {
  //@params path, data, options, cb
  fs.writeFile('./book.json', JSON.stringify(data), cb);
};

http.createServer((req, res) => {
  //nodejs请求头设置
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type,Content-Length, Authorization, Accept,X-Requested-With");
  res.setHeader("Access-Control-Allow-Methods","PUT,POST,GET,DELETE,OPTIONS");
  res.setHeader("X-Powered-By",' 3.2.1');
  if(req.method=="OPTIONS") return res.end();/*让options请求快速返回*/

  let {pathname, query} = url.parse(req.url, true); //params1: 要解析的 URL 字符串; params2: 如果为 true，则 query 属性总会通过 querystring(查询的条件) 模块的 parse() 方法生成一个对象。 如果为 false，则返回的 URL 对象上的 query 属性会是一个未解析、未解码的字符串
  if(pathname === '/sliders') {
    res.setHeader('content-Type', 'application/json;charset=utf-8');
    return res.end(JSON.stringify(sliders));
  };

  if(pathname === '/hot') {
    res.setHeader('content-Type', 'application/json;charset=utf-8');
    read(function (books) {
      let hot = books.reverse().slice(0, 6);
      setTimeout(() =>{ //模拟5秒请求数据
        res.end(JSON.stringify(hot));
      }, 3000);
    });
    return
  };

  //分页
  if(pathname === '/page') {
    let offset = parseInt(query.offset) || 0;
    read(function (books) {
      //每次偏移量在原来的基础上增加一页
      let result = books.reverse().slice(offset, offset+pageSize);
      let hasMore = true; //是否有更多数据
      if(books.length <= offset+pageSize) {
        hasMore = false;
      };
      //把数据返回去
      res.setHeader('content-Type', 'application/json;charset=utf-8');
      setTimeout(() =>{ //模拟5秒请求数据
        res.end(JSON.stringify({ hasMore, books: result }));
      }, 1500);
    });
  };

  if(pathname === '/book') { //对书增删改查
    let id = parseInt(query.id); //query 属性总会通过 querystring(查询的条件, 比如http://xxx.com/getdata?id=1, 那么会返回{id: 1}) 模块的 parse() 方法生成一个对象
    switch (req.method) {
      case 'GET':
        if(id) {
          //查一本
          read(function (books) {
            let book = books.find(item => item.bookId === id);
            if(!book) book = {};
            res.setHeader('content-Type', 'application/json;charset=utf-8');
            res.end(JSON.stringify(book));
          });

        } else {
          //查所有
          res.setHeader('content-Type', 'application/json;charset=utf-8');
          read(function (books) {
            res.end(JSON.stringify(books.reverse()));
          });
          return
        }
        break;
      case 'POST':
        //1. 首先接收前台发回来的数据
        let temp = '';//注意, 这是全局变量
        req.on('data', chunk => {
          temp += chunk;
        });
        req.on('end', () => {
          let book = JSON.parse(temp);
          //2. 读取历史数据
          read(function (books) {
            book.bookId = books.length == 0 ? 1 : books[books.length - 1].bookId + 1; //如果没数据就取1, 否则取历史的最后一条+1
            //3. 将新增的书放进books
            books.push(book);
            //4. 写进数据库
            write(books, function () {
              res.end(JSON.stringify(book));
            });
          });
        });

        break;
      case 'PUT':
        if(id) {
          let temp = '';
          req.on('data', chunk => {
            temp += chunk;
          });

          req.on('end', () => {
            let book = JSON.parse(temp); //将接收到的字符串转成json对象
            read(function (books) {
              books = books.map(item => {
                if(item.bookId === id) { //找到相同的那一个
                  return book;
                };

                return item;
              });

              //将书本信息写回book.json中
              write(books, function () {
                res.end(JSON.stringify(book));
              });
            });
          });
        };

        break;
      case 'DELETE':
        read(function (books) {
          books = books.filter(item => item.bookId !== id); //删除后的数据
          write(books, function () {
            //删除后, 重新写入数据
            res.end(JSON.stringify({})); //返回前台一个空对象
          });
        });
        break;
    }
  };
}).listen(3000);//端口3000
