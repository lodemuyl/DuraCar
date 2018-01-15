<template>
  <div class="detail">
   <h1 class="pagetitle">{{ title }}</h1>
    <div v-if="errors.length !== 0" class="columns is-mobile" >
      <div class="column is-10 is-offset-1">
        <div class="notification is-danger">
          <p v-for="errors in errors">{{ errors }}</p>
          <router-link v-if="!loggedin" to="/Account/Login">Login</router-link>
        </div>
      </div>
    </div>
    <div class="card noshadow">
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
                    <p>van <span class="bold"> {{ beschikbaarvan | datumfilter }} </span> tot <span class="bold"> {{ beschikbaartot | datumfilter }} </span></p>
                  </div>
                </div>    
              <div class="columns is-mobile">
                <div class="column customcolumn">
                  <h2 class="alineatitle bold red">Eigenaar</h2>
                  <p>{{ eigenaar.naam }}</p>
                </div>
                <div class="column customcolumn">
                  <h2 class="alineatitle red bold">Prijs</h2>
                  <p>€{{ prijs }}/dag</p>
                </div>
              </div>  
              <div class="columns is-mobile">
                <div class="column customcolumn">
                  <h2 class="alineatitle red bold">GSM</h2>
                  <p>{{ eigenaar.gsm }}</p>
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
                        <h2 class="alineatitle red bold center">Huren van</h2>
                        <div  class="center">
                          <datepicker language="nl" v-model="hurenvan" :format="datepickerformat" :disabled="disabled"></datepicker>                            
                        </div>
                      </div>
                      <div class=" column is-half customcolumn" id="rightcalendar">
                        <h2 class="alineatitle red bold center">Huren tot</h2>
                        <div class="center">
                          <datepicker language="nl" v-model="hurentot" :format="datepickerformat" :disabled="disabled"></datepicker>                            
                        </div>
                      </div>
                    </div> 
                    <div >
                    </div>   
                    <div class="columns is-multiline is-mobile">
                      <div class=" column customcolumn">                     
                        <button @click="hurenvalidatie" class="buttonhuur fullwidth">Huur mij nu!</button>
                      </div>
                    </div>
              <div class="reviews">
                <h1 v-if="reviews.length > 0" class="center lemonmilk subtitle red">Reviews</h1>
                <div v-for="review in reviews" class="columns is-multiline is-mobile reviewpannel">
                  <div class="column"> 
                    <h2 class="alineatitle red bold inline">{{ review.auteur }}</h2><p class="green inline floatright">{{ review.datum | datumfilter }}</p>
                    <p>{{ review.beschrijving }}</p>
                    <div id="sterren">                  
                      <star-rating v-bind:star-size="20" active-color="#FF5A5F" v-bind:rating="review.rating"></star-rating>        
                    </div>
                  </div>
                </div>
                <div v-if="reviewauteur" class="columns is-multiline is-mobile reviewpannelwrite">     
                  <div class="column"> 
                    <h2 class="alineatitle red bold">{{ reviewauteur }}</h2>
                    <input class="input" v-model="review"></input>                   
                    <div id="sterrenplaats">                  
                      <star-rating v-bind:star-size="20" active-color="#FF5A5F" v-model="score"></star-rating>        
                    </div>
                     <button @click="reviewplaatsen()" class="button is-link fullwidth plaatsen">Plaats</button>
                  </div>
                 
                </div>
              </div>                
            </div>
          </div>
        </div>
    </div> 
    <div  class="modal" v-bind:class="{ 'is-active': modal }">
      <div class="modal-background"></div>
      <div class="modal-card">
        <header class="modal-card-head fullwidth">
          <p class="modal-card-title lemonmilk">Reserveren</p>
          <button  @click="modaltoggle()" class="delete" aria-label="close"></button>
        </header>
        <section class="modal-card-body">
          <p class="label">Weet je zeker dat je deze {{ title }} wilt reserveren van {{ hurenvan|datumfilter }} tot {{ hurentot|datumfilter }}?</p>
        </section>
        <footer class="modal-card-foot">
          <a class="button is-success" @click="modaltoggle(true)">Reserveren</a>
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
  name: 'detail',
  data () {
    return {
      modal: false,
      title: 'detail',
      id: this.$route.params.id,
      prijs: null,
      reviewauteur: null,
      score: 4,
      review: null,
      reviews: [],
      deuren: null,
      eigenaar: {
        naam: null,
        gsm: null
      },
      zitplaatsen: null,
      nummerplaat: null,
      aandrijving: null,
      beschikbaarvan: null,
      beschikbaartot: null,
      hurenvan: null,
      hurentot: null,
      huurders:[],
      gehuurdeautos: [],
      voorwaarden: [],
      disabled: {
        to: null,
        from: null
      },    
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
      loggedin: false
    }
  },
  created () {
    if(Vue.ls.get('id')){
       this.loggedin = true
    }
    this.autosget();
  },
  methods: {
    //ophalen specifieke auto voor detail gegevens weer te geven
    autosget: function() {
      var url = 'http://localhost/duracar/autos/autos/' + this.id +'?_format=hal_json';
      var reviewsurl = 'http://localhost/duracar/reviews/' + this.id;
      axios.all([
        axios.get(url),
        axios.get(`http://localhost/duracar/voorwaarden`),
        axios.get(`http://localhost/duracar/specificaties`),
        axios.get(`http://localhost/duracar/merkenlijst`),
        axios.get(`http://localhost/duracar/aandrijvingenlijst`),
        axios.get(`http://localhost/duracar/gebruikers`),
        axios.get(reviewsurl)
      ])
      .then(axios.spread((autos, voorwaarden, specs, merken, aandrijvingen, gebruikers, reviews) => {
        //indien men een review wilt schrijven bepalen van user
        if(Vue.ls.get('naam') && Vue.ls.get('id')){
        this.reviewauteur = Vue.ls.get('naam');
        }
        //ophalen van huurders voor deze auto
        if(autos.data.field_hurenauto){
          this.huurders = autos.data.field_hurenauto
        }
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
        let beschikbaarvan = autos.data.field_beschikbaarvan[0].value;
        let beschikbaartot = autos.data.field_beschikbaartot[0].value;
        this.beschikbaarvan = new Date(beschikbaarvan);
        this.beschikbaartot = new Date(beschikbaartot);
        this.disabled.from = new Date(beschikbaartot.substring(0,4), beschikbaartot.substring(5,7)-1, beschikbaartot.substring(8,10));
        this.disabled.to = new Date(beschikbaarvan.substring(0,4), beschikbaarvan.substring(5,7)-1, beschikbaarvan.substring(8,10));
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
        //auteur assignen
        for (var m = 0; m < gebruikers.data.length; m++) {
           let url =autos.data._links['http://localhost/duracar/rest/relation/autos/autos/user_id'][0].href
           let index1 = url.indexOf('duracar/user/');
           let index2 = url.indexOf('?_format=hal_json');
           let id= url.substring(index1 + 13, index2)
          if(gebruikers.data[m].uid[0].value == id){
            this.eigenaar.naam = gebruikers.data[m].name[0].value;
            this.eigenaar.gsm =  String(gebruikers.data[m].field_gsm_nummer[0].value);
            //data ophalen over gehuurde autos van ingelogde gebruiker
            if(gebruikers.data[m].field_huren){
              this.gehuurdeautos = gebruikers.data[m].field_huren
            }
          }
        };
        //aandrijving
          if (autos.data._links["http://localhost/duracar/rest/relation/autos/autos/field_aandrijving"]) {
            let aandrijvingtemp = autos.data._links["http://localhost/duracar/rest/relation/autos/autos/field_aandrijving"]; 
              if (aandrijvingtemp[0].href.match(/aandrijvingen\/(\d+)/)[1]) {
                this.aandrijving = this.data.aandrijvingen[aandrijvingtemp[0].href.match(/aandrijvingen\/(\d+)/)[1]].naam           
              }            
          }   
        //ophalen reviews
        var reviewstemp = [];
          for (var j = 0; j < reviews.data.length; j++) {
            reviewstemp[j] = {
              beschrijving : reviews.data[j].field_beschrijving[0].value,
              rating: reviews.data[j].field_rating[0].value,
              datum: reviews.data[j].created[0].value          
            };
            for (var m = 0; m < gebruikers.data.length; m++) {
              if(gebruikers.data[m].uid[0].value == reviews.data[j].user_id[0].target_id){
                reviewstemp[j].auteur = gebruikers.data[m].name[0].value;
              }
            }
          };
        this.reviews = reviewstemp;
      }))
      .catch(error => {  
        console.log(error)  
        this.errors.push(error.message)
        
      })  
    },
    //afbeeldingslider volgende afbeelding
    volgende: function() {
      if(this.afbeeldingnummer == Object.keys(this.afbeeldingen).length){
        this.afbeeldingnummer = 1
      }else{
      this.afbeeldingnummer += 1
      }
    },
    //afbeeldingslider vorige afbeelding
    vorige: function() {
      if(this.afbeeldingnummer == 1){
        this.afbeeldingnummer = Object.keys(this.afbeeldingen).length
      }else{
        this.afbeeldingnummer -= 1
      }
    },
    //custom format calendar
    datepickerformat: function(date) {
      return moment(date).format('D MMMM  YYYY');
    },
    //reviews van de auto
    reviewplaatsen: function(){
      let id = Vue.ls.get('id');
      let uuid = Vue.ls.get('uuid')
      let hash = Vue.ls.get('auth');
      let unhash = String(window.atob(hash));
      let index = unhash.indexOf(":");
      let user = unhash.substring(0, unhash.indexOf(":"));
      let ww = unhash.substring(unhash.indexOf(":") + 1, unhash.lenght);
      axios.post(' http://localhost/duracar/entity/reviews', 
        {      
          "user_id": [
             {
                 "target_id": id,
                 "target_type": "user",
                 "target_uuid": uuid,
                 "url": "/duracar/user/" +id
             }
          ],
          "field_beschrijving": [
            {
                     "value": this.review
                 }
             ],
             "field_carid": [
                 {
                     "value": this.id
                 }
             ],
             "field_rating": [
                 {
                     "value": this.score
                 }
            ]
          
        },
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
      .then(() => {
        this.errors = []
        this.autosget();
        this.score = 4;
        this.review = "";

      })
      .catch( e => {
        console.log(e)
          this.errors.push(e.response.statusText)
      });
    },
    //modaltoggle voor bevestiging van huren
    modaltoggle: function(accept){
      if(accept == true){
        this.huren()
      }
      this.modal = ! this.modal;
    },
    //validatie voor het checken of de persoon is ingelogd voor hij kan huren
    hurenvalidatie: function() {
      if(Vue.ls.get('id')){ 
        if(this.hurenvan && this.hurentot){
          if(this.hurentot < this.hurenvan){
            this.errors = [];
            this.errors.push("De aanvang datum kan niet vroeger zijn dan de einddatum");
            document.body.scrollTop = document.documentElement.scrollTop = 0; 
          }else{
            this.errors = [];
            this.modal = true;
          }
        }else {
            this.errors = [];
            this.errors.push("je moet de begin en einddatum ingeven wanneer je de auto wilt huren");
            document.body.scrollTop = document.documentElement.scrollTop = 0;       
        }
      }else{
        this.errors = [];
        this.errors.push("je moet ingelogd zijn om een auto te kunnen huren");
        document.body.scrollTop = document.documentElement.scrollTop = 0;     
      }
    },
    //huren post naar user en vervolgens naar user via hurenuser()
    huren: function(){
      let exists = false;
      for (let m = 0; m < this.huurders.length; m++) {
        if(this.huurders[m].value == Vue.ls.get('id')){
          exists = true
        }
      }
      //check of de gebruiker de auto al heeft gehuurd
      if(!exists){
       var hash = Vue.ls.get('auth');       
       var unhash = String(window.atob(hash));
       var index = unhash.indexOf(":");
       var user = unhash.substring(0, unhash.indexOf(":"));
       var ww = unhash.substring(unhash.indexOf(":") + 1, unhash.lenght); 
       let id = Vue.ls.get('id');
       let url = 'http://localhost/duracar/autos/autos/'+ this.id +'?_format=hal_json'
       let patchdatacar = {};
       let patchdatauser = {};
       let aantalhuurders = this.huurders.length
       let aantalgehuurdeautos = this.gehuurdeautos.length
      //patchdata voor car
       if (aantalhuurders > 0){
        patchdatacar['field_hurenauto'] = this.huurders
        patchdatacar['field_hurenauto'][aantalhuurders] = {
            "value": id
          }
        }else{
           patchdatacar['field_hurenauto'] = {
             "value": id
           }
        }
        //patchdata voor user
        if(aantalgehuurdeautos > 0){
        patchdatauser['field_huren'] = this.gehuurdeautos
        patchdatauser['field_huren'][aantalgehuurdeautos] ={
            "value": this.id + '*' + moment(this.beschikbaarvan).format('MM/DD/YY')  + '*' + moment(this.beschikbaartot).format('MM/DD/YY')
          }
        }else{
           patchdatauser['field_huren'] = {
             "value": this.id + '*' + moment(this.beschikbaarvan).format('MM/DD/YY') + '*' + moment(this.beschikbaartot).format('MM/DD/YY')
           }
        }
        axios.patch(url, patchdatacar,
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
          this.hurenuser(user, ww, patchdatauser)     
          this.errors = []   
          this.$router.push('/Account/Gehuurdeautos')          
        })
        .catch( e => {
            this.errors.push(e.response.statusText)
            console.log(e.response)
        });
      }else{
        this.errors.push("Je hebt de auto reeds gehuurd, ga naar gehuurde autos om deze te verwijderen")
        document.body.scrollTop = document.documentElement.scrollTop = 0; 
      }
    },
    hurenuser: function(user, ww, data ){
      let url =  'http://localhost/duracar/user/'+ Vue.ls.get('id') +'?_format=hal_json'
      axios.patch(url, data,
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
              console.log('verhuurd')              
            })
            .catch( e => {
                this.errors.push(e.response.statusText)
                console.log(e.response)
            });
        }
      },
  filters: {
    datumfilter: function(val){      
      if (!val) return ''
      return moment(String(val)).format('MM/DD/YYYY')
    }
}
}
</script>

