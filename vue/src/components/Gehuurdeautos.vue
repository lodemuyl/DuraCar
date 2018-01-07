<template>
  <div class="gehuurdeautos">
    <h1 class="pagetitle">{{ title }}</h1>
    <div>
      <section  class="hero is-primary">
          <div class="hero-body mijnautoslijst">
            <div class="container">
              <h3 class="title inline">
                autonaam
              </h3>
              <a  @click="modaltoggle()"><i class="fa fa-trash fa-lg floatright showModal" aria-hidden="true"></i></a>
              <p class="white info">van xxx tot xxxx</p>
              <p class="white info">x euro per dag</p>
              <p class="white info">door xxx</p>
              <p class="white info">gsm: xxxx</p>
              <p class="white info">voorwaarden:</p>
              <ul class="white info">
                <li class="item">voorwaarde1</li>
                <li class="item">voorwaarde2</li>
              </ul>
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
          <a class="button is-danger">Verwijderen</a>
          <a class="button" @click="modaltoggle()" >Annuleren</a>
        </footer>
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
      title: 'gehuurdeautos',
      modal: false
    }
  },
  created (){
    //loginvalidatie
    if(!Vue.ls.get('id')){
       this.$router.push('/Account/login')
    }
  },
  methods: {
    modaltoggle: function(){
      this.modal = !this.modal
    }
  }
}
</script>
