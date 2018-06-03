import Vue from 'vue'
import Vuex from 'vuex'
import VueResource from 'vue-resource'
import moment from 'moment'

import getters from './getters'
import actions from './actions'
import mutations from './mutations'

Vue.use(Vuex)
Vue.use(VueResource)

export const store = new Vuex.Store({
  state: {
    usuario: null,
    procarianos: [],
    grupos: [],
    etapas: [
      {
        id: '0',
        texto: 'Iniciación'
      },
      {
        id: '1',
        texto: 'Primera etapa'
      },
      {
        id: '2',
        texto: 'Segunda etapa'
      },
      {
        id: '3',
        texto: 'Tercera etapa'
      },
      {
        id: '4',
        texto: 'Cuarta etapa'
      },
      {
        id: '5',
        texto: 'Quinta etapa'
      }
    ],
    rules: {
      required: (value) => !!value || 'Este campo es obligatorio',
      email: (value) => {
        // eslint-disable-next-line
        const pattern = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
        return pattern.test(value) || 'Email inválido'
      },
      specialChar: (value) => {
        // eslint-disable-next-line
        const pattern = /^$|^[a-zA-Z0-9áéíóúÁÉÍÓÚ!@#\$%\^\&*\)\(+= ._-]+$/g
        return pattern.test(value) || 'No se permiten caracteres especiales'
      },
      fechaValida: (value) => {
        if (value) {
          let hoy = new Date().toLocaleDateString()
          let mes = hoy.split('/')[0]
          let dia = hoy.split('/')[1]
          let anio = hoy.split('/')[2]
          hoy = anio.concat('-').concat(mes).concat('-').concat(dia)
          return !moment(value).isBefore(hoy) || 'No puede ingresar una fecha pasada'
        } else {
          return true
        }
      }
    },
    masks: {
      cedula: '##########',
      celular: '(##)#-###-####',
      convencional: '(##)###-####'
    },
    loggedIn: false,
    loading: false,
    error: null,
    successMsg: null
  },
  mutations,
  actions,
  getters
})
