<template>
  <div class="account">
    <h1 v-if="this.user.loggedin" class="pagetitle">{{ user.naam }}</h1>
    <div v-if="this.user.loggedin">
      <div class="columns is-mobile">
        <div class="column is-10 is-offset-1">
          <div  v-if="errors.length !== 0" class="notification is-danger">
            <p v-for="error in errors">{{ error }}</p>
            <p>Probeer opnieuw of neem contact op met de administrator</p>
          </div>
        </div>
      </div>
        <div class="card noshadow grey white">
          <div class="card-content">
            <div class="content">
                <div class="columns is-mobile">
                  <div class="column customcolumn">
                    <h2 class="alineatitle bold red">Email</h2>
                    <p><span class="bold"> {{ user.email }} </span><a @click="modaltoggle(user.email)"><i class="fa fa-pencil fa-lg showModal red" aria-hidden="true"></i></a></p>
                  </div>
                </div>
                <div class="columns is-mobile">
                  <div class="column customcolumn">
                    <h2 class="alineatitle bold red">Gebruikersnaam</h2>
                    <p><span class="bold"> {{ user.naam }} </span><a @click="modaltoggle(user.naam)"><i class="fa fa-pencil fa-lg showModal red" aria-hidden="true"></i></a></p>
                  </div>
                </div> 
                <div class="columns is-mobile">
                  <div class="column customcolumn">
                    <h2 class="alineatitle bold red">Gsm</h2>
                    <p><span class="bold">{{ user.gsm }} </span><a @click="modaltoggle(user.gsm)"><i class="fa fa-pencil fa-lg showModal red" aria-hidden="true"></i></a></p>
                  </div>
                </div> 
                <div class="columns is-mobile">
                  <div class="column customcolumn">
                    <h2 class="alineatitle bold red">Afbeelding</h2>
                    <div class="frontpageimages nomargin">
                      <img v-show="thumbnail" :src="thumbnail">
                      <img v-show="!thumbnail" src="../assets/images/account.png">
                    </div>
                  </div>
                </div> 
            </div>
          </div> 
        </div>  

        <div  class="modal" v-bind:class="{ 'is-active': modal }">
          <div class="modal-background"></div>
          <div class="modal-card">
            <header class="modal-card-head fullwidth">
              <p class="modal-card-title lemonmilk">Wijzigen</p>
              <button  @click="modaltoggle()" class="delete" aria-label="close"></button>
            </header>
            <section class="modal-card-body">
              <input class="input" v-model="updateval" v-bind:placeholder="placeholder"></inpu>
            </section>
            <footer class="modal-card-foot">
              <a class="button is-success" @click="wijzigen()">Wijzigen</a>
              <a class="button" @click="modaltoggle()" >Annuleren</a>
            </footer>
          </div>
        </div>

        <div class="card noshadow nominheight">
          <div class="card-content"> 
            <router-link to="Account/mijnautos" class="button is-link fullwidth">Mijn auto's</router-link>
            <router-link to="Account/Gehuurdeautos" class="button is-link fullwidth">Gehuurde auto's</router-link>
            <form @submit.prevent="logout">
              <div class="control">
                <button id='logout' class="button is-link fullwidth">Logout</button>
              </div>
            </form>
          </div>
        </div>
    </div>
    <div v-else>
      <p class="center">Je bent niet ingelogd</p>
    </div>
  </div>
</template>
<script>
/* eslint-disable */
import axios from 'axios'
import VueLocalStorage from 'vue-ls'
import Vue from 'vue'
import Router from 'vue-router'
//encrypten en decrypten van auth gegevens
let btoa = require('btoa');
//toevoegen van routes voor het refreshen indien je niet ingelogd bent
let router = new Router();
//vue local storage voor ophalen en wegschrijven van usergegevens
Vue.use(VueLocalStorage); 
Vue.use(Router)
export default {
  name: 'account',
  data () {
    return {
      title: 'account',
      modal: false,
      active: null,
      updateval: null,
      placeholder: null,
      thumbnail: null,
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
    //logincheck
    if(Vue.ls.get('id')){      
      this.user.loggedin = true
      this.getinfo();
    }else{
      this.user.loggedin = false
      this.$router.push('/Account/Login')
    }
  },
  methods: {
    //ophalen user gegevens
    getinfo: function(){
          let id = Vue.ls.get('id');
          let url = 'http://localhost/duracar/user/'+id+'?_format=hal_json';
          let hash = Vue.ls.get('auth');
          let unhash = String(window.atob(hash));
          let index = unhash.indexOf(":");
          let naam = unhash.substring(0, unhash.indexOf(":"));
          let ww = unhash.substring(unhash.indexOf(':') + 1, unhash.length)
          axios.get(url,{
            auth: {
              username: naam,
              password: ww
            }
          })
          .then((data) => {  
            let thumb = data.data._links["http://localhost/duracar/rest/relation/user/user/user_picture"];
            this.user.naam = data.data.name[0].value;
            this.user.email = data.data.mail[0].value;
            if(thumb){
              this.thumbnail = thumb[0].href;
            }
            if(data.data.field_gsm_nummer){
              this.user.gsm = data.data.field_gsm_nummer[0].value 
            }                   
          })
    },
    //modaltoggle voor popup
    modaltoggle: function(param) {
      if(param){
        if(param === this.user.naam){
          this.active = "naam"
        }else if(param === this.user.email){
          this.active = "email"
        }else if(param === this.user.gsm){
          this.active = "gsm"
        }
        this.placeholder = param
      }else if(!param){ 
        this.active = null       
      }
      this.updateval = null;
      this.modal = ! this.modal;
    },
    //wijzigen van gegevens
    wijzigen: function() {
      let hash = Vue.ls.get('auth');
      let unhash = String(window.atob(hash));
      let index = unhash.indexOf(":");
      let user = unhash.substring(0, unhash.indexOf(":"));
      let ww = unhash.substring(unhash.indexOf(":") + 1, unhash.lenght)
      this.errors = []
      let raw = {};
      let url =  'http://localhost/duracar/user/'+ Vue.ls.get('id') +'?_format=hal_json'
      if(this.active === "naam"){
        raw['name'] = [{"value": this.updateval}]
      }else if(this.active === "email"){
        raw['mail'] = [{"value": this.updateval}];
        raw['pass'] = [{"existing": ww}]
      }else if(this.active === "gsm") {
        raw['field_gsm_nummer'] = [{"value": this.updateval}]
      }      
      axios.patch(url, raw,
      {
          auth: {
              username: user,
              password: ww
          },
          headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
          }
      }
      )
      .then((data) => {
        Vue.ls.set('naam', data.data.name[0].value, 60 * 60 * 3000);
        Vue.ls.set('auth',  btoa(data.data.name[0].value + ':' + ww), 60 * 60 * 3000);
        Vue.ls.set('gsm', data.data.field_gsm_nummer[0].value, 60 * 60 * 3000);
        this.errorsoncreate = []
        this.getinfo()        
      })
      .catch( e => {
          this.errors.push(e.response.statusText)
      });
      this.modaltoggle();
    },
    //uitloggen
    logout: function () {
       this.$parent.ingelogd = false;
            this.user.loggedin= false;
            Vue.ls.remove('csrftoken');
            Vue.ls.remove('id');
            Vue.ls.remove('logout-token');
            Vue.ls.remove('naam');
            Vue.ls.remove('uuid'); 
            Vue.ls.remove('auth'); 
            window.location.reload();

    },
  }
}
</script>
