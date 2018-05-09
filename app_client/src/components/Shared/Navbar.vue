<template>
  <v-toolbar flat>
    <v-list>
      <v-list-tile>
        <v-list-tile-title class="title">
          Home
        </v-list-tile-title>
      </v-list-tile>
      <v-list-group v-for="item in items" :key="item.id">
        <v-list-tile slot="activator">
          <v-list-tile-content>
            <v-list-tile>{{ item.title }}</v-list-tile>
          </v-list-tile-content>
        </v-list-tile>
        <v-list-tile v-for="sub in item.items" :key="sub.route" router :to="sub.route">
          <v-list-tile-content>
            <v-list-tile>{{ sub.title }}</v-list-tile>
          </v-list-tile-content>
        </v-list-tile>
      </v-list-group>
    </v-list>
  </v-toolbar>
</template>
<script>
  export default {
    data () {
      return {
        items: [
          {
            id: '1',
            title: 'Procare Formación',
            items: [
              {
                title: 'Ingresar Procariano',
                route: '/procarianos/nuevo'
              },
              {
                title: 'Buscar Procarianos',
                route: '/procarianos/'
              },
              {
                title: 'Crear Grupo',
                route: '/grupos/nuevo'
              },
              {
                title: 'Buscar Grupos',
                route: '/grupos/'
              },
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
        ]
      }
    }
  }
</script>