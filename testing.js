'use strict'

const autocannon = require('autocannon')

const instance = autocannon({
//   url: 'http://localhost:3004/get/embeddedData?page=1&limit=10',
url:"http://localhost:3004/get/aggregateData?page=1&limit=10",
  connections: 10, //default
    // pipelining: 1, // default
    duration: 20 // default
}, (err, result) => handleResults(result))
// results passed to the callback are the same as those emitted from the done events
instance.on('done', handleResults)

instance.on('tick', () => console.log('ticking'))

instance.on('response', handleResponse)

function handleResponse (client, statusCode, resBytes, responseTime) {
  console.log(`Got response with code ${statusCode} in ${responseTime} milliseconds`)
}

function handleResults(result) {
    console.log(result,'Result')
}