<template>
  <v-container fluid fill-height>
    <v-layout align-center justify-center wrap row>
      <v-flex xs12 sm10 md8>
        <v-card>
          <v-card-title primary-title>
            <h1 class="mx-auto display-1">Evento nuevo</h1>
          </v-card-title>
          <v-card-text>
            <v-form>
              <v-container grid-list-xl fluid>
                <v-layout wrap row>
                  <v-flex xs12>
                    <v-text-field name="nombre" label="Nombre del evento" placeholder="Chocolate de Reyes" v-model="evento.nombre" required :rules="[rules.required, rules.specialChar]"></v-text-field>
                  </v-flex>
                  <v-flex xs12>
                    <v-text-field name="decripcion" label="Descripción" placeholder="Este evento se realizará por..." v-model="evento.descripcion" required :rules="[rules.required, rules.specialChar]" auto-grow multi-line rows="1"></v-text-field>
                  </v-flex>
                  <v-flex xs12>
                    <v-text-field name="lugar" label="Lugar" v-model="evento.lugar" required :rules="[rules.required, rules.specialChar]"></v-text-field>
                  </v-flex>
                  <v-flex xs12 sm6>
                    <v-select :items="procarianos" item-text="nombre" item-value="id" v-model="evento.responsable" label="Responsable" autocomplete :rules="[rules.required]"></v-select>
                  </v-flex>
                  <v-flex xs12 sm6>
                    <v-select :items="estados" item-text="nombre" item-value="id" v-model="evento.estado" label="Estado" :rules="[rules.required]"></v-select>
                  </v-flex>
                  <v-flex xs12 sm6>
                    <v-dialog ref="dialogFI" v-model="modalFI" :return-value:sync="fechaInicio" persistent lazy full-width width="290px">
                      <v-text-field slot="activator" v-model="fechaInicio" label="Fecha de inicio" prepend-icon="event" readonly :rules="[rules.fechaValida]"></v-text-field>
                      <v-date-picker v-model="fechaInicio" scrollable>
                        <v-spacer></v-spacer>
                        <v-btn flat color="primary" @click="modalFI = false">Cancel</v-btn>
                        <v-btn flat color="primary" @click="$refs.dialogFI.save(fechaInicio)">OK</v-btn>
                      </v-date-picker>
                    </v-dialog>
                  </v-flex>
                  <v-flex xs12 sm6>
                    <v-dialog ref="dialogHI" v-model="modalHI" :return-value.sync="horaInicio" persistent lazy full-width width="290px">
                      <v-text-field slot="activator" v-model="horaInicio" label="Hora de inicio" prepend-icon="access_time" readonly></v-text-field>
                      <v-time-picker v-model="horaInicio" actions>
                        <v-spacer></v-spacer>
                        <v-btn flat color="primary" @click="modalHI = false">Cancel</v-btn>
                        <v-btn flat color="primary" @click="$refs.dialogHI.save(horaInicio)">OK</v-btn>
                      </v-time-picker>
                    </v-dialog>
                  </v-flex>
                  <v-flex xs12 sm6>
                    <v-dialog ref="dialogFF" v-model="modalFF" :return-value:sync="fechaFin" persistent lazy full-width width="290px">
                      <v-text-field slot="activator" v-model="fechaFin" label="Fecha final" prepend-icon="event" readonly :rules="[rules.fechaValida]"></v-text-field>
                      <v-date-picker v-model="fechaFin" scrollable>
                        <v-spacer></v-spacer>
                        <v-btn flat color="primary" @click="modalFF = false">Cancel</v-btn>
                        <v-btn flat color="primary" @click="$refs.dialogFF.save(fechaFin)">OK</v-btn>
                      </v-date-picker>
                    </v-dialog>
                  </v-flex>
                  <v-flex xs12 sm6>
                    <v-dialog ref="dialogHF" v-model="modalHF" :return-value.sync="horaFin" persistent lazy full-width width="290px">
                      <v-text-field slot="activator" v-model="horaFin" label="Hora final" prepend-icon="access_time" readonly></v-text-field>
                      <v-time-picker v-model="horaFin" actions>
                        <v-spacer></v-spacer>
                        <v-btn flat color="primary" @click="modalHF = false">Cancel</v-btn>
                        <v-btn flat color="primary" @click="$refs.dialogHF.save(horaFin)">OK</v-btn>
                      </v-time-picker>
                    </v-dialog>
                  </v-flex>
                </v-layout>
              </v-container>
            </v-form>
          </v-card-text>
          <v-card-actions class="pb-3">
            <v-btn flat class="btn-cancelar ml-3" @click="regresar">
              <v-icon left>cancel</v-icon>
              Cancelar
            </v-btn>
            <v-spacer></v-spacer>
            <v-btn flat class="btn-continuar mr-3" @click="onSubmit" :loading="loading">
              Crear
              <v-icon right>send</v-icon>
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-flex>
      <v-dialog v-model="successDialog" persistent max-width="290">
        <v-card>
          <v-card-title class="headline">Evento creado</v-card-title>
          <v-card-text>¿Desea crear otro evento?</v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="green darken-1" flat @click.native="regresar">No</v-btn>
            <v-btn color="green darken-1" flat @click.native="limpiar">Si</v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
      <v-dialog v-model="errorDialog" persistent max-width="290" v-if="error">
        <v-card>
          <v-card-title class="headline">Error en formulario</v-card-title>
          <v-card-text>{{ error }}</v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="green darken-1" flat @click.native="clearError">Aceptar</v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </v-layout>
  </v-container>
</template>
<script>
  export default {
    mounted () {
      this.getProcarianosActivos()
    },
    computed: {
      rules () {
        return this.$store.getters.rules
      }
    },
    data () {
      return {
        loading: false,
        successDialog: false,
        error: null,
        modalHI: false,
        modalFI: false,
        modalHF: false,
        modalFF: false,
        horaInicio: null,
        horaFin: null,
        fechaInicio: '',
        fechaFin: '',
        procarianos: [],
        estados: [
          {
            id: 1,
            nombre: 'Pendiente'
          },
          {
            id: 2,
            nombre: 'En proceso'
          },
          {
            id: 3,
            nombre: 'Terminado'
          }
        ],
        evento: {
          nombre: '',
          fechaInicio: '',
          fechaFin: '',
          descripcion: '',
          lugar: '',
          estado: 1,
          responsable: ''
        }
      }
    },
    methods: {
      getProcarianosActivos () {
        this.$http.get('/api/procarianos/activos')
          .then((response) => {
            console.log(response)
            this.procarianos = response.body.datos.map((procariano) => {
              return {
                nombre: procariano.Persona.nombres + ' ' + procariano.Persona.apellidos,
                id: procariano.Persona.id
              }
            })
          }, (err) => {
            console.log(err)
          })
      },
      crearEvento () {
        this.loading = true
        this.$http.post('/api/eventos', this.evento)
          .then((response) => {
            this.loading = false
            if (response.body.estado) {
              this.successDialog = true
            } else {
              this.setError(response.body.error.mensaje)
            }
          }, (err) => {
            this.loading = false
            this.setError(err.error.mensaje)
          })
      },
      onSubmit () {
        this.evento.fechaInicio = this.getFechaCompleta(this.fechaInicio, this.horaInicio)
        this.evento.fechaFin = this.getFechaCompleta(this.fechaFin, this.horaFin)
        if (this.validarFechas(this.evento.fechaInicio, this.evento.fechaFin)) {
          this.crearEvento()
        } else {
          this.evento.fechaInicio = ''
          this.evento.fechaFin = ''
          this.setError('La fecha final no puede ser antes de la fecha inicial')
        }
      },
      regresar () {
        this.successDialog = false
        this.$router.push('/')
      },
      limpiar () {
        this.evento = {
          nombre: '',
          fechaInicio: '',
          fechaFin: '',
          descripcion: '',
          lugar: '',
          estado: 1,
          responsable: ''
        }
        this.horaInicio = null
        this.horaFin = null
        this.fechaInicio = ''
        this.fechaFin = ''
        this.successDialog = false
        this.errorDialog = false
        this.error = null
      },
      clearError () {
        this.errorDialog = false
        this.error = null
      },
      getFechaCompleta (fecha, hora) {
        return fecha.concat('T').concat(hora).concat(':00')
      },
      validarFechas (inicio, fin) {
        return new Date(inicio) < new Date(fin)
      },
      setError (mensaje) {
        this.errorDialog = true
        this.error = mensaje
      }
    }
  }
</script>
<style></style>
