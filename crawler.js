const https = require('https'),
  http = require('http'),
  cheerio = require('cheerio');

http.createServer((req, sres)=>{

  let items = [];

  https.get('https://cnodejs.org/',(res)=>{

    res.on('data', (chunk) => {

      let $ = cheerio.load(chunk);

      $('#topic_list .topic_title').each((idx, element)=>{

        var $element = $(element);

        items.push({
          title: $element.attr('title'),
          href: $element.attr('href')
        });

      });

    });

    res.on('end',()=>{

      sres.end(JSON.stringify(items))

    })

  })

}).listen(3000, (err) => {
    if (err) {
      throw err
    }
    // console.log('Server listening on port 3000...');
})
