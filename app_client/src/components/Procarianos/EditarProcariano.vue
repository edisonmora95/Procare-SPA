<template>
  <v-container fluid fill-height>
    <v-layout align-center justify-center wrap row>
      <v-flex xs12 sm10 md8>
        <v-flex xs12>
          <v-alert type="error" :value="alertError" dismissible>
            Formulario con errores
          </v-alert>
        </v-flex>
        <v-card class="elevation-12">
          <v-card-title primary-title>
            <h1 class="mx-auto display-1">Editar Procariano</h1>
          </v-card-title>
          <v-card-media class="card-avatar">
            <v-avatar size="150" class="mx-auto my-2 show-image" @click="pickFile">
              <img v-if="!procariano.imagen || procariano.imagen === ''" src="http://via.placeholder.com/150x150">
              <img v-else :src="procariano.imagen">
              <v-icon class="overlay">camera_alt</v-icon>
            </v-avatar>
            <input type="file" ref="fileInput" style="display:none" accept="image/*" @change="onFilePicked">
          </v-card-media>
          <v-card-actions>
            <v-tabs fixed-tabs grow slot="extension" v-model="tab">
              <v-tabs-slider color="orange"></v-tabs-slider>
              <v-tab href="#tab-general">General</v-tab>
              <v-tab href="#tab-personal">Personal</v-tab>
              <v-tab href="#tab-procare">Procare</v-tab>
            </v-tabs>
          </v-card-actions>
          <v-card-text>
            <v-form v-model="formValid" ref="form">
              <v-tabs-items v-model="tab">
                <v-tab-item id="tab-general">
                  <v-container grid-list-xl fluid>
                    <v-layout wrap>
                      <v-flex xs12 sm6>
                        <v-text-field name="nombres" label="Nombres" v-model="procariano.nombres" type="text" required :rules="[rules.required, rules.specialChar]"></v-text-field>
                      </v-flex>
                      <v-flex xs12 sm6>
                        <v-text-field name="apellidos" label="Apellidos" v-model="procariano.apellidos" type="text" required :rules="[rules.required, rules.specialChar]"></v-text-field>
                      </v-flex>
                      <v-flex xs12 sm6>
                        <v-dialog ref="dialog" width="290px" v-model="modal" persistent lazy full-width :return-value.sync="procariano.fechaNacimiento">
                          <v-text-field name="fechaNacimiento" label="Fecha de nacimiento" v-model="procariano.fechaNacimiento" slot="activator" required readonly></v-text-field>
                            <v-date-picker v-model="procariano.fechaNacimiento" scrollable>
                              <v-spacer></v-spacer>
                              <v-btn flat color="primary" @click="modal = false">Cancel</v-btn>
                              <v-btn flat color="primary" @click="$refs.dialog.save(procariano.fechaNacimiento)">OK</v-btn>
                            </v-date-picker>
                        </v-dialog>
                      </v-flex>
                      <v-flex xs12 sm6>
                        <v-text-field name="cedula" label="Cédula" v-model="procariano.cedula" type="text" required :mask="masks.cedula" :rules="[rules.required]"></v-text-field>
                      </v-flex>
                      <v-flex xs12 sm6>
                        <v-select :items="generos" v-model="procariano.genero" label="Género" item-text="texto" item-value="id" required :rules="[rules.required]"></v-select>
                      </v-flex>
                      <v-flex xs12 sm6>
                        <v-text-field name="email" label="Email" v-model="procariano.email" type="email" required :rules="[rules.required, rules.email]"></v-text-field>
                      </v-flex>
                    </v-layout>
                  </v-container>
                </v-tab-item>
                <v-tab-item id="tab-personal">
                  <v-container grid-list-xl fluid>
                    <v-layout wrap>
                      <v-flex xs12 sm6>
                        <v-text-field name="celular" label="Telf. Celular" v-model="procariano.celular" type="text" required :rules="[rules.required]" :mask="masks.celular"></v-text-field>
                      </v-flex>
                      <v-flex xs12 sm6>
                        <v-text-field name="convencional" label="Telf. Convencional" v-model="procariano.convencional" type="text" required :rules="[rules.required]" :mask="masks.convencional"></v-text-field>
                      </v-flex>
                      <v-flex xs12 sm6>
                        <v-text-field name="colegio" label="Colegio" v-model="procariano.colegio" type="text" :rules="[rules.specialChar]"></v-text-field>
                      </v-flex>
                      <v-flex xs12 sm6>
                        <v-text-field name="universidad" label="Universidad" v-model="procariano.universidad" type="text" :rules="[rules.specialChar]"></v-text-field>
                      </v-flex>
                      <v-flex xs12 sm6>
                        <v-text-field name="direccion" label="Dirección" v-model="procariano.direccion" type="text" required :rules="[rules.required, rules.specialChar]"></v-text-field>
                      </v-flex>
                      <v-flex xs12 sm6>
                        <v-text-field name="trabajo" label="Trabajo" v-model="procariano.trabajo" type="text" :rules="[rules.specialChar]"></v-text-field>
                      </v-flex>    
                    </v-layout>
                  </v-container>
                </v-tab-item>
                <v-tab-item id="tab-procare">
                  <v-container grid-list-xl fluid>
                    <v-layout wrap>
                      <v-flex xs12 sm6>
                        <v-select :items="tipos" v-model="procariano.tipo" label="Tipo"></v-select>
                      </v-flex>
                      <v-flex xs12 sm6>
                        <v-text-field name="promocion" v-model="procariano.promocion" label="Promoción" :rules="[rules.specialChar]"></v-text-field>
                      </v-flex>
                      <v-flex xs12 sm6>
                        <v-dialog ref="dialogoOpcion" width="290px" v-model="modalOpcion" persistent lazy full-width :return-value.sync="procariano.fechaOpcion">
                          <v-text-field name="fechaOpcion" label="Fecha de Opción" v-model="procariano.fechaOpcion" slot="activator" readonly></v-text-field>
                            <v-date-picker v-model="procariano.fechaOpcion" scrollable>
                              <v-spacer></v-spacer>
                              <v-btn flat color="primary" @click="modalOpcion = false">Cancel</v-btn>
                              <v-btn flat color="primary" @click="$refs.dialogoOpcion.save(procariano.fechaOpcion)">OK</v-btn>
                            </v-date-picker>
                        </v-dialog>
                      </v-flex>
                      <v-flex xs 12 sm6>
                        <v-select :items="grupos" v-model="procariano.grupo" label="Grupo"></v-select>
                      </v-flex>    
                    </v-layout>
                  </v-container>
                </v-tab-item>
              </v-tabs-items>
            </v-form>
          </v-card-text>
          <v-card-actions class="hidden-xs-only">
            <v-btn flat class="btn-cancelar ml-3">
              <v-icon left>cancel</v-icon>
              Cancelar
            </v-btn>
            <v-spacer></v-spacer>
            <v-btn flat class="btn-continuar mr-3" slot="activator" @click.native="modalEditar = true" :disabled="!formValid">
              Confirmar
              <v-icon right>send</v-icon>
            </v-btn>
          </v-card-actions>
          <v-card-actions class="hidden-sm-and-up pb-3">
            <v-btn flat icon color="red" class="ml-3">
              <v-icon large>clear</v-icon>
            </v-btn>
            <v-spacer></v-spacer>
            <v-btn flat icon color="primary" class="mr-3" slot="activator" @click.native="modalEditar = true" :disabled="!formValid">
              <v-icon large>send</v-icon>
            </v-btn>
          </v-card-actions>
        </v-card>
        <v-dialog v-model="modalEditar" persistent>
          <v-card>
            <v-card-title primary-title class="pb-1">
              <h2>Editar Procariano</h2>
            </v-card-title>
            <v-divider></v-divider>
            <v-card-text class="mt-1 pb-1">
              <p>
                ¿Desea confirmar estos cambios a los datos de {{ procariano.nombres }} {{ procariano.apellidos }}?
              </p>
            </v-card-text>
            <v-card-actions class="pt-0">
              <v-spacer></v-spacer>
              <v-btn flat @click.native="modalEditar = false">No</v-btn>
              <v-btn flat @click.native="confirmarEdicion">Si</v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
      </v-flex>
    </v-layout>
  </v-container>
</template>
<script>
export default {
  computed: {
    grupos () {
      return this.$store.getters.grupos
    },
    rules () {
      return this.$store.getters.rules
    },
    masks () {
      return this.$store.getters.masks
    },
    procariano () {
      return this.$store.getters.procariano
    }
  },
  data () {
    return {
      modal: '',
      modalOpcion: '',
      modalEditar: false,
      tab: 'tab-general',
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
      tipos: ['Chico Formación', 'Caminante', 'Pescador', 'Pescador Consgagrado', 'Sacerdote', 'Mayor'],
      formValid: true,
      alertError: false
    }
  },
  methods: {
    pickFile () {
      this.$refs.fileInput.click()
    },
    onFilePicked (event) {
      const files = event.target.files
      if (files.length === 0) {
        return
      }
      let filename = files[0].name
      if (filename.lastIndexOf('.') <= 0) {
        return alert('Invalid file')
      }
      const fileReader = new FileReader()
      fileReader.addEventListener('load', () => {
        this.procariano.imagen = fileReader.result
      })
      fileReader.readAsDataURL(files[0])
    },
    confirmarEdicion () {
      this.$router.go(-1)
    }
  }
}
</script>
<style scoped>
  .tabs {
    width: 100% !important;
  }
  .show-image i {
    position: absolute;
    display: none;
  }
  .show-image:hover img {
    opacity: 0.5;
  }
  .show-image:hover i{
    display: flex;
  }
</style>