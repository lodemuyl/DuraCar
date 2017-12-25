<template>
  <div class="update">
    <h1 class="pagetitle">{{ autodata.title }} wijzigen</h1>
 
    <div v-if="errors.length == 0" class="column is-10 is-offset-1" >
      <div v-if="acces">        

        <div class="card noshadow">
            <div class="card noshadow grey white">
              <div class="card-content">
                <div class="content">
                    <div class="columns is-mobile">
                      <div class="column customcolumn">
                        <h2 class="alineatitle red bold">Merk</h2>
                        <p>{{ autodata.merk }}<a @click="modaltoggle(autodata.merk)"><i class="fa fa-pencil fa-lg showModal red" aria-hidden="true"></i></a></p>
                      </div>
                      <div class="column customcolumn">
                        <h2 class="alineatitle red bold">Model</h2>
                        <p>{{ autodata.title }}<a @click="modaltoggle(autodata.title)"><i class="fa fa-pencil fa-lg showModal red" aria-hidden="true"></i></a></p>
                      </div>
                    </div> 
                    <div class="columns is-mobile">
                      <div class="column customcolumn">
                        <h2 class="alineatitle bold red">Periode beschikbaar</h2>
                        <p>van <span class="bold"> {{ autodata.beschikbaarvan | datumfilter }} </span> tot <span class="bold"> {{ autodata.beschikbaartot | datumfilter }} </span><a @click="modaltoggle(autodata.beschikbaarvan)"><i class="fa fa-pencil fa-lg showModal red" aria-hidden="true"></i></a></p>
                      </div>
                    </div>    
                  <div class="columns is-mobile">
                    <div class="column customcolumn">
                      <h2 class="alineatitle bold red">Eigenaar</h2>
                      <p>{{ autodata.eigenaar.naam }}</p>
                    </div>
                    <div class="column customcolumn">
                      <h2 class="alineatitle red bold">Prijs</h2>
                      <p>€{{ autodata.prijs }}/dag<a @click="modaltoggle(autodata.prijs)"><i class="fa fa-pencil fa-lg showModal red" aria-hidden="true"></i></a></p>
                    </div>
                  </div>  
                  <div class="columns is-mobile">
                    <div class="column customcolumn">
                      <h2 class="alineatitle red bold">GSM</h2>
                      <p>{{ autodata.eigenaar.gsm }}</p>
                    </div>
                    <div class="column customcolumn">
                      <h2 class="alineatitle red bold">Locatie</h2>
                      <p>{{ autodata.locatie.straat }} {{ autodata.locatie.nummer }} <br> {{ autodata.locatie.gemeente }}<a @click="modaltoggle(autodata.locatie.straat)"><i class="fa fa-pencil fa-lg showModal red" aria-hidden="true"></i></a></p>
                    </div>
                  </div>  
                  <div v-if="autodata.voorwaarden.length > 0" class="columns is-mobile">
                    <div class="column customcolumn summation">
                      <h2 class="alineatitle red bold">Voorwaarden<a @click="modaltoggle('voorwaarden')"><i class="fa fa-pencil fa-lg showModal red" aria-hidden="true"></i></a></h2>
                      <ul>
                        <li v-for="voorwaarden in autodata.voorwaarden">
                        {{ voorwaarden }}
                        </li>
                      </ul>
                    </div>
                  </div>
                  <div v-if="autodata.specs.length > 0" class="columns is-mobile">
                    <div class="column customcolumn summation">
                      <h2 class="alineatitle red bold">Specificaties<a @click="modaltoggle('specs')"><i class="fa fa-pencil fa-lg showModal red" aria-hidden="true"></i></a></h2>
                      <ul>
                        <li v-for="spec in autodata.specs">
                        {{ spec }} 
                        </li>
                      </ul>
                    </div>
                  </div> 
                  <div class="columns is-mobile">
                    <div class="column customcolumn">
                      <h2 class="alineatitle red bold">Zitplaatsen</h2>
                      <p> {{ autodata.zitplaatsen }} <a @click="modaltoggle(autodata.zitplaatsen)"><i class="fa fa-pencil fa-lg showModal red" aria-hidden="true"></i></a></p>
                    </div>
                    <div class="column customcolumn">
                      <h2 class="alineatitle red bold">Deuren</h2>
                      <p> {{ autodata.deuren }} <a @click="modaltoggle(autodata.deuren)"><i class="fa fa-pencil fa-lg showModal red" aria-hidden="true"></i></a></p>
                    </div>
                  </div> 
                  <div class="columns is-mobile">
                    <div class="column customcolumn">
                      <h2 class="alineatitle red bold">Aandrijving</h2>
                      <p>{{ autodata.aandrijving }} <a @click="modaltoggle(autodata.aandrijving)"><i class="fa fa-pencil fa-lg showModal red" aria-hidden="true"></i></a></p>
                    </div>
                    <div class="column customcolumn">
                      <h2 class="alineatitle red bold">Nummerplaat</h2>
                      <p>{{ autodata.nummerplaat }} <a @click="modaltoggle(autodata.nummerplaat)"><i class="fa fa-pencil fa-lg showModal red" aria-hidden="true"></i></a></p>
                    </div>
                  </div>
                  <div class="columns is-mobile">
                    <div class="column customcolumn">
                      <h2 class="alineatitle red bold">bouwjaar</h2>
                      <p>{{ autodata.bouwjaar }}<a @click="modaltoggle(autodata.bouwjaar)"><i class="fa fa-pencil fa-lg showModal red" aria-hidden="true"></i></a></p>
                    </div>
                  </div>                                 
                </div>
              </div>
            </div>
        </div> 
      </div>
      <div v-else>
        <article class="message is-warning">
        <div class="message-body">
          <h1>Je hebt geen toegang om de auto met het id {{ id }} te wijzigen</h1>
        </div>
        </article>   
      </div>
    </div>
    <div  v-if="errors.length !== 0"  >  
      <div class="column is-10 is-offset-1">
        <div class="notification is-danger">
          <p v-for="errors in errors">{{ errors }}</p>
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
            <section v-show="active==='merk'" class="modal-card-body fullheight">            
                <v-select  v-model="updateval" :searchable="true"  class="fullwidth" label="naam" :options="data.merken"></v-select>
            </section>
            <section v-show="active==='aandrijving'" class="modal-card-body fullheight">            
                <v-select v-model="updateval"  :searchable="true"  class="fullwidth" label="naam" :options="data.aandrijvingen"></v-select>
            </section>
            <section v-show="active==='beschikbaar'" class="modal-card-body fullheight">
              <label class="label">Beschikbaar van</label>
              <datepicker language="nl" v-model="updatedate.van" :format="datepickerformat" :disabled="disabled"></datepicker>                            
              <label class="label">Beschikbaar tot</label>
              <datepicker language="nl" v-model="updatedate.tot" :format="datepickerformat" :disabled="disabled"></datepicker>                            
            </section>
            <section v-show="active==='model'" class="modal-card-body">
              <input class="input" v-model="updateval" v-bind:placeholder="placeholder"></input>
            </section>
            <section v-show="active==='bouwjaar'" class="modal-card-body">
              <input class="input" v-model="updateval" v-bind:placeholder="placeholder"></input>
            </section>
            <section v-show="active==='prijs'" class="modal-card-body">
              <input class="input" v-model="updateval" v-bind:placeholder="placeholder"></input>
            </section>
            <section v-show="active==='nummerplaat'" class="modal-card-body">
              <input class="input" v-model="updateval" v-bind:placeholder="placeholder"></input>
            </section>
            <section v-show="active==='zitplaatsen'" class="modal-card-body fullheight">
              <v-select v-model="updateval"  :searchable="true"  class="fullwidth" label="naam" :options="data.zitplaatsen"></v-select>
            </section>
            <section v-show="active==='deuren'" class="modal-card-body fullheight">
              <v-select v-model="updateval"  :searchable="true"  class="fullwidth" label="naam" :options="data.deuren"></v-select>
            </section>
            <section v-show="active==='locatie'" class="modal-card-body">
              <input class="input"  v-model="updateval" v-bind:placeholder="placeholder + ' ' + autodata.locatie.nummer + ' ' + autodata.locatie.gemeente"></input>
            </section>
            <section v-show="active==='voorwaarden'" class="modal-card-body fullheight">            
                <v-select v-model="updateval" multiple :searchable="true" label="naam" :options="data.voorwaarden"></v-select>
            </section>
            <section v-show="active==='specificaties'" class="modal-card-body fullheight">            
                <v-select v-model="updateval" multiple :searchable="true" label="naam" :options="data.specs"></v-select>
            </section>
            <footer class="modal-card-foot">
              <a class="button is-success" @click="update(active, updateval)">Wijzigen</a>
              <a class="button" @click="modaltoggle()" >Annuleren</a>
            </footer>
          </div>
        </div>
  </div>
</template>
<script>
/* eslint-disable */
import axios from 'axios'
import VueLocalStorage from 'vue-ls'
import Vue from 'vue' 
import VeeValidate from 'vee-validate'
import moment from 'moment'
//aanvulling ip veevalidate voor daterange te kunnen bepalen
window.moment = moment;
Vue.use(VueLocalStorage); 
const msg = require('vee-validate/dist/locale/nl');
// nederlandse validatieberichten
Vue.use(VeeValidate, {
  locale: 'nl',
  dictionary: {
        nl: {
            messages: msg.default
        }
    }
  });        
export default {
  name: 'update',
  data () {
    return {
      title: 'update',
      id: this.$route.params.id,
      modal: false,
      updateval: null,
      disabled: {
         to: null
      },
      updatedate: {
        van: null,
        tot: null,
      },
      active: null,
      placeholder: null,
      data: {
        specs: [],
        merken: [],
        aandrijvingen: [],
        voorwaarden: [],
        deuren: ["2", "3", "5"],
        zitplaatsen: ["2", "4", "5", "7"]
      },
      autodata: {
        disabled: {
          to: null,
          from: null
        },    
        merk: null,
        specs: [],
        voorwaarden: [],
        aandrijvingen: null,
        locatie: {
          straat: null,
          nummer: null,
          gemeente: null
        },
        deuren: null,
        zitplaatsen: null,
        title: null,
        beschikbaarvan: null,
        beschikbaartot: null,
        prijs: null,
        bouwjaar: null,
        aandrijving: null,
        eigenaar:{
          gsm: null,
          naam: null
        }
      },
      acces: false,
      errors: [],
    }
  },
  watch: {
    // whenever question changes, this function will run
    acces: function (acces) {
      if(this.acces){
        this.getdata();
        this.$forceUpdate()
      }else{
        console.log('geen toegang')
      }
    }
  },
  created () {
    if(!Vue.ls.get('id')){
       this.$router.push('/Account/login')
    };
     //verhuur pas mogelijk maken vanaf vandaag
    var vandaag = new Date();
    this.disabled.to = new Date(vandaag.getFullYear(), vandaag.getMonth(), vandaag.getDate())
    this.allowed();   
  },
  methods: {
    //check auth
    allowed: function(){
      let url = 'http://localhost/duracar/autos/autos/' + this.id +'?_format=hal_json';
      axios.get(url)
      .then((auto)=>{
           let userid = Vue.ls.get('id');
           let url =auto.data._links['http://localhost/duracar/rest/relation/autos/autos/user_id'][0].href
           let index1 = url.indexOf('duracar/user/');
           let index2 = url.indexOf('?_format=hal_json');
           let id= url.substring(index1 + 13, index2)
          if(userid == id){
            this.acces = true;
          }else{
            this.acces = false;
          }      
      })
      .catch(error => {  
        this.errors.push(error.message)        
      })  
    },
    getdata: function() {
      let url = 'http://localhost/duracar/autos/autos/' + this.id +'?_format=hal_json';     
      axios.all([
        axios.get(url),
        axios.get(`http://localhost/duracar/voorwaarden`),
        axios.get(`http://localhost/duracar/specificaties`),
        axios.get(`http://localhost/duracar/merkenlijst`),
        axios.get(`http://localhost/duracar/aandrijvingenlijst`),
        axios.get(`http://localhost/duracar/gebruikers`)
      ])
      .then(axios.spread((auto, voorwaarden, specs, merken, aandrijvingen, gebruikers) => {
         //voorwaarden ophalen
        var voorwaardentemp = [];
        for (var i = 0; i < voorwaarden.data.length; i++) {
          voorwaardentemp[voorwaarden.data[i].id[0].value] = {
             naam : voorwaarden.data[i].name[0].value,
             uuid: voorwaarden.data[i].uuid[0].value,
             id: voorwaarden.data[i].id[0].value
          }       
        };
        this.data.voorwaarden = voorwaardentemp;
        //specs ophalen
        var specstemp = [];
        for (var j = 0; j < specs.data.length; j++) {
          specstemp[specs.data[j].id[0].value] = {
            naam : specs.data[j].name[0].value,
            uuid: specs.data[j].uuid[0].value,
            id: specs.data[j].id[0].value
          }
        };
        this.data.specs = specstemp;
        //merken ophalen
        var merkentemp = [];
        for (var k = 0; k < merken.data.length; k++) {
          merkentemp[merken.data[k].id[0].value] = {
            naam: merken.data[k].name[0].value,
            uuid: merken.data[k].uuid[0].value,
            id: merken.data[k].id[0].value
          }
        };
        this.data.merken = merkentemp;
        //aandrijvingen ophalen
        var aandrijvingentemp = [];
        for (var m = 0; m < aandrijvingen.data.length; m++) {
          aandrijvingentemp[aandrijvingen.data[m].id[0].value] = {
            naam : aandrijvingen.data[m].name[0].value,
            uuid: aandrijvingen.data[m].uuid[0].value,
            id: aandrijvingen.data[m].id[0].value
          }
        };
        this.data.aandrijvingen = aandrijvingentemp;
        //data rechtstreeks uit de carlist view halen en toewijzen 
        this.autodata.locatie.straat = auto.data.field_straat[0].value;
        this.autodata.locatie.nummer = auto.data.field_huisnummer[0].value;
        this.autodata.locatie.gemeente = auto.data.field_gemeente[0].value;
        this.autodata.deuren = auto.data.field_aantal_deuren[0].value;
        this.autodata.zitplaatsen = auto.data.field_zitplaatsen[0].value;
        this.autodata.bouwjaar = auto.data.field_bouwjaar[0].value;
        this.autodata.nummerplaat = auto.data.field_nummerplaat[0].value;
        this.autodata.title = auto.data.name[0].value;
        let beschikbaarvan = auto.data.field_beschikbaarvan[0].value;
        let beschikbaartot = auto.data.field_beschikbaartot[0].value;
        this.autodata.beschikbaarvan = new Date(beschikbaarvan);
        this.autodata.beschikbaartot = new Date(beschikbaartot);
        this.autodata.disabled.from = new Date(beschikbaartot.substring(0,4), beschikbaartot.substring(5,7)-1, beschikbaartot.substring(8,10));
        this.autodata.disabled.to = new Date(beschikbaarvan.substring(0,4), beschikbaarvan.substring(5,7)-1, beschikbaarvan.substring(8,10));
        this.autodata.prijs = auto.data.field_prijs[0].value;
        //aan de hand van id de voorwaarden ophalen    
          if (auto.data._links["http://localhost/duracar/rest/relation/autos/autos/field_voorwaarden"]) {
            let voorwaardentemp = auto.data._links["http://localhost/duracar/rest/relation/autos/autos/field_voorwaarden"];
            for(var b = 0; b < voorwaardentemp.length; b++){
              if (voorwaardentemp[b].href.match(/voorwaarden\/(\d+)/)[1]) {
                this.autodata.voorwaarden.push(this.data.voorwaarden[voorwaardentemp[b].href.match(/voorwaarden\/(\d+)/)[1]].naam)                
              }
           }
          }
        //aan de hand van de id de specs ophalen
          if (auto.data._links["http://localhost/duracar/rest/relation/autos/autos/field_specificaties"]) {
            let specificatiestemp = auto.data._links["http://localhost/duracar/rest/relation/autos/autos/field_specificaties"];
            for(var b = 0; b < specificatiestemp.length; b++){
              if (specificatiestemp[b].href.match(/specificaties\/(\d+)/)[1]) {
                this.autodata.specs.push(this.data.specs[specificatiestemp[b].href.match(/specificaties\/(\d+)/)[1]].naam)                
              }
            }
          }
        //auteur assignen
        for (var m = 0; m < gebruikers.data.length; m++) {
           let url =auto.data._links['http://localhost/duracar/rest/relation/autos/autos/user_id'][0].href
           let index1 = url.indexOf('duracar/user/');
           let index2 = url.indexOf('?_format=hal_json');
           let id= url.substring(index1 + 13, index2)
          if(gebruikers.data[m].uid[0].value == id){
            this.autodata.eigenaar.naam = gebruikers.data[m].name[0].value;
            this.autodata.eigenaar.gsm =  String(gebruikers.data[m].field_gsm_nummer[0].value);
          }
        };
        //aandrijving
          if (auto.data._links["http://localhost/duracar/rest/relation/autos/autos/field_aandrijving"]) {
            let aandrijvingtemp = auto.data._links["http://localhost/duracar/rest/relation/autos/autos/field_aandrijving"]; 
              if (aandrijvingtemp[0].href.match(/aandrijvingen\/(\d+)/)[1]) {
                this.autodata.aandrijving = this.data.aandrijvingen[aandrijvingtemp[0].href.match(/aandrijvingen\/(\d+)/)[1]].naam           
              }            
          } 
          if (auto.data._links["http://localhost/duracar/rest/relation/autos/autos/field_merk"]) {
            let merktemp = auto.data._links["http://localhost/duracar/rest/relation/autos/autos/field_merk"]; 
              if (merktemp[0].href.match(/merken\/(\d+)/)[1]) {
                this.autodata.merk = this.data.merken[merktemp[0].href.match(/merken\/(\d+)/)[1]].naam           
              }            
          } 
      }))
      .catch(error => {  
        console.log(error)  
        this.errors.push(error.message)        
      })  
    },
    //modal
    modaltoggle: function(param) {
      if(param){
        if(param === this.autodata.merk){
          this.active = "merk"
        }else if(param === this.autodata.title){
          this.active = "model"
        }else if(param === this.autodata.beschikbaarvan){
          this.active = "beschikbaar"
        }else if(param === this.autodata.prijs){
          this.active = "prijs"
        }else if(param === this.autodata.locatie.straat){
          this.active = "locatie"
        }else if(param === "voorwaarden"){
          this.active = "voorwaarden"
        }else if(param === "specs"){
          this.active = "specificaties"
        }else if(param === this.autodata.zitplaatsen){
          this.active = "zitplaatsen"
        }else if(param === this.autodata.deuren){
          this.active = "deuren"
        }else if(param === this.autodata.aandrijving){
          this.active = "aandrijving"
        }else if(param === this.autodata.nummerplaat){
          this.active = "nummerplaat"
        }else if(param === this.autodata.bouwjaar){
          this.active = "bouwjaar"
        }
        this.placeholder = param
      }else if(!param){ 
        this.active = null       
      }
      this.updateval = null;
      this.updatedate.tot = null;
      this.updatedate.van = null;
      this.modal = ! this.modal;
    },
    //custom format calendar
    datepickerformat: function(date) {
      return moment(date).format('D MMMM  YYYY');
    },
    update: function(param, val){
      let value = val;
      let text = {};
      if(val == null){
      }else{
        var hash = Vue.ls.get('auth');
        var unhash = String(window.atob(hash));
        var index = unhash.indexOf(":");
        var user = unhash.substring(0, unhash.indexOf(":"));
        var ww = unhash.substring(unhash.indexOf(":") + 1, unhash.lenght)      
        switch(param) {
            case "merk":
              text["http://localhost/duracar/rest/relation/autos/autos/field_merk"] = [
                  {
                      "_links": {
                          "self": {
                              "href": "http://localhost/duracar/merken/merken/"+ val.id +"?_format=hal_json"
                          },
                          "type": {
                              "href": "http://localhost/duracar/rest/type/merken/merken"
                          }
                      },
                      "uuid": [
                          {
                              "value": val.uuid
                          }
                      ]
                  }
              ]
            break;
            case "aandrijving":
              text["http://localhost/duracar/rest/relation/autos/autos/field_aandrijving"] = [
                  {
                      "_links": {
                          "self": {
                              "href": "http://localhost/duracar/aandrijvingen/aandrijvingen/"+ val.id +"?_format=hal_json"
                          },
                          "type": {
                              "href": "http://localhost/duracar/rest/type/aandrijvingen/aandrijvingen"
                          }
                      },
                      "uuid": [
                          {
                              "value": val.uuid
                          }
                      ]
                  }
              ]
            break;
            case "model":
              text['name'] = [{"value": value}];
            break;
            case "prijs":
              text['field_prijs'] = [{"value": value}];
            break;
            case "nummerplaat":
              text['field_nummerplaat'] = [{"value": value}];
            break;
            case "zitplaatsen":
              text['field_zitplaatsen'] = [{"value": value}];
            break;
            case "prijs":
              text['field_prijs'] = [{"value": value}];
            break;
            case "deuren":
              text['field_aantal_deuren'] = [{"value": value}];
            break;
            case "beschikbaar":
              text['field_beschikbaarvan'] = [{"value": this.filteryear(this.update.van)}];
              text['field_beschikbaartot'] = [{"value": this.filteryear(this.update.tot)}];
            break; 
            case "bouwjaar":
              text['field_bouwjaar'] = [{"value": value}];
            break; 
            case "locatie":
              console.log('locatie aa')
            break;
            case "voorwaarden":
              let vrwarray = [];
              let l = 0
              for(l = 0; l < val.length; l++){
                let str = {};
                str["target_id"] = val[l].id;
                str["target_type"] = "voorwaarden";
                str["target_uuid"] = val[l].uuid;
                str["url"] = "/duracar/voorwaarden/voorwaarden/" + val[l].id;
                vrwarray.push(str)
              }
              text = vrwarray;
            break;
            case "specificaties":
              let spcarray = [];
              let g = 0
              for(l = 0; g < val.length; g++){
                let str = {};
                str["target_id"] = val[g].id;
                str["target_type"] = "specificaties";
                str["target_uuid"] = val[g].uuid;
                str["url"] = "/duracar/specificaties/specificaties/" + val[g].id;
                spcarray.push(str)
              }
              text = spcarray;
            break;
            default:
        };
        let url = 'http://localhost/duracar/autos/autos/'+ this.id +'?_format=hal_json'
        axios.patch(url, text,
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
          this.errors = []  
          this.autodata.specs = [];
          this.autodata.voorwaarden = [];
          this.getdata(); 
        })
        .catch( e => {
            this.errors.push(e.response.statusText)
            console.log(e.response)
        });
      }
      //console.log(text)
      this.active = null;
      this.updateval = null;
      this.modaltoggle();
    },
  //custom format calendar
    datepickerformat: function(date) {
      return moment(date).format('D MMMM  YYYY');
    },
  //filteren van specifieke datum uit beschikbaarheid van calender
    filteryear: function(param) {
      var vandaag = param;
      var maand = param.getMonth() + 1;
      let date = String(vandaag.getFullYear() + "-" + maand +"-"+ vandaag.getDate())
      return date
    },
  },
  filters: {
    datumfilter: function(val){      
    if (!val) return ''
    return moment(String(val)).format('MM/DD/YYYY')
  }
  }
}
</script>

