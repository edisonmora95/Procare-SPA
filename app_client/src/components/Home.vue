<template>
  <v-container fluid fill-height>
    <v-layout align-center justify-center row>
      <v-flex xs12>
        <v-card>
          <v-card-text>
            <full-calendar :config="config" :events="eventos"></full-calendar>
          </v-card-text>
          <v-card-actions>
            <v-speed-dial v-model="fab" direction="right" transition='slide-x-reverse-transition'>
              <v-btn slot="activator" v-model="fab" color="red darken-2" dark fab>
                <v-icon>add</v-icon>
                <v-icon>close</v-icon>
              </v-btn>
              <v-tooltip top>
                <v-btn slot="activator" fab dark small color="green" router :to="'/eventos/nuevo'">
                  <v-icon>today</v-icon>
                </v-btn>
                <span>Evento</span>
              </v-tooltip>
              <v-tooltip top>
                <v-btn slot="activator" fab dark small color="indigo" router :to="'/tareas/nueva'">
                  <v-icon>edit</v-icon>
                </v-btn>
                <span>Tarea</span>
              </v-tooltip>

            </v-speed-dial>
          </v-card-actions>
        </v-card>
      </v-flex>
      <v-flex xs4 v-if="seleccion">
        <v-card>
          <v-card-title>
            <h3>{{ seleccion.title }}</h3>
          </v-card-title>
          <v-card-text>
            {{ seleccion.description }}
          </v-card-text>
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>
<script>
  export default {
    mounted () {
      if (this.usuario) {
        if (this.usuario.roles.includes('Personal')) {
          this.getTareasEventos()
        } else {
          this.getTareasEventosUsuario()
        }
      }
    },
    computed: {
      usuario () {
        return this.$store.getters.usuario
      }
    },
    data () {
      return {
        seleccion: null,
        fab: false,
        eventos: [],
        config: {
          defaultView: 'month',
          eventClick: function (event, element) {
            self.$vm.seleccion = event
          }
        }
      }
    },
    methods: {
      getTareasEventos () {
        this.$http.get('/api/calendario/')
          .then((response) => {
            if (response.body.estado) {
              this.eventos = response.body.datos
            } else {

            }
          }, (err) => {
            console.log(err)
          })
      },
      getTareasEventosUsuario (idUsuario) {
        this.$http.get(`/api/calendario/${idUsuario}`)
          .then((response) => {
            if (response.body.estado) {
              this.eventos = response.body.datos
            } else {

            }
          }, (err) => {
            console.log(err)
          })
      }
    }
  }
</script>
<style>

</style>
