<template>
  <v-container fluid fill-height>
    <v-layout align-center justify-center wrap row>
      <v-flex xs12 sm10 md8>
        <v-card>
          <v-card-title primary-title>
            <h1 class="mx-auto display-1">Grupos</h1>
          </v-card-title>
          <v-card-text>
            <v-layout row class="mb-3">
              <v-flex xs6 offset-xs6>
                <v-text-field
                  v-model="dataTable.search"
                  append-icon="search"
                  label="Búsqueda"
                  single-line
                  hide-details
                ></v-text-field>
              </v-flex>
            </v-layout>
            <v-data-table :headers="dataTable.headers" :items="grupos" class="elevation-1" :loading="dataTable.loading" :search="dataTable.search" hide-actions>
              <v-progress-linear slot="progress" color="blue" indeterminate></v-progress-linear>
              <template slot="items" slot-scope="props">
                <td>
                  <v-btn icon @click.native="perfil(props.item.nombre)">
                    <v-icon>group</v-icon>
                  </v-btn>
                </td>
                <td>{{ props.item.nombre }}</td>
                <td>{{ props.item.tipo }}</td>
                <td>{{ props.item.etapa }}</td>
                <td>{{ props.item.genero }}</td>
              </template>
              <template slot="no-data">
                <v-alert :value="dataTable.error" color="error" icon="warning">
                  No se encontraron resultados para su búsqueda
                </v-alert>
              </template>
            </v-data-table>
          </v-card-text>
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>
<script>
export default {
  mounted () {
    this.$store.dispatch('getGrupos')
  },
  computed: {
    grupos () {
      return this.$store.getters.grupos
    }
  },
  data () {
    return {
      dataTable: {
        search: '',
        headers: [
          {
            text: 'Perfil',
            value: 'perfil'
          },
          {
            text: 'Nombre',
            value: 'nombre'
          },
          {
            text: 'Tipo',
            value: 'tipo'
          },
          {
            text: 'Etapa',
            value: 'etapa'
          },
          {
            text: 'Género',
            value: 'genero'
          }
        ],
        items: [],
        loading: false,
        error: false
      }
    }
  },
  methods: {
    perfil (nombre) {
      nombre = nombre.replace(/\s/g, '_')
      this.$router.push('/grupos/' + nombre)
    }
  }
}
</script>
<style scoped>

</style>
