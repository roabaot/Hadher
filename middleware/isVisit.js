export default async function ({ app, redirect, $auth }) {
  try {
    const user = await app.$cookies.get('admin')
    console.log('user: ', user)
    if (!user) {
      return redirect('/auth/login')
    }
  } catch (error) {
    console.log(error)
  }
}
