<template>
  <section class="section">
    <div class="container">
      <div class="columns">
        <div class="column is-12">
          <div class="card events-card">
            <div class="card-table">
              <div class="content">
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
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  name: 'RecordView',
  props: [ 'records' ],
  created: function () {
  }
}
</script>