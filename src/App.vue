<template>
  <NavBar/>
  <router-view :records="records"/>
</template>

<script>
import NavBar from './components/NavBar.vue'

import StyleDefines from './assets/StyleDefines.json'

//needs to load the default style from the database (if it exists)

export default {
  name: 'App',
  components: {
    NavBar
  },
  inject: [ '$database', '$styles' ],
  data: () => {
    return {
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
    //this.printRecord()
    //console.log(this)
  },
  methods: {
  }
}
  


</script>