<template>
  <v-container fluid fill-height class="login-background">
    <v-layout align-center justify-center>
      <v-flex xs10 sm6 md4>
        <v-card class="elevation-12">
          <v-card-media
            src="/static/nuevo_logo_procare.jpg"
            height="200px"
            contain>
          </v-card-media>
          <v-card-text>
            <v-form>
              <v-text-field
                prepend-icon="email"
                name="email"
                label="Email"
                type="text"
                v-model="email"
                required>
              </v-text-field>
              <v-text-field
                prepend-icon="lock"
                name="password"
                label="Contraseña"
                type="password"
                v-model="password"
                required>
              </v-text-field>
            </v-form>
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn class="btn-continuar" @click="login">Login</v-btn>
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
        email: '',
        password: ''
      }
    },
    methods: {
      login () {
        this.$store.commit('setLoggedIn', true)
        this.$router.push('/')
      }
    }
  }
</script>

<style scoped>
  .login-background {
    background: rgba(245,145,29,0.7);
  }
</style>

