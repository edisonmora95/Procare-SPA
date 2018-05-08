import Vue from 'vue'
import Router from 'vue-router'
import AuthGuard from './auth-guard'

import Login from '@/components/Login'
// PROCARIANOS
import IngresarProcariano from '@/components/Procarianos/IngresarProcariano'
import BuscarProcarianos from '@/components/Procarianos/BuscarProcarianos'
import PerfilProcariano from '@/components/Procarianos/PerfilProcariano'
import EditarProcariano from '@/components/Procarianos/EditarProcariano'
// GRUPOS
import CrearGrupo from '@/components/Grupos/CrearGrupo'
import BuscarGrupo from '@/components/Grupos/BuscarGrupo'
import PerfilGrupo from '@/components/Grupos/PerfilGrupo'
import EditarGrupo from '@/components/Grupos/EditarGrupo'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/login',
      name: 'Login',
      component: Login
    },
    {
      path: '/procarianos/',
      name: 'BuscarProcarianos',
      component: BuscarProcarianos,
      beforeEnter: AuthGuard
    },
    {
      path: '/procarianos/nuevo',
      name: 'IngresarProcariano',
      component: IngresarProcariano,
      beforeEnter: AuthGuard
    },
    {
      path: '/procarianos/perfil/:id',
      name: 'PerfilProcariano',
      component: PerfilProcariano,
      beforeEnter: AuthGuard
    },
    {
      path: '/procarianos/perfil/:id/editar',
      name: 'EditarProcariano',
      component: EditarProcariano,
      beforeEnter: AuthGuard
    },
    {
      path: '/grupos/',
      name: 'BuscarGrupo',
      component: BuscarGrupo,
      beforeEnter: AuthGuard
    },
    {
      path: '/grupos/nuevo',
      name: 'CrearGrupo',
      component: CrearGrupo,
      beforeEnter: AuthGuard
    },
    {
      path: '/grupos/:nombre',
      name: 'PerfilGrupo',
      component: PerfilGrupo,
      beforeEnter: AuthGuard
    },
    {
      path: '/grupos/:nombre/editar',
      name: 'EditarGrupo',
      component: EditarGrupo,
      beforeEnter: AuthGuard
    }
  ],
  mode: 'history'
})
