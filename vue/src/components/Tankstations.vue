<template>
  <div class="tankstations">
    <h1 class="pagetitle">{{ title }}</h1>
    <div v-if="error" class="columns is-mobile" >
      <div class="column is-10 is-offset-1">
        <div class="notification is-danger">
          {{ error }}
        </div>
      </div>
    </div>
    <div id="tankstationsmaps">
      <v-map :zoom=13 :center="[lat, lon]">
        <v-tilelayer url="http://{s}.tile.osm.org/{z}/{x}/{y}.png"></v-tilelayer>
        <div v-for="stations in tankstations">
          <v-marker :lat-lng="[stations.geometry.location.lat, stations.geometry.location.lng]">
            <v-popup>
              <h1 class="popuptitle">{{ stations.name }}</h1>
              <p>{{ stations.vicinity }}</p>
              <div v-if="stations.opening_hours"><p v-if="stations.opening_hours.open_now" class="green bold">Open</p><p class="red bold" v-else="stations.opening_hours.open_now">Gesloten</p></div>
              <div v-else><p class="green bold">Open</p></div>
            </v-popup>
          </v-marker>             
        </div> 
          <v-marker :icon="mylocationicon"  :lat-lng="[mylat, mylon]"></v-marker>  
      </v-map>
    </div>
  </div>
</template>
<script>
/* eslint-disable */
import axios from 'axios'
import L from 'leaflet';
//apikey google geolocation
const apikey = 'AIzaSyCDj88Ju4Gl7i66LaJf7lYSOgjPRkKTjfo'
//icon bugfix
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: require('leaflet/dist/images/marker-icon-2x.png'),
  iconUrl: require('leaflet/dist/images/marker-icon.png'),
  shadowUrl: require('leaflet/dist/images/marker-shadow.png'),
});
export default {
  name: 'tankstations',
  data () {
    return {
      title: 'tankstations',
      mylocationicon: L.icon({
        iconUrl: require('@/assets/images/mijnlocatie.png'),
        iconSize:     [30, 60],
        iconAnchor: [0, 0]
        }),
      lat: 51.052496,
      lon: 3.723932,
      mylat: null,
      mylon: null,
      straal: 4,
      tankstations: [],      
      error: null,
    }
  },
  created () {  
    this.api(this.lat,this.lon,this.straal);
  },
  mounted () {
    //eigen locatie
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(this.showPosition) 
      }
  },
  methods: {
    showPosition : function(position){   
        this.mylat = position.coords.latitude
        this.mylon = position.coords.longitude      
    },
    //google geolocation api
    api: function(lat,lon,straal) {
      axios.get(`https://maps.googleapis.com/maps/api/place/nearbysearch/json?&type=gas_station`, {
          params: {
            key: apikey,
            radius: straal * 1000,
            location: lat + ',' + lon
          }       
      })
      .then((stations) => {
        if(stations.data.results[0]){
          this.error = ""
          this.tankstations = stations.data.results
        }else{
          this.tankstations = stations.data.results
          this.error = 'er zijn geen tankstations binnen de straal van ' + straal + ' km'
        }      
      })
      .catch(error => {
        console.log('error :' + error)
        this.error = "Tankstations kunnen niet opgehaald worden : " + error.message
      })  
    }   
  }
}
</script>
