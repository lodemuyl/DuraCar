<template>
  <div class="notfound">
   <h1 class="pagetitle">{{ title }}</h1>
  </div>
</template>

<script>
export default {
  name: 'notfound',
  data () {
    return {
      title: 'notfound',
      id: this.$route.params.id
    }
  }
}
</script>
