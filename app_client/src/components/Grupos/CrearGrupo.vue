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
                    <v-select :items="animadores" v-model="grupo.animador" label="Animador" item-text="texto" item-value="id" required :rules="[rules.required]"></v-select>
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
              <v-btn flat class="btn-continuar mr-3 right" @click="crearGrupo">
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
                  <v-list-tile v-for="item in sinGrupo" :key="item.id">
                    <v-list-tile-action>
                      <v-checkbox v-model="item.seleccionado"></v-checkbox>
                    </v-list-tile-action>
                    <v-list-tile-content>
                      <v-list-tile-title>{{ item.nombres }} {{item.apellidos}} </v-list-tile-title>
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
                  <v-list-tile v-for="item in integrantes" :key="item.id">
                    <v-list-tile-action>
                      <v-checkbox v-model="item.seleccionado"></v-checkbox>
                    </v-list-tile-action>
                    <v-list-tile-content>
                      <v-list-tile-title>{{ item.nombres }} {{item.apellidos}} </v-list-tile-title>
                    </v-list-tile-content>
                  </v-list-tile>
                </v-list>
              </v-flex>
            </v-layout>
            <v-layout row>
              <v-spacer></v-spacer>
              <v-btn flat class="btn-continuar mr-3 right" @click="anadirIntegrantes">
                Continuar
                <v-icon right>send</v-icon>
              </v-btn>  
            </v-layout>
          </v-card-text>
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>
<script>
export default {
  computed: {
    rules () {
      return this.$store.getters.rules
    },
    etapas () {
      return this.$store.getters.etapas
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
        animador: ''
      },
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
      animadores: [
        {
          id: '1',
          texto: 'Rafael Hernandez'
        },
        {
          id: '2',
          texto: 'Lenin Gordillo'
        }
      ],
      estado: 'general',
      sinGrupo: [
        {
          id: '1',
          seleccionado: false,
          nombres: 'Emilio Jose',
          apellidos: 'Mora Cazar'
        },
        {
          id: '2',
          seleccionado: false,
          nombres: 'Jose',
          apellidos: 'Viteri'
        },
        {
          id: '3',
          seleccionado: false,
          nombres: 'Carlo',
          apellidos: 'Banchón'
        },
        {
          id: '4',
          seleccionado: false,
          nombres: 'Gustavo',
          apellidos: 'Dávila'
        }
      ],
      integrantes: [
        {
          id: '5',
          seleccionado: false,
          nombres: 'Jose Efrain',
          apellidos: 'Ulloa Silva'
        }
      ]
    }
  },
  methods: {
    crearGrupo () {
      this.estado = 'integrantes'
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
    anadirIntegrantes () {
      console.log('Se añadieron los integrantes al grupo')
    }
  }
}
</script>
<style scoped>
  .card__text h3, h4, h5 {
    text-align: center;
  }
</style>
