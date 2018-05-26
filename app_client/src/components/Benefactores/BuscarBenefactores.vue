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
            <v-data-table :headers="dataTable.headers" :items="benefactores" class="elevation-1" :loading="dataTable.loading" :search="dataTable.search" hide-actions>
              <v-progress-linear slot="progress" color="blue" indeterminate></v-progress-linear>
              <template slot="items" slot-scope="props">
                <td>
                  <v-btn icon @click.native="perfil(props.item.nombres)">
                    <v-icon>person</v-icon>
                  </v-btn>
                </td>
                <td>{{ props.item.nombres }}</td>
                <td>{{ props.item.cedula }}</td>
                <td>{{ props.item.email }}</td>
                <td>{{ props.item.estado }}</td>
                <td>{{ props.item.nombreGestor }}</td>
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
    this.getBenefactores()
  },
  data () {
    return {
      benefactores: [],
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
    getBenefactores () {
      this.dataTable.loading = true
      this.dataTable.error = false
      this.$http.get('/api/benefactores/')
        .then((response) => {
          this.dataTable.loading = false
          if (response.body.estado) {
            this.benefactores = response.body.datos
          } else {
            this.dataTable.error = true
          }
        }, (err) => {
          console.log(err)
          this.dataTable.loading = false
          this.dataTable.error = true
        })
    },
    perfil (nombre) {
      nombre = nombre.replace(/_/g, '_')
      this.$router.push('/benefactores/' + nombre)
    }
  }
}
</script>
<style scoped>

</style>
