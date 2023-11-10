<template>
  <div class="modal" :class="{ 'is-active': visible }">
    <div class="modal-background"></div>
    <div class="modal-content">
      <div class="modal-card">
        <header class="modal-card-head">
          <p class="modal-card-title">
            <span class="title-text">Add record</span>
          </p>
        </header>
        <div class="modal-card-body">
          <p class="is-center">
            <LabelPreview :aside="aside" :bside="bside" :artist="artist" :artistb="artistb" :recordID="recordID" :tag="tag" :style="style" :font="font" :primaryColor="primaryColor" :shadeArtist="shadeArtist" :shadeTitle="shadeTitle" />
          </p>
          <div class="field">
            <div class="control">
              <input class="input" type="text" placeholder="Side A" v-model="aside">
            </div>
          </div>
          <div class="field">
            <div class="control">
              <input class="input" type="text" placeholder="Side B" v-model="bside">
            </div>
          </div>
          <div class="field">
            <div class="control">
              <input class="input" type="text" placeholder="Artist" v-model="artist">
            </div>
          </div>
          <div class="field">
            <div class="control">
              <input class="input" type="text" placeholder="Side B artist (if different)" v-model="artistb">
            </div>
          </div>
          <div class="field">
            <div class="control">
              <input class="input" type="text" placeholder="Record ID (eg. COLUMBIA 3335)" v-model="recordID">
            </div>
          </div>
          <div class="box" id="style-override">
            <div class="field">
              <input class="is-checkradio is-success is-circle" type="checkbox" id="title-style-override" name="" v-model="styleOverride">
              <label for="title-style-override">Alter style for this record</label>
            </div>
            <div class="field">
              <label class="label">Style</label>
              <div class="control">
                <div class="select">
                  <select v-model="style" :disabled="styleOverride == false">
                    <option v-for="style in $styles.styles" v-bind:key="style.style" :value="style.style">{{ style.name }}</option>
                  </select>
                </div>
              </div>
            </div>
            <div class="field">
              <label class="label">Color</label>
              <div class="control">
                <div class="select">
                  <select v-model="primaryColor" :disabled="styleOverride == false">
                    <option v-for="color in $styles.colors" v-bind:key="color.name" :value="color.color">{{ color.name }}</option>
                  </select>
                </div>
              </div>
            </div>
            <div class="field">
              <input class="is-checkradio is-success is-circle" id="title-artist-fill" type="checkbox" name="" v-model="shadeArtist" :disabled="styleOverride === false || style === 'candycane' || style === 'holly'">
              <label for="title-artist-fill">Colored background for artist</label>
            </div>
            <div class="field">
              <input class="is-checkradio is-success is-circle" id="title-title-fill" type="checkbox" name="" v-model="shadeTitle" :disabled="styleOverride === false || style === 'candycane' || style === 'holly'">
              <label for="title-title-fill">Colored background for title</label>
            </div>
          </div>
        </div>
        <footer class="modal-card-foot columns">
          <button class="button column is-light" @click="resetAndClose">Cancel</button>
          <button class="button column is-success" @click="saveRecord">Save</button>
        </footer>
      </div>
    </div>
  </div>

</template>

<script>
import LabelPreview from '../components/LabelPreview.vue'

export default {
  name: 'NewRecord',
  components: {
    LabelPreview
  },
  inject: [ '$styles', '$database' ],
  props: [ 'editId', 'visible' ],
  data: () => {
    return {
      aside: '',
      bside: '',
      artist: '',
      artistb: '',
      recordID: '',
      tag: '',
      styleOverride: false,
      primaryColor: 'red',
      font: 'retro',
      style: 'arrows',
      shadeArtist: false,
      shadeTitle: false,
    }
  },
  created: function () {
  },
  methods: {
    resetValues: function() {
      this.style = this.$database.options.get('style')
      this.primaryColor = this.$database.options.get('primaryColor')
      this.shadeArtist = this.$database.options.get('shadeArtist')
      this.shadeTitle = this.$database.options.get('shadeTitle')
      this.font = this.$database.options.get('font')
      this.styleOverride = false
      this.aside = ''
      this.bside = ''
      this.artist = ''
      this.artistb = ''
      this.recordID = ''
      this.tag = ''
    },
    saveRecord: function () {
      let obj = {
        aside: this.aside,
        bside: this.bside,
        artist: this.artist,
        artistb: this.artistb,
        recordID: this.recordID,
        tag: this.tag
      }
      if (this.styleOverride === true) {
        obj['styleOverride'] = {
          primaryColor: this.primaryColor,
          font: this.font,
          style: this.style,
          shadeArtist: this.shadeArtist,
          shadeTitle: this.shadeTitle
        }
      }
      if (this.editId !== null && this.editId !== undefined) {
        this.$database.titles.update(this.editId, obj)
      } else {
        this.$database.titles.add(obj)
      }
      this.resetAndClose()
    },
    resetAndClose: function () {
      this.resetValues()
      this.$emit('close')
    }
  },
  watch: { //how to do this?
    //watch for editId to change then update the values on the form
    editId() {
      if (this.editId !== undefined && this.editId !== null) {
        const title = this.$database.titles.get(this.editId)
        this.aside = title.aside
        this.bside = title.bside
        this.artist = title.artist
        this.artistb = title.artistb
        this.recordID = title.recordID
        this.tag = title.tag
        if (Object.keys(title).includes('styleOverride')) {
          this.styleOverride = true
          this.primaryColor = title.styleOverride.primaryColor
          this.shadeArtist = title.styleOverride.shadeArtist
          this.shadeTitle = title.styleOverride.shadeTitle
          this.style = title.styleOverride.style
          this.font = title.styleOverride.font
        }
      }
    },
    styleOverride() {
      if (this.styleOverride === false) {
        this.style = this.$database.options.get('style')
        this.primaryColor = this.$database.options.get('primaryColor')
        this.shadeArtist = this.$database.options.get('shadeArtist')
        this.shadeTitle = this.$database.options.get('shadeTitle')
        this.font = this.$database.options.get('font')
      }
    }
  }
}
</script>