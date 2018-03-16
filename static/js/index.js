/* global jQuery, axios */

var tableRowPattern = function (number, user) {
  return (
    '<tr>' +
      '<td class="c-table__col">' +
          number +
      '</td>' +
      '<td class="c-table__col">' +
          user.name +
      '</td>' +
      '<td class="c-table__col">' +
          user.age +
      '</td>' +
      '<td class="c-table__col">' +
          '<a data-user-id="' + user.id + '" class="c-btn js-remove-user">' +
              '<span class="o-media-wrapper">' +
                  '<svg title="Remove" class="o-icon" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 374.145 374.145" style="enable-background:new 0 0 374.145 374.145;" xml:space="preserve">' +
                      '<g>' +
                          '<circle cx="108.75" cy="67.982" r="60"/>' +
                          '<path d="M274.715,167.303c-54.826,0-99.43,44.604-99.43,99.429s44.604,99.43,99.43,99.43s99.43-44.604,99.43-99.43 S329.541,167.303,274.715,167.303z M328.809,299.613l-21.213,21.213l-32.881-32.881l-32.881,32.881l-21.213-21.213l32.881-32.881 l-32.881-32.881l21.213-21.213l32.881,32.881l32.881-32.881l21.213,21.213l-32.881,32.881L328.809,299.613z"/>' +
                          '<path d="M108.75,157.982C48.689,157.982,0,206.671,0,266.732h145.285c0-32.364,11.941-61.991,31.647-84.709 C158.281,166.99,134.571,157.982,108.75,157.982z"/>' +
                      '</g>' +
                  '</svg>' +
              '</span>' +
          '</a>' +
      '</td>' +
    '</tr>'
  )
}

jQuery(document).ready(function () {
  var $addUserForm = jQuery('#add-user-form')
  var $usersTable = jQuery('#users-table')
  var $body = jQuery('body')

  function loadUsers () {
    // Show loader
    $body.toggleClass('is-loading')

    // Get users lsit from server
    axios.get('/users')
      .then(function (response) {
        var $usersTableBody = $usersTable
          .find('tbody')

        $usersTableBody.empty()

        // Add fetched users to html
        response.data.forEach(function (user, index) {
          $usersTableBody.append(tableRowPattern(index + 1, user))
        })

        // Hide loader
        $body.toggleClass('is-loading')
      })
      .catch(function () {
        // Hide loader
        $body.toggleClass('is-loading')
      })
  }

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

    // Show loader
    $body.toggleClass('is-loading')

    jQuery('.error-span').remove()

    // Send new user data to server
    axios.post('/users', newUserData)
      .then(function (response) {
        // Hide loader
        $body.toggleClass('is-loading')

        // Clear inputs
        $addUserForm
          .find('input')
          .val('')

        // Load users again
        loadUsers()
      })
      .catch(function (response) {
        var errors = response.response.data
        Object.entries(errors)
          .forEach(function (keyValue) {
            var inputName = keyValue[0]
            var message = keyValue[1]

            jQuery('input[name=' + inputName + ']')
              .after(jQuery('<span/>', {
                html: message,
                'class': 'error-span'
              }))
          })

        // Hide loader
        $body.toggleClass('is-loading')
      })
  })

  // Removing an exsisting user
  $usersTable
    .on('click', '.js-remove-user', function () {
      // get userId to remove
      var userId = jQuery(this).attr('data-user-id')

      // Show loader
      $body.toggleClass('is-loading')

      // Remove user on server
      axios.delete('/users/' + userId)
        .then(function () {
          // Hide loader
          $body.toggleClass('is-loading')

          // Load users again
          loadUsers()
        })
        .catch(function () {
          // Hide loader
          $body.toggleClass('is-loading')
        })
    })

  loadUsers()
})
