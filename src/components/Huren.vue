<template>
  <div class="huren">
    <h1 class="pagetitle">{{ title }}</h1>    
    <div v-if="errors.length > 0" class="columns is-mobile" >
      <div class="column is-10 is-offset-1">
        <div class="notification is-danger">
          <p v-for="errors in errors">{{ errors }}</p>
        </div>
      </div>
    </div>
    <div v-for="auto in autolijst" class="card relative auto">
      <router-link :to="{ name: 'Detail', params: { id: auto.id[0].value }}" class="nodecoration">
        <div class="card-image">
          <figure class="image merklogowrapper">
            <img class="merklogo" :src="merklijst[[auto.field_merk[[0]].target_id - 1]].field_logo[[0]].url">
          </figure>
        </div>
        <div class="card-content absolute huurcard overlay">
        </div>
        <div class="card-content absolute huurcard">
          <div class="media">
            <div class="media-left">
            </div>
            <div class="media-content ">
              <p class="title huurtitle">{{ auto.name[0].value }}  <span class="merkachtervoegsel">  {{merklijst[auto.field_merk[0].target_id - 1].name[0].value}}</span></p>
              <p class="prijs right bold">€{{ auto.field_prijs[0].value }}/Dag</p>
            </div>
          </div>

          <div class="content absolute huurcontent">          
            <br/>
            <p>{{ auto.field_straat[0].value }} {{ auto.field_huisnummer[0].value }} </p>
            <p>{{ auto.field_gemeente[0].value }}</p>
          </div>
        </div>
      </router-link>
    </div>
  </div>
</template>

<script>
/* eslint-disable */
import axios from 'axios'
export default {
  name: 'huren',
  data () {
    return {
      title: 'Huren',
      autolijst: [],
      merklijst: [],
      errors: []
    }
  },
  created () {  
    this.apilist();
  },
  methods: {
    apilist: function () {
      axios.all([
        axios.get(`http://localhost/duracar/autolijst`),
        axios.get(`http://localhost/duracar/merkenlijst`)
      ])
      .then(axios.spread((autolijst, merkenlijst) => {
        this.autolijst = autolijst.data,
        this.merklijst = merkenlijst.data
      }))
      .catch((e) => {
        this.errors.push(e.response.statusText)
      })
  }
}
}
</script>
