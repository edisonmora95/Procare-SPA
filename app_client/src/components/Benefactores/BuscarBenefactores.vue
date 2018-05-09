<template>
  <v-container fluid fill-height>
    <v-layout align-center justify-center wrap row>
      <v-flex xs12 sm10 md8>
        <v-card>
          <v-card-title primary-title>
            <h1 class="mx-auto display-1">Benefactores</h1>
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
            <v-data-table :headers="dataTable.headers" :items="dataTable.items" class="elevation-1" :loading="dataTable.loading" :search="dataTable.search" hide-actions>
              <v-progress-linear slot="progress" color="blue" indeterminate></v-progress-linear>
              <template slot="items" slot-scope="props">
                <td>
                  <v-btn icon @click.native="perfil(props.item.nombre)">
                    <v-icon>person</v-icon>
                  </v-btn>
                </td>
                <td>{{ props.item.nombre }}</td>
                <td>{{ props.item.cedula }}</td>
                <td>{{ props.item.email }}</td>
                <td>{{ props.item.estado }}</td>
                <td>{{ props.item.gestor }}</td>
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
    this.obtenerBenefactores()
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
            text: 'Cédula',
            value: 'cedula'
          },
          {
            text: 'Email',
            value: 'email'
          },
          {
            text: 'Estado',
            value: 'estado'
          },
          {
            text: 'Gestor',
            value: 'gestor'
          }
        ],
        items: [],
        loading: false,
        error: false
      }
    }
  },
  methods: {
    obtenerBenefactores () {
      this.dataTable.loading = true
      setTimeout(() => {
        this.dataTable.items = this.$store.getters.benefactores
        this.dataTable.loading = false
      }, 3000)
    },
    perfil (nombre) {
      nombre = nombre.replace(' ', '_')
      this.$router.push('/benefactores/' + nombre)
    }
  }
}
</script>
<style scoped>
  
</style>