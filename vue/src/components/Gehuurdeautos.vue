<template>
  <div class="gehuurdeautos">
    <h1 class="pagetitle">{{ title }}</h1>
    <div v-if="geladen">
      <div v-if="!gehuurdeautosrawdata">
        <article class="message is-warning">
          <div class="message-body">
            <h1>Je hebt nog geen gehuurde auto's</h1>
            <router-link to="/Huren">huur een auto</router-link>
          </div>
        </article>      
      </div v-else>
      <div>
      <section v-for="auto in gehuurdeautos" class="hero is-primary">
            <div class="hero-body mijnautoslijst">
              <div class="container">
                <h3 class="title inline">
                 {{ auto.data.name[0].value }}
                </h3>
                <a  @click="modaltoggle(auto.id)"><i class="fa fa-trash fa-lg floatright showModal" aria-hidden="true"></i></a>
                <p class="white info"><strong>van {{ auto.van }}</strong> tot <strong>{{ auto.tot }}</strong></p>
                <p class="white info"><strong>{{ auto.data.field_prijs[0].value }}</strong> euro per dag</p>
              </div>
            </div>        
      </section> 
      </div>
      <div  class="modal" v-bind:class="{ 'is-active': modal }">
        <div class="modal-background"></div>
        <div class="modal-card">
          <header class="modal-card-head fullwidth">
            <p class="modal-card-title lemonmilk">Verwijderen</p>
            <button  @click="modaltoggle()" class="delete" aria-label="close"></button>
          </header>
          <section class="modal-card-body">
            <p class="raleway">Ben je zeker dat je jouw reservatie wilt verwijderen?</p>
          </section>
          <footer class="modal-card-foot">
            <a class="button is-danger" @click="verwijder()">Verwijderen</a>
            <a class="button" @click="modaltoggle()" >Annuleren</a>
          </footer>
        </div>
      </div>
      <div v-if="errors.length !== 0" class="columns is-mobile" >
        <div class="column is-10 is-offset-1">
          <div class="notification is-danger">
            <p v-for="errors in errors">{{ errors }}</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
/* eslint-disable */
import axios from 'axios'
import Vue from 'vue'   
export default {
  name: 'gehuurdeautos',
  data () {
    return {
      title: 'gehuurde autos',
      modal: false,
      gehuurdeautosrawdata: [],
      gehuurdeautos: {},
      errors: [],
      //geladen zorgt er voor dat ik data kan ophalen na 2 geneste axios actions indien ik dit niet zou doen,
      //zou de data niet opgehaald worden omdat de dom geladen wordt zonder data (asynchroon)
      geladen: false
    }
  },
  watch: {
    '$route': 'getdata'
  },
  created (){
    //loginvalidatie
    if(!Vue.ls.get('id')){
       this.$router.push('/Account/login')
    }else{
      //ophalen gehuurde auto's
      this.getdata()
    }
  },
  methods: {
    //modaltoggle voor delete
    modaltoggle: function(){
      this.modal = !this.modal
      this.errors = [];
    },
    verwijder: function(){
      console.log('verwijder ')
      this.modaltoggle()
    },
    getdata: function(){
      if(Vue.ls.get('id')){
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
            this.gehuurdeautosrawdata = data.data.field_huren
            //indien geen gehuurde auto's het project laten doorgaan als geladen
            if(!data.data.field_huren){
              this.geladen = true
            }else{
              this.getdetails()
            }            
          })
      }
    },
    //ophalen van details van de autos aan de hand van rawdata gekregen via getdata()
    getdetails: function(){
      if(this.gehuurdeautosrawdata){
        let arr = [];
        let autos = this.gehuurdeautosrawdata;
        let id, id1, id2, van1, van2, van3, tot1, tot2, tot3
        switch(autos.length) {
          case 0:             
            console.log('geen autos')
            this.errors.push('er zijn geen gehuurde auto\'s')
            break;
          case 1:             
            id = autos[0].value.substr(0, autos[0].value.indexOf('*'));
            van1 = autos[0].value.substr(autos[0].value.indexOf('*') + 1, autos[0].value.indexOf('*', 2)-2)
            tot1 = autos[0].value.substr(autos[0].value.indexOf('*', 2) + 1, autos[0].value.length);
            this.gehuurdeautos['auto1'] = {
              van: van1,
              tot: tot1,
              id: id,
              data: {}
            }
            arr = [
              axios.get('http://localhost/duracar/autos/autos/' + id +'?_format=hal_json')
            ]
            break;    
          case 2:             
            id = autos[0].value.substr(0, autos[0].value.indexOf('*'));
            id1 = autos[1].value.substr(0, autos[1].value.indexOf('*'));
            van1 = autos[0].value.substr(autos[0].value.indexOf('*') + 1, autos[0].value.indexOf('*', 2)-2)
            tot1 = autos[0].value.substr(autos[0].value.indexOf('*', 2) + 1, autos[0].value.length);
            van2 = autos[1].value.substr(autos[1].value.indexOf('*') + 1, autos[1].value.indexOf('*', 2)-2)
            tot2 = autos[1].value.substr(autos[1].value.indexOf('*', 2) + 1, autos[1].value.length);
            this.gehuurdeautos['auto1'] = {
              van: van1,
              tot: tot1,
              id: id,
              data: {}
            }
            this.gehuurdeautos['auto2'] = {
              van: van2,
              tot: tot2,
              id: id1,
              data: {}
            }
            arr = [
              axios.get('http://localhost/duracar/autos/autos/' + id +'?_format=hal_json'),
              axios.get('http://localhost/duracar/autos/autos/' + id1 +'?_format=hal_json')
            ]
            break;   
          case 3:             
            id = autos[0].value.substr(0, autos[0].value.indexOf('*'));
            id1 = autos[1].value.substr(0, autos[1].value.indexOf('*'));
            id2 = autos[2].value.substr(0, autos[2].value.indexOf('*'));
            van1 = autos[0].value.substr(autos[0].value.indexOf('*') + 1, autos[0].value.indexOf('*', 2)-2)
            tot1 = autos[0].value.substr(autos[0].value.indexOf('*', 2) + 1, autos[0].value.length);
            van2 = autos[1].value.substr(autos[1].value.indexOf('*') + 1, autos[1].value.indexOf('*', 2)-2)
            tot2 = autos[1].value.substr(autos[1].value.indexOf('*', 2) + 1, autos[1].value.length);
            van3 = autos[2].value.substr(autos[2].value.indexOf('*') + 1, autos[2].value.indexOf('*', 2)-2)
            tot3 = autos[2].value.substr(autos[2].value.indexOf('*', 2) + 1, autos[2].value.length);
            this.gehuurdeautos['auto1'] = {
              van: van1,
              tot: tot1,
              id: id,
              data: {}
            }
            this.gehuurdeautos['auto2'] = {
              van: van2,
              tot: tot2,
              id: id1,
              data: {}
            }
            this.gehuurdeautos['auto3'] = {
              van: van3,
              tot: tot3,
              id: id2,
              data: {}
            }
            arr = [
              axios.get('http://localhost/duracar/autos/autos/' + id +'?_format=hal_json'),
              axios.get('http://localhost/duracar/autos/autos/' + id1 +'?_format=hal_json'),
              axios.get('http://localhost/duracar/autos/autos/' + id2 +'?_format=hal_json'),
            ]
            break;     
        };        
        axios.all(arr)
        .then(axios.spread((auto1, auto2, auto3) => {
          if(auto1 && !auto2 && !auto3){
            this.gehuurdeautos['auto1'].data = auto1.data 
          }else if(auto1 && auto2 && !auto3){
            this.gehuurdeautos['auto1'].data = auto1.data   
            this.gehuurdeautos['auto2'].data = auto2.data
          }else if(auto1 && auto2 && auto3){
            this.gehuurdeautos['auto1'].data = auto1.data   
            this.gehuurdeautos['auto2'].data = auto2.data
            this.gehuurdeautos['auto3'].data = auto3.data
          }
          this.geladen = true
        }))
        .catch(error => {
        this.errors.push(error.message.statusText)
        })

      }
    }
  }
}
</script>
