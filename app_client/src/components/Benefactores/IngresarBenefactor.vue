<template>
  <v-container fluid fill-height>
    <v-layout align-center justify-center wrap row>
      <v-dialog v-model="successDialog" persistent max-width="290">
        <v-card>
          <v-card-title class="headline">Benefactor ingresado</v-card-title>
          <v-card-text>Se añadió correctamente a la base de datos</v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="green darken-1" flat @click.native="regresar">OK</v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
      <v-flex xs12 sm10 md8>
        <v-card>
          <v-card-title primary-title>
            <h1 class="mx-auto display-1">Ingresar Benefactor</h1>
          </v-card-title>
          <v-card-text>
            <v-form class="mb-3">
              <fieldset>
                <h3 class="headline mt-3">Tipo</h3>
                <v-radio-group v-model="benefactor.tipo" row id="radioTipo">
                  <v-radio label="Persona" value="persona"></v-radio>
                  <v-radio label="Empresa" value="empresa"></v-radio>
                </v-radio-group>
              </fieldset>
            </v-form>
            <v-form v-if="benefactor.tipo === 'persona'">
              <fieldset>
                <h3 class="headline mt-3">Datos Persona</h3>
                <v-container grid-list-xl fluid>
                  <v-layout wrap>
                    <v-flex xs12 sm6>
                      <v-text-field name="cedula" label="Cédula" v-model="benefactor.cedula" type="text" required :mask="masks.cedula" :rules="[rules.required]"></v-text-field>
                    </v-flex>
                    <v-flex xs12 sm6>
                      <v-text-field name="nombres" label="Nombres" v-model="benefactor.nombres" type="text" required :rules="[rules.required, rules.specialChar]"></v-text-field>
                    </v-flex>
                    <v-flex xs12 sm6>
                      <v-text-field name="apellidos" label="Apellidos" v-model="benefactor.apellidos" type="text" required :rules="[rules.required, rules.specialChar]"></v-text-field>
                    </v-flex>
                    <v-flex xs12 sm6>
                      <v-dialog ref="dialog" width="290px" v-model="modalFechaNacimiento" persistent lazy full-width :return-value.sync="benefactor.fechaNacimiento">
                        <v-text-field name="fechaNacimiento" label="Fecha de nacimiento" v-model="benefactor.fechaNacimiento" slot="activator" required readonly></v-text-field>
                          <v-date-picker v-model="benefactor.fechaNacimiento" scrollable>
                            <v-spacer></v-spacer>
                            <v-btn flat color="primary" @click="modalFechaNacimiento = false">Cancel</v-btn>
                            <v-btn flat color="primary" @click="$refs.dialog.save(benefactor.fechaNacimiento)">OK</v-btn>
                          </v-date-picker>
                      </v-dialog>
                    </v-flex>
                    <v-flex xs12 sm6>
                      <v-select :items="generos" v-model="benefactor.genero" label="Género" item-text="texto" item-value="id" required :rules="[rules.required]"></v-select>
                    </v-flex>
                    <v-flex xs12 sm6>
                      <v-text-field name="email" label="Email" v-model="benefactor.email" type="email" required :rules="[rules.required, rules.email]"></v-text-field>
                    </v-flex>
                    <v-flex xs12 sm6>
                      <v-text-field name="direccion" label="Dirección" v-model="benefactor.direccion" type="text" required :rules="[rules.required, rules.specialChar]"></v-text-field>
                    </v-flex>
                    <v-flex xs12 sm6>
                      <v-text-field name="celular" label="Telf. Celular" v-model="benefactor.celular" type="text" required :rules="[rules.required]" :mask="masks.celular"></v-text-field>
                    </v-flex>
                    <v-flex xs12 sm6>
                      <v-text-field name="convencional" label="Telf. Convencional" v-model="benefactor.convencional" type="text" required :rules="[rules.required]" :mask="masks.convencional"></v-text-field>
                    </v-flex>
                  </v-layout>
                </v-container>
              </fieldset>
            </v-form>
            <v-form v-if="benefactor.tipo === 'empresa'">
              <fieldset>
                <h3 class="headline mt-3">Datos Empresa</h3>
                <v-container grid-list-xl fluid>
                  <v-layout wrap>
                    <v-flex xs12 sm6>
                      <v-text-field name="ruc" label="RUC" v-model="benefactor.ruc" type="text" required :mask="masks.ruc" :rules="[rules.required]"></v-text-field>
                    </v-flex>
                    <v-flex xs12 sm6>
                      <v-text-field name="razonSocial" label="Razón Social" v-model="benefactor.razonSocial" type="text" required :rules="[rules.required, rules.specialChar]"></v-text-field>
                    </v-flex>
                    <v-flex xs12 sm6>
                      <v-text-field name="email" label="Email" v-model="benefactor.email" required :rules="[rules.required, rules.email]"></v-text-field>
                    </v-flex>
                    <v-flex xs12 sm6>
                      <v-text-field name="direccion" label="Dirección" v-model="benefactor.direccion" type="text" required :rules="[rules.required, rules.specialChar]"></v-text-field>
                    </v-flex>
                    <v-flex xs12 sm6>
                      <v-text-field name="celular" label="Telf. Celular" v-model="benefactor.celular" type="text" required :rules="[rules.required]" :mask="masks.celular"></v-text-field>
                    </v-flex>
                    <v-flex xs12 sm6>
                      <v-text-field name="convencional" label="Telf. Convencional" v-model="benefactor.convencional" type="text" required :rules="[rules.required]" :mask="masks.convencional"></v-text-field>
                    </v-flex>
                  </v-layout>
                </v-container>
              </fieldset>
            </v-form>
            <v-form class="mt-3">
              <fieldset>
                <h3 class="headline mt-3">Datos Benefactor</h3>
                <v-container grid-list-xl fluid>
                  <v-layout wrap>
                    <v-flex xs12 sm6>
                      <v-text-field name="contribucion" label="Contribución" v-model="benefactor.contribucion" placeholder="$ 0.00" v-money="money"></v-text-field>
                    </v-flex>
                    <v-flex xs12 sm6>
                      <v-text-field name="diaCobro" label="Día de cobro" v-model="benefactor.diaCobro"></v-text-field>
                    </v-flex>
                    <v-flex xs12 sm6>
                      <v-text-field name="gestor" label="Gestor" v-model="benefactor.nombreGestor"></v-text-field>
                    </v-flex>
                    <v-flex xs12 sm6>
                      <v-select label="Estado" :items="['Activo', 'Inactivo']" v-model="benefactor.estado"></v-select>
                    </v-flex>
                  </v-layout>
                </v-container>
              </fieldset>
            </v-form>
          </v-card-text>
          <v-card-actions class="hidden-xs-only">
            <v-btn flat class="btn-cancelar ml-3">
              <v-icon left>cancel</v-icon>
              Cancelar
            </v-btn>
            <v-spacer></v-spacer>
            <v-btn flat class="btn-continuar mr-3" @click="submit" :loading="loading">
              Ingresar
              <v-icon right>send</v-icon>
            </v-btn>
          </v-card-actions>
          <v-card-actions class="hidden-sm-and-up pb-3">
            <v-btn flat icon color="red" class="ml-3">
              <v-icon large>clear</v-icon>
            </v-btn>
            <v-spacer></v-spacer>
            <v-btn flat icon color="primary" class="mr-3" @click="submit" :loading="loading">
              <v-icon large>send</v-icon>
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>
<script>
import {VMoney} from 'v-money'
export default {
  computed: {
    masks () {
      return this.$store.getters.masks
    },
    rules () {
      return this.$store.getters.rules
    }
  },
  data () {
    return {
      loading: false,
      successDialog: false,
      money: {
        decimal: '.',
        thousands: ',',
        prefix: '$ ',
        precision: 2,
        masked: false /* doesn't work with directive */
      },
      modalFechaNacimiento: false,
      generos: [
        {
          texto: 'Masculino',
          id: 'masculino'
        },
        {
          texto: 'Femenino',
          id: 'femenino'
        }
      ],
      benefactor: {
        tipo: '',
        cedula: '',
        nombres: '',
        apellidos: '',
        fechaNacimiento: '',
        genero: '',
        email: '',
        direccion: '',
        celular: '',
        convencional: '',
        ruc: '',
        razonSocial: '',
        contribucion: 0.00,
        valorContribucion: 0.00,
        diaCobro: '',
        nombreGestor: '',
        estado: ''
      }
    }
  },
  directives: {money: VMoney},
  methods: {
    parse (valor) {
      let x = valor.replace(/\s/g, '')
      x = x.replace(/\$/g, '')
      return parseFloat(x)
    },
    submit () {
      this.loading = true
      this.benefactor.valorContribucion = this.parse(this.benefactor.contribucion)
      this.$http.post('/api/benefactores/', this.benefactor)
        .then((response) => {
          this.loading = false
          if (response.body.estado) {
            this.successDialog = true
          } else {
            console.log(response.body)
          }
        }, (err) => {
          this.loading = false
          console.log(err)
        })
    },
    regresar () {
      this.$router.push('/benefactores/')
    }
  }
}
</script>
<style scoped>
  .card__text{
    text-align: center;
  }
  fieldset {
    border: 1.5px double #21378A;
  }
  #radioTipo   {
    padding-left: 23% !important;
  }
</style>
