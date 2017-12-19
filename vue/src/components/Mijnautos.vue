<template>
  <div class="mijnautos">
    <h1 class="pagetitle">{{ title }}</h1>    
      <div v-if="errors.length !== 0" class="columns is-mobile">
        <div class="column is-10 is-offset-1">
          <div >
            <div class="notification is-danger">
              <p v-for="errors in errors">{{ errors }}</p>          
            </div>
          </div>
        </div>      
      </div>
    <div>
      <section v-for="auto in autos"  class="hero is-primary">
          <div class="hero-body mijnautoslijst">
            <div class="container">
              <h3 class="title inline">
                {{ auto.naam }}
              </h3>
              <a @click="modaltoggle(auto.naam, auto.id)"><i class="fa fa-trash fa-lg floatright showModal" aria-hidden="true"></i></a>
              <router-link :to="{ name: 'Update', params: { id: auto.id }}"><i class="fa fa-pencil fa-lg floatright showModal" aria-hidden="true"></i></a></router-link>
              <router-link :to="{ name: 'Detail', params: { id: auto.id }}"><i class="fa fa-eye fa-lg floatright showModal" aria-hidden="true"></i></a></router-link>
            </div>
          </div>
        
      </section> 
    </div>
    <div v-if="autos.length == 0">
      <article class="message is-warning">
        <div class="message-body">
          <h1>Dag {{ user }} ,je hebt nog geen auto's in de aanbieding</h1>
          <router-link to="/Verhuren">Voeg een auto toe</router-link>
        </div>
      </article>      
    </div>
    <div  class="modal" v-bind:class="{ 'is-active': modal }">
      <div class="modal-background"></div>
      <div class="modal-card">
        <header class="modal-card-head fullwidth">
          <p class="modal-card-title lemonmilk">Verwijderen</p>
          <button  @click="modaltoggle()" class="delete" aria-label="close"></button>
        </header>
        <section class="modal-card-body">
          <p class="raleway">Ben je zeker dat je jouw {{ click[0].naam }} wilt verwijderen?</p>
        </section>
        <footer class="modal-card-foot">
          <a class="button is-danger" @click="verwijderen(click[0].id)">Verwijderen</a>
          <a class="button" @click="modaltoggle()" >Annuleren</a>
        </footer>
      </div>
    </div>
  </div>
</template>

<script>
/* eslint-disable */
import VueLocalStorage from 'vue-ls'
import Vue from 'vue'
Vue.use(VueLocalStorage); 
import axios from 'axios'
export default {
  name: 'mijnautos',
  data () {
    return {
      title: 'mijnautos',
      userid: Vue.ls.get('id'),
      user: null,
      errors: [],
      modal: false,
      click : [
        {
          'naam': '',
          'id': null
        }
      ],
      autos: []
    }
  },
  created () {
    if(!Vue.ls.get('id')){
       this.$router.push('/Account/login')
    }
    this.autofilter();
    var hash = Vue.ls.get('auth');
    var unhash = String(window.atob(hash));
    var index = unhash.indexOf(":");
    this.user = unhash.substring(0, unhash.indexOf(":"));
  },
  methods: {
    modaltoggle: function(naam, id) {
      if(naam && id){
        this.click[0] = {
          "naam": naam,
          "id": id
        }
      }else if(!naam && !id){
        this.click[0].naam = '';
        this.click[0].id = null;
      }
      this.modal = ! this.modal;
    },
    verwijderen: function(id){ 
      if (id) {      
        let hash = Vue.ls.get('auth');
        let unhash = String(window.atob(hash));
        let index = unhash.indexOf(":");
        let user = unhash.substring(0, unhash.indexOf(":"));
        let ww = unhash.substring(unhash.indexOf(":") + 1, unhash.lenght);
        let url = `http://localhost/duracar/autos/autos/` + this.click[0].id;
        axios.delete(url,{
          auth: {
            username: user,
            password: ww
          }
        })
        .then(() => {
          this.autofilter()
        })
        .catch(error => {
          this.errors.push('fout bij verwijderen: ' + error.message)
        }) 
        this.modaltoggle();
      }  
    },
    autofilter: function() {
      axios.get(`http://localhost/duracar/autolijst/` + this.userid + `?format=hal_json`)
      .then((filterlijst) => {
        var filtered = [];
        for (var k = 0; k < filterlijst.data.length; k++) {
          filtered[k] = {
            "naam": filterlijst.data[k].name[0].value,
            "id":filterlijst.data[k].id[0].value
          }
        };
        this.autos = filtered;
      })
      .catch(error => {
        this.errors.push("Autos kunnen niet opgehaald worden: " + error.message);
      }) 
    }   
  }
}
</script>
