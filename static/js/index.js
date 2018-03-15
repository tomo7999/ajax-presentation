/* global jQuery, axios */

jQuery(document).ready(function () {
  var $addUserForm = jQuery('#add-user-form')

  // Load users
  axios.get('/users')
    .then(function () {
      console.log('success')
    })
    .catch(function () {
      console.log('fail')
    })

  // Add user
  $addUserForm.on('submit', function (event) {
    event.preventDefault()

    // Gather form data as JSON object
    var newUserData = $addUserForm
      .serializeArray()
      .reduce(function (result, valueAndKey) {
        result[valueAndKey.name] = valueAndKey.value
        return result
      }, {})

    // Send new user data to server
    axios.post('/users', newUserData)
      .then(function () {
        // Add row to table
      })
  })
})
