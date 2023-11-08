<template>
  <div class="modal" :class="{ 'is-active': visible }">
    <div class="modal-background"></div>
    <div class="modal-content">
      <div class="modal-card">
        <header class="modal-card-head">
          <p class="modal-card-title">
            <span class="title-text">Design</span>
          </p>
        </header>
        <div class="modal-card-body">
          <div class="field">
            <label class="label">Paper type</label>
            <div class="control">
              <div class="select">
                <select v-model="paperType">
                  <option v-for="paper in paperTypes" v-bind:key="paper.name" :value="paper.name">{{ paper.text }}</option>
                </select>
              </div>
            </div>
          </div>
          <div class="field">
            <input class="is-checkradio is-success is-circle" id="spacing-width" type="checkbox" name="" v-model="wideSpacing" :disabled="paperType !== 'letter' && paperType !== 'a4'">
            <label for="spacing-width">Wider spacing (for easier cutting)</label>
          </div>
          <div class="field">
            <label class="label">Font</label>
            <div class="control">
              <div class="select">
                <select v-model="font">
                  <option v-for="font in $styles.fonts" v-bind:key="font.font" :value="font.font">{{ font.name }}</option>
                </select>
              </div>
            </div>
          </div>
          <div class="field">
            <input class="is-checkradio is-success is-circle" id="force-uppercase" type="checkbox" name="" v-model="allCaps">
            <label for="force-uppercase">Force Uppercase</label>
          </div>
          <div class="field">
            <input class="is-checkradio is-success is-circle" id="force-quotes" type="checkbox" name="" v-model="quotes">
            <label for="force-quotes">Put quotes around titles</label>
          </div>
          <div class="field">
            <label class="label">Style</label>
            <div class="control">
              <div class="select">
                <select v-model="style">
                  <option v-for="style in $styles.styles" v-bind:key="style.style" :value="style.style">{{ style.name }}</option>
                </select>
              </div>
            </div>
          </div>
          <div class="field">
            <label class="label">Color</label>
            <div class="control">
              <div class="select">
                <select v-model="primaryColor">
                  <option v-for="color in $styles.colors" v-bind:key="color.color" :value="color.color">{{ color.name }}</option>
                </select>
              </div>
            </div>
          </div>
          <div class="field">
            <input class="is-checkradio is-success is-circle" id="force-shade-artist" type="checkbox" name="" v-model="shadeArtist">
            <label for="force-shade-artist">Colored background for artist</label>
          </div>
          <div class="field">
            <input class="is-checkradio is-success is-circle" id="force-shade-title" type="checkbox" name="" v-model="shadeTitle">
            <label for="force-shade-title">Colored background for titles</label>
          </div>
        </div>
        <footer class="modal-card-foot columns">
          <button class="button column is-light close-modal" @click="resetAndClose">Cancel</button>
          <button class="button column is-success save" @click="save">Save</button>
        </footer>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'DesignSettings',
  inject: [ '$styles', '$database' ],
  props: [ 'visible' ],
  data: () => {
    return {
      //visible: true,
      paperTypes: {
        letter: { name: 'letter', text: 'Plain paper (US letter)' },
        a4: { name: 'a4', text: 'Plain paper (A4)' },
        double10: { name: 'double10', text: 'Pre-printed 5x2' },
        single12: { name: 'single12', text: 'Pre-printed 12x1' }
      },
      paperType: 'letter',
      wideSpacing: false,
      font: 'retro',
      allCaps: true,
      quotes: true,
      style: 'arrows',
      primaryColor: 'red',
      shadeArtist: false,
      shadeTitle: false
    }
  },
  created: function () {
    this.getSettings()
  },
  methods: {
    getSettings() {
      const settings = this.$database.options.getAll()
      this.paperType = settings.paperType
      this.wideSpacing = settings.spacing
      this.font = settings.font
      this.allCaps = settings.allCaps
      this.quotes = settings.quotes
      this.style = settings.style
      this.primaryColor = settings.primaryColor
      this.shadeArtist = settings.shadeArtist
      this.shadeTitle = settings.shadeTitle
    },
    resetAndClose() {
      this.$emit('close')
      this.getSettings()
    },
    save() {
      this.$database.options.set('paperType', this.paperType)
      this.$database.options.set('spacing', this.spacing)
      this.$database.options.set('font', this.font)
      this.$database.options.set('allCaps', this.allCaps)
      this.$database.options.set('quotes', this.quotes)
      this.$database.options.set('style', this.style)
      this.$database.options.set('primaryColor', this.primaryColor)
      this.$database.options.set('shadeArtist', this.shadeArtist)
      this.$database.options.set('shadeTitle', this.shadeTitle)
      this.$emit('close')
    }
  },
  watch: { //how to do this?
    visible() {
      if (this.visible) {
        this.getSettings()
      }
    }
  }
}
</script>