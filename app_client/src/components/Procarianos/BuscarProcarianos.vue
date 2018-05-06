<template>
  <v-container fluid fill-height>
    <v-layout align-center justify-center wrap row>
      <v-flex xs12 sm10 md8>
        <v-card>
          <v-card-title primary-title>
            <h1 class="mx-auto">Búsqueda</h1>
          </v-card-title>
          <v-card-text>
            <v-form class="px-3 mt-3">
              <v-layout row wrap>
                <v-flex xs12 v-for="tf in textFields" :key="tf.name">
                  <v-text-field :name="tf.name" :label="tf.label" v-model="tf.model"></v-text-field>
                </v-flex>
              </v-layout>
            </v-form>
          </v-card-text>
          <v-card-actions class="pb-3">
            <v-spacer></v-spacer>
            <v-btn class="error mr-3" icon>
              <v-icon>add</v-icon>
            </v-btn>
            <v-btn flat class="primary mr-4" @click="buscar">Buscar</v-btn>
          </v-card-actions>
        </v-card>
      </v-flex>
      <v-flex xs12 sm10 md8 class="mt-3" v-if="busquedaRealizada">
        <v-card>
          <v-card-title primary-title>
            <h1 class="mx-auto">Resultados</h1>
          </v-card-title>
          <v-card-text>
            <v-data-table :headers="dataTable.headers" :items="dataTable.items" class="elevation-1" :loading="dataTable.loading">
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
    computed: {
      textFields () {
        return this.checkboxes.filter((field) => {
          return field.state === true
        })
      }
    },
    data () {
      return {
        procariano: {
          nombres: '',
          apellidos: '',
          fechaNacimiento: '',
          cedula: '',
          genero: '',
          tipo: '',
          colegio: '',
          universidad: '',
          trabajo: '',
          fechaOpcion: '',
          promocion: '',
          grupo: ''
        },
        busquedaRealizada: false,
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
          items: [],
          loading: false,
          error: false
        },
        checkboxes: [
          {
            label: 'Nombres',
            name: 'nombres',
            model: 'procariano.nombres',
            state: true
          },
          {
            label: 'Apellidos',
            name: 'apellidos',
            model: 'procariano.apellidos',
            state: false
          },
          {
            label: 'Email',
            name: 'email',
            model: 'procariano.email',
            state: false
          }
        ]
      }
    },
    methods: {
      buscar () {
        this.busquedaRealizada = true
        this.dataTable.loading = true
        setTimeout(() => {
          this.dataTable.items = this.$store.getters.procarianos
          this.dataTable.loading = false
        }, 3000)
      },
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