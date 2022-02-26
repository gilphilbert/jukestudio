<template>
  <section class="section">
    <div class="container">
      <router-link to="new" class="button is-primary">+ Add Record</router-link>
      <table class="table is-fullwidth is-striped" id="record-table">
        <thead>
          <tr>
            <th><!--Print--></th>
            <th>Side A</th>
            <th colspan=2>Side B</th>
          </tr>
        </thead>
        <tbody>
          <tr v-if="!records.length" @click="$emit('new')">
            <td colspan=4 class="has-text-centered">No records! Add a record to get started</td>
          </tr>
        </tbody>
      </table>
    </div>
  </section>
</template>

<script>
export default {
  name: 'RecordList',
  props: [ 'records' ],
  created: function () {
  }
}
</script>