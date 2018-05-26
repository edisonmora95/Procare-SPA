<template>
  <v-container fluid fill-height>
    <v-layout align-center justify-center wrap row>
      <v-flex xs12 sm10 md8>
        <v-card class="elevation-12" v-if="grupo">
          <v-card-title primary-title>
            <h1 class="mx-auto display-1">{{ grupo.nombre }}</h1>
          </v-card-title>
          <v-card-title primary-title>
            <span class="mx-auto subheading">{{ grupo.etapaActual }}</span>
          </v-card-title>
          <v-card-text>
            <v-layout row wrap>
              <v-flex xs12 sm6>
                <h3 class="mx-auto display-1 mb-3">Animador</h3>
                <v-card-media>
                  <v-avatar size="125" class="mx-auto my-2">
                    <img v-if="!grupo.imagen || grupo.imagen === ''" src="http://via.placeholder.com/150x150">
                    <img v-else :src="grupo.imagen">
                  </v-avatar>
                </v-card-media>
                <v-card-text>
                  <span class="mx-auto">{{ animador.nombres }} {{ animador.apellidos }}</span>
                </v-card-text>
              </v-flex>
              <v-flex xs12 sm6>
                <h3 class="mx-auto display-1 mb-3">Integrantes</h3>
                <v-list>
                  <v-list-tile v-for="item in integrantes" :key="item.idProcariano">
                    <v-list-tile-avatar>
                      <v-icon>person</v-icon>
                    </v-list-tile-avatar>
                    <v-list-tile-content>
                      <v-list-tile-title>{{ item.Persona.nombres }} {{item.Persona.apellidos}} </v-list-tile-title>
                    </v-list-tile-content>
                  </v-list-tile>
                </v-list>
              </v-flex>
            </v-layout>
          </v-card-text>
          <v-card-actions class="py-4">
            <v-btn class="btn-cancelar ml-4">
              <v-icon left>clear</v-icon>
              Eliminar
            </v-btn>
            <v-spacer></v-spacer>
            <v-btn class="btn-continuar mr-4" @click="editar">
              Editar
              <v-icon right>edit</v-icon>
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>
<script>
export default {
  mounted () {
    let nombre = this.$route.params.nombre
    let id = this.buscarGrupoEnStore(nombre).id
    this.getGrupo(id)
  },
  computed: {
    grupos () {
      return this.$store.getters.grupos
    }
  },
  data () {
    return {
      loading: false,
      error: null,
      grupo: null,
      animador: null,
      integrantes: []
    }
  },
  methods: {
    editar () {
      this.$router.push(this.$route.path + '/editar')
    },
    buscarGrupoEnStore (nombre) {
      nombre = nombre.replace(/_/g, ' ')
      return this.grupos.find((grupo) => {
        return grupo.nombre === nombre
      })
    },
    getGrupo (id) {
      this.loading = true
      this.$http.get(`/api/grupos/${id}`)
        .then((response) => {
          this.loading = false
          if (response.body.estado) {
            this.grupo = response.body.datos.grupo
            this.grupo.etapaActual = this.getEtapaActual(this.grupo.Etapas)
            this.integrantes = response.body.datos.procarianos
            this.animador = response.body.datos.procarianoAnimador.Persona
          } else {
            this.error = response.body.mensaje
          }
        }, (err) => {
          this.loading = false
          this.error = err.body.mensaje
        })
    },
    getEtapaActual (etapas) {
      if (etapas.length === 0) {
        return '---'
      }
      let etapa = etapas.find((etapa) => {
        return etapa.GrupoEtapa.fechaFin === null
      })
      if (!etapa) {
        return '---'
      }
      return etapa.nombre
    }
  }
}
</script>
<style scoped>
  .row h2, .card__text{
    text-align: center;
  }
  .flex .list {
    overflow-y: scroll;
    height: 300px;
  }
</style>
