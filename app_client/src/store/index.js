import Vue from 'vue'
import Vuex from 'vuex'
import VueResource from 'vue-resource'

import getters from './getters'
import actions from './actions'
import mutations from './mutations'

Vue.use(Vuex)
Vue.use(VueResource)

export const store = new Vuex.Store({
  state: {
    usuario: null,
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
    benefactores: [
      {
        nombre: 'Benefactor Uno',
        cedula: '0927104555',
        email: 'benefactor_1@gmail.com',
        estado: 'activo',
        gestor: 'Fernando Icaza'
      },
      {
        nombre: 'Benefactor Dos',
        cedula: '0927104666',
        email: 'benefactor_2@gmail.com',
        estado: 'activo',
        gestor: 'Fernando Icaza'
      },
      {
        nombre: 'Benefactor Tres',
        cedula: '0927104999',
        email: 'benefactor_3@gmail.com',
        estado: 'activo',
        gestor: 'Mario Montalván'
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
