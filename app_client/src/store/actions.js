import router from '../router'
export default {
  login ({commit}, payload) {
    // Llamada a la API
    const usuario = {
      nombres: 'Edison André',
      apellidos: 'Mora Cazar',
      imagen: 'https://randomuser.me/api/portraits/men/85.jpg',
      roles: []
    }
    if (payload.usuario === 'animador@hotmail.com') {
      usuario.roles = ['Animador']
    }
    if (payload.usuario === 'director_centro@hotmail.com') {
      usuario.roles = ['Director Centro']
    }
    if (payload.usuario === 'personal@hotmail.com') {
      usuario.roles = ['Personal']
    }
    if (payload.usuario === 'director_formacion@hotmail.com') {
      usuario.roles = ['Director Procare Formación']
    }
    if (payload.usuario === 'animador_personal@hotmail.com') {
      usuario.roles = ['Animador', 'Personal']
    }
    if (payload.usuario === 'animador_director_ejecutivo@hotmail.com') {
      usuario.roles = ['Animador', 'Director Ejecutivo']
    }
    commit('setUsuario', usuario)
    commit('setLoggedIn', true)
    router.push('/')
  },
  logout ({commit}) {
    commit('setUsuario', null)
    commit('setLoggedIn', false)
    router.push('/login')
  }
}
