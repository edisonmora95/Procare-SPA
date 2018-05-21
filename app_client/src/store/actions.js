import router from '../router'
import Vue from 'vue'

export default {
  login ({commit, dispatch}, payload) {
    commit('setError', null)
    commit('setLoading', true)
    Vue.http.post('/api/login/', payload)
      .then((response) => {
        commit('setLoading', false)
        console.log(response)
        if (response.body.status) {
          Vue.http.headers.common['x-access-token'] = response.body.token
          dispatch('getLoggedUser')
        } else {
          commit('setError', {mensaje: 'Credenciales incorrectas'})
        }
      }, (err) => {
        console.log(err)
        commit('setLoading', false)
        commit('setError', {mensaje: 'Credenciales incorrectas'})
      })
  },
  logout ({commit}) {
    commit('setLoggedIn', true)
    Vue.http.get('/api/login/logout')
      .then((response) => {
        commit('setUsuario', null)
        commit('setLoggedIn', false)
        router.push('/login')
      })
  },
  getLoggedUser ({commit}) {
    commit('setError', null)
    commit('setLoading', true)
    Vue.http.get('/api/login/usuarios')
      .then((response) => {
        commit('setLoading', false)
        console.log(response)
        if (response.body.estado) {
          commit('setUsuario', response.body.datos)
          commit('setLoggedIn', true)
          router.push('/')
        } else {
          commit('setError', response.body)
        }
      }, (err) => {
        console.log(err)
        commit('setLoading', false)
        commit('setError', err)
      })
  },
  getGrupos ({commit}) {
    commit('setError', null)
    commit('setLoading', true)
    Vue.http.get('api/grupos/')
      .then((response) => {
        commit('setLoading', false)
        if (response.body.estado) {
          commit('setGrupos', response.body.datos)
        } else {
          commit('setError', response.body)
        }
      }, (err) => {
        console.log(err)
        commit('setLoading', false)
        commit('setError', err.body)
      })
  },
  ingresarProcariano ({ commit }, payload) {
    commit('setError', null)
    commit('setLoading', true)
    Vue.http.post('/api/procarianos/', payload)
      .then((response) => {
        commit('setLoading', false)
        if (response.body.estado) {
          commit('setSuccessMsg', {mensaje: 'Procariano creado'})
        } else {
          commit('setError', response.body)
        }
      }, (err) => {
        console.log(err)
        commit('setLoading', false)
        commit('setError', err.body)
      })
  }
}
