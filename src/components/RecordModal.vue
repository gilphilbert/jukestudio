<template>
  <div class="modal" :class="{ 'is-active': show }" id="add-record-modal">
    <div class="modal-background close-modal"></div>
    <div class="modal-card modal-small">
      <header class="modal-card-head">
        <p class="modal-card-title">
          <span class="title-text">Add record</span>
        </p>
      </header>
      <section class="modal-card-body">
        <p class="is-center">
          <img src="" id="add-record-preview" class="preview-strip" alt="Preview of title strip" />
        </p>
        <div class="field">
          <div class="control">
            <input class="input" type="text" placeholder="Side A" v-bind="aside">
          </div>
        </div>
        <div class="field">
          <div class="control">
            <input class="input" type="text" placeholder="Side B" v-bind="bside">
          </div>
        </div>
        <div class="field">
          <div class="control">
            <input class="input" type="text" placeholder="Artist" v-bind="artist">
          </div>
        </div>
        <div class="field">
          <div class="control">
            <input class="input" type="text" placeholder="Side B artist (if different)" v-bind="artistb">
          </div>
        </div>
        <div class="box" id="style-override">
          <div class="field">
            <input class="is-checkradio is-success is-circle" type="checkbox" name="" v-bind="styleOverride">
            <label for="title-style-override">Alter style for this record</label>
          </div>
          <div class="field">
            <label class="label">Style</label>
            <div class="control">
              <div class="select">
                <select id="title-style">
                </select>
              </div>
            </div>
          </div>
          <div class="field">
            <label class="label">Color</label>
            <div class="control">
              <div class="select">
                <select id="title-primary-color">
                  <option value="#ff0000">Red</option>
                  <option value="#00a0de">Blue</option>
                  <option value="#5fae6f">Green</option>
                  <option value="#80578f">Purple</option>
                  <option value="#EE6B3F">Orange</option>
                </select>
              </div>
            </div>
          </div>
          <div class="field">
            <input class="is-checkradio is-success is-circle" id="title-artist-fill" type="checkbox" name="">
            <label for="title-artist-fill">Colored background for artist</label>
          </div>
          <div class="field">
            <input class="is-checkradio is-success is-circle" id="title-title-fill" type="checkbox" name="">
            <label for="title-title-fill">Colored background for title</label>
          </div>
        </div>
      </section>
      <footer class="modal-card-foot columns">
        <button class="button column is-light close-modal" @click="$emit('hide')">Cancel</button>
        <button class="button column is-success save">Save</button>
      </footer>
    </div>
  </div>
</template>

<script>
export default {
  name: 'RecordModal',
  props: [ 'show' ],
  data: () => {
    return {
      aside: '',
      bside: '',
      artist: '',
      artistb: '',
      styleOverride: false,
    }
  },
  created: function () {
    //console.log(this.show)
  }
}
</script>