import Echo from 'laravel-echo'

<% if (options.broadcaster === 'pusher') { %>
window.Pusher = require('pusher-js')
<% } else if (options.broadcaster === 'socket.io') { %>
window.io = require('socket.io-client')
<% } %>

function getHeaders ({ app }) {
  const headers = {}

  <% if (options.authModule) { %>

    const token = app.store.getters['auth/token'];

    if (token) {
      headers['Authorization'] = `Bearer ${token}`;
    }
    return headers
  <% } %>

  return headers
}

export default (ctx, inject) => {
  const options = <%= serialize(options) %>
  options.auth = options.auth || {}
  options.auth.headers = {
    ...options.auth.headers,
    ...getHeaders(ctx)
  }

  const echo = new Echo(options)

  ctx.$echo = echo
  inject('echo', echo)
}
