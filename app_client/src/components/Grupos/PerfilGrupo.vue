<template>
  <v-container fluid fill-height>
    <v-layout align-center justify-center wrap row>
      <v-flex xs12 sm10 md8>
        <v-card class="elevation-12">
          <v-card-title primary-title>
            <h1 class="mx-auto display-1">{{ grupo.nombre }}</h1>
          </v-card-title>
          <v-card-title primary-title>
            <span class="mx-auto subheading">{{ grupo.etapa }}</span>
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
                  <v-list-tile v-for="item in integrantes" :key="item.id" @click="editar">
                    <v-list-tile-avatar>
                      <v-icon>person</v-icon>
                    </v-list-tile-avatar>
                    <v-list-tile-content>
                      <v-list-tile-title>{{ item.nombres }} {{item.apellidos}} </v-list-tile-title>
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
  data () {
    return {
      grupo: {
        id: '10',
        nombre: 'Grupo del Chino',
        etapa: 'Primera etapa'
      },
      animador: {
        imagen: '',
        nombres: 'Rafael',
        apellidos: 'Hernandez'
      },
      integrantes: [
        {
          id: '1',
          nombres: 'Emilio Jose',
          apellidos: 'Mora Cazar'
        },
        {
          id: '2',
          nombres: 'Jose',
          apellidos: 'Viteri'
        },
        {
          id: '3',
          nombres: 'Carlo',
          apellidos: 'Banchón'
        },
        {
          id: '4',
          nombres: 'Gustavo',
          apellidos: 'Dávila'
        },
        {
          id: '1',
          nombres: 'Emilio Jose',
          apellidos: 'Mora Cazar'
        },
        {
          id: '2',
          nombres: 'Jose',
          apellidos: 'Viteri'
        },
        {
          id: '3',
          nombres: 'Carlo',
          apellidos: 'Banchón'
        },
        {
          id: '4',
          nombres: 'Gustavo',
          apellidos: 'Dávila'
        },
        {
          id: '1',
          nombres: 'Emilio Jose',
          apellidos: 'Mora Cazar'
        },
        {
          id: '2',
          nombres: 'Jose',
          apellidos: 'Viteri'
        },
        {
          id: '3',
          nombres: 'Carlo',
          apellidos: 'Banchón'
        },
        {
          id: '4',
          nombres: 'Gustavo',
          apellidos: 'Dávila'
        },
        {
          id: '1',
          nombres: 'Emilio Jose',
          apellidos: 'Mora Cazar'
        },
        {
          id: '2',
          nombres: 'Jose',
          apellidos: 'Viteri'
        },
        {
          id: '3',
          nombres: 'Carlo',
          apellidos: 'Banchón'
        },
        {
          id: '4',
          nombres: 'Gustavo',
          apellidos: 'Dávila'
        },
        {
          id: '1',
          nombres: 'Emilio Jose',
          apellidos: 'Mora Cazar'
        },
        {
          id: '2',
          nombres: 'Jose',
          apellidos: 'Viteri'
        },
        {
          id: '3',
          nombres: 'Carlo',
          apellidos: 'Banchón'
        },
        {
          id: '4',
          nombres: 'Gustavo',
          apellidos: 'Dávila'
        }
      ]
    }
  },
  methods: {
    editar () {
      this.$router.push(this.$route.path + '/editar')
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
