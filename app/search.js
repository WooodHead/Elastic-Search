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
              range: {
                opening_hr: {
                  gte: "08:00:00 AM",
                  lte: "now"
                }
              }
            }
          ]
        }
      }
    };
    //console.log(`retrieving restuarants with a combined bool query (displaying ${body.size} items at a time)...`);
    search('library', body)
    .then(results => {
      //console.log(`found ${results.hits.total} items in ${results.took}ms`);
      if (results.hits.total > 0) //console.log(`returned restuarants names:`);
      //results.hits.hits.forEach((hit, index) => console.log(`\t${body.from + ++index} - ${hit._source.name_en} (score: ${hit._score})`));
      //console.log(results.hits.hits[0]);
      return callback(results.hits.hits);
    })
    .catch(console.error);
    
  };

  //test(function(response){
  //  console.log(response);
  //});
  module.exports.res=res;
  module.exports.test = test;
  module.exports.search = search;
  
  //module.exports = {
  //  search
  //};

} ());
