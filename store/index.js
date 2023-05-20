/* eslint-disable no-prototype-builtins */
export const state = () => ({
  snackbar: {
    message: '',
    color: ''
  }
})

export const mutations = {
  triggerSnackbar (state, payload) {
    state.snackbar.message = payload.message
    state.snackbar.color = payload.color
  }
}

export const actions = {

}

export const getters = {
  snackbar (state) {
    return state.snackbar
  }
}
