<template>
  <div class="detail">
   <h1 class="pagetitle">{{ title }} {{ id }}</h1>
    <div v-if="errors.length !== 0" class="columns is-mobile" >
      <div class="column is-10 is-offset-1">
        <div class="notification is-danger">
          <p v-for="errors in errors">{{ errors }}</p>
        </div>
      </div>
    </div>
    <div v-if="errors.length == 0" >

  
    </div>
  </div>
</template>
<script>
/* eslint-disable */
import axios from 'axios'
import VueLocalStorage from 'vue-ls'
import Vue from 'vue'         
export default {
  name: 'update',
  data () {
    return {
      title: 'update',
      id: this.$route.params.id,
      errors: [],
    }
  },
  created () {
    if(!Vue.ls.get('id')){
       this.$router.push('/Account/login')
    }
  },
  methods: {

  }
}
</script>

