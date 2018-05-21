<template>
  <v-container fluid fill-height>
    <v-layout align-center justify-center wrap row>
      <v-flex xs12 sm10 md8 class="mt-3">
        <v-card>
          <v-card-title primary-title>
            <h1 class="mx-auto">Procarianos</h1>
          </v-card-title>
          <v-card-text>
            <v-layout row class="mb-3">
              <v-flex xs6 offset-xs6>
               <v-text-field v-model="dataTable.search" append-icon="search" label="Búsqueda" single-line hide-details></v-text-field>
              </v-flex>
            </v-layout>
            <v-data-table :headers="dataTable.headers" :items="procarianos" :search="dataTable.search" class="elevation-1" :loading="loading">
              <v-progress-linear slot="progress" color="blue" indeterminate></v-progress-linear>
              <template slot="items" slot-scope="props">
                <td>
                  <v-btn icon @click.native="perfil(props.item.nombres, props.item.apellidos)">
                    <v-icon>person</v-icon>
                  </v-btn>
                </td>
                <td>{{ props.item.nombres }}</td>
                <td>{{ props.item.apellidos }}</td>
                <td>{{ props.item.email }}</td>
                <td>{{ props.item.tipo }}</td>
                <td>{{ props.item.grupo }}</td>
                <td>{{ props.item.estado }}</td>
              </template>
              <template slot="no-data">
                <v-alert :value="error" dismissible color="error" icon="warning" v-if="error">
                  No se pudieron cargar los datos de la base.
                </v-alert>
              </template>
              <v-alert slot="no-results" :value="true" color="error" icon="warning">
                Su búsqueda de "{{ dataTable.search }}" no encontró resultados.
              </v-alert>
            </v-data-table>
          </v-card-text>
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>
<script>
  export default {
    computed: {
      loading () {
        return this.$store.getters.loading
      },
      error () {
        return this.$store.getters.error
      },
      procarianos () {
        return this.$store.getters.procarianos
      }
    },
    data () {
      return {
        dataTable: {
          headers: [
            {
              text: 'Perfil',
              value: 'perfil'
            },
            {
              text: 'Nombres',
              value: 'nombres'
            },
            {
              text: 'Apellidos',
              value: 'apellidos'
            },
            {
              text: 'Email',
              value: 'email'
            },
            {
              text: 'Tipo',
              value: 'tipo'
            },
            {
              text: 'Grupo',
              value: 'grupo'
            },
            {
              text: 'Estado',
              value: 'estado'
            }
          ],
          search: '',
          error: false
        }
      }
    },
    methods: {
      perfil (nombres, apellidos) {
        nombres = nombres.replace(' ', '_')
        apellidos = apellidos.replace(' ', '_')
        nombres = nombres.concat('_')
        nombres = nombres.concat(apellidos)
        this.$router.push('/procarianos/perfil/' + nombres)
      }
    }
  }
</script>
