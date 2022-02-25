<template>
  <NavBar/>
  <RecordView :records="records" @new="this.addModalVisible = true" />
  <RecordModal :show="addModalVisible" @hide="this.addModalVisible = false" />
</template>

<script>
import NavBar from './components/NavBar.vue'
import RecordView from './components/RecordView.vue'
import RecordModal from './components/RecordModal.vue'

import StyleDefines from './assets/StyleDefines.json'

export default {
  name: 'App',
  components: {
    NavBar,
    RecordView,
    RecordModal
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