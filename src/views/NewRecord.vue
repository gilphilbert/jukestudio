<template>
  <section class="section">
    <span class="title-text">Add record</span>
    <p class="is-center">
      <LabelPreview :style="style" :color="color" :fillartist="fillartist" :filltitle="filltitle" />
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
            <select v-model="style">
              <option value="arrows">Arrows</option>
              <option value="diamond">Diamond</option>
              <option value="split">Split Artist</option>
              <option value="candycane">Candy Cane</option>
              <option value="holly">Holly</option>
            </select>
          </div>
        </div>
      </div>
      <div class="field">
        <label class="label">Color</label>
        <div class="control">
          <div class="select">
            <select v-model="color">
              <option value="red">Red</option>
              <option value="blue">Blue</option>
              <option value="green">Green</option>
              <option value="purple">Purple</option>
              <option value="orange">Orange</option>
            </select>
          </div>
        </div>
      </div>
      <div class="field">
        <input class="is-checkradio is-success is-circle" id="title-artist-fill" type="checkbox" name="" v-model="fillartist">
        <label for="title-artist-fill">Colored background for artist</label>
      </div>
      <div class="field">
        <input class="is-checkradio is-success is-circle" id="title-title-fill" type="checkbox" name="" v-model="filltitle">
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