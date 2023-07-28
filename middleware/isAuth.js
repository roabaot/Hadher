export default async function ({ app, redirect }) {
  try {
    const isAuth = await app.$cookies.get('isAuth')
    console.log(isAuth)
    if (isAuth) {
      return redirect('/')
    } else {
      return redirect('/auth/login')
    }
  } catch (error) {
    console.log(error)
  }
}
