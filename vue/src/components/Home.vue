<template>
  <div class="home"> 
     <div class="logo">
      <img src="../assets/images/logo/logo2.png">
    </div>
    <div class="columns is-mobile">
      <div class="column is-10 is-offset-1">
        <h1 class="center lemonmilk subtitle nomargin">Wat is duracar</h1>
        <p class="center bold regulartextfontsize">Duracar is een huur/verhuurplatform voor de inwoners van Gent.<br>Mensen kunnen zelf hun auto ter beschikking stellen in ruil voor een centje</p>
      </div>
    </div>
    <div class="columns is-mobile">
      <div class="column is-10 is-offset-1">  
        <div class="frontpageimages">
          <router-link to="/Huren"><img src="../assets/images/huren.png"></router-link>
        </div>
        <h1 class="lemonmilk subtitle nomargin center">Huren</h1>
        <p class="regulartextfontsize">DuraCar heeft huurwagens voor elk uitstapje en elk budget aangeboden door verschillende verhuurders in de regio Gent. Ontdek het ruime aanbod van wagens, gaande van compacte personenwagens tot ruime monovolumes en luxe wagens.</p>
      </div>
    </div>
    <div class="columns is-mobile">
      <div class="column is-10 is-offset-1">  
        <div class="frontpageimages">
           <router-link to="/Verhuren"><img src="../assets/images/verhuren.png"></router-link>
        </div>
        <h1 class="lemonmilk subtitle nomargin center">Verhuren</h1>
        <p class="regulartextfontsize">DuraCar biedt de mogelijkheid om je auto te verhuren aan andere huurders. Via deze weg halen we hauto's uit het verkeer en verdien je er een centje aan. </p>
      </div>
    </div>
    <div class="columns is-mobile">
      <div class="column is-10 is-offset-1">  
        <div class="frontpageimages">
           <router-link to="/Locaties"><img src="../assets/images/locatie.png"></router-link>
        </div>
        <h1 class="lemonmilk subtitle nomargin center">Locaties</h1>
        <p class="regulartextfontsize">Aan de hand van een map kan je snel en gemakkelijk een auto vinden die aan jouw verwachtingen voldoet in jouw buurt. In enkele klikken heb je een auto gehuurd. </p>
      </div>
    </div>
    <div class="columns is-mobile werking">
      <div class="column is-10 is-offset-1">  
        <h1 class="lemonmilk subtitle nomargin white">Hoe werkt het</h1>
        <p class="regulartextfontsize">Mensen in de regio Gent kunnen auto's huren en verhuren. Door je auto te verhuren verdien je per dag dat je auto is uitgeleend. Heb je geen auto ter beschikking en moet je je snel kunnen verplaatsen, dan kan je steeds een auto huren in jouw buurt. In het geval je zonder brandstof valt kan je alle dankstations rondom jouw weergeven.</p>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: 'home',
  data () {
    return {
      title: 'Home'
    }
  }
}
</script>

