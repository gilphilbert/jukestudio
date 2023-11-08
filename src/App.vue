<template>
  <NavBar @print="print" @design="this.designVisible = true" @importExport="this.importExportVisible = true" />
  <section class="section">
    <div class="container">
      <!--<router-link to="new" class="button is-primary">+ Add Record</router-link>-->
      <div class="has-text-right" style="margin-bottom: 10px">
        <button @click="showNewRecord" class="button is-primary">+ Add Record</button>
      </div>
      <table class="table is-fullwidth is-striped" id="record-table">
        <thead>
          <tr>
            <th><!--Print--></th>
            <th>Side A</th>
            <th colspan=2>Side B</th>
          </tr>
        </thead>
        <tbody>
          <tr v-if="!titles.length" @click="$emit('new')">
            <td colspan=4 class="has-text-centered">No records! Add a record to get started</td>
          </tr>
          <tr v-for="title in titles" v-bind:key="title" class="is-compact">
            <td class="is-middle">
              <div class="field">
                <input class="is-checkradio print-check" v-model="title.checked" :id="'printcheck-' + title.id" type="checkbox" />
                <label :for="'printcheck-' + title.id"></label>
              </div>
            </td>
            <td @click="editRecord(title.id)">
              <p><strong>{{ title.aside }}</strong></p>
              <p><small>{{ title.artist }}</small></p>
            </td>
            <td @click="editRecord(title.id)">
              <p><strong>{{ title.bside }}</strong></p>
              <p><small>{{ title.artistb || title.artist }}</small></p>
            </td>
            <td>
              <a class="delete" @click="showDeleteRecord(title.id)">delete</a>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </section>
  <NewRecord :visible="newVisible" @close="closeNewRecord" :editId="recordToEdit"></NewRecord>
  <DeleteRecord :visible="deleteVisible" :recordid="recordToDelete" @close="closeDeleteRecord"></DeleteRecord>
  <DesignSettings :visible="designVisible" @close="closeDesignSettings"></DesignSettings>
  <ImportExport :visible="importExportVisible" @close="closeImportExport" @reload="getRecords"></ImportExport>
</template>

<script>
import NavBar from './components/NavBar.vue'
import NewRecord from './views/NewRecord.vue'
import DeleteRecord from './views/DeleteRecord.vue'
import DesignSettings from './views/DesignSettings.vue'
import ImportExport from './views/ImportExport.vue'

export default {
  name: 'App',
  components: {
    NavBar,
    NewRecord,
    DeleteRecord,
    DesignSettings,
    ImportExport
  },
  inject: [ '$styles', '$database', '$printer' ],
  data: () => {
    return {
      titles: [],
      newVisible: false,
      deleteVisible: false,
      recordToDelete: null,
      recordToEdit: null,
      designVisible: false,
      importExportVisible: false
    }
  },
  created: function () {
    this.getRecords()
  },
  methods: {
    getRecords: function () {
      this.titles = this.$database.titles.list().map(item => {
        item.checked = false
        return item
      })
    },
    showNewRecord: function() {
      this.newVisible = true
    },
    closeNewRecord: function() {
      this.getRecords()
      this.recordToEdit = null
      this.newVisible = false
    },
    editRecord: function (id) {
      this.recordToEdit = id
      this.newVisible = true
    },
    showDeleteRecord: function(id) {
      this.recordToDelete = id
      this.deleteVisible = true
    },
    closeDeleteRecord: function() {
      this.getRecords()
      this.recordToDelete = null
      this.deleteVisible = false
    },
    closeDesignSettings: function () {
      this.designVisible = false
    },
    closeImportExport: function () {
      this.importExportVisible = false
    },
    print: function() {
      let ttp = []
      ttp = this.titles.filter((title) => {
        return title.checked === true
      }, ttp)

      if (ttp.length === 0) {
        this.$printer.print(this.titles)
      } else {
        this.$printer.print(ttp)
      }
    }
  }
}


</script>

<style style="css" scoped>
table tr td:first-child,
table tr td:last-child {
  width:0.1%;
  white-space: nowrap;
}
</style>