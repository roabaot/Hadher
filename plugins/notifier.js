export default ({ app, store }, inject) => {
  inject('notifier', {
    showMessage ({ message = '', color = '' }) {
      console.log('the msg: ', message)
      store.commit('triggerSnackbar', { message, color })
    }
  })
}
