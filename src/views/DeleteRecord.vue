<template>
  <div class="modal" :class="{ 'is-active': visible }">
    <div class="modal-background"></div>
    <div class="modal-content">
      <div class="modal-card">
        <div class="modal-card-head">
          Delete record
        </div>
        <div class="modal-card-body">
          <p class="is-center">
            Are you sure you want to delete this record?
          </p>
        </div>
        <div class="modal-card-foot">
          <button class="button is-light" @click="close">Cancel</button>
          <button class="button is-primary" @click="deleteRecord">Delete</button>
        </div>
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
      this.$database.titles.remove(this.recordid)
      this.$emit('close')
    }
  }
}
</script>