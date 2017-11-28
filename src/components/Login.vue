<template>
  <div class="login">
    <h1 class="pagetitle">{{ title }}</h1>
    <form @submit.prevent="login" v-if="!formSubmitted">
      <div class="columns is-mobile">
        <div class="column is-10 is-offset-1">    

          <div class="field">
            <label class="label">Naam</label>
            <div class="control">
              <input v-model="naam" v-validate.initial="naam" data-vv-rules="required"  class="input" type="text" placeholder="Volledige naam">
            </div>            
          </div>

          <div class="field">
            <label class="label">Wachtwoord</label>
            <p class="control has-icons-left">
              <input name="wachtwoord" v-model="wachtwoord"  class="input" type="password" placeholder="Wachtwoord">
              <span class="icon is-small is-left">
                <i class="fa fa-lock"></i>
              </span>             
            </p>
          </div>
          <div class="">
            <div class="control">
              <button id='login' class="button is-link fullwidth">Login</button>
            </div>
            <div class="control center">
              <router-link to="/Account/Registreer" class="button has-text-centered is-text">Registreer</router-link>
            </div>
          </div>        
        </div>
      </div>
      <div class="columns is-mobile">
        <div class="column is-10 is-offset-1">
          <div  v-if="errors.length !== 0">
            <div class="notification is-danger">
              <p v-for="errors in errors">{{ errors }}</p>          
            </div>
          </div>
        </div>      
      </div>
    </form>    
    <div v-else class="columns is-mobile" >
      <div class="column is-10 is-offset-1">
        <div class="notification is-primary">
          <p>Je bent succesvol Ingelogd!.</p>
        </div> 
      </div>     
    </div>
  </div>
</template>

<script>
/* eslint-disable */
import axios from 'axios'
import VueLocalStorage from 'vue-ls'
import Vue from 'vue'
import '@/assets/js/bulma.js'
let md5 = require('md5.js');
Vue.use(VueLocalStorage); 

export default {
  name: 'login',
  data () {
    return {
      title: 'login',
      naam: null,
      wachtwoord: null,
      errors: [],
      formSubmitted: false
    } 
  },
  create () {
    md5('Message to hash');
    var hash = md5.create();
    console.log(hash);
  },
  methods: {
    login () {
      axios.post(' http://localhost/duracar/user/login?_format=hal_json',
      {
      "_links": {
        "type": {
          "href": "http://localhost/duracar/rest/type/user/user"	
        }
      },
      "name": this.naam,
      "pass": this.wachtwoord
      },this.config)
          .then( fresponse => {
              this.$parent.user.csrf_token = fresponse.data.csrf_token;
              this.$parent.user.logout_token = fresponse.data.logout_token;
              this.$parent.user.name = fresponse.data.current_user.name;
              //token opslaan in local storage
              Vue.ls.set('csrftoken', fresponse.data.csrf_token, 60 * 60 * 3000); //3 uur geldig
              Vue.ls.set('loginnaam', fresponse.data.current_user.name, 60 * 60 * 3000);
              this.formSubmitted = true

          })
          .catch( e => {
            if(e.response.data.message == "Sorry, unrecognized username or password."){
              this.errors.push('Gebruikersnaam en wachtwoord komen niet overeen.')
            }else{
              this.errors.push(e.response.statusText)
            }
          });
    }
  }
}
</script>
