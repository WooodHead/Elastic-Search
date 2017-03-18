(function () {
  'use strict';

  const elasticsearch = require('elasticsearch');
  const esClient = new elasticsearch.Client({
    host: '127.0.0.1:9200',
    log: 'error'
  });

  var res;
  const search = function search(index, body) {
    return esClient.search({index: index, body: body});
  };
  const test = function test(page,limit,callback) {
    let body = {
      size: limit,
      from: (page-1)*limit,
      query: {
        bool: {
          must: [
            {
              //elclosing_hr<=now ... and > mn or equal 12AM
              range: {
                closing_hr: {
                  gte: "12:00:00 AM",
                  lte: "now"
                }
              }
            },
            {
              range: {
                opening_hr: {
                  gte: "8:00:00 AM",
                  lte: "now"
                }
              }
            }
          ]
        }
      }
    };
    search('library', body)
    .then(results => {
      
      if (results.hits.total > 0)
        console.log(results.hits.total);
        return callback(results.hits.hits);
    })
    .catch(console.error);
    
  };

  module.exports.res=res;
  module.exports.test = test;
  module.exports.search = search;
  

} ());
