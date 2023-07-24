export default ({ $axios, store, redirect, app }) => {
  $axios.onError((error) => {
    if (error.response === undefined) {
      // Display a flash notification
      // app.notify({
      //   title: 'Network Error: Please refresh and try again.',
      //   type: 'error',
      //   duration: -1
      // })

      throw error
    }

    // Handle other types of errors (e.g., redirect to login on 401 errors)

    throw error
  })
  $axios.onRequest((config) => {
    // if (app.$cookies.get('auth.admin_token')) {
    //   const token = app.$cookies.get('auth.admin_token')
    //   console.log(token)
    //   // config.headers.common.authorization = token.toString().split(' ')[1]
    //   config.headers.common.Authorization = token
    // }
    config.withCredentials = false

    return config
  })

  // auth
  // Signup
  $axios.$signup = (payload) => {
    return $axios.$post('/register', payload)
      .then((response) => {
        return response
      })
  }

  // Login
  $axios.$login = (payload) => {
    return $axios.$post('/login', payload)
      .then((response) => {
        return response
      })
  }
}
