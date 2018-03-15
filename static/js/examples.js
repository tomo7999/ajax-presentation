/* global fetch, axios, jQuery */

// GET request examples

// Old native way, should work on all browsers

// Sync way [DO NOT USE THIS!!!]
function syncXmlGet () {
  var request = new window.XMLHttpRequest()

  // Set up the connection
  request.open('GET', '/users', false) // false set the request as sync

  // Add custom header
  request.setRequestHeader('Custom-header', 'With custom value')

  // Send the request
  request.send(null)

  // Get data from 'XMLHttpRequest' object
  // -> request.status
  // -> request.responseText
  // etc
}

// Async way [CORRECT APPROACH]
function asyncXmlGet () {
  var request = new window.XMLHttpRequest()

  // Set up the connection
  request.open('GET', '/users')

  // Add custom header
  request.setRequestHeader('Custom-header', 'With custom value')

  // Define on data loading end event
  request.onreadystatechange = function (aEvt) {
    // Get data from 'XMLHttpRequest' object
    // -> request.status
    // -> request.responseText
    // etc
  }

  // Send the request
  request.send(null)
}

// New native way
function asyncFetchGet () {
  fetch('/users', {
    headers: {
      'Custom-header': 'With custom value'
    }
  })
    .then(function (response) {
      // If we expect response body to be JSON use
      // ]=> response.json()
      // otherwise
      // ]=> response.text()
    })
    .catch(function (response) {
      // On error
    })
}

// With axios lib
function asyncAxiosGet () {
  axios.get('/users', {
    headers: {
      'Custom-header': 'With custom value'
    }
  })
    .then(function (response) {
      // To read response body use
      // ]=> response.data
    })
    .catch(function (response) {
      // On error
    })
}

// With jQuery lib
function asyncJQueryGet () {
  jQuery.get('/users', function (data) {
    // data contains response data
  })
  .fail(function () {
    // On error
  })
}

syncXmlGet()
asyncXmlGet()
asyncFetchGet()
asyncAxiosGet()
asyncJQueryGet()
