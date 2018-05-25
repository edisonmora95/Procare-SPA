<template>
  <v-container fluid fill-height>
    <v-layout align-center justify-center wrap row>
      <v-flex xs12 md8>
        <v-card>
          <v-card-title>
            <h1 class="mx-auto display-1">Crear Grupo de Formación</h1>
          </v-card-title>
          <v-card-text v-if="estado==='general'">
            <h3 class="mx-auto headline">Información general</h3>
            <v-form>
              <v-container grid-list-xl fluid>
                <v-layout wrap>
                  <v-flex xs12 sm6>
                    <v-text-field name="nombre" label="Nombre del grupo" v-model="grupo.nombre" type="text" required :rules="[rules.required, rules.specialChar]"></v-text-field>
                  </v-flex>
                  <v-flex xs12 sm6>
                    <v-select :items="generos" v-model="grupo.genero" label="Género" item-text="texto" item-value="id" required :rules="[rules.required]"></v-select>
                  </v-flex>
                  <v-flex xs12 sm6>
                    <v-select :items="etapas" v-model="grupo.etapa" label="Etapa" item-text="texto" item-value="id" required :rules="[rules.required]"></v-select>
                  </v-flex>
                  <v-flex xs12 sm6>
                    <v-select :loading="loadingAnimadores" :items="animadores" v-model="grupo.animador" label="Animador" item-text="nombreCompleto" item-value="procarianoId" required :rules="[rules.required]"></v-select>
                  </v-flex>
                </v-layout>
              </v-container>
            </v-form>
            <v-layout row>
              <v-btn flat class="btn-cancelar ml-3">
                <v-icon left>cancel</v-icon>
                Cancelar
              </v-btn>
              <v-spacer></v-spacer>
              <v-btn :disabled="!habilitadoCrear" :loading="loadingCrearGrupo" flat class="btn-continuar mr-3 right" @click="crearGrupo">
                Continuar
                <v-icon right>send</v-icon>
              </v-btn>
            </v-layout>
          </v-card-text>
          <v-card-text v-else>
            <h3 class="mx-auto headline">Selección de integrantes</h3>
            <h5 class="mx-auto mt-4 subheading">{{ grupo.nombre }}</h5>
            <v-layout row wrap>
              <v-flex sm5>
                <v-list>
                  <h4 class="mb-2">Chicos sin grupo</h4>
                  <v-list-tile v-for="item in sinGrupo" :key="item.procarianoId">
                    <v-list-tile-action>
                      <v-checkbox v-model="item.seleccionado"></v-checkbox>
                    </v-list-tile-action>
                    <v-list-tile-content>
                      <v-list-tile-title>{{ item.Persona.nombres }} {{item.Persona.apellidos}} </v-list-tile-title>
                    </v-list-tile-content>
                  </v-list-tile>
                </v-list>
              </v-flex>
              <v-flex sm2>
                <v-btn class="mt-5" @click="anadir" :disabled="!habilitadoAnadir">Añadir</v-btn>
                <v-btn class="mt-3" @click="quitar" :disabled="!habilitadoQuitar">Quitar</v-btn>
              </v-flex>
              <v-flex sm5>
                <v-list>
                  <h4 class="mb-2">Integrantes</h4>
                  <v-list-tile v-for="item in integrantes" :key="item.procarianoId">
                    <v-list-tile-action>
                      <v-checkbox v-model="item.seleccionado"></v-checkbox>
                    </v-list-tile-action>
                    <v-list-tile-content>
                      <v-list-tile-title>{{ item.Persona.nombres }} {{item.Persona.apellidos}} </v-list-tile-title>
                    </v-list-tile-content>
                  </v-list-tile>
                </v-list>
              </v-flex>
            </v-layout>
            <v-layout row>
              <v-spacer></v-spacer>
              <v-btn flat class="btn-continuar mr-3 right" @click="anadirIntegrantes">
                Terminar
                <v-icon right>send</v-icon>
              </v-btn>
            </v-layout>
          </v-card-text>
        </v-card>
      </v-flex>
    </v-layout>
    <v-dialog v-model="dialogError" persistent max-width="290">
      <v-card>
        <v-card-title class="headline">Error!</v-card-title>
        <v-card-text>{{ error }}</v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="green darken-1" flat @click.native="regresar">Regresar</v-btn>
          <v-btn color="green darken-1" flat @click.native="dialogError = false">Volver a intentar</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
    <v-dialog v-model="dialogSuccess" persistent max-width="290">
      <v-card>
        <v-card-title class="headline">¡Grupo creado!</v-card-title>
        <v-card-text>Se creó el grupo de manera correcta</v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="green darken-1" flat @click.native="regresar">Aceptar</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-container>
</template>
<script>
export default {
  mounted () {
    this.obtenerPosiblesAnimadores()
    this.obtenerChicosSinGrupo()
  },
  computed: {
    rules () {
      return this.$store.getters.rules
    },
    etapas () {
      return this.$store.getters.etapas
    },
    habilitadoCrear () {
      return this.isNotEmpty(this.grupo.nombre) && this.isNotEmpty(this.grupo.genero) && this.isNotEmpty(this.grupo.etapa) && this.isNotEmpty(this.grupo.animador)
    },
    habilitadoAnadir () {
      let flag = false
      for (let i = this.sinGrupo.length - 1; i >= 0; i--) {
        if (this.sinGrupo[i].seleccionado) {
          flag = true
          break
        }
      }
      return flag
    },
    habilitadoQuitar () {
      let flag = false
      for (let i = this.integrantes.length - 1; i >= 0; i--) {
        if (this.integrantes[i].seleccionado) {
          flag = true
          break
        }
      }
      return flag
    }
  },
  data () {
    return {
      grupo: {
        nombre: '',
        genero: '',
        etapa: '',
        animador: '',
        tipo: 'Formación',
        cantidadChicos: 0,
        numeroReuniones: 0,
        id: ''
      },
      generos: [
        {
          texto: 'Masculino',
          id: 'Procare'
        },
        {
          texto: 'Femenino',
          id: 'Procare Mujeres'
        }
      ],
      animadores: [],
      loadingAnimadores: false,
      loadingCrearGrupo: false,
      estado: 'general',
      sinGrupo: [],
      integrantes: [],
      dialogError: false,
      error: '',
      dialogSuccess: false
    }
  },
  methods: {
    // LLAMADAS A LA API
    obtenerPosiblesAnimadores () {
      this.loadingAnimadores = true
      this.dialogError = false
      this.$http.get('/api/animadores/posibles')
        .then((response) => {
          this.loadingAnimadores = false
          if (response.body.estado) {
            this.animadores = this.armarArrayAnimadores(response)
          } else {
            this.showErrorDialog(response.body.error.mensaje)
          }
        }, (err) => {
          this.loadingAnimadores = false
          this.showErrorDialog(err.body.err.mensaje)
        })
    },
    crearGrupo () {
      this.loadingCrearGrupo = true
      this.$http.post('/api/grupos/', this.grupo)
        .then((response) => {
          this.loadingCrearGrupo = false
          if (response.body.estado) {
            this.grupo.id = response.body.datos
            this.estado = 'integrantes'
          } else {
            this.estado = 'general'
            this.showErrorDialog(response.body.error.mensaje)
          }
        }, (err) => {
          this.loadingCrearGrupo = false
          this.showErrorDialog(err.body.err.mensaje)
        })
    },
    obtenerChicosSinGrupo () {
      this.$http.get('/api/procarianos/formacion/sinGrupo')
        .then((response) => {
          if (response.body.estado) {
            this.sinGrupo = this.armarArrayChicos(response)
          } else {
            this.showErrorDialog(response.body.error.mensaje)
          }
        }, (err) => {
          this.showErrorDialog(err.body.err.mensaje)
        })
    },
    anadirIntegrantes () {
      const urlApi = `/api/grupos/${this.grupo.id}/anadir/bulk`
      let integrantes = this.integrantes.map((integrante) => {
        return {
          fechaInicio: new Date(),
          GrupoId: this.grupo.id,
          ProcarianoId: integrante.procarianoId
        }
      })
      const data = {
        integrantes: JSON.stringify(integrantes)
      }
      this.$http.post(urlApi, data)
        .then((response) => {
          if (response.body.estado) {
            this.dialogSuccess = true
          } else {
            this.showErrorDialog(response.body.error.mensaje)
          }
        }, (err) => {
          this.showErrorDialog(err.body.err.mensaje)
        })
    },
    // HELPERS
    armarArrayAnimadores (response) {
      let animadores = response.body.datos
      for (let i = animadores.length - 1; i >= 0; i--) {
        animadores[i].nombreCompleto = animadores[i].Persona.nombres + ' ' + animadores[i].Persona.apellidos
      }
      return animadores
    },
    armarArrayChicos (response) {
      for (let i = response.body.datos.length - 1; i >= 0; i--) {
        response.body.datos[i].seleccionado = false
      }
      return response.body.datos
    },
    anadir () {
      for (let i = this.sinGrupo.length - 1; i >= 0; i--) {
        let actual = this.sinGrupo[i]
        if (actual.seleccionado) {
          this.sinGrupo.splice(i, 1)
          this.integrantes.push(actual)
          actual.seleccionado = false
        }
      }
    },
    quitar () {
      for (let i = this.integrantes.length - 1; i >= 0; i--) {
        let actual = this.integrantes[i]
        if (actual.seleccionado) {
          this.integrantes.splice(i, 1)
          this.sinGrupo.push(actual)
          actual.seleccionado = false
        }
      }
    },
    regresar () {
      this.$router.push('/grupos/')
    },
    isNotEmpty (value) {
      return value !== null && value !== undefined && value !== ''
    },
    showErrorDialog (msg) {
      this.error = msg
      this.dialogError = true
    }
  }
}
</script>
<style scoped>
  .card__text h3, h4, h5 {
    text-align: center;
  }
</style>
