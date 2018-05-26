<template>
  <v-container fluid fill-height class="login-background">
    <v-layout align-center justify-center>
      <v-flex xs10 sm6 md4>
        <v-alert type="error" dismissible v-model="alert" @input="onClose" v-if="error">
          {{ error }}
        </v-alert>
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
                @keypress="keypressed($event)"
                required>
              </v-text-field>
              <v-text-field
                prepend-icon="lock"
                name="password"
                label="Contraseña"
                type="password"
                v-model="password"
                @keypress="keypressed($event)"
                required>
              </v-text-field>
            </v-form>
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn class="btn-continuar" :disabled="disabled" :loading="loading" @click="login">Login</v-btn>
          </v-card-actions>
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
  export default {
    computed: {
      error () {
        return this.$store.getters.error
      },
      loading () {
        return this.$store.getters.loading
      },
      disabled () {
        return this.email === undefined || !this.email || this.email === '' || this.password === undefined || !this.password || this.password === '' || this.loading
      }
    },
    watch: {
      error (value) {
        if (value) {
          this.alert = true
        }
      }
    },
    data () {
      return {
        email: '',
        password: '',
        alert: true
      }
    },
    methods: {
      login () {
        this.$store.dispatch('login', {correo: this.email, password: this.password})
      },
      keypressed (e) {
        const code = (e.keyCode ? e.keyCode : e.which)
        if (code === 13) {
          this.login()
        }
      },
      onClose () {
        this.$store.commit('setError', null)
      }
    }
  }
</script>

<style scoped>
  .login-background {
    background: rgba(245,145,29,0.7);
  }
</style>

