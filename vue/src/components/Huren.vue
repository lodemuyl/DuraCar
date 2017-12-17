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
    <h1 class="lemonmilk subtitle nomargin center">Merk</h1>
    <v-select v-if="autolijst.length > 0" placeholder="Merk" :searchable="true" label="naam" class="fullwidth" v-model="filter" :options="merklijst"></v-select>
    <div v-if="geenfilterbericht">
      <div class="columns is-mobile">
        <div class="column is-10 is-offset-1">  
          <div class="">
            <img :src="filter.logo">
          </div>
          <p class="regulartextfontsize">{{ geenfilterbericht }}</p>
        </div>
      </div>
    </div>
    <div v-if="autolijst.length > 0" v-for="auto in filterautos" class="card relative auto">
      <router-link :to="{ name: 'Detail', params: { id: auto.id }}" class="nodecoration">
        <div class="card-image">
          <figure class="image merklogowrapper">
            <img class="merklogo" :src="merklijst[auto.merkid].logo" >
          </figure>  
        </div>
        <div class="card-content absolute huurcard overlay">
        </div>
        <div class="card-content absolute huurcard">
          <div class="media">
            <div class="media-left">
            </div>
            <div class="media-content ">
              <p class="title huurtitle"> {{ auto.naam }} <span class="merkachtervoegsel"></span></p>
              <p class="prijs right bold">€{{ auto.prijs }}/Dag</p>
            </div>
          </div>
          <div class="content absolute huurcontent">          
            <br/>
            <p>{{ auto.straat }} {{ auto.nummer }} - {{ auto.gemeente }}</p>            
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
      filter: null,
      autolijst: [],
      merklijst: [],
      geenfilterbericht: null,
      errors: []
    }
  },
  created () {  
    this.apilist();
  },
  methods: {
    //ophalen alle nodige api's
    apilist: function () {
      axios.all([
        axios.get(`http://localhost/duracar/autolijst`),
        axios.get(`http://localhost/duracar/merkenlijst`)
      ])
      .then(axios.spread((autolijst, merken) => {
      //autos toevoegen aan de array autolijst
        var autostemp = [];
        for (var k = 0; k < autolijst.data.length; k++) {
          autostemp[k] = {
            id: autolijst.data[k].id[0].value,
            naam: autolijst.data[k].name[0].value,
            merkid: autolijst.data[k].field_merk[0].target_id,
            prijs: autolijst.data[k].field_prijs[0].value,
            gemeente: autolijst.data[k].field_gemeente[0].value,
            straat: autolijst.data[k].field_straat[0].value,
            nummer: autolijst.data[k].field_huisnummer[0].value
          }
        };
        this.autolijst = autostemp;     
      //merken toevoegen aan de array merklijst
        var merkentemp = [];
        for (var k = 0; k < merken.data.length; k++) {
          merkentemp[merken.data[k].id[0].value] = {
            id: merken.data[k].id[0].value,
            naam: merken.data[k].name[0].value,
            logo: merken.data[k].field_merklogo[0].url
          }
        };
        this.merklijst = merkentemp;
      }))
      .catch((e) => {
        this.errors.push(e.message)
      })
    }
  },
  computed: {
    //filtering op de client van automerken
    filterautos() {
      let filtered = []
      if(this.filter != null){    
        console.log('in filter')    
        filtered =  this.autolijst.filter(auto => {
         if(auto.merkid == this.filter.id){
           this.geenfilterbericht = null
           return auto.merkid
         }
        })
        if(filtered.length == 0){
          this.geenfilterbericht = "Er zijn geen auto's gevonden van het merk " + this.filter.naam 
        }
        return filtered 
      }else{
        this.geenfilterbericht = null
        filtered = this.autolijst
        return filtered
      }
    }
  }
}
</script>
