export default async function ({ app, redirect, $auth }) {
  try {
    const user = await app.$cookies.get('auth.admin')
    console.log('user: ', user)
    if (user) {
      if (user.email === 'hadher@gmail.com') {
        return redirect('/auth/signup')
      }
    }
  } catch (error) {
    console.log(error)
  }
}
