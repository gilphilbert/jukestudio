<template>
  <canvas ref="label" width="225" height="72">Your browser does not support the HTML canvas tag.</canvas>
</template>

<script>

export default {
  name: 'LabelPreview',
  props: [ 'aside', 'bside', 'artist', 'artistb', 'style', 'primaryColor', 'shadeArtist', 'shadeTitle' ],
  inject:[ '$styles', '$database' ],
  data: () => {
    return {
      context: null
    }
  },
  methods: {
    stringBreaker: function (str) {
      let _style = this.$styles.styles[this.style]
      let _width = this.context.measureText(str).width
      if (_width > (225 - (_style.margins * 2))) {
        var _splitPoint = 0
        let _words = str.split(" ")

        // if we're breaking strings, look for a natural breaking point
        if (str.indexOf('(') > -1) {
          const chrToLookFor = (str.startsWith('(') || str.slice(1, 2) === '(' ? ')' : '(')
          for (let i = 0; i < _words.length; i++) {
            if (_words[i].indexOf(chrToLookFor) > -1) {
              _splitPoint = i
              if (chrToLookFor === ')') {
                _splitPoint++
              }
              break
            }
          }
        }

        //otherwise let's find the widest first line and split there
        if (_splitPoint === 0) {
          let _w = ''
          for (_splitPoint = 0; _splitPoint < _words.length; _splitPoint++) {
            _w += (((_splitPoint > 0) ? ' ' : '') + _words[_splitPoint])
            if (this.context.measureText(_w).width > (225 - (_style.margins * 2))) {
              _splitPoint = _splitPoint - 1
              break
            }
          }
        }

        let tt=[_words.splice(_splitPoint).join(" ")]
        _words = _words.join(" ")
        tt.unshift(_words)
        str = tt
      } else {
        str = [ str ]
      }
      return str;
    },
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
        case 'multiple':
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
      this.context.fillStyle = this.shadeTitleColor
      this.context.fillRect(0, 0, 225, 72)

      //border
      this.context.lineWidth = '1'
      this.context.strokeStyle = this.primaryColorHex
      this.context.strokeRect(0, 0, 225, 72)
    },
    paintArrows: function () {
      //wide red stripe
      this.context.fillStyle = this.primaryColorHex
      this.context.fillRect(0, 32, 225, 8)

      //artist box
      this.context.fillStyle = this.shadeArtistColor
      this.context.lineWidth = '1'
      this.context.strokeStyle = this.primaryColorHex
      this.context.fillRect(32.5, 28, 160, 16)
      this.context.strokeRect(32.5, 28, 160, 16)

      //left triangle
      this.context.fillStyle = this.primaryColorHex
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
      this.context.fillStyle = this.primaryColorHex
      this.context.fillRect(0, 32, 225, 8)
      
      //diamond shape (artist box)
      this.context.fillStyle = this.shadeArtistColor
      this.context.lineWidth = '1'
      this.context.strokeStyle = this.primaryColorHex
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
    paintStars() {
      
    },
    paintSplitArtist() {
      this.context.strokeStyle = this.primaryColorHex
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

      const font = this.$styles.fonts[this.$database.options.get('font')]
      this.context.font = font.titleSize + 'px ' + font.name
      this.context.textAlign = 'center'
      this.context.textBaseline = 'middle';

      let _aside = this.aside
      let _bside = this.bside
      let _artist = this.artist
      let _artistb = this.artistb

      if (this.$database.options.get('allCaps')) {
        _aside = _aside.toUpperCase()
        _bside = _bside.toUpperCase()
        _artist = _artist.toUpperCase()
        _artistb = _artistb.toUpperCase()
      }
      if (this.$database.options.get('quotes')) {
        _aside = (_aside !== '') ? '"' + _aside + '"' : _aside
        _bside = (_bside !== '') ? '"' + _bside + '"' : _bside
      }

      const _sa = this.stringBreaker(_aside)
      if (_sa.length === 1) {
        this.context.fillText(_sa[0], 112.5, 15)
      } else {
        this.context.fillText(_sa[0], 112.5, 9)
        this.context.fillText(_sa[1], 112.5, 20)
      }

      // should be for non-split artist only
      if (this.style !== 'multiple') {
        let _a = _artist
        if (_artistb !== '') {
          _a += ' / ' + _artistb
        }
        this.context.fillText(_a, 112.5, 36)
      } else {
        this.context.fillText(_artist, 112.5, 29)
        this.context.fillText(_artistb, 112.5, 44)
      }

      const _sb = this.stringBreaker(_bside)
      if (_sb.length === 1) {
        this.context.fillText(_sb, 112.5, 58)
      } else {
        this.context.fillText(_sb[0], 112.5, 53)
        this.context.fillText(_sb[1], 112.5, 64)
      }
    }
  },
  watch: {
    primaryColor() { 
      this.paintLabel()
    },
    style() { 
      this.paintLabel()
    },
    shadeArtist() { 
      this.paintLabel()
    },
    shadeTitle() { 
      this.paintLabel()
    },
    aside() { 
      this.paintLabel()
    },
    bside() { 
      this.paintLabel()
    },
    artist() { 
      this.paintLabel()
    },
    artistb() { 
      this.paintLabel()
    }
  },
  mounted: function () {
    this.context = this.$refs['label'].getContext('2d')
    this.paintLabel()
  },
  computed: {
    primaryColorHex () {
      return this.$styles.colors[this.primaryColor].primary
    },
    shadeArtistColor () {
      let _color = '#ffffff'
      if (this.shadeArtist) {
        _color = this.$styles.colors[this.primaryColor].fill
      }
      return _color
    },
    shadeTitleColor () {
      let _color = '#ffffff'
      if (this.shadeTitle) {
        _color = this.$styles.colors[this.primaryColor].fill
      }
      return _color
    }
  }
}

</script>