<template>
  <NavBar/>
  <router-view :records="records"/>
</template>

<script>
import NavBar from './components/NavBar.vue'

import StyleDefines from './assets/StyleDefines.json'

export default {
  name: 'App',
  components: {
    NavBar
  },
  data: () => {
    return {
      styles: StyleDefines.styles,
      fonts: StyleDefines.fonts,
      records: [ ],
      addModalVisible: false,
      default: {
        style: 'arrows',
        color: 'red',
        font: 'retro',
        titleTint: false,
        artistTint: false,
        forceQuotes: true
      }
    }
  },
  created: function() {
    //console.log(this.styles)
  },
  methods: {
  }
}
  


</script>