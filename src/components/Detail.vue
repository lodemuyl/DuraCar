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
        <div class="card-content nopadding noshadow">
          <div class="content noshadow">
            <img v-if="afbeeldingen.picture1" :src="afbeeldingen.picture1">
            <img v-if="afbeeldingen.picture2" :src="afbeeldingen.picture2">
            <img v-if="afbeeldingen.picture3" :src="afbeeldingen.picture3">
          </div>
        </div>      
        <div class="card noshadow">
          <div class="card-content">
            <div class="content">
              <h1 class="center lemonmilk subtitle">Info</h1>
                <div class="columns is-mobile">
                  <div class="column customcolumn">
                    <h2 class="alineatitle bold">Periode beschikbaar</h2>
                    <p>van <span class="bold">12/5/2017</span> tot <span class="bold">13/5/2017</span></p>
                  </div>
                </div>    
              <div class="columns is-mobile">
                <div class="column customcolumn">
                  <h2 class="alineatitle bold">Eigenaar</h2>
                  <p>door X</p>
                </div>
                <div class="column customcolumn">
                  <h2 class="alineatitle bold">Prijs</h2>
                  <p>€{{ prijs }}/dag</p>
                </div>
              </div>  
              <div class="columns is-mobile">
                <div class="column customcolumn">
                  <h2 class="alineatitle bold">GSM</h2>
                  <p>{{  }}</p>
                </div>
                <div class="column customcolumn">
                  <h2 class="alineatitle bold">Locatie</h2>
                  <p>{{ locatie.straat }} {{ locatie.nummer }} <br> {{ locatie.gemeente }}</p>
                </div>
              </div>  
              <div class="columns is-mobile">
                <div class="column customcolumn">
                  <h2 class="alineatitle bold">Voorwaarden</h2>
                  <ul>
                    <li>punt1</li>
                    <li>punt2</li>
                  </ul>
                </div>
              </div>
              <div class="columns is-mobile">
                <div class="column customcolumn">
                  <h2 class="alineatitle bold">Zitplaatsen</h2>
                  <p> {{ zitplaatsen }} </p>
                </div>
                <div class="column customcolumn">
                  <h2 class="alineatitle bold">Deuren</h2>
                  <p> {{ deuren }} </p>
                </div>
              </div> 
              <div class="columns is-mobile">
                <div class="column customcolumn">
                  <h2 class="alineatitle bold">Aandrijving</h2>
                  <p>benzine</p>
                </div>
                <div class="column customcolumn">
                  <h2 class="alineatitle bold">Nummerplaat</h2>
                  <p>{{ nummerplaat }}</p>
                </div>
              </div>  
              <div class="columns is-mobile">
                <div class="column customcolumn">
                  <h2 class="alineatitle bold">Specificaties</h2>
                  <ul>
                    <li>1</li>
                    <li>2</li>
                  </ul>
                </div>
              </div>       
                              
                    <div class="columns is-multiline is-mobile datepicker">
                      <div class=" column is-half customcolumn">
                        <h2 class="alineatitle bold">Beschikbaar van</h2>
                        <input type="date" name="van"  max="2018-11-28"><br><br>
                      </div>
                      <div class=" column is-half customcolumn">
                        <h2 class="alineatitle bold">Beschikbaar tot</h2>
                        <input type="date" name="tot" max="2018-11-28"><br><br>
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
      locatie: {
        straat: null,
        nummer: 0,
        gemeente: null
      },
      afbeeldingen: {
        picture1: null,
        picture2: null,
        picture3: null
      },
      auto: [],
      errors: []
    }
  },
  created () {
    this.autosget();
  },
  methods: {
    autosget: function() {
      var url = 'http://localhost/duracar/autos/autos/' + this.id +'?_format=hal_json'
      axios.get(url)
      .then((autos) => {
        (autos.data._links["http://localhost/duracar/rest/relation/autos/autos/field_foto1"]) ? this.afbeeldingen.picture1 = this.afbeeldingen.picture1 = autos.data._links["http://localhost/duracar/rest/relation/autos/autos/field_foto1"][0].href : this.afbeeldingen.picture1 = null;
        (autos.data._links["http://localhost/duracar/rest/relation/autos/autos/field_foto2"]) ? this.afbeeldingen.picture2 = this.afbeeldingen.picture2 = autos.data._links["http://localhost/duracar/rest/relation/autos/autos/field_foto2"][0].href : this.afbeeldingen.picture2 = null;
        (autos.data._links["http://localhost/duracar/rest/relation/autos/autos/field_foto3"]) ? this.afbeeldingen.picture3 = this.afbeeldingen.picture3 = autos.data._links["http://localhost/duracar/rest/relation/autos/autos/field_foto3"][0].href : this.afbeeldingen.picture3 = null;
        this.locatie.straat = autos.data.field_straat[0].value;
        this.locatie.nummer = autos.data.field_huisnummer[0].value
        this.locatie.gemeente = autos.data.field_gemeente[0].value
        this.deuren = autos.data.field_aantal_deuren[0].value
        this.zitplaatsen = autos.data.field_zitplaatsen[0].value
        this.nummerplaat = autos.data.field_nummerplaat[0].value
        this.title = autos.data.name[0].value
        this.prijs = autos.data.field_prijs[0].value
        this.auto = autos.data
      })
      .catch(error => {    
        this.errors.push(error.message)
        
      })  
    }  
  }
}
</script>

