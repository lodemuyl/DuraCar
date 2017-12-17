<template>
  <div id="app">
    <header>
        <nav class="navbar shadow " role="navigation" aria-label="main navigation">
          <div class="navbar-brand">
            <a class="navbar-item" href="/">
              <h1 class="navtitle"><span class="red">D</span>ura<span class="red">C</span>ar</h1>
            </a>
            <div id="navbarBurger" class="button navbar-burger noradiusbutton" data-target="navbarMenu">
              <span></span>
              <span></span>
              <span></span>
            </div>  
          </div>
          <div>
          </div>
          <div class="navbar-start">
          </div>
          <div id="navbarMenu" class="navbar-end navbar-menu">
            <router-link class="routerlink navbar-item" to="/">Home</router-link>
            <router-link class="routerlink navbar-item" to="/Huren">Huren</router-link>
            <router-link class="routerlink navbar-item" to="/Verhuren">Verhuren</router-link>
            <router-link class="routerlink navbar-item" to="/Locaties">Locaties</router-link>
            <router-link class="routerlink navbar-item" to="/Tankstations">Tankstations</router-link>
            <hr>
            <div class="navbar-item has-dropdown is-hoverable">            
                <p class="routerlink navbar-link white">Account</p>            
              <div class="navbar-dropdown is-right">
                <router-link  v-show="!user.csrf_token" class="routerlink navbar-item" to="/Account/Login">Login</router-link>
                <router-link  v-show="!user.csrf_token" class="routerlink navbar-item" to="/Account/Registreer">Registreer</router-link>  
                <router-link  v-show="user.csrf_token" class="routerlink navbar-item" to="/Account">Mijn account</router-link>           
                <router-link  v-show="user.csrf_token" class="routerlink navbar-item" to="/Account/Mijnautos">Mijn auto's</router-link>
                <router-link  v-show="user.csrf_token" class="routerlink navbar-item" to="/Account/Gehuurdeautos">Gehuurde Auto's</router-link>
              </div>
            </div>
          </div>
        </nav>
    </header>
    <main>      
      <router-view>        
      </router-view>
    </main>
    <footer class="footer">
          <div class="container">
            <div class="content">
              <p class="inlineblock">
                <router-link class="bold" to="/Disclaimer">Disclaimer</router-link>         
              </p>
              <p class="inlineblock floatright">
                <a class="socialmedia"><div class="cirkel socialmediapadding"><i class="fa fa-facebook" aria-hidden="true"></i></div></a>           
              </p>
              <p class="inlineblock floatright">
                <a  class="socialmedia"><div class="cirkel socialmediapadding"><i class="fa fa-instagram" aria-hidden="true"></i></div></a>            
              </p>
              <p class="inlineblock floatright">
                <a class="socialmedia"><div class="cirkel socialmediapadding"><i class="fa fa-pinterest-p" aria-hidden="true"></i></div></a>
              </p>
            </div>
          </div>
    </footer>
  </div>
</template>
<script>
/* eslint-disable */

import VueLocalStorage from 'vue-ls'
import Vue from 'vue'
Vue.use(VueLocalStorage)
export default {
  name: 'app',
  data () {
    return {
      ingelogd: false,
      user: {
        'name': null,
        'csrf_token': null,
        'logout_token': null,
      }
    }
  },
  created () {
    this.check();
  },
  methods: {
    check: function(){
    if(Vue.ls.get('id')){
      this.user.csrf_token = Vue.ls.get('csrftoken');
      this.user.logout_token = Vue.ls.get('logout-token');
      this.ingelogd = true;
    }else{
      this.user.csrf_token = null;
      this.user.logout_token = null;
      this.user.name = null;
      this.ingelogd = false;
    }
    }
  }
}
</script>
