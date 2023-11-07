<template>
  <div class="modal" :class="{ 'is-active': visible }">
    <div class="modal-background"></div>
    <div class="modal-content">
      <div class="modal-card">
        <div class="modal-card-head">
          Add record
        </div>
        <div class="modal-card-body">
          <p class="is-center">
            <LabelPreview :aside="aside" :bside="bside" :artist="artist" :artistb="artistb" :style="style" :font="font" :primaryColor="primaryColor" :artistFillColor="artistFillColor" :titleFillColor="titleFillColor" />
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
              <input class="is-checkradio is-success is-circle" id="title-artist-fill" type="checkbox" name="" v-model="artistFillColor" :disabled="styleOverride == false">
              <label for="title-artist-fill">Colored background for artist</label>
            </div>
            <div class="field">
              <input class="is-checkradio is-success is-circle" id="title-title-fill" type="checkbox" name="" v-model="titleFillColor" :disabled="styleOverride == false">
              <label for="title-title-fill">Colored background for title</label>
            </div>
          </div>
          </div>
        <div class="modal-card-foot">
          <button class="button is-light" @click="resetAndClose">Cancel</button>
          <button class="button is-primary" @click="saveRecord">Save</button>
        </div>
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
      styleOverride: false,
      primaryColor: 'red',
      font: 'retro',
      style: 'arrows',
      artistFillColor: false,
      titleFillColor: false,
    }
  },
  created: function () {
  },
  methods: {
    resetValues: function() {
      this.style = this.$database.options.get('style')
      this.primaryColor = this.$database.options.get('primaryColor')
      this.artistFillColor = this.$database.options.get('artistFillColor')
      this.titleFillColor = this.$database.options.get('titleFillColor')
      this.font = this.$database.options.get('font')
      this.styleOverride = false
      this.aside = ''
      this.bside = ''
      this.artist = ''
      this.artistb = ''
    },
    saveRecord: function () {
      let obj = {
        aside: this.aside,
        bside: this.bside,
        artist: this.artist,
        artistb: this.artistb
      }
      if (this.styleOverride === true) {
        obj['styleOverride'] = {
          primaryColor: this.primaryColor,
          font: this.font,
          style: this.style,
          artistFillColor: this.artistFillColor,
          titleFillColor: this.titleFillColor
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
        if (Object.keys(title).includes('styleOverride')) {
          this.styleOverride = true
          this.primaryColor = title.styleOverride.primaryColor
          this.artistFillColor = title.styleOverride.artistFillColor
          this.titleFillColor = title.styleOverride.titleFillColor
          this.style = title.styleOverride.style
          this.font = title.styleOverride.font
        }
      }
    },
    styleOverride() {
      if (this.styleOverride === false) {
        this.style = this.$database.options.get('style')
        this.primaryColor = this.$database.options.get('primaryColor')
        this.artistFillColor = this.$database.options.get('artistFillColor')
        this.titleFillColor = this.$database.options.get('titleFillColor')
        this.font = this.$database.options.get('font')
      }
    }
  }
}
</script>