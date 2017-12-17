<template>
  <div class="account">
    <h1 class="pagetitle">{{ title }}</h1>
    <div v-if="this.user.loggedin">
      <p>{{ user.naam }}</p>
      <p>{{ user.email }}</p>
      <p>{{ user.gsm }}</p>
    <form @submit.prevent="logout">
      <div class="control">
        <button id='logout' class="button is-link fullwidth">Logout</button>
      </div>
    </form>
    </div>
    <div v-else>
      <p>Je bent niet ingelogd</p>
    </div>
  </div>
</template>

<script>
/* eslint-disable */
import axios from 'axios'
import VueLocalStorage from 'vue-ls'
import Vue from 'vue'
import Router from 'vue-router'
let btoa = require('btoa');
let router = new Router();
Vue.use(VueLocalStorage); 
Vue.use(Router)
export default {
  name: 'account',
  data () {
    return {
      title: 'account',
      user: {
        naam: null,
        email: null,
        gsm: null,
        loggedin: false
      },
      errors: []
    }
  },
  created () {
    if(Vue.ls.get('id')){      
      this.user.loggedin = true
      this.getinfo();
    }else{
      this.user.loggedin = false
      this.$router.push('/Account/Login')
    }
  },
  methods: {
    getinfo: function(){
          let id = Vue.ls.get('id');
          var url = 'http://localhost/duracar/user/'+id+'?_format=hal_json';
          var hash = Vue.ls.get('auth');
          var unhash = String(window.atob(hash));
          var index = unhash.indexOf(":");
          var naam = unhash.substring(0, unhash.indexOf(":"));
          var ww = unhash.substring(unhash.indexOf(':') + 1, unhash.length)
          axios.get(url,{
            auth: {
              username: naam,
              password: ww
            }
          })
          .then((data) => {  
            this.user.naam = data.data.name[0].value ;
            this.user.email = data.data.mail[0].value ;
            this.user.gsm =  data.data.field_gsm_nummer[0].value        
          })
    },
    logout () {
       axios.post('http://localhost/duracar/user/logout?_format=hal+json',
      {
        headers: {
          'accept': 'application/hal+json',
          'content-type': 'application/hal+json'            
        },
        body: {
          csrf_token: Vue.ls.get('csrftoken'),
          logout_token: Vue.ls.get('logout-token')
        }
      })
      .then( fresponse => {
            this.$parent.ingelogd = false;
            this.user.loggedin= false;
            Vue.ls.remove('csrftoken');
            Vue.ls.remove('id');
            Vue.ls.remove('logout-token');
            Vue.ls.remove('naam');
            Vue.ls.remove('uuid'); 
            Vue.ls.remove('auth'); 

      })
      .catch( e => {        
              if(e.response.status == 403){
                this.errors.push("Je bent reeds uitgelogd")
              }else{
                this.errors.push(e.response.statusText)
              }            
      });
    },
  }
}
</script>
