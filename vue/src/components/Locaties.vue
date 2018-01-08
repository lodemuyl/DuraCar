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
          <div v-for="locatie in autolijst">
            <v-marker :lat-lng="[locatie.la, locatie.lo]">
              <v-popup>
                <h1 class="popuptitle">{{ locatie.merkid }} {{ locatie.type }}</h1>
                <p>{{ locatie.straat }} {{ locatie.nummer }}</p>
                <p>{{ locatie.gemeente }}</p>
                <p>€{{ locatie.prijs }}/dag</p>
                <router-link :to="locatie.url">Bekijk</router-link>
              </v-popup>
            </v-marker>             
          </div> 
        </v-map>
      </div>
      <v-marker :icon="mylocationicon"  :lat-lng="[mylat, mylon]"></v-marker>  

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
      mylocationicon: L.icon({
        iconUrl: require('@/assets/images/mijnlocatie.png'),
        iconAnchor: [20, 40]
      }),
      lat: 51.052496,
      lon: 3.723932,
      mylat: null,
      mylon: null,
      autolijst: [],
      errors: []
    }
  },
  created () {  
    this.autos();
  },
  mounted () {
    //mijnlocatie
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(this.showPosition) 
      }
  },  
  methods: {
    //ophalen van alle locaties van auto inc de naam en het merk
    autos: function () {
      axios.all([
        axios.get(`http://localhost/duracar/merkenlijst`),
        axios.get(`http://localhost/duracar/autolijst`)
      ])
      .then(axios.spread((merklijst, autolijst) => {
        var lijsttemp = [];
        for (var i = 0; i < autolijst.data.length; i++) {
          lijsttemp[i] = {
            merkid: merklijst.data[autolijst.data[i].field_merk[0].target_id -1].name[0].value,
            type : autolijst.data[i].name[0].value,
            nummer : autolijst.data[i].field_huisnummer[0].value,
            straat : autolijst.data[i].field_straat[0].value,
            gemeente : autolijst.data[i].field_gemeente[0].value,
            prijs : autolijst.data[i].field_prijs[0].value,
            url: {
              name: "Detail",
              params: { 
                id: autolijst.data[i].id[0].value, 
                }
            },
            postcode: 0,
            la: (autolijst.data[i].field_geolocatie.length > 0) ? autolijst.data[i].field_geolocatie[0].lat : autolijst.data[i].field_lat2[0].value,
            lo: (autolijst.data[i].field_geolocatie.length > 0) ? autolijst.data[i].field_geolocatie[0].lng : autolijst.data[i].field_lon2[0].value,
          };                 
        }   
       this.autolijst = lijsttemp;
      }))
      .catch((e) => {
        console.log(e)
        this.errors.push(e.message)
      })
    },
    //mijn positie
    showPosition : function(position){   
        this.mylat = position.coords.latitude
        this.mylon = position.coords.longitude      
    }
  }
}
</script>

