<template>
    <div class="modal" :class="{ 'is-active': visible }">
      <div class="modal-background"></div>
      <div class="modal-content">
        <div class="modal-card">
          <header class="modal-card-head">
            <p class="modal-card-title">
              <span class="title-text">Import / Export</span>
            </p>
          </header>
          <div class="modal-card-body">
            <div class="field">
              <input class="is-checkradio is-success is-circle" id="export-db" type="radio" value="db" v-model="exportType">
              <label for="export-db">Export library and settings</label>
            </div>
            <div class="field">
              <input class="is-checkradio is-success is-circle" id="export-csv" type="radio" value="csv" v-model="exportType">
              <label for="export-csv">Export library only (CSV)</label>
            </div>
            <div class="field">
              <button class="button is-success" @click="exportDB">Export</button>
            </div>
            <hr>
            <div class="field">
              <button class="button is-success" @click="$refs.file.click()">Import</button>
              <input type="file" style="display: none" ref="file" v-on:change="file" @change="doStuff" />
            </div>
            
            <div class="notification is-info is-light">
              <strong>Note</strong> To import a library in CSV format, your file must be arranged with three or four columns as follows:<br/>&nbsp;&nbsp;Side A, Side B, Artist, Side B Artist<br/>(Side B Artist only needs to be included if different from Side A)
            </div>
          </div>
          <footer class="modal-card-foot columns">
            <button class="button column is-light close-modal" @click="$emit('close')">Close</button>
          </footer>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    name: 'ImportExport',
    inject: [ '$database' ],
    props: [ 'visible' ],
    data: () => {
      return {
        exportType: 'db',
        file: ''
      }
    },
    methods: {
      exportDB () {
        const a = document.createElement('a')
        a.setAttribute('href', this.$database.export[this.exportType]())
        a.setAttribute('download', 'jukestudio.' + this.exportType)
        document.body.appendChild(a)
        a.click()
        a.remove()
      },
      import() {
        //need to supply the file!
      },
      doStuff(event) {
        const file = event.target.files[0]
        
        const reader = new FileReader()
        reader.onload = () => {
          let type='db'

          if (file.name.indexOf('.csv')>-1) {
            type = 'csv'
          }

          if (this.$database.import[type](reader.result)) {
            this.$emit('reload')
            this.$emit('close')
          }
        }
        reader.readAsBinaryString(file)
      }
    }
  }
  </script>