<template>
  <div class="registreer">
    <h1 class="pagetitle">{{ title }}</h1>
    <form @submit.prevent="validateBeforeSubmit" v-if="!formSubmitted">
      <div class="columns is-mobile">
        <div class="column is-10 is-offset-1">     

          <div class="field">
            <label class="label">Naam</label>
            <div class="control">
              <input v-model="naam" v-validate.initial="naam" data-vv-rules="required" :class="{'is-danger': errors.has('naam') }" class="input" type="text" placeholder="Volledige naam">
            </div>
            <p class="help is-danger" v-if="errors.has('naam')">{{ errors.first('naam') }}</p>
          </div>

          <div class="field">
            <label class="label">Email</label>
            <div class="control has-icons-left has-icons-right">
              <input v-model="email"  v-validate.initial="email" data-vv-rules="required|email" :class="{'is-danger': errors.has('email') }" class="input" type="email" placeholder="Email" value="voorbeeld@voorbeeld.com">
              <span class="icon is-small is-left">
                <i class="fa fa-envelope"></i>
              </span>
              <span v-if="errors.has('email')" class="icon is-small is-right">
                <i class="fa fa-warning"></i>
              </span>
            </div>
            <p class="help is-danger" v-if="errors.has('email')">{{ errors.first('email') }}</p>
          </div>

          <div class="field">
            <label class="label">Wachtwoord</label>
            <p class="control has-icons-left">
              <input name="wachtwoord" v-model="wachtwoord"  v-validate.initial="wachtwoord" data-vv-rules="required" :class="{'is-danger': errors.has('wachtwoord') }" class="input" type="password" placeholder="Wachtwoord">
              <span class="icon is-small is-left">
                <i class="fa fa-lock"></i>
              </span>
              <p class="help is-danger" v-if="errors.has('wachtwoord')">{{ errors.first('wachtwoord') }}</p>
            </p>
          </div>

          <div class="field">
            <label class="label">Herhaal wachtwoord</label>
            <p class="control has-icons-left">
              <input class="input" v-model="wachtwoordherhaal" v-validate.initial="wachtwoordherhaal" data-vv-rules="required|confirmed:wachtwoord" data-vv-as="wachtwoord" :class="{'is-danger': errors.has('wachtwoordherhaal') }" type="password" placeholder="Wachtwoord">
              <span class="icon is-small is-left">
                <i class="fa fa-lock"></i>
              </span>
              <p class="help is-danger" v-if="errors.has('wachtwoordherhaal')">{{ errors.first('wachtwoordherhaal') }}</p>
            </p>
          </div>
          <div class="field">
            <label class="label">Gsm-nummer</label>
            <div class="control">
              <input v-model="gsm" v-validate.initial="gsm" data-vv-rules="required|digits:10" :class="{'is-danger': errors.has('gsm') }" class="input" type="text" placeholder="Gsm-nummer" name="gsm">
            </div>
            <p class="help is-danger" v-if="errors.has('gsm')">{{ errors.first('gsm') }}</p>
          </div>

          <div class="field">
            <div class="control">
              <button id='registreer' class="button is-link fullwidth">Registreer</button>
            </div>
            <div class="control center">
              <router-link to="/Account/Login" class="button has-text-centered is-text">Login</router-link>
            </div>
          </div>        
        </div>
      </div>
      <div class="columns is-mobile">
        <div class="column is-10 is-offset-1">
          <div  v-if="errorregister.length !== 0" class="notification is-danger">
            <p v-for="error in errorregister">{{ error }}</p>
            <p>Probeer opnieuw of neem contact op met de administrator</p>
          </div>
        </div>
      </div>
    </form>    
    <div v-else class="columns is-mobile" >
      <div class="column is-10 is-offset-1">   
        <div class="notification is-primary">
          Je bent succesvol geregistreerd!.
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
const msg = require('vee-validate/dist/locale/nl');
// nederlandse messages
Vue.use(VeeValidate, {
  locale: 'nl',
  dictionary: {
        nl: {
            messages: msg.default
        }
    }
  });
export default {
  name: 'registreer',
  data () {
    return {
      title: 'registreer',
      naam: null,
      email: null,
      gsm: null,
      wachtwoord: null,
      wachtwoordherhaal: null,
      formSubmitted: false,
      error: null,
      errorregister: []
    }
  },
  methods: {
    validateBeforeSubmit (e) {
        this.$validator.validateAll()
        if (!this.errors.any()) {
         this.registreer()
        }
      },
    registreer () {
      axios.post('http://localhost/duracar/user/register?_format=hal_json',
      {
      "name": [{ "value": this.naam }],
      "mail": [{ "value": this.email }],
      "pass": [{ "value": this.wachtwoord }],
      "field_gsm_nummer" : [{ "value": this.gsm}]
      },
      {
        'Content-Type': 'application/hal+json',
        'Accept': 'application/hal+json'
        },this.config)
          .then( fresponse => {
            this.formSubmitted = true
            console.log('opgeslaan')
          })
          .catch( e => {
              this.errorregister.push(e.response.statusText)
          });
    },
  }
}
</script>
