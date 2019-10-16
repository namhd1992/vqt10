const express = require('express');
const app = express();
const port = process.env.PORT || 3005;
const path = require('path');
const fs = require('fs')


  // <meta name="og-url" property="og:url" content="https://splay.vn" />
	// <meta name="og-type" property="og:type" content="Game" />
	// <meta name="og-title" property="og:title" content="Cổng game SPLAY - VTC Mobile" />
	// <meta name="og-description" property="og:description" content="Tổng hợp các game HOT nhất trên thị trường & đa nền tảng." />
	// <meta name="og-image" property="og:image" content="https://splay.vn/logo_demo.png" />;

app.get('/', function(request, response) {
  const filePath = path.resolve(__dirname, './build', 'index.html');
  fs.readFile(filePath, 'utf8', function (err,data) {
    if (err) {
      return console.log(err);
    }
    data = data.replace(/\$OG_URL/g, 'https://vongquayt8.splay.vn/');
    data = data.replace(/\$OG_TYPE/g, "Game");
    data = data.replace(/\$OG_TITLE/g, 'Vòng quay Tháng 8 - Rinh xe Honda Airblade cùng Scoin');
    data = data.replace(/\$OG_DESCRIPTION/g, "Sk diễn ra từ 19/08/2019 đến 25/08/2019 dành cho tất cả khách hàng có sử dụng thẻ Scoin để nạp và tiêu dùng ingame.");
    result = data.replace(/\$OG_IMAGE/g, 'https://i.postimg.cc/SsGBL0MR/image-2019-08-08-T09-04-12-114-Z.png');
    response.send(result);
  });
});

app.get('/auction', function(request, response) {
  
  const filePath = path.resolve(__dirname, './build', 'index.html')
  fs.readFile(filePath, 'utf8', function (err,data) {
    if (err) {
      return console.log(err);
    }
    data = data.replace(/\$OG_URL/g, 'https://splay.vn');
    data = data.replace(/\$OG_TYPE/g, "Game");
    data = data.replace(/\$OG_TITLE/g, 'Cổng game SPLAY - VTC Mobile');
    data = data.replace(/\$OG_DESCRIPTION/g, "Tổng hợp các game HOT nhất trên thị trường & đa nền tảng.");
    result = data.replace(/\$OG_IMAGE/g, 'https://splay.vn/logo_demo.png');
    response.send(result);
  });
});
app.get('/auctiondetail/:id', function(request, response) {
  
  const filePath = path.resolve(__dirname, './build', 'index.html')
  fs.readFile(filePath, 'utf8', function (err,data) {
    if (err) {
      return console.log(err);
    }
    data = data.replace(/\$OG_URL/g, 'https://splay.vn');
    data = data.replace(/\$OG_TYPE/g, "Game");
    data = data.replace(/\$OG_TITLE/g, 'Cổng game SPLAY - VTC Mobile');
    data = data.replace(/\$OG_DESCRIPTION/g, "Tổng hợp các game HOT nhất trên thị trường & đa nền tảng.");
    result = data.replace(/\$OG_IMAGE/g, 'https://splay.vn/logo_demo.png');
    response.send(result);
  });
});
app.get('/lucky', function(request, response) {
  
  const filePath = path.resolve(__dirname, './build', 'index.html')
  fs.readFile(filePath, 'utf8', function (err,data) {
    if (err) {
      return console.log(err);
    }
    data = data.replace(/\$OG_URL/g, 'https://splay.vn');
  data = data.replace(/\$OG_TYPE/g, "Game");
  data = data.replace(/\$OG_TITLE/g, 'Cổng game SPLAY - VTC Mobile');
  data = data.replace(/\$OG_DESCRIPTION/g, "Tổng hợp các game HOT nhất trên thị trường & đa nền tảng.");
  result = data.replace(/\$OG_IMAGE/g, 'https://splay.vn/logo_demo.png');
    response.send(result);
  });
});
app.get('/mission', function(request, response) {
  
  const filePath = path.resolve(__dirname, './build', 'index.html')
  fs.readFile(filePath, 'utf8', function (err,data) {
    if (err) {
      return console.log(err);
    }
    data = data.replace(/\$OG_URL/g, 'https://splay.vn');
    data = data.replace(/\$OG_TYPE/g, "Game");
    data = data.replace(/\$OG_TITLE/g, 'Cổng game SPLAY - VTC Mobile');
    data = data.replace(/\$OG_DESCRIPTION/g, "Tổng hợp các game HOT nhất trên thị trường & đa nền tảng.");
    result = data.replace(/\$OG_IMAGE/g, 'https://splay.vn/logo_demo.png');
    response.send(result);
  });
});

app.get('/checkin', function(request, response) {
  
  const filePath = path.resolve(__dirname, './build', 'index.html')
  fs.readFile(filePath, 'utf8', function (err,data) {
    if (err) {
      return console.log(err);
    }
    data = data.replace(/\$OG_URL/g, 'https://splay.vn');
    data = data.replace(/\$OG_TYPE/g, "Game");
    data = data.replace(/\$OG_TITLE/g, 'Cổng game SPLAY - VTC Mobile');
    data = data.replace(/\$OG_DESCRIPTION/g, "Tổng hợp các game HOT nhất trên thị trường & đa nền tảng.");
    result = data.replace(/\$OG_IMAGE/g, 'https://splay.vn/logo_demo.png');
    response.send(result);
  });
});
app.get('/luckydetail/:id', function(request, response) {
  
  const filePath = path.resolve(__dirname, './build', 'index.html')
  fs.readFile(filePath, 'utf8', function (err,data) {
    if (err) {
      return console.log(err);
    }
    data = data.replace(/\$OG_URL/g, 'https://splay.vn');
    data = data.replace(/\$OG_TYPE/g, "Game");
    data = data.replace(/\$OG_TITLE/g, 'Cổng game SPLAY - VTC Mobile');
    data = data.replace(/\$OG_DESCRIPTION/g, "Tổng hợp các game HOT nhất trên thị trường & đa nền tảng.");
    result = data.replace(/\$OG_IMAGE/g, 'https://splay.vn/logo_demo.png');
    response.send(result);
  });
});
app.get('/luckybuyturn', function(request, response) {
  
  const filePath = path.resolve(__dirname, './build', 'index.html')
  fs.readFile(filePath, 'utf8', function (err,data) {
    if (err) {
      return console.log(err);
    }
    data = data.replace(/\$OG_URL/g, 'https://splay.vn');
    data = data.replace(/\$OG_TYPE/g, "Game");
    data = data.replace(/\$OG_TITLE/g, 'Cổng game SPLAY - VTC Mobile');
    data = data.replace(/\$OG_DESCRIPTION/g, "Tổng hợp các game HOT nhất trên thị trường & đa nền tảng.");
    result = data.replace(/\$OG_IMAGE/g, 'https://splay.vn/logo_demo.png');
    response.send(result);
  });
});
app.get('/luckyitembonus', function(request, response) {
  
  const filePath = path.resolve(__dirname, './build', 'index.html')
  fs.readFile(filePath, 'utf8', function (err,data) {
    if (err) {
      return console.log(err);
    }
    data = data.replace(/\$OG_URL/g, 'https://splay.vn');
    data = data.replace(/\$OG_TYPE/g, "Game");
    data = data.replace(/\$OG_TITLE/g, 'Cổng game SPLAY - VTC Mobile');
    data = data.replace(/\$OG_DESCRIPTION/g, "Tổng hợp các game HOT nhất trên thị trường & đa nền tảng.");
    result = data.replace(/\$OG_IMAGE/g, 'https://splay.vn/logo_demo.png');
    response.send(result);
  });
});

app.use(express.static(path.resolve(__dirname, './build')));

app.get('*', function(request, response) {
  const filePath = path.resolve(__dirname, './build', 'index.html');
  response.sendFile(filePath);
});

app.listen(port, () => console.log(`Listening on port ${port}`));