<template>
  <canvas ref="label" width="225" height="72">Your browser does not support the HTML canvas tag.</canvas>
</template>

<script>
import StyleDefines from '@/assets/StyleDefines.json'

export default {
  name: 'LabelPreview',
  props: [ 'sidea', 'sideb', 'artist', 'artistb', 'style', 'font', 'color', 'fillartist', 'filltitle', 'quotes' ],
  data: () => {
    return {
      context: null
    }
  },
  methods: {
    paintLabel: function () {
      this.context.clearRect(0, 0, this.$refs['label'].width, this.$refs['label'].height)
      this.paintBox()
      switch (this.style) {
        case 'arrows':
          this.paintArrows()
          break
        case 'diamond':
          this.paintDiamond()
          break
        case 'split':
          this.paintSplitArtist()
          break
        case 'candycane':
          this.paintCandyCane()
          break
        case 'holly':
          this.paintHolly()
          break
      }
      this.paintText()
    },
    paintBox: function () {
      //background
      this.context.fillStyle = this.titleFillColor
      this.context.fillRect(0, 0, 225, 72)

      //border
      this.context.lineWidth = '1'
      this.context.strokeStyle = this.primaryColor
      this.context.strokeRect(0, 0, 225, 72)
    },
    paintArrows: function () {
      //wide red stripe
      this.context.fillStyle = this.primaryColor
      this.context.fillRect(0, 32, 225, 8)

      //artist box
      this.context.fillStyle = this.artistFillColor
      this.context.lineWidth = '1'
      this.context.strokeStyle = this.primaryColor
      this.context.fillRect(32.5, 28, 160, 16)
      this.context.strokeRect(32.5, 28, 160, 16)

      //left triangle
      this.context.fillStyle = this.primaryColor
      this.context.beginPath()
      this.context.moveTo(32.5, 29)
      this.context.lineTo(32.5, 43)
      this.context.lineTo(38, 36.5)
      this.context.closePath()
      this.context.fill()

      // right triangle
      this.context.beginPath()
      this.context.moveTo(192.5, 29)
      this.context.lineTo(192.5, 43)
      this.context.lineTo(187, 36.5)
      this.context.closePath()
      this.context.fill()
    },
    paintDiamond() {
      //wide red stripe
      this.context.fillStyle = this.primaryColor
      this.context.fillRect(0, 32, 225, 8)
      
      //diamond shape (artist box)
      this.context.fillStyle = this.artistFillColor
      this.context.lineWidth = '1'
      this.context.strokeStyle = this.primaryColor
      this.context.beginPath()
      this.context.moveTo(22, 36)
      this.context.lineTo(31, 27)
      this.context.lineTo(194, 27)
      this.context.lineTo(203, 36)
      this.context.lineTo(194, 45)
      this.context.lineTo(31, 45)
      this.context.closePath()
      this.context.fill()
      this.context.stroke()
    },
    paintSplitArtist() {
      this.context.strokeStyle = this.primaryColor
      this.context.lineWidth = '2'
      this.context.beginPath()
      this.context.moveTo(20, 36)
      this.context.lineTo(205, 36)
      this.context.closePath()
      this.context.stroke()
    },
    paintCandyCane() {
      //redraw the box (overwrites the white one, lazy but fine for now)

      //background
      this.context.fillStyle = '#abdca8'
      this.context.fillRect(0, 0, 225, 72)

      //border
      this.context.lineWidth = '1'
      this.context.strokeStyle = '#d3444a'
      this.context.strokeRect(0, 0, 225, 72)

      //load the images and add
      var imageObj = new Image()
      imageObj.height = 50
      imageObj.onload = () => {
        this.context.drawImage(imageObj, 6, 6, 23.5, 60)
        this.context.drawImage(imageObj, 195.5, 6, 23.5, 60)
      }
      imageObj.src = 'images/candycane.png'

      //artist box
      this.context.fillStyle = '#ffffff'
      this.context.lineWidth = '1'
      this.context.strokeStyle = '#d3444a'
      this.context.fillRect(36.5, 28, 152, 16)
      this.context.strokeRect(36.5, 28, 152, 16)

      //left triangle
      this.context.fillStyle = '#d3444a'
      this.context.beginPath()
      this.context.moveTo(36.5, 29)
      this.context.lineTo(36.5, 43)
      this.context.lineTo(44, 36.5)
      this.context.closePath()
      this.context.fill()

      // right triangle
      this.context.beginPath()
      this.context.moveTo(188.5, 29)
      this.context.lineTo(188.5, 43)
      this.context.lineTo(181, 36.5)
      this.context.closePath()
      this.context.fill()
    },
    paintHolly() {
      //redraw the box (overwrites the white one, lazy but fine for now)

      //background
      this.context.fillStyle = '#ffffff'
      this.context.fillRect(0, 0, 225, 72)

      //border
      this.context.lineWidth = '1'
      this.context.strokeStyle = '#ff0000'
      this.context.strokeRect(0, 0, 225, 72)

      //load the images and add
      var imageObj = new Image()
      imageObj.height = 50
      imageObj.onload = () => {
        this.context.drawImage(imageObj, 10, 18)
        this.context.drawImage(imageObj, 197, 18)
      }
      imageObj.src = 'images/holly.png'

      this.context.strokeStyle = '#ff0000'
      this.context.lineWidth = '1'
      this.context.beginPath()
      this.context.moveTo(35, 26)
      this.context.lineTo(190, 26)
      this.context.closePath()
      this.context.stroke()

      this.context.beginPath()
      this.context.moveTo(35, 46)
      this.context.lineTo(190, 46)
      this.context.closePath()
      this.context.stroke()
    },
    paintText () {
      this.context.fillStyle = 'black'
      this.context.font = '10px Retro'
      this.context.textAlign = 'center'
      this.context.textBaseline = 'middle';
      this.context.fillText('"GHOSTBUSTERS"', 112.5, 15)

      this.context.fillText('RAY PARKER JR.', 112.5, 36)

      this.context.fillText('"GHOSTBUSTERS (INSTRUMENTAL)"', 112.5, 58)
    }
  },
  watch: {
    color() { 
      this.paintLabel()
    },
    style() { 
      this.paintLabel()
    },
    fillartist() { 
      this.paintLabel()
    },
    filltitle() { 
      this.paintLabel()
    }
  },
  mounted: function () {
    this.context = this.$refs['label'].getContext('2d')
    this.paintLabel()
  },
  computed: {
    primaryColor () {
      return StyleDefines.colors[this.color].primary
    },
    artistFillColor () {
      let _color = '#ffffff'
      if (this.fillartist) {
        _color = StyleDefines.colors[this.color].fill
      }
      return _color    },
    titleFillColor () {
      let _color = '#ffffff'
      if (this.filltitle) {
        console.log(StyleDefines.colors[this.color].fill)
        _color = StyleDefines.colors[this.color].fill
      }
      return _color
    }
  }
}

</script>