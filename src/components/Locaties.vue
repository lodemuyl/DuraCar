<template>
  <div class="locaties">
    <h1 class="pagetitle">{{ title }}</h1>
    <div v-if="errors.length > 0" class="columns is-mobile" >
      <div class="column is-10 is-offset-1">
        <div class="notification is-danger">
          <p v-for="errors in errors">{{ errors }}</p>
        </div>
      </div>
    </div>
    <div id="locationmaps">
      <v-map :zoom=13 :center="[lat, lon]">
        <v-tilelayer url="http://{s}.tile.osm.org/{z}/{x}/{y}.png"></v-tilelayer>
        <div>
          <v-marker :lat-lng="[lat, lon]">
            <v-popup>
              <h1 class="popuptitle">blabla</h1>
              <p>blabla</p>
            </v-popup>
          </v-marker>
        </div>        
      </v-map>
    </div>
    </div>
</template>

<script>
/* eslint-disable */
import axios from 'axios'
export default {
  name: 'locaties',
  data () {
    return {
      title: 'Locaties',
      lat: 51.052496,
      lon: 3.723932,
      autolijst: [],
      autolocaties: [],
      errors: []
    }
  },
  created () {  
    this.autos();
  },
  methods: {
    autos: function () {
      axios.all([
        axios.get(`http://localhost/duracar/merkenlijst`),
        axios.get(`http://localhost/duracar/autolijst`)
      ])
      .then(axios.spread((merklijst, autolijst) => {
        for (var i = 0; i < autolijst.data.length; i++) {
          this.autolijst[i] = {
            merkid: merklijst.data[autolijst.data[i].field_merk[0].target_id -1].name[0].value,
            type : autolijst.data[i].name[0].value,
            nummer : autolijst.data[i].field_huisnummer[0].value,
            straat : autolijst.data[i].field_straat[0].value,
            gemeente : autolijst.data[i].field_gemeente[0].value,
            prijs : autolijst.data[i].field_prijs[0].value,
            link: null,
            postcode: 0,
            la: 3,
            lo: 2
          };        
        }       
      }))
      .then(axios.spread((merklijst, autolijstt) => {
        for (var j = 0; j < this.autolijst.length; j++){
            var gemeente = this.autolijst[j].gemeente.replace(/\s+/g, '');
            var straat = this.autolijst[j].straat.replace(/\s+/g, '');
            this.locaties(this.autolijst[j].nummer, straat, gemeente, j);
        };       
      }))
      .catch((e) => {
        console.log(e)
        this.errors.push(e.message)
      })
    },
    locaties: function (nummer, straat, gemeente, j) {
      console.log()
      axios.get(`https://maps.googleapis.com/maps/api/geocode/json`,{
        params: {
          address: nummer + '+' + straat +'+' + gemeente,
          KEY: 'AIzaSyARdlIgefrEsCFs7dIGRC5cTCS3rSIZXOs'
        }
      })
      .then((locaties) => {
        if(locaties.data.results.length !== 0){
          console.log("------");
          console.log(j)
          console.log(nummer + " + " + straat + " + " + gemeente );
          console.log(locaties.data.results[0].geometry.location.lat);
          console.log(locaties.data.results[0].geometry.location.lng);
          console.log("------");
        }        
      })
      .catch((e) => {
        this.errors.push(e.message)
      })
    }
    }
}
</script>

