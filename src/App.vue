<template>
  <div id="app">
    <header>
      <nav class="navbar shadow " role="navigation" aria-label="main navigation">
        <div class="navbar-brand">
          <a class="navbar-item" href="https://bulma.io">
            <h1 class="navtitle">Duracar</h1>
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
          <div class="navbar-item has-dropdown is-hoverable">            
              <router-link class="routerlink navbar-link" to="/Account">Account</router-link>            
            <div class="navbar-dropdown is-right">
              <router-link class="routerlink navbar-item" to="/Account/Login">Login</router-link>
              <router-link class="routerlink navbar-item" to="/Account/Registreer">Registreer</router-link>             
              <router-link class="routerlink navbar-item" to="/Account/Mijnautos">Mijn auto's</router-link>
              <router-link class="routerlink navbar-item" to="/Account/Gehuurdeautos">Gehuurde Auto's</router-link>
            </div>
          </div>
        </div>
      </nav>
   </header>
    <main>      
      <router-view>        
      </router-view>
    </main>
  </div>
</template>
<script>
export default {
  name: 'app',
  data () {
    return {
      user: {
        'name': null,
        'csrf_token': null,
        'logout_token': null
      }
    }
  }
}
</script>
