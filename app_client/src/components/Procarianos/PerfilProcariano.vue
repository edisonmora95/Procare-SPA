<template>
  <v-container fluid fill-height>
    <v-layout align-center justify-center wrap row>
      <v-flex xs12 sm10 md8 v-if="procariano && procariano !== undefined">
        <v-card class="elevation-12">
          <v-card-title primary-title>
            <h1 class="mx-auto display-1">Perfil Procariano</h1>
          </v-card-title>
          <v-card-media class="card-avatar">
            <v-avatar size="150" class="mx-auto my-2">
              <img v-if="!procariano.imagen" src="http://via.placeholder.com/150x150">
              <img v-else :src="procariano.imagen">
            </v-avatar>
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
            <v-tabs-items v-model="tab">
              <v-tab-item id="tab-general">
                <v-container grid-list-xl fluid>
                  <v-layout wrap>
                    <v-flex xs12 sm6>
                      <label>Nombres</label>
                      <p>{{ procariano.nombres }}</p>
                    </v-flex>
                    <v-flex xs12 sm6>
                      <label>Apellidos</label>
                      <p>{{ procariano.apellidos }}</p>
                    </v-flex>
                    <v-flex xs12 sm6>
                      <label>Fecha de nacimiento</label>
                      <p>{{ procariano.fechaNacimiento | moment}}</p>
                    </v-flex>
                    <v-flex xs12 sm6>
                      <label>Cédula</label>
                      <p>{{ procariano.cedula }}</p>
                    </v-flex>
                    <v-flex xs12 sm6>
                      <label>Género</label>
                      <p>{{ procariano.genero }}</p>
                    </v-flex>
                    <v-flex xs12 sm6>
                      <label>Email</label>
                      <p>{{ procariano.email }}</p>
                    </v-flex>
                  </v-layout>
                </v-container>
              </v-tab-item>
              <v-tab-item id="tab-personal">
                <v-container grid-list-xl fluid>
                  <v-layout wrap>
                    <v-flex xs12 sm6>
                      <label>Celular</label>
                      <p>{{ procariano.celular || '---' }}</p>
                    </v-flex>
                    <v-flex xs12 sm6>
                      <label>Convencional</label>
                      <p>{{ procariano.convencional || '---' }}</p>
                    </v-flex>
                    <v-flex xs12 sm6>
                      <label>Colegio</label>
                      <p>{{ procariano.colegio || '---' }}</p>
                    </v-flex>
                    <v-flex xs12 sm6>
                      <label>Universidad</label>
                      <p>{{ procariano.universidad || '---' }}</p>
                    </v-flex>
                    <v-flex xs12 sm6>
                      <label>Dirección</label>
                      <p>{{ procariano.direccion || '---' }}</p>
                    </v-flex>
                    <v-flex xs12 sm6>
                      <label>Trabajo</label>
                      <p>{{ procariano.trabajo || '---' }}</p>
                    </v-flex>
                  </v-layout>
                </v-container>
              </v-tab-item>
              <v-tab-item id="tab-procare">
                <v-container grid-list-xl fluid>
                  <v-layout wrap>
                    <v-flex xs12 sm6>
                      <label>Tipo</label>
                      <p>{{ procariano.tipo }}</p>
                    </v-flex>
                    <v-flex xs12 sm6>
                      <label>Promoción</label>
                      <p>{{ procariano.promocion || '---' }}</p>
                    </v-flex>
                    <v-flex xs12 sm6>
                      <label>Fecha Opción</label>
                      <p>{{ procariano.fechaOpcion | moment }}</p>
                    </v-flex>
                    <v-flex xs12 sm6>
                      <label>Grupo</label>
                      <p>{{ procariano.grupo }}</p>
                    </v-flex>
                  </v-layout>
                </v-container>
              </v-tab-item>
            </v-tabs-items>
          </v-card-text>
          <v-card-actions class="hidden-xs-only">
            <v-btn flat class="btn-cancelar ml-3" slot="activator" @click.native="modalEliminar=true">
              <v-icon left>cancel</v-icon>
              Eliminar
            </v-btn>
            <v-spacer></v-spacer>
            <v-btn flat class="btn-continuar mr-3" @click.native="editar()">
              Editar
              <v-icon right>edit</v-icon>
            </v-btn>
          </v-card-actions>
          <v-card-actions class="hidden-sm-and-up pb-3">
            <v-btn flat icon color="red" class="ml-3" @click.native="modalEliminar=true">
              <v-icon large>clear</v-icon>
            </v-btn>
            <v-spacer></v-spacer>
            <v-btn flat icon color="primary" class="mr-3" @click.native="editar()">
              <v-icon large>edit</v-icon>
            </v-btn>
          </v-card-actions>
        </v-card>
        <v-dialog v-model="modalEliminar" persistent>
          <v-card>
            <v-card-title primary-title class="pb-1">
              <h2>Eliminar Procariano</h2>
            </v-card-title>
            <v-divider></v-divider>
            <v-card-text class="mt-1 pb-1">
              <p>
                ¿Desea eliminar de la base de datos a {{ procariano.nombres }} {{ procariano.apellidos }}?
              </p>
            </v-card-text>
            <v-card-actions class="pt-0">
              <v-spacer></v-spacer>
              <v-btn flat @click.native="modalEliminar = false">No</v-btn>
              <v-btn flat @click.native="modalEliminar = false">Si</v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
      </v-flex>
    </v-layout>
  </v-container>
</template>
<script>
export default {
  created () {
    let nombres = this.$route.params.id.split('-')[0]
    if (nombres.split('_').length > 1) {
      nombres = nombres.split('_')[0].concat(' ').concat(nombres.split('_')[1])
    } else {
      nombres = nombres.split('_')[0]
    }
    let apellidos = this.$route.params.id.split('-')[1]
    if (apellidos.split('_').length > 1) {
      apellidos = apellidos.split('_')[0].concat(' ').concat(apellidos.split('_')[1])
    } else {
      apellidos = apellidos.split('_')[0]
    }
    this.getProcariano(nombres, apellidos)
  },
  computed: {
    procarianos () {
      return this.$store.getters.procarianos
    }
  },
  data () {
    return {
      tab: 'tab-general',
      modalEliminar: false,
      procariano: null
    }
  },
  methods: {
    eliminar () {

    },
    editar () {
      this.$router.push(this.$route.path + '/editar')
    },
    getProcariano (nombres, apellidos) {
      this.procariano = this.procarianos.find((procariano) => {
        return procariano.nombres === nombres && procariano.apellidos === apellidos
      })
    }
  }
}
</script>
<style scoped>
  .tabs {
    width: 100% !important;
  }
  label {
    color: #9e9e9e;
  }
</style>
