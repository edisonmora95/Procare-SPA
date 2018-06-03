<template>
  <v-layout row wrap>
    <v-flex xs12>
      <v-card>
        <v-card-text>
          <full-calendar :config="config" :events="eventos" @event-selected="eventSelected"></full-calendar>
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
    <v-dialog v-model="dialog" max-width="290" v-if="seleccion">
      <v-card>
        <v-card-title class="headline">{{ seleccion.title }}</v-card-title>
        <v-card-text>{{ seleccion.description }}</v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="green darken-1" flat @click.native="dialog = false">Disagree</v-btn>
          <v-btn color="green darken-1" flat @click.native="dialog = false">Agree</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-layout>
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
    watch: {
      usuario (value) {
        if (value) {
          if (this.usuario.roles.includes('Personal')) {
            this.getTareasEventos()
          } else {
            this.getTareasEventosUsuario()
          }
        }
      }
    },
    data () {
      return {
        dialog: false,
        seleccion: null,
        fab: false,
        eventos: [],
        config: {
          locale: 'es',
          defaultView: 'month'
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
      },
      eventSelected (event) {
        this.seleccion = event
        this.dialog = true
      }
    }
  }
</script>
<style>

</style>
