<template>
  <div class="verhuren">
    <h1 class="pagetitle">{{ title }}</h1>
      <form @submit.prevent="validateBeforeSubmit" v-if="!formSubmitted">
      <div class="columns is-mobile">
        <div class="column is-10 is-offset-1">  
          <div class="field">
            <label class="label">Model</label>
            <div class="control">
              <input v-model="auto.model" v-validate.initial="auto.model" data-vv-rules="required" class="input" type="text" placeholder="Modelnaam">
            </div>
            <p class="help is-danger" v-if="errors.has('auto.model')">{{ errors.first('auto.model') }}</p>
          </div>   
        </div>
      </div>
      <div class="columns is-mobile">
        <div class="column is-10 is-offset-1">  
          <div class="field">
            <label class="label">Nummerplaat</label>
            <div class="control">
              <input data-vv-name="nummerplaat" v-model="auto.nummerplaat" v-validate.initial="auto.nummerplaat" data-vv-rules="required|max:7"  class="input" type="text" placeholder="1hln489">
            </div>
            <p class="help is-danger" v-if="errors.has('auto.nummerplaat')">{{ errors.first('auto.nummerplaat') }}</p>
          </div>   
        </div>
      </div>
      <div class="columns is-mobile">
        <div class="column is-10 is-offset-1">  
          <div class="field">
            <div class="control">
              <label class="label">Merk</label>
              <div class="fullwidth">
                <v-select data-vv-name="auto.merk"  :searchable="true"  class="fullwidth" v-model="auto.merk" v-validate.initial="auto.merk" data-vv-rules="required" :options="data.merken"></v-select>
              </div>
            </div>
            <p class="help is-danger" v-if="errors.has('auto.merk')">{{ errors.first('auto.merk') }}</p>
          </div>   
        </div>
      </div>
      <div class="columns is-mobile">
          <div class="column is-5 is-offset-1">
            <label class="label">Zitplaatsen</label>
            <v-select :searchable="true" class="fullwidth" data-vv-name="auto.zitplaatsen" v-model="auto.zitplaatsen" v-validate.initial="auto.zitplaatsen" data-vv-rules="required" :options="data.zitplaatsen"></v-select>
            <p class="help is-danger" v-if="errors.has('auto.zitplaatsen')">{{ errors.first('auto.zitplaatsen') }}</p> 
          </div>
          <div class="column is-5">
            <label class="label">Deuren</label>
            <v-select :searchable="true" class="fullwidth" data-vv-name="auto.deuren" v-model="auto.deuren" v-validate.initial="auto.deuren" data-vv-rules="required" :options="data.deuren"></v-select>
            <p class="help is-danger" v-if="errors.has('auto.deuren')">{{ errors.first('auto.deuren') }}</p>
          </div>              
      </div>
      <div class="columns is-mobile">
        <div class="column is-10 is-offset-1">  
          <div class="field">
            <div class="control">
              <label class="label">Aandrijving</label>
              <div class="fullwidth">
                <v-select data-vv-name="auto.aandrijving"  :searchable="true"  class="fullwidth" v-model="auto.aandrijving" v-validate.initial="auto.aandrijving" data-vv-rules="required" :options="data.aandrijvingen"></v-select>
              </div>
            </div>
            <p class="help is-danger" v-if="errors.has('auto.aandrijving')">{{ errors.first('auto.aandrijving') }}</p>
          </div>   
        </div>
      </div>
      <div class="columns is-mobile">
        <div class="column is-10 is-offset-1">  
          <div class="field">
            <div class="control">
              <label class="label">Specificaties</label>
              <div class="fullwidth">
                <v-select multiple :searchable="true"  class="fullwidth" v-model="auto.specs" :options="data.specs"></v-select>
              </div>
            </div>
          </div>   
        </div>
      </div>
      <div class="columns is-mobile">
        <div class="column is-10 is-offset-1">  
          <div class="field">
            <label class="label">Gsm</label>
            <div class="field has-addons">
              <p class="control">
                <a class="button is-static">
                  +32
                </a>
              </p>
              <p class="control is-expanded">
                <input disabled v-model="auto.gsm" class="input" type="text" >
              </p>
            </div>
          </div>   
        </div>
      </div>
      <div class="columns is-mobile">
        <div class="column is-8 is-offset-1">  
          <div class="field">
            <label class="label">Straat</label>
            <div class="control">
              <input v-model="auto.locatie.straat" v-validate.initial="auto.locatie.straat" data-vv-rules="required|alpha" class="input" type="text" placeholder="straatnaam">
            </div>
          </div>   
        </div>
        <div class="column is-2">  
          <div class="field">
            <label class="label">Nr</label>
            <div class="control">
              <input v-model="auto.locatie.nummer" v-validate.initial="auto.locatie.nummer" data-vv-rules="required|numeric|between:0,1000" class="input" type="text" placeholder="20">
            </div>
          </div>   
        </div>
      </div>
      <div class="columns is-mobile" v-if="errors.has('auto.locatie.straat') | errors.has('auto.locatie.nummer')">
        <div class="column is-10 is-offset-1">
          <p class="help is-danger" v-if="errors.has('auto.locatie.straat')">{{ errors.first('auto.locatie.straat') }}</p>
          <p class="help is-danger" v-if="errors.has('auto.locatie.nummer')">{{ errors.first('auto.locatie.nummer') }}</p>
        </div>
      </div>
      <div class="columns is-mobile">
        <div class="column is-10 is-offset-1">  
           <div class="field">
            <label class="label">Gemeente</label>
            <div class="control">
              <input v-model="auto.locatie.gemeente" v-validate.initial="auto.locatie.gemeente" data-vv-rules="required|alpha" class="input" type="text" placeholder="gemeente">
            </div>
          </div>  
        </div>
      </div>
      <div class="columns is-mobile" v-if="errors.has('auto.locatie.gemeente')">
        <div class="column is-10 is-offset-1">
          <p class="help is-danger" v-if="errors.has('auto.locatie.gemeente')">{{ errors.first('auto.locatie.gemeente') }}</p>
        </div>
      </div>
      <div class="columns is-mobile">
          <div class="column is-5 is-offset-1 center">
            <label class="label left">Beschikbaar van</label>
            <input v-model="auto.beschikbaarvan" type="date" data-vv-name="auto.beschikbaarvan"  v-validate.initial="auto.beschikbaarvan" data-vv-rules="required"><br>         
            <p class="help is-danger" v-if="errors.has('auto.beschikbaarvan')">{{ errors.first('auto.beschikbaarvan') }}</p> 
          </div>
          <div class="column is-5 center">
            <label class="label left">Beschikbaar tot</label>
            <input v-model="auto.beschikbaartot" type="date" data-vv-name="auto.beschikbaartot"  v-validate.initial="auto.beschikbaartot" data-vv-rules="required"><br>         
            <p class="help is-danger" v-if="errors.has('auto.beschikbaartot')">{{ errors.first('auto.beschikbaartot') }}</p>
          </div>              
      </div>
      <div class="columns is-mobile">
          <div class="column is-5 is-offset-1">
            <label class="label">€/dag</label>
              <div class="control">
                <input data-vv-name="prijs" v-model="auto.prijs" v-validate.initial="auto.prijs" data-vv-rules="required|between:0,100"  class="input" type="text" placeholder="20">
              </div>
            <p class="help is-danger" v-if="errors.has('auto.prijs')">{{ errors.first('auto.prijs') }}</p>
          </div>
          <div class="column is-5">
            <label class="label">Bouwjaar</label>
              <div class="control">
                <input data-vv-name="bouwjaar" v-model="auto.bouwjaar" v-validate.initial="auto.bouwjaar" data-vv-rules="required|between:1900,2017"  class="input" type="text" placeholder="2017">
              </div>
            <p class="help is-danger" v-if="errors.has('auto.bouwjaar')">{{ errors.first('auto.bouwjaar') }}</p>
          </div>              
      </div>
      <div class="columns is-mobile">
        <div class="column is-10 is-offset-1">  
          <div class="field">
            <div class="control">
              <label class="label">Voorwaarden</label>
              <div class="fullwidth">
                <v-select multiple :searchable="true"  class="fullwidth" v-model="auto.voorwaarden" :options="data.voorwaarden"></v-select>
              </div>
            </div>
          </div>   
        </div>
      </div>
      <div class="columns is-mobile">
        <div class="column is-10 is-offset-1">
          <label class="label">Afbeeldingen</label>
        </div> 
      </div>
      <div class="columns is-mobile">
        <div class="column is-4">
              <div class="file addpicture is-small is-boxed">
                <label class="file-label">
                  <input data-vv-name="afbeelding1" @change="foto($event, 1)" data-vv-rules="image" class="file-input" type="file" name="resume">
                  <span class="file-cta">
                    <span class="file-icon">
                      <i class="fa fa-plus"></i>
                    </span>
                    <span class="file-label">
                      Foto1
                    </span>
                  </span>
                  <span class="file-name" v-if="auto.fotos.foto1">
                    {{ auto.fotos.foto1.name }}
                  </span>
                </label>
              </div> 
          <p class="help is-danger" v-if="errors.has('afbeelding1')">{{ errors.first('afbeelding1') }}</p>
        </div>
        <div class="column is-4">
              <div class="file addpicture is-small is-boxed">
                <label class="file-label">
                  <input data-vv-name="afbeelding2" @change="foto($event, 2)" data-vv-rules="image" class="file-input" type="file" name="resume">
                  <span class="file-cta">
                    <span class="file-icon">
                      <i class="fa fa-plus"></i>
                    </span>
                    <span class="file-label">
                      Foto2
                    </span>
                  </span>
                  <span class="file-name" v-if="auto.fotos.foto2">
                    {{ auto.fotos.foto2.name }}
                  </span>
                </label>
              </div> 
          <p class="help is-danger" v-if="errors.has('afbeelding2')">{{ errors.first('afbeelding2') }}</p>
        </div>
        <div class="column is-4">
              <div class="file addpicture is-small is-boxed">
                <label class="file-label">
                  <input data-vv-name="afbeelding3" @change="foto($event, 3)" data-vv-rules="image" class="file-input" type="file" name="resume">
                  <span class="file-cta">
                    <span class="file-icon">
                      <i class="fa fa-plus"></i>
                    </span>
                    <span class="file-label">
                      Foto3
                    </span>
                  </span>
                  <span class="file-name" v-if="auto.fotos.foto3">
                    {{ auto.fotos.foto3.name }}
                  </span>
                </label>
              </div> 
          <p class="help is-danger" v-if="errors.has('afbeelding3')">{{ errors.first('afbeelding3') }}</p>
        </div>
      </div>
      <div class="columns is-mobile">
        <div class="column is-10 is-offset-1">
          <div class="control">
            <button id='registreer' class="button is-link fullwidth">Plaatsen</button>
          </div>
        </div>
      </div>
      <div class="columns is-mobile">
        <div class="column is-10 is-offset-1">
          <div  v-if="errorsoncreate.length !== 0" class="notification is-danger">
            <p v-for="error in errorsoncreate">{{ error }}</p>
            <p>Probeer opnieuw of neem contact op met de administrator</p>
          </div>
        </div>
      </div>
    </form>    
    <div v-else class="columns is-mobile" >
      <div class="column is-10 is-offset-1">   
        <div class="notification is-primary">
          De auto van het type {{ auto.model }} is aangemaakt.
        </div>              
      </div>     
    </div>
  </div>
</template>

<script>
/* eslint-disable */
import Vue from 'vue'
import VeeValidate from 'vee-validate'
import axios from 'axios'
import moment from 'moment'
const msg = require('vee-validate/dist/locale/nl');
//aanvulling ip veevalidate voor daterange te kunnen bepalen
window.moment = moment;
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
  name: 'verhuren',
  data () {
    return {
      title: 'Verhuren',
      auto: {
        nummerplaat: null,
        merk: null,
        model: null,
        zitplaatsen: null,
        deuren: null,
        aandrijving: null,
        specs: [],
        gsm: '496060458',
        locatie: {
          straat: null,
          nummer: null,
          gemeente: null
        },
        beschikbaarvan: null,
        beschikbaartot: null,
        prijs: null,
        bouwjaar: null,
        voorwaarden: [],
        fotos: {
          foto1: null,
          foto2: null,
          foto3: null,
        }
      },
      data: {
        merken: [],
        deuren: ["2", "3", "5"],
        zitplaatsen: ["2", "4", "5", "7"],
        aandrijvingen: [],
        specs: []
      },
      errorsoncreate: [],
      formSubmitted: false,
    }
  },
  created () {
    this.selectdata();
  },
  methods: {
    //submitevent
    validateBeforeSubmit: function (e) {
        this.$validator.validateAll()
        if (!this.errors.any()) {
          this.geolocatie(); 
          this.postauto();
          this.formSubmitted = true; 
        }
    },
    //aanmaken van nieuwe data in entity autos
    postauto: function () {   
      
    },
    //assign van foto input
    foto: function (event, nummer) {
      if(nummer == 1){
        event.target.files[0] ? this.auto.fotos.foto1 = event.target.files[0] : this.auto.fotos.foto1 = null
        console.log()
      }else if(nummer == 2){
        event.target.files[0] ? this.auto.fotos.foto2 = event.target.files[0] : this.auto.fotos.foto2 = null
      }else if(nummer == 3){
        event.target.files[0] ? this.auto.fotos.foto3 = event.target.files[0] : this.auto.fotos.foto3 = null
      }
    },
    //ophalen van alle data voor selectievakken
    selectdata: function () {
      axios.all([
        axios.get(`http://localhost/duracar/merkenlijst`),
        axios.get(`http://localhost/duracar/aandrijvingenlijst`),
        axios.get(`http://localhost/duracar/specificaties`),
        axios.get(`http://localhost/duracar/voorwaarden`)
      ])
      .then(axios.spread((merken, aandrijvingen, specs, voorwaarden) => {
        //assign merken
      var merkentemp = [];
        for (var k = 0; k < merken.data.length; k++) {
          merkentemp.push(merken.data[k].name[0].value,) 
        };
        this.data.merken = merkentemp;
        //assign aandrijvingen
        var aandrijvingentemp = []
        for (var k = 0; k < aandrijvingen.data.length; k++) {
          aandrijvingentemp.push(aandrijvingen.data[k].name[0].value,) 
        };
        this.data.aandrijvingen = aandrijvingentemp;
        //assign specs
        var specstemp = []
        for (var k = 0; k < specs.data.length; k++) {
          specstemp.push(specs.data[k].name[0].value,) 
        };
        this.data.specs = specstemp;
        //assign voorwaarden
        var voorwaardentemp = []
        for (var k = 0; k < voorwaarden.data.length; k++) {
          voorwaardentemp.push(voorwaarden.data[k].name[0].value,) 
        };
        this.data.voorwaarden = voorwaardentemp;
      }))
      .catch( e => {
        this.errorsoncreate.push(e.message)
      })
    },
    //bepalen lat en long van adres
    geolocatie: function () {
      let nummer = this.auto.locatie.nummer;
      let straat = this.auto.locatie.straat;
      let gemeente = this.auto.locatie.gemeente;
      axios.get(`https://maps.googleapis.com/maps/api/geocode/json`,{
        params: {
          address: nummer  + '+' + straat +'+' + gemeente,
          KEY: 'AIzaSyCCv6YJdCeG7tz3kVDWQJHsGcIU1LJB1kg'
        }
      })
      .then((locaties) => {
        if(locaties.data.results.length !== 0){
          //this.auto.locatie.la = locaties.data.results[0].geometry.location.lat;
          //this.auto.locatie.lo = locaties.data.results[0].geometry.location.lng;
          console.log(locaties.data.results[0].geometry.location.lat);
          console.log(locaties.data.results[0].geometry.location.lng);

        }        
      })
      .catch((e) => {
        this.errors.push(e.message)
      })
    }   
  }
}
</script>
