<template>
  <div class="detail">
   <h1 class="pagetitle">{{ title }}</h1>
    <div v-if="errors.length !== 0" class="columns is-mobile" >
      <div class="column is-10 is-offset-1">
        <div class="notification is-danger">
          <p v-for="errors in errors">{{ errors }}</p>
        </div>
      </div>
    </div>
    <div v-if="errors.length == 0" class="card noshadow">
        <div v-if="afbeeldingen.picture1 || afbeeldingen.picture2 || afbeeldingen.picture3" class="card-content nopadding noshadow relative">
          <div v-if="Object.keys(this.afbeeldingen).length > 1" class="absolute fullwidth fullheight">
            <a @click="vorige" class="inlineblock fullheight relative"><i class="fa fa-chevron-left fa-5x imagecontrol block absolute" aria-hidden="true"></i></a><a class="inlineblock floatright fullheight relative" @click="volgende"><i class="fa fa-chevron-right fa-5x imagecontrol block absolute next" aria-hidden="true"></i></a>
          </div>
          <div v-for="number in [afbeeldingnummer]" class="content noshadow">
            <img :src="afbeeldingen['picture' + Math.abs(afbeeldingnummer)]"/>
          </div>
        </div>

        <div class="card noshadow grey white">
          <div class="card-content">
            <div class="content">
              <h1 class="center lemonmilk subtitle red">Info</h1>
                <div class="columns is-mobile">
                  <div class="column customcolumn">
                    <h2 class="alineatitle bold red">Periode beschikbaar</h2>
                    <p>van <span class="bold">12/5/2017</span> tot <span class="bold">13/5/2017</span></p>
                  </div>
                </div>    
              <div class="columns is-mobile">
                <div class="column customcolumn">
                  <h2 class="alineatitle bold red">Eigenaar</h2>
                  <p>door X</p>
                </div>
                <div class="column customcolumn">
                  <h2 class="alineatitle red bold">Prijs</h2>
                  <p>€{{ prijs }}/dag</p>
                </div>
              </div>  
              <div class="columns is-mobile">
                <div class="column customcolumn">
                  <h2 class="alineatitle red bold">GSM</h2>
                  <p>{{  }}</p>
                </div>
                <div class="column customcolumn">
                  <h2 class="alineatitle red bold">Locatie</h2>
                  <p>{{ locatie.straat }} {{ locatie.nummer }} <br> {{ locatie.gemeente }}</p>
                </div>
              </div>  
              <div v-if="voorwaarden.length > 0" class="columns is-mobile">
                <div class="column customcolumn">
                  <h2 class="alineatitle red bold">Voorwaarden</h2>
                  <ul>
                    <li v-for="voorwaarde in voorwaarden">
                    {{ voorwaarde }}
                    </li>
                  </ul>
                </div>
              </div>
              <div class="columns is-mobile">
                <div class="column customcolumn">
                  <h2 class="alineatitle red bold">Zitplaatsen</h2>
                  <p> {{ zitplaatsen }} </p>
                </div>
                <div class="column customcolumn">
                  <h2 class="alineatitle red bold">Deuren</h2>
                  <p> {{ deuren }} </p>
                </div>
              </div> 
              <div class="columns is-mobile">
                <div class="column customcolumn">
                  <h2 class="alineatitle red bold">Aandrijving</h2>
                  <p>{{ aandrijving }}</p>
                </div>
                <div class="column customcolumn">
                  <h2 class="alineatitle red bold">Nummerplaat</h2>
                  <p>{{ nummerplaat }}</p>
                </div>
              </div>  
              <div v-if="specs.length > 0" class="columns is-mobile">
                <div class="column customcolumn">
                  <h2 class="alineatitle red bold">Specificaties</h2>
                  <ul>
                    <li v-for="spec in specs">
                     {{ spec }} 
                     </li>
                  </ul>
                </div>
              </div>                                 
                    <div class="columns is-multiline is-mobile datepicker">
                      <div class=" column is-half customcolumn">
                        <h2 class="alineatitle red bold center">Beschikbaar van</h2>
                        <div  class="center">
                          <input type="date" name="van"  max="2018-11-28">
                        </div>
                      </div>
                      <div class=" column is-half customcolumn">
                        <h2 class="alineatitle red bold center">Beschikbaar tot</h2>
                        <div class="center">
                          <input  type="date" name="tot" max="2018-11-28">
                        </div>
                      </div>
                    </div> 
                    <div >
                    </div>   
                    <div class="columns is-multiline is-mobile">
                      <div class=" column customcolumn">                     
                        <button class="button fullwidth">Huur mij nu!</button>
                      </div>
                    </div>                
            </div>
          </div>
        </div>
    </div>    
  </div>
</template>
<script>
/* eslint-disable */
import axios from 'axios'            
export default {
  name: 'detail',
  data () {
    return {
      title: 'detail',
      id: this.$route.params.id,
      prijs: null,
      deuren: null,
      zitplaatsen: null,
      nummerplaat: null,
      aandrijving: null,
      voorwaarden: [],
      specs: [],
      merk: null,
      locatie: {
        straat: null,
        nummer: 0,
        gemeente: null
      },
      afbeeldingen: {
      },
      errors: [],
      data: {
        merken: [],
        aandrijvingen: [],
        voorwaarden: [],
        specs: [],
      },
      geschrevendoor: null,
      afbeeldingnummer: 1,

    }
  },
  created () {
    this.autosget();
  },
  methods: {
    autosget: function() {
      var url = 'http://localhost/duracar/autos/autos/' + this.id +'?_format=hal_json'
      axios.all([
        axios.get(url),
        axios.get(`http://localhost/duracar/voorwaarden`),
        axios.get(`http://localhost/duracar/specificaties`),
        axios.get(`http://localhost/duracar/merkenlijst`),
        axios.get(`http://localhost/duracar/aandrijvingenlijst`)
      ])
      .then(axios.spread((autos, voorwaarden, specs, merken, aandrijvingen) => {
         //voorwaarden ophalen
        var voorwaardentemp = [];
        for (var i = 0; i < voorwaarden.data.length; i++) {
          voorwaardentemp[voorwaarden.data[i].id[0].value] = {
             naam : voorwaarden.data[i].name[0].value
          }       
        };
        this.data.voorwaarden = voorwaardentemp;
        //specs ophalen
        var specstemp = [];
        for (var j = 0; j < specs.data.length; j++) {
          specstemp[specs.data[j].id[0].value] = {
            naam : specs.data[j].name[0].value,
          }
        };
        this.data.specs = specstemp;
        //merken ophalen
        var merkentemp = [];
        for (var k = 0; k < merken.data.length; k++) {
          merkentemp[merken.data[k].id[0].value] = {
            naam : merken.data[k].name[0].value,
          }
        };
        this.data.merken = merkentemp;
        //aandrijvingen ophalen
        var aandrijvingentemp = [];
        for (var m = 0; m < aandrijvingen.data.length; m++) {
          aandrijvingentemp[aandrijvingen.data[m].id[0].value] = {
            naam : aandrijvingen.data[m].name[0].value,
          }
        };
        this.data.aandrijvingen = aandrijvingentemp;
        //data rechtstreeks uit de carlist view halen en toewijzen 
        (autos.data._links["http://localhost/duracar/rest/relation/autos/autos/field_foto1"]) ? this.afbeeldingen.picture1 = autos.data._links["http://localhost/duracar/rest/relation/autos/autos/field_foto1"][0].href : null;
        (autos.data._links["http://localhost/duracar/rest/relation/autos/autos/field_foto2"]) ? this.afbeeldingen.picture2 = autos.data._links["http://localhost/duracar/rest/relation/autos/autos/field_foto2"][0].href : null;
        (autos.data._links["http://localhost/duracar/rest/relation/autos/autos/field_foto3"]) ? this.afbeeldingen.picture3 = autos.data._links["http://localhost/duracar/rest/relation/autos/autos/field_foto3"][0].href : null;
        this.locatie.straat = autos.data.field_straat[0].value;
        this.locatie.nummer = autos.data.field_huisnummer[0].value;
        this.locatie.gemeente = autos.data.field_gemeente[0].value;
        this.deuren = autos.data.field_aantal_deuren[0].value;
        this.zitplaatsen = autos.data.field_zitplaatsen[0].value;
        this.nummerplaat = autos.data.field_nummerplaat[0].value;
        this.title = autos.data.name[0].value;
        this.prijs = autos.data.field_prijs[0].value;     
        //aan de hand van id de voorwaarden ophalen    
          if (autos.data._links["http://localhost/duracar/rest/relation/autos/autos/field_voorwaarden"]) {
            let voorwaardentemp = autos.data._links["http://localhost/duracar/rest/relation/autos/autos/field_voorwaarden"];
            for(var b = 0; b < voorwaardentemp.length; b++){
              if (voorwaardentemp[b].href.match(/voorwaarden\/(\d+)/)[1]) {
                this.voorwaarden.push(this.data.voorwaarden[voorwaardentemp[b].href.match(/voorwaarden\/(\d+)/)[1]].naam)                
              }
            }
          }
        //aan de hand van de id de specs ophalen
          if (autos.data._links["http://localhost/duracar/rest/relation/autos/autos/field_specificaties"]) {
            let specificatiestemp = autos.data._links["http://localhost/duracar/rest/relation/autos/autos/field_specificaties"];
            for(var b = 0; b < specificatiestemp.length; b++){
              if (specificatiestemp[b].href.match(/specificaties\/(\d+)/)[1]) {
                this.specs.push(this.data.specs[specificatiestemp[b].href.match(/specificaties\/(\d+)/)[1]].naam)                
              }
            }
          }
        //aandrijving
          if (autos.data._links["http://localhost/duracar/rest/relation/autos/autos/field_aandrijving"]) {
            let aandrijvingtemp = autos.data._links["http://localhost/duracar/rest/relation/autos/autos/field_aandrijving"]; 
              if (aandrijvingtemp[0].href.match(/aandrijvingen\/(\d+)/)[1]) {
                this.aandrijving = this.data.aandrijvingen[aandrijvingtemp[0].href.match(/aandrijvingen\/(\d+)/)[1]].naam           
              }            
          }    

      }))
      .catch(error => {    
        this.errors.push(error.message)
        
      })  
    },
    //afbeeldingslider
    volgende: function() {
      if(this.afbeeldingnummer == Object.keys(this.afbeeldingen).length){
        this.afbeeldingnummer = 1
      }else{
      this.afbeeldingnummer += 1
      }
    },
    vorige: function() {
      if(this.afbeeldingnummer == 1){
        this.afbeeldingnummer = Object.keys(this.afbeeldingen).length
      }else{
        this.afbeeldingnummer -= 1
      }
    }
  }
}
</script>

