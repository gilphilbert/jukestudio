<template>
  <div class="modal" :class="{ 'is-active': visible }">
    <div class="modal-background"></div>
    <div class="modal-content">
      <div class="modal-card">
        <header class="modal-card-head">
          <p class="modal-card-title">
            <span class="title-text">Delete record{{ ((recordid && recordid.length > 1) ? 's' : '') }}</span>
          </p>
        </header>
        <div class="modal-card-body">
          <p class="is-center">
            Are you sure you want to delete {{ ((recordid && recordid.length > 1) ? 'multiple records' : 'this record') }}?
          </p>
        </div>
        <footer class="modal-card-foot columns">
          <button class="button column is-light" @click="close">Cancel</button>
          <button class="button column is-primary" @click="deleteRecord">Delete</button>
        </footer>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'DeleteRecord',
  props: [ 'visible', 'recordid' ],
  inject: [ '$styles', '$database' ],
  methods: {
    close: function () {
      this.$emit('close')
    },
    deleteRecord: function () {
      this.recordid.forEach(itemID => {
        this.$database.titles.remove(itemID)
      })
      this.$emit('close')
    }
  }
}
</script>