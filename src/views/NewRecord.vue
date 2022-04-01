<template>
  <section class="section">
    <span class="title-text">Add record</span>
    <p class="is-center">
      <LabelPreview :aside="aside" :bside="bside" :artist="artist" :artistb="artistb" :style="style" :color="color" :fillartist="fillartist" :filltitle="filltitle" />
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
            <select v-model="color" :disabled="styleOverride == false">
              <option v-for="color in $styles.colors" v-bind:key="color.name" :value="color.color">{{ color.name }}</option>
            </select>
          </div>
        </div>
      </div>
      <div class="field">
        <input class="is-checkradio is-success is-circle" id="title-artist-fill" type="checkbox" name="" v-model="fillartist" :disabled="styleOverride == false">
        <label for="title-artist-fill">Colored background for artist</label>
      </div>
      <div class="field">
        <input class="is-checkradio is-success is-circle" id="title-title-fill" type="checkbox" name="" v-model="filltitle" :disabled="styleOverride == false">
        <label for="title-title-fill">Colored background for title</label>
      </div>
    </div>
    <router-link class="button is-light" to="/">Cancel</router-link>
    <button class="button is-primary">Save</button>
  </section>
</template>

<script>
import LabelPreview from '../components/LabelPreview.vue'

export default {
  name: 'NewRecord',
  components: {
    LabelPreview
  },
  inject: [ '$styles' ],
  props: [ 'id' ],
  data: () => {
    return {
      aside: '',
      bside: '',
      artist: '',
      artistb: '',
      styleOverride: false,
      color: 'red',
      style: 'arrows',
      fillartist: false,
      filltitle: false
    }
  },
  created: function () {
  }
}
</script>