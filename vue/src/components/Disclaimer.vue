<template>
  <div class="disclaimer">
    <h1 class='pagetitle'>{{ title }}</h1>
        <div class="columns is-mobile">
            <div class="column is-10 is-offset-1">
                <h2 class="subtitle lemonmilk">Disclaimer</h2>
                            <p class="regulartextfontsize">

                        Last updated: December 01, 2017

                        The information contained on DuraCar mobile app (the "Service") is for general
                        information purposes only.

                        assumes no responsibility for errors or omissions in the contents on the
                        Service.

                        In no event shall be liable for any special, direct, indirect, consequential,
                        or incidental damages or any damages whatsoever, whether in an action of
                        contract, negligence or other tort, arising out of or in connection with the
                        use of the Service or the contents of the Service. reserves the right to make
                        additions, deletions, or modification to the contents on the Service at any
                        time without prior notice.

                        does not warrant that the website is free of viruses or other harmful
                        components.
                        </p>


                        <h2 class="subtitle lemonmilk">External links disclaimer</h2>  
                        <p class="regulartextfontsize">
                        DuraCar mobile app may contain links to external websites that are not
                        provided or maintained by or in any way affiliated with

                        Please note that the does not guarantee the accuracy, relevance, timeliness,
                        or completeness of any information on these external websites.
            </p>
        </div>       
    </div>
  </div>
</template>

<script>
export default {
  name: 'disclaimer',
  data () {
    return {
      title: 'Disclaimer'
    }
  }
}
</script>

