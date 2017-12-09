<template>
  <div class="notfound">   
<div class="container">
  <input type="checkbox" id="switch"/>
  <div class="ellipse"></div>
  <div class="ray"></div>
  <div class="head"></div>
  <div class="neck"></div>
  <div class="body">
    <label for="switch"></label>
  </div>
</div>
<div class="container">
  <div class="msg msg_1">404</div>
  <div class="msg msg_2">Pagina niet gevonden</div>
</div>

  </div>
</template>

<script>
export default {
  name: 'notfound',
  data () {
    return {
      title: '404',
      id: this.$route.params.id
    }
  }
}
</script>
