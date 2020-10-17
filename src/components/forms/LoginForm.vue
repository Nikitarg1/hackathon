<template>
  <div class="row mx-auto"
       style="margin-top: 30px; max-width: 400px">
    <div class="col-12 text-center">
      <v-avatar
          rounded
          size="128">
        <v-icon dense size="128">mdi-account-circle</v-icon>
      </v-avatar>
      <p class="subtitle-1">{{ !this.isLogin ? 'Регистрация в дневнике' : 'Вход в дневник' }}</p>
    </div>
    <v-card
        class="mx-auto col-12">
      <v-card-text>
        <b>Электорнная почта</b>
        <v-text-field
            :error="errors.login.error"
            :error-messages="errors.login.errorMessage"
            :rules="[ rules.required ]"
            dense
            outlined
            ref="login"
            type="text"
            v-model="form.login">
        </v-text-field>
        <b>Пароль</b>
        <v-text-field
            :append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
            :error="errors.password.error"
            :error-messages="errors.password.errorMessage"
            :rules="[ rules.required, !isLogin ? rules.minLength(6) : true]"
            :type="showPassword ? 'text' : 'password'"
            @click:append="showPassword = !showPassword"
            dense
            outlined
            ref="password"
            v-model="form.password">
        </v-text-field>
        <b v-show="!isLogin">Потвердите пароль</b>
        <v-text-field
            :append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
            :rules="[ rules.required, rules.passwordConfirm(this.form.password) ]"
            :type="showPassword ? 'text' : 'password'"
            @click:append="showPassword = !showPassword"
            dense
            outlined
            ref="password"
            v-show="!isLogin">
        </v-text-field>
        <v-row dense>
          <v-col cols="12">
            <v-btn
                @click="login"
                block
                color="green"
                dark
                depressed
                style="text-transform: none; font-weight: 600;letter-spacing: .0592857143em;"
            >
              {{ !this.isLogin ? 'Зарегистрироваться' : 'Войти' }}
            </v-btn>
          </v-col>
        </v-row>
      </v-card-text>
    </v-card>
    <v-btn
        @click.prevent="isLogin = !isLogin"
        block
        class="col-12 mt-6"
        height="60"
        outlined
        style="text-transform: none; font-weight: 500;letter-spacing: .0792857143em; font-size: 18px">
      {{ !this.isLogin ? 'Старый тут? Войти.' : 'Новый тут? Зарегайся.' }}
    </v-btn>
  </div>
</template>

<script>
import rules from "../helpers/rules";

import * as firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";

export default {
  name: "LoginForm",
  data: () => ({
    isLogin: true,
    rules: rules,
    showPassword: false,
    form: {
      login: '',
      password: ''
    },
    errors: {
      login: {
        error: false,
        errorMessage: ''
      },
      password: {
        error: false,
        errorMessage: ''
      }
    }
  }),
  methods: {
    resetErrors() {
      Object.keys(this.errors).forEach(key => {
        this.errors[key].error = false;
        this.errors[key].errorMessage = '';
      })
    },
    login() {
      this.resetErrors()
      if (this.isLogin) {
        firebase.auth().signInWithEmailAndPassword(this.form.login, this.form.password)
            .then( response => {
              console.log(response)
              const settings = {
                email: response.user.email,
                uid: response.user.uid
              }
              console.log(settings)
              this.$router.push('/')
              // this.$emit('user', settings)
              localStorage.setItem('user', settings)
            })
            .catch(error => {
              this.errors.login.errorMessage = error.message
              this.errors.login.error = true
            });
      } else {
        firebase.auth().createUserWithEmailAndPassword(this.form.login, this.form.password)
            .then(() => {
              this.$emit('regSuccess', 'sign-in');
              this.$router.push('/')
            })
            .catch(error => {
              this.errors.login.errorMessage = error.message
              this.errors.login.error = true
            })
      }


      // this.url = this.isLogin ? 'login' : 'register'
      // this.fetchLogin(this.callbackAuth, data)
    },
    // callbackAuth(data) {
    //   let token = data.access_token;
    //   if (token) {
    //     localStorage.setItem('access_token', token)
    //     window.location.href = '/';
    //     return;
    //   }
    //   this.errors.login.errorMessage = data.message
    //   this.errors.login.error = true
    // }
  }
}
</script>

<style scoped>

</style>