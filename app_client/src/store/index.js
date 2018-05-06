import Vue from 'vue'
import Vuex from 'vuex'

import getters from './getters'
import actions from './actions'
import mutations from './mutations'

Vue.use(Vuex)

export const store = new Vuex.Store({
  state: {
    procariano: {
      imagen: 'https://www.dccomics.com/sites/default/files/GalleryComics_1920x1080_20151216_SM_AM_AL_2_56567f3794d3e1.43316572.jpg',
      nombres: 'Edison André',
      apellidos: 'Mora Cazar',
      fechaNacimiento: '1995-06-27',
      cedula: '0927102848',
      genero: 'masculino',
      email: 'edanmora@espol.edu.ec',
      celular: '0992556793',
      convencional: '042348515',
      colegio: 'Liceo Panamericano',
      universidad: 'Espol',
      direccion: 'Cdla. Coviem Mz. 17 V 6',
      trabajo: '',
      tipo: 'Caminante',
      promocion: '',
      fechaOpcion: '2014-06-31',
      grupo: 'Grupo del Chino'
    },
    procarianos: [
      {
        nombres: 'Edison André',
        apellidos: 'Mora Cazar',
        email: 'edanmora@espol.edu.ec',
        tipo: 'Caminante',
        grupo: 'Grupo del Chino'
      },
      {
        nombres: 'Mario',
        apellidos: 'Giler',
        email: 'mario@hotmail.com',
        tipo: 'Caminante',
        grupo: 'Grupo del Chino'
      }
    ],
    grupos: [],
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
      }
    },
    masks: {
      cedula: '##########',
      celular: '(##)#-###-####',
      convencional: '(##)###-####'
    },
    loggedIn: false
  },
  mutations,
  actions,
  getters
})
