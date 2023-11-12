import StyleDefines from './StyleDefines.json'
const pdfMake = require('pdfmake')

let database = null

let dd = {}

pdfMake.fonts = {
  retro: {
    bold: new URL('fonts/Retro.ttf', document.location.toString()).toString()
  },
  retrocondensed: {
    bold: new URL('fonts/RetroCondensed.ttf', document.location.toString()).toString()
  },
  atypewriter: {
    bold: new URL('fonts/ATypewriter.ttf', document.location.toString()).toString()
  },
  merit: {
    bold: new URL('fonts/Merit.ttf', document.location.toString()).toString()
  }
}

function shadeColor2(color, percent) {   
  var f = parseInt(color.slice(1),16),t=percent<0?0:255,p=percent<0?percent*-1:percent,R=f>>16,G=f>>8&0x00FF,B=f&0x0000FF;
  return "#"+(0x1000000+(Math.round((t-R)*p)+R)*0x10000+(Math.round((t-G)*p)+G)*0x100+(Math.round((t-B)*p)+B)).toString(16).slice(1);
}

let Printer = {
  init: (db) => {
    database = db
  },

  print: (titles) => {

    dd = {
      content: [],
      jsmeta: {
        rows: 0,
        columns: 0,
        options: database.options.getAll(),
        pageTitles: []
      },
      images: {
        holly: new URL('images/holly.png', document.location.toString()).toString(),
        candycane: new URL('images/candycane.png', document.location.toString()).toString()
      }
    }

    Printer.setupPages(dd, titles)
    Printer.printTitles(dd)
    Printer.printRecordIDs(dd)

    dd.background = Printer.printBackgrounds
    
    pdfMake.createPdf(dd).open()

  },

  setupPages(dd, titles) {
    switch(dd.jsmeta.options.paperType) {
      case 'single12':
        dd.pageSize = 'LEGAL'
        dd.pageMargins = [ 193.5, 31.5, 0, 0 ]
        dd.jsmeta.columns = 1
        dd.jsmeta.rows = 12
        break
      case 'double10':
        dd.pageSize = 'LETTER'
        dd.pageMargins = [ 81, 22.5, 0, 0 ]
        dd.jsmeta.columns = 2
        dd.jsmeta.rows = 5
        break
      case 'a4':
        dd.pageSize = 'A4'
        dd.pageMargins = [ 81, 22.5, 0, 0 ]
        dd.jsmeta.columns = 2
        dd.jsmeta.rows = 10
        break
      default:
        dd.pageSize = 'LETTER'
        dd.pageMargins = [ 81, ((dd.jsmeta.options.spacing === 'normal') ? 22.5 : 16.5), 0, 0 ]
        dd.jsmeta.columns = 2
        dd.jsmeta.rows = 10
        break
    }
    let spliceTitles = JSON.parse(JSON.stringify(titles))
    while (spliceTitles.length > 0) {
      const pageTitles = spliceTitles.splice(0, dd.jsmeta.columns * dd.jsmeta.rows)
      //dd.content.push([{
      //  jsmeta: { titles: Printer.formatTitles(pageTitles, dd.jsmeta) }
      //}])
      dd.jsmeta.pageTitles.push(
        Printer.formatTitles(pageTitles, dd.jsmeta)
      )
    }
    return dd;
  },

  backgrounds: {
    diamond: function (x, y, title) {
      return {
        canvas:[
          {
            type: 'rect',
            x: 0,
            y: 0,
            w: 224,
            h: 72,
            lineColor: title.primaryColor,
            lineWidth: 1,
            color: title.titleTint
          },
          {
            type: 'line',
            x1: 0, y1: 36,
            x2: 224, y2: 36,
            lineWidth: 9,
            lineColor: title.primaryColor,
          },
          {
            type: 'polyline',
            lineWidth: 1.5,
            closePath: true,
            points: [{x: 35, y: 27},{x: 189, y: 27},{x: 198, y: 36},{x: 189, y: 45},{x: 35, y: 45},{x: 27, y: 36}],
            lineColor: title.primaryColor,
            color: title.artistTint
          }
        ],
        absolutePosition: {x: x, y: y}
      }
    },
    arrows: function (x, y, title) {
      return {
        canvas:[
          {
            type: 'rect',
            x: 0,
            y: 0,
            w: 224,
            h: 72,
            lineColor: title.primaryColor,
            lineWidth: 1,
            color: title.titleTint
          },
          {
            type: 'line',
            x1: 0, y1: 36,
            x2: 224, y2: 36,
            lineWidth: 9,
            lineColor: title.primaryColor,
          },
          {
            type: 'rect',
            x: 32.5,
            y: 27,
            w: 160,
            h: 18,
            color: title.artistTint,
            lineColor: title.primaryColor,
            lineWidth: 1.5
          },
          {
            type: 'polyline',
            lineWidth: 3,
            closePath: true,
            points: [{x: 32, y: 27}, {x: 32, y: 45}, {x: 40, y: 36}],
            color: title.primaryColor 
          },
          {
            type: 'polyline',
            lineWidth: 3,
            closePath: true,
            points: [{x: 193, y: 27}, {x: 193, y: 45}, {x: 184, y: 36}],
            color: title.primaryColor
          }
        ],
        absolutePosition: {x: x, y: y}
      }
    },
    multiple: function (x, y, title) {
      return {
        canvas:[
          {
            type: 'rect',
            x: 0,
            y: 0,
            w: 224,
            h: 72,
            lineColor: title.primaryColor,
            lineWidth: 1,
            color: title.titleTint
          },
          {
            type: 'line',
            x1: 30, y1: 36,
            x2: 194, y2: 36,
            lineWidth: 2,
            lineColor: title.primaryColor,
          }
        ],
        absolutePosition: {x: x, y: y}
      }
    },
    holly: function (x, y) {
      return [
        {
          canvas: [
            {
              type: 'rect',
              x: 0,
              y: 0,
              w: 224,
              h: 72,
              color: '#ffffff',
              lineColor: StyleDefines.styles.holly.primaryColor,
              lineWidth: 1
            },
            {
              type: 'line',
              x1: 30, y1: 26,
              x2: 194, y2: 26,
              lineWidth: 1.5,
              lineColor: StyleDefines.styles.holly.primaryColor
            },
            {
              type: 'line',
              x1: 30, y1: 46,
              x2: 194, y2: 46,
              lineWidth: 1.5,
              lineColor: StyleDefines.styles.holly.primaryColor
            }
          ],
          absolutePosition: {x: x, y: y}
        },
        {
          image: 'holly',
          width: 16,
          absolutePosition: {x: x+10, y: y+20}
        },
        {
          image: 'holly',
          width: 16,
          absolutePosition: {x: x+200, y: y+20}
        }
      ]
    },
    candycane: function (x, y) {
      return [
        {
          canvas: [
            {
              type: 'rect',
              x: 0,
              y: 0,
              w: 224,
              h: 72,
              lineColor: StyleDefines.styles.candycane.primaryColor,
              color: StyleDefines.styles.candycane.titleTint,
              lineWidth: 1
            },
            {
              type: 'rect',
              x: 32.5,
              y: 27,
              w: 160,
              h: 18,
              color: StyleDefines.styles.candycane.artistTint,
              lineColor: StyleDefines.styles.candycane.primaryColor,
              lineWidth: 1.5
            },
            {
              type: 'polyline',
              lineWidth: 3,
              closePath: true,
              points: [{x: 32, y: 27}, {x: 32, y: 45}, {x: 40, y: 36}],
              color: StyleDefines.styles.candycane.primaryColor 
            },
            {
              type: 'polyline',
              lineWidth: 3,
              closePath: true,
              points: [{x: 193, y: 27}, {x: 193, y: 45}, {x: 184, y: 36}],
              color: StyleDefines.styles.candycane.primaryColor
            }
          ],
          absolutePosition: {x: x, y: y}
        },
        {
          image: 'candycane',
          width: 22,
          absolutePosition: {x: x+5, y: y+8}
        },
        {
          image: 'candycane',
          width: 22,
          absolutePosition: {x: x+197, y: y+8}
        }
      ]
    }
  },

  printBackgrounds: function(currentPage) {     
    const spaced = dd.jsmeta.options.spacing
    const xPos = { normal: { left: 81.5, right: 305.5 }, wide: { left: 80.5, right: 306.5 } }
    const pageTopMargin = { normal: 22.5, wide: 16.5 }  
    const tileYSpacing = { normal: 0, wide: 4 }

    const titles = dd.jsmeta.pageTitles[currentPage - 1]
      let pageBackground = []

      titles.forEach((title, index) => {
        var j = ((index < 10) ? index : index - 10); // counts 0..9 twice
        var x = ((index < 10) ? xPos[spaced].left : xPos[spaced].right ) // set the x-axis offset (left or right). Spaced will need to set 80.5 and 306.5 (2mm space)
        var y = (j * 72 + (j * tileYSpacing[spaced])) + pageTopMargin[spaced] // set the y axis, 22.5 is the page top margin. Spaced will need to reduce this by 10mm then add 2mm to each

        pageBackground.push(Printer.backgrounds[title.style](x, y, title))

      })
    return pageBackground
  },

  printRecordIDs: function(dd) {
    const spaced = dd.jsmeta.options.spacing
    const xPos = { normal: { left: 81.5, right: 305.5 }, wide: { left: 80.5, right: 306.5 } }
    const pageTopMargin = { normal: 22.5, wide: 16.5 }  
    const tileYSpacing = { normal: 0, wide: 4 }

    // for each page
    dd.jsmeta.pageTitles.forEach((titles, pageIndex) => {
      let recordIDs = []

      titles.forEach((title, index) => {
        var j = ((index < 10) ? index : index - 10); // counts 0..9 twice
        var x = ((index < 10) ? xPos[spaced].left : xPos[spaced].right ) // set the x-axis offset (left or right). Spaced will need to set 80.5 and 306.5 (2mm space)
        var y = (j * 72 + (j * tileYSpacing[spaced])) + pageTopMargin[spaced] // set the y axis, 22.5 is the page top margin. Spaced will need to reduce this by 10mm then add 2mm to each

        const offset = Printer.measureText(title.recordID, title.font, title.idSize)

        recordIDs.push({
          text: title.recordID,
          font: title.font,
          fontSize: title.idSize,
          bold: true,
          absolutePosition: {x: x + 222 - offset, y: y + 72 - title.idSize}
        })
      })
      
      dd.content[pageIndex].unshift(recordIDs)
    })
  },

  getTitleASide: function (title) {
    return {
      text: title.aside,
      margin: [title.margins, title.fontMargins.aside, title.margins, 0],
      border: [false, false, false, false],
      fillColor: false, //title.titleTint,
      font: title.font,
      fontSize: title.titleSize,
      bold: true
    }
  },

  getTitleArtist: function (title) {
    let margin = []
    let text = ''
    if (title.mergeArtist === true) {
      margin = [title.margins, title.fontMargins.artist, title.margins, 0]
      text = title.artist + ((title.artistb !== '') ? ' / ' + title.artistb : '')
    } else {
      margin = [title.margins, -7, title.margins, -7]
      text = title.artist + '\n\n' + ((title.artistb !== '') ? title.artistb : title.artist)
    }
    return {
      text: text,
      margin: margin,
      border: [false, false, false, false],
      fillColor: false, //title.titleTint,
      font: title.font,
      fontSize: title.artistSize,
      bold: true
    }
  },

  getTitleBSide: function (title) {
    return {
      text: title.bside,
      margin:[title.margins, title.fontMargins.bside, title.margins, 0],
      border: [false, false, false, false],
      fillColor: false, //title.titleTint,
      font: title.font,
      fontSize: title.titleSize,
      bold: true
    }
  },

  printTitles: function(dd) {
    for (let p = 0; p < dd.jsmeta.pageTitles.length; p++) {

      let body = []

      for (let i = 0; i < dd.jsmeta.rows && i < dd.jsmeta.pageTitles[p].length; i++) {
        //get the title (current, i) and see if there is a corresponding second column title
        const title = dd.jsmeta.pageTitles[p][i]

        // if we're supposed to have two columns and there's a corresponding title to populate
        const title_col2 = (dd.jsmeta.columns == 2 && dd.jsmeta.pageTitles[p].length > i + dd.jsmeta.rows) ? dd.jsmeta.pageTitles[p][i + dd.jsmeta.rows] : null

        //get asides
        let row = [this.getTitleASide(title)]

        if (dd.jsmeta.columns == 2) {
          if (title_col2) {
            row.push(this.getTitleASide(title_col2))
          } else {
            row.push({ text: '', border: [false, false, false, false] })
          }
        }
        body.push(row)

        //get artists
        row = [this.getTitleArtist(title)]

        if (dd.jsmeta.columns == 2) {
          if (title_col2 !== null) {
            row.push(this.getTitleArtist(title_col2))
          } else {
            row.push({ text: '', border: [false, false, false, false] })
          }
        }
        body.push(row)

        //get bsides
        row = [this.getTitleBSide(title)]
        if (dd.jsmeta.columns == 2) {
          if (title_col2 !== null) {
            row.push(this.getTitleBSide(title_col2))
          } else {
            row.push({ text: '', border: [false, false, false, false] })
          }
        }
        body.push(row)       
      }

      const spaced = dd.jsmeta.options.spacing
      const _h = { normal: [21.5,14,21.5], wide: [21.5,14,25.5] }
      let _heights = []
      for (let i = 0; i < 10; i++) {
        _heights = _heights.concat(_h[spaced])
      }
      let page = [{
        alignment: 'center',
        table: {
          heights: _heights,
          widths: ((dd.jsmeta.columns == 2) ? [215, 215] : [215]),
          body: body
        },
        pageBreak: ((p !== dd.jsmeta.pageTitles.length - 1) ? 'after' : '')
      }]

      //page.pageBreak = ((p !== dd.jsmeta.pageTitles.length - 1) ? 'after' : '')

      dd.content.push(page)
    }
  },

  measureText(str, font, fontSize) {
    console.log(Math.ceil(font) + 'px ' + fontSize)
    let canvas = document.createElement('canvas')
    canvas.width = "225"

    let context = canvas.getContext('2d')
    context.font = Math.ceil(fontSize) + 'px ' + font
    context.textBaseline = 'middle'

    return context.measureText(str).width
  },

  sideBreaker: function (title, font, style) {
    for (let side of ['a', 'b']) {
      let str = title[side + 'side']

      let canvas = document.createElement('canvas')
      canvas.width = "225px"

      let context = canvas.getContext('2d')
      context.font = Math.ceil(font.titleSize) + 'px ' + font.font
      context.textAlign = 'center'
      context.textBaseline = 'middle';

      let _width = context.measureText(str).width

      if (_width > (225 - (style.margins * 2))) {
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
            if (context.measureText(_w).width > (225 - (style.margins * 2))) {
              _splitPoint = _splitPoint - 1
              break
            }
          }
        }

        _words[_splitPoint - 1] = _words[_splitPoint - 1] + '\n'
        str = _words.join(' ')

        title[side + 'wrap'] = true
        title[side + 'side'] = str
      }    
    }
  },

  formatTitles: function (titles, jsmeta) {

    let formattedTitles = []

    for (let title of titles) {
      let formattedTitle = {
        aside: title.aside,
        bside: title.bside,
        artist: title.artist,
        artistb: title.artistb,
        recordID: title.recordID,
        tag: title.tag,
        awrap: false,
        bwrap: false
      }

      let font = StyleDefines.fonts[jsmeta.options.font]
      let style = null

      if (jsmeta.options.allCaps) {
        formattedTitle.aside = formattedTitle.aside.toUpperCase()
        formattedTitle.artist = formattedTitle.artist.toUpperCase()
        formattedTitle.artistb = formattedTitle.artistb.toUpperCase()
        formattedTitle.bside = formattedTitle.bside.toUpperCase()
        formattedTitle.recordID = formattedTitle.recordID.toUpperCase()
      }
      if (jsmeta.options.quotes) {
        formattedTitle.aside = '"' + formattedTitle.aside + '"'
        formattedTitle.bside = '"' + formattedTitle.bside + '"'
      }

      //copy the style definitions from either the default or the override
      if (Object.keys(title).includes('styleOverride')) {
        for (let key of ['style', 'primaryColor', 'shadeTitle', 'shadeArtist']) {
          formattedTitle[key] = title.styleOverride[key]
        }
        style = StyleDefines.styles[title.styleOverride.style]
      } else {
        for (let key of ['style', 'primaryColor', 'shadeTitle', 'shadeArtist']) {
          formattedTitle[key] = jsmeta.options[key]
        }
        style = StyleDefines.styles[jsmeta.options.style]
      }

      //add style details
      formattedTitle.maxwidth = style.maxwidth
      formattedTitle.margins = style.margins
      formattedTitle.mergeArtist = style.mergeArtist

      //add font details
      formattedTitle.font = font.font
      formattedTitle.titleSize = font.titleSize
      formattedTitle.artistSize = font.artistSize
      formattedTitle.idSize = font.idSize

      //provide the correct shades for fills
  
      if (formattedTitle.shadeTitle === true && (jsmeta.options.paperType === 'a4' || jsmeta.options.paperType === 'letter')) {
        formattedTitle.titleTint=shadeColor2(StyleDefines.colors[formattedTitle.primaryColor].primary, 0.8)
      } else {
        formattedTitle.titleTint='#ffffff'
      }

      if (formattedTitle.shadeArtist === true && (jsmeta.options.paperType === 'a4' || jsmeta.options.paperType === 'letter')) {
        formattedTitle.artistTint=shadeColor2(StyleDefines.colors[formattedTitle.primaryColor].primary, 0.8)
      } else {
        formattedTitle.artistTint='#ffffff'
      }

      Printer.sideBreaker(formattedTitle, font, style)

      formattedTitle.fontMargins = {
        aside: font.margins.aside[((formattedTitle.awrap)?0:1)],
        artist: font.margins.artist[0],
        bside: font.margins.bside[((formattedTitle.bwrap)?0:1)]
      }

      //add the title to
      formattedTitles.push(formattedTitle)
    }

    //return the formatted titles
    return formattedTitles

  }
}

export default Printer