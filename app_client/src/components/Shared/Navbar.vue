<template>
  <v-toolbar flat>
    <v-list>
      <v-list-tile avatar>
        <v-list-tile-avatar>
          <img v-if="usuario.imagen===''" src="/static/logoProcareHombres.png">
          <img v-else :src="usuario.imagen">
        </v-list-tile-avatar>
        <v-list-tile-content>
          <v-list-tile-title>{{ usuario.nombres }} {{ usuario.apellidos }}</v-list-tile-title>
        </v-list-tile-content>
      </v-list-tile>
      <v-list-tile  router :to="'/'">
        <v-list-tile-title class="pl-3">
          Inicio
        </v-list-tile-title>
      </v-list-tile>
      <v-list-group v-for="item in items" :key="item.id">
        <v-list-tile slot="activator">
          <v-list-tile>{{ item.title }}</v-list-tile>
        </v-list-tile>
        <v-list-group sub-group no-action v-for="sub in item.items" :key="sub.id">
          <v-list-tile slot="activator">
            <v-list-tile-title>{{ sub.title }}</v-list-tile-title>
          </v-list-tile>
          <v-list-tile v-for="menu in sub.items" :key="menu.title" router :to="menu.route">
            <v-list-tile-title>{{ menu.title }}</v-list-tile-title>
          </v-list-tile>
        </v-list-group>
      </v-list-group>
      <v-list-tile  router :to="'/cambiar_contrasena'">
        <v-list-tile-title class="pl-3">
          Cambiar Contraseña
        </v-list-tile-title>
      </v-list-tile>
      <v-list-tile  @click="logout">
        <v-list-tile-title class="pl-3">
          Salir
        </v-list-tile-title>
      </v-list-tile>
    </v-list>
  </v-toolbar>
</template>
<script>
  export default {
    props: {
      'usuario': Object
    },
    mounted () {
      // Armar menú Fundación
      let menuFundacion = null
      let itemsFundacion = this.subMenuFundacion(this.usuario.roles)
      if (itemsFundacion.length > 0) {
        menuFundacion = {
          id: '1',
          title: 'Fundación Procare',
          items: itemsFundacion
        }
      }
      if (menuFundacion) {
        this.items.push(menuFundacion)
      }
      // Armar menú Formación
      let menuFormacion = null
      let itemsFormacion = this.subMenuFormacion(this.usuario.roles)
      if (itemsFormacion.length > 0) {
        menuFormacion = {
          id: '2',
          title: 'Procare Formación',
          items: itemsFormacion
        }
      }
      if (menuFormacion) {
        this.items.push(menuFormacion)
      }
      // Armar menú Acción
      let menuAccion = null
      let itemsAccion = this.subMenuAccion(this.usuario.roles)
      if (itemsAccion.length > 0) {
        menuAccion = {
          id: '3',
          title: 'Procare Acción',
          items: itemsAccion
        }
      }
      if (menuAccion) {
        this.items.push(menuAccion)
      }
    },
    methods: {
      subMenuFundacion (roles) {
        let items = []
        if (roles.includes('Director Ejecutivo')) {
          items.push(
            {
              id: '1-1',
              title: 'Benefactores',
              items: [
                {
                  title: 'Ingresar Benefactor',
                  route: '/benefactores/nuevo'
                },
                {
                  title: 'Buscar Benefactores',
                  route: '/benefactores/'
                }
              ]
            }
          )
        }
        return items
      },
      subMenuFormacion (roles) {
        let items = []
        if (roles.includes('Personal') || roles.includes('Director Ejecutivo')) {
          items.push(
            {
              id: '2-1',
              title: 'Procarianos',
              items: [
                {
                  title: 'Ingresar Procariano',
                  route: '/procarianos/nuevo'
                },
                {
                  title: 'Buscar Procarianos',
                  route: '/procarianos/'
                }
              ]
            },
            {
              id: '2-2',
              title: 'Grupos',
              items: [
                {
                  title: 'Crear Grupo',
                  route: '/grupos/nuevo'
                },
                {
                  title: 'Buscar Grupos',
                  route: '/grupos/'
                }
              ]
            }
          )
        }
        if (roles.includes('Animador')) {
          items.push(
            {
              id: '2-3',
              title: 'Grupo',
              items: [
                {
                  title: 'Mi Grupo',
                  route: '/grupos/grupo_animador'
                }
              ]
            }
          )
        }
        return items
      },
      subMenuAccion (roles) {
        let items = []
        if (roles.includes('Director Centro')) {
          items.push(
            {
              id: '3-1',
              title: 'Niños',
              items: [
                {
                  title: 'Ingresar Niños',
                  route: '/nino_accion/nuevo'
                },
                {
                  title: 'Buscar Niños',
                  route: '/nino_accion/'
                }
              ]
            }
          )
        }
        if (roles.includes('Asesor')) {
          items.push(
            {
              id: '3-1',
              title: 'Niños',
              items: [
                {
                  title: 'Buscar Niños',
                  route: '/nino_accion/'
                }
              ]
            }
          )
        }
        return items
      },
      logout () {
        this.$store.dispatch('logout')
      }
    },
    data () {
      return {
        items: []
      }
    }
  }
</script>