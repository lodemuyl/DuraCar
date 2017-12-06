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
          <p>Dag {{ naam }}, je bent succesvol Ingelogd!.</p>
          <router-link to="/Account">Ga naar mijn profiel</router-link>
        </div> 
      </div>     
    </div>
    <form @submit.prevent="logout">
      <div class="control">
        <button id='logout' class="button is-link fullwidth">Logout</button>
      </div>
    </form>
  </div>
</template>

<script>
/* eslint-disable */
import axios from 'axios'
import VueLocalStorage from 'vue-ls'
import Vue from 'vue'
import '@/assets/js/bulma.js'
let btoa = require('btoa');
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
  created () {    
  },
  methods: {
    login () {  
      this.errors = [] 
      axios.post('http://localhost/duracar/user/login?_format=hal_json',
      {
      "_links": {
        "type": {
          "href": "http://localhost/duracar/rest/type/user/user"	
        }
      },
      "name": this.naam,
      "pass": this.wachtwoord
      })
          .then( fresponse => {
              this.$parent.user.csrf_token = fresponse.data.csrf_token;
              this.$parent.user.logout_token = fresponse.data.logout_token;
              this.$parent.user.name = fresponse.data.current_user.name;
              this.$parent.ingelogd = true;
              //token opslaan in local storage
              Vue.ls.set('csrftoken', fresponse.data.csrf_token, 60 * 60 * 3000); //3 uur geldig
              Vue.ls.set('uuid', fresponse.data.current_user.uid, 60 * 60 * 3000);
              Vue.ls.set('logout-token', fresponse.data.logout_toke, 60 * 60 * 3000);
              Vue.ls.set('naam', fresponse.data.current_user.name, 60 * 60 * 3000);
              Vue.ls.set('auth', 'Basic' + btoa(this.naam + ':' + this.wachtwoord), 60 * 60 * 3000)
              this.getuser();    
              this.formSubmitted = true
              next('/Account');

          })
          .catch( e => {
            if(e.response.data.message == "Sorry, unrecognized username or password."){
              this.errors.push('Gebruikersnaam en wachtwoord komen niet overeen.')
            }else{
              this.errors.push(e.response.statusText)
            }
          });
    },
    logout () {
       axios.post(' http://localhost/duracar/user/logout',
      {
        headers: {
          'accept': 'application/hal+json',
          'content-type': 'application/hal+json',
          'X-CSRF-Token': 'LGlv38GD4PL66hWfKE4UJ4wYifcrLaYkGvuWqW6FcSI'
        },
        body: {
          csrf_token: Vue.ls.get('csrftoken'),
          logout_token: Vue.ls.get('logout-token')
        }
      })
      .then( fresponse => {
            this.$parent.ingelogd = false;
            Vue.ls.remove('csrftoken');
            Vue.ls.remove('uuid');
            Vue.ls.remove('logout-token');
            Vue.ls.remove('naam');
            console.log(fresponse)
      })
      .catch( e => {        
              if(e.response.status == 403){
                this.errors.push("Je bent reeds uitgelogd")
              }else{
                this.errors.push(e.response.statusText)
              }            
      });
    },
    getuser () {
       let id = Vue.ls.get('uuid');
       let auth = Vue.ls.get('auth')
       var url = 'http://localhost/duracar/user/'+1+'?_format=hal_json'
       axios.get(url,{
         auth: {
           username: this.naam,
           password: this.wachtwoord
         },
         'headers': {
           'Authorization': auth
         }
       })
       .then((data) => {
         console.log(data)
       })
    }
  }
}
</script>
