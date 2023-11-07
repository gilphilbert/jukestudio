import StyleDefines from './StyleDefines.json'
const pdfMake = require('pdfmake')

let database = null

pdfMake.fonts = {
  Retro: {
    bold: new URL('fonts/Retro.ttf', document.location.toString()).toString()
  },
  RetroCondensed: {
    bold: new URL('fonts/RetroCondensed.ttf', document.location.toString()).toString()
  },
  ATypewriter: {
    bold: new URL('fonts/ATypewriter.ttf', document.location.toString()).toString()
  }
}

function shadeColor2(color, percent) {   
  var f = parseInt(color.slice(1),16),t=percent<0?0:255,p=percent<0?percent*-1:percent,R=f>>16,G=f>>8&0x00FF,B=f&0x0000FF;
  return "#"+(0x1000000+(Math.round((t-R)*p)+R)*0x10000+(Math.round((t-G)*p)+G)*0x100+(Math.round((t-B)*p)+B)).toString(16).slice(1);
}

//function trimArray(arr) {
//  for(let i=0; i < arr.length; i++)
//    arr[i] = arr[i].trim();
//  return arr;
//}


let Printer = {
  init: (db) => {
    database = db
  },

  print: (titles) => {

    let dd = {
      content: [],
      jsmeta: {
        rows: 0,
        columns: 0,
        options: database.options.getAll()
      },
      images: {
        holly: new URL('images/holly.png', document.location.toString()).toString(),
        candycane: new URL('images/candycane.png', document.location.toString()).toString()
      }
    }

    Printer.setupPages(dd, titles)
    Printer.printTitles(dd)

    if (dd.jsmeta.options.paperType === 'a4' || dd.jsmeta.options.paperType === 'letter') {
      Printer.printBackgrounds(dd)
    }

    console.log(dd)

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
    for (let i = 0; i < titles.length; i += dd.jsmeta.columns * dd.jsmeta.rows) {
      dd.content.push({
        jsmeta: { titles: Printer.formatTitles(titles.slice(i, i + dd.jsmeta.columns + dd.jsmeta.rows), dd.jsmeta) }
      })
    }
    return dd;
  },

  backgrounds: {
    diamond: function (x, y, primaryColor, tint) {
      return {
        canvas:[
          {
            type: 'rect',
            x: 0,
            y: 0,
            w: 224,
            h: 72,
            lineColor: primaryColor,
            lineWidth: 1
          },
          {
            type: 'line',
            x1: 0, y1: 36,
            x2: 224, y2: 36,
            lineWidth: 9,
            lineColor: primaryColor,
          },
          {
            type: 'polyline',
            lineWidth: 1.5,
            closePath: true,
            points: [{x: 35, y: 27},{x: 189, y: 27},{x: 198, y: 36},{x: 189, y: 45},{x: 35, y: 45},{x: 27, y: 36}],
            lineColor: primaryColor,
            color: tint
          }
        ],
        absolutePosition: {x: x, y: y}
      }
    },
    arrows: function (x, y, primaryColor, tint) {
      return {
        canvas:[
          {
            type: 'rect',
            x: 0,
            y: 0,
            w: 224,
            h: 72,
            lineColor: primaryColor,
            lineWidth: 1
          },
          {
            type: 'line',
            x1: 0, y1: 36,
            x2: 224, y2: 36,
            lineWidth: 9,
            lineColor: primaryColor,
          },
          {
            type: 'rect',
            x: 32.5,
            y: 27,
            w: 160,
            h: 18,
            color: tint,
            lineColor: primaryColor,
            lineWidth: 1.5
          },
          {
            type: 'polyline',
            lineWidth: 3,
            closePath: true,
            points: [{x: 32, y: 27}, {x: 32, y: 45}, {x: 40, y: 36}],
            color: primaryColor 
          },
          {
            type: 'polyline',
            lineWidth: 3,
            closePath: true,
            points: [{x: 193, y: 27}, {x: 193, y: 45}, {x: 184, y: 36}],
            color: primaryColor
          }
        ],
        absolutePosition: {x: x, y: y}
      }
    },
    multiple: function (x, y, primaryColor) {
      return {
        canvas:[
          {
            type: 'rect',
            x: 0,
            y: 0,
            w: 224,
            h: 72,
            lineColor: primaryColor,
            lineWidth: 1
          },
          {
            type: 'line',
            x1: 30, y1: 36,
            x2: 194, y2: 36,
            lineWidth: 2,
            lineColor: primaryColor,
          }
        ],
        absolutePosition: {x: x, y: y}
      }
    },
    holly: function (x, y, primaryColor) {
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
              lineColor: primaryColor,
              lineWidth: 1
            },
            {
              type: 'line',
              x1: 30, y1: 26,
              x2: 194, y2: 26,
              lineWidth: 1.5,
              lineColor: primaryColor
            },
            {
              type: 'line',
              x1: 30, y1: 46,
              x2: 194, y2: 46,
              lineWidth: 1.5,
              lineColor: primaryColor
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

  printBackgrounds: function(dd) {
    const spaced = dd.jsmeta.options.spacing
    const xPos = { normal: { left: 81.5, right: 305.5 }, wide: { left: 80.5, right: 306.5 } }
    const pageTopMargin = { normal: 22.5, wide: 16.5 }  
    const tileYSpacing = { normal: 0, wide: 4 }
    
    // for each page
    dd.content.forEach((page, pageIndex) => {
      let background = []

      page.jsmeta.titles.forEach((title, index) => {
        var j = ((index < 10) ? index : index - 10); // counts 0..9 twice
        var x = ((index < 10) ? xPos[spaced].left : xPos[spaced].right ) // set the x-axis offset (left or right). Spaced will need to set 80.5 and 306.5 (2mm space)
        var y = (j * 72 + (j * tileYSpacing[spaced])) + pageTopMargin[spaced] // set the y axis, 22.5 is the page top margin. Spaced will need to reduce this by 10mm then add 2mm to each

        background.push(Printer.backgrounds[title.style](x, y, title.primaryColor, title.artistTint))

      })
      let newPage = [background, page]
      dd.content[pageIndex] = newPage
    })
  },

  getTitleASide: function (title) {
    return {
      text: title.aside,
      margin: [title.margins, title.fontMargins.aside, title.margins, 0],
      border: [false, false, false, false],
      fillColor: title.titleTint,
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
      fillColor: title.titleTint,
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
      fillColor: title.titleTint,
      font: title.font,
      fontSize: title.titleSize,
      bold: true
    }
  },

  printTitles: function(dd) {
    for (let p = 0; p < dd.content.length; p++) {
      let page = dd.content[p]

      let body = []

      for (let i = 0; i < dd.jsmeta.rows && i < page.jsmeta.titles.length; i++) {
        //get the title (current, i) and see if there is a corresponding second column title
        const title = page.jsmeta.titles[i]
        // if we're supposed to have two columns and there's a corresponding title to populate
        const title_col2 = (dd.jsmeta.columns == 2 && page.jsmeta.titles.length > i + dd.jsmeta.rows) ? page.jsmeta.titles[i + dd.jsmeta.rows] : null

        let columns = []

        //get asides
        columns.push(this.getTitleASide(title))
        if (title_col2 !== null) {
          columns.push(this.getTitleASide(title_col2))
        } else {
          columns.push({ text: '', border: [false, false, false, false] })
        }

        body.push(columns)

        columns = []

        //get artists
        columns.push(this.getTitleArtist(title))
        if (title_col2 !== null) {
          columns.push(this.getTitleArtist(title_col2))
        } else {
          columns.push({ text: '', border: [false, false, false, false] })
        }


        body.push(columns)

        columns = []

        //get bsides
        columns.push(this.getTitleBSide(title))
        if (title_col2 !== null) {
          columns.push(this.getTitleBSide(title_col2))
        } else {
          columns.push({ text: '', border: [false, false, false, false] })
        }


        body.push(columns)       
      }

      const spaced = dd.jsmeta.options.spacing
      const _h = { normal: [21.5,14,21.5], wide: [21.5,14,25.5] }
      let _heights = []
      for (let i = 0; i < 10; i++) {
        _heights = _heights.concat(_h[spaced])
      }
      page.alignment = 'center'
      page.table = {
        heights: _heights,
        widths: ((dd.jsmeta.columns == 2) ? [215, 215] : [215]),
        body: body
      }

      // if this isn't the last page, insert a page break
      page.pageBreak = ((p !== dd.content.length - 1) ? 'after' : '')
    }
  },

  sideBreaker: function (title, font, style) {
    for (let side of ['a', 'b']) {
      let str = title[side + 'side']

      let canvas = document.createElement('canvas')
      canvas.width = 225

      let context = canvas.getContext('2d')
      context.font = font.titleSize + 'px ' + font.name
      context.textAlign = 'center'
      context.textBaseline = 'middle';

      let _width = context.measureText(str).width
      console.log(_width)

      if (_width > (225 - (style.margins * 2))) {
        var _splitPoint = 0
        let _words = str.split(" ")

        // if we're breaking strings, look for a natural breaking point
        if (str.indexOf('(') > -1) {
          const chrToLookFor = (str.startsWith('(') ? ')' : '(')
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

        _words.splice(_splitPoint, 0, '\n')
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
        awrap: false,
        bwrap: false
      }

      let font = null
      let style = null

      if (jsmeta.options.allCaps) {
        formattedTitle.aside = formattedTitle.aside.toUpperCase()
        formattedTitle.artist = formattedTitle.artist.toUpperCase()
        formattedTitle.artistb = formattedTitle.artistb.toUpperCase()
        formattedTitle.bside = formattedTitle.bside.toUpperCase()
      }
      if (jsmeta.options.quotes) {
        formattedTitle.aside = '"' + formattedTitle.aside + '"'
        formattedTitle.bside = '"' + formattedTitle.bside + '"'
      }

      //copy the style definitions from either the default or the override
      if (Object.keys(title).includes('styleOverride')) {
        for (let key of ['style', 'primaryColor', 'titleFillColor', 'artistFillColor']) {
          formattedTitle[key] = title.styleOverride[key]
        }
        font = StyleDefines.fonts[title.styleOverride.font]
        style = StyleDefines.styles[title.styleOverride.style]
      } else {
        for (let key of ['style', 'primaryColor', 'titleFillColor', 'artistFillColor']) {
          formattedTitle[key] = jsmeta.options[key]
        }
        font = StyleDefines.fonts[jsmeta.options.font]
        style = StyleDefines.styles[jsmeta.options.style]
      }

      //add style details
      formattedTitle.maxwidth = style.maxwidth
      formattedTitle.margins = style.margins
      formattedTitle.mergeArtist = style.mergeArtist

      //add font details
      formattedTitle.font = font.name
      formattedTitle.titleSize = font.titleSize
      formattedTitle.artistSize = font.artistSize

      //provide the correct shades for fills
  
      if (formattedTitle.titleFillColor === true) {
        formattedTitle.titleTint=shadeColor2(StyleDefines.colors[formattedTitle.primaryColor].primary, 0.8)
      } else {
        formattedTitle.titleTint='#ffffff'
      }

      if (formattedTitle.artistFillColor === true) {
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

      console.log(formattedTitle)
      //add the title to
      formattedTitles.push(formattedTitle)
    }

    //return the formatted titles
    return formattedTitles

      /*
      'primaryColor','font','allCaps','quotes','titleFillColor','artistFillColor'
      */

    /*
    var textSizer=document.body.appendChild(crel('span'));//,{'style':'font-family:Arial;font-size:10.5pt;font-weight:bold','id':'text-sizer'}));
    var toArray=false;
    if(!Array.isArray(titles)) {
      titles=[titles];
      toArray=true;
    }
    titles.forEach(function(e){
      e.style=Printer.getStyle(((e.style)?e.style:false));

      let k=['primaryColor','font','allCaps','quotes','titleFillColor','artistFillColor'];
      let ek = Object.keys(e)
      k.forEach(function(key){
        if(ek.includes(key)) {
          e.style[key]=e[key];
        }
        delete(e[key]);
      });
      e.style.font=titleCreator.getFont(((e.font)?e.font:database.options.get('font')));

      if (e.style.titleFillColor === true) {
        e.style.titleTint=shadeColor2(e.style.primaryColor, 0.8)
      } else {
        e.style.titleTint='#ffffff'
      }

      if (e.style.artistFillColor === true) {
        e.style.artistTint=shadeColor2(e.style.primaryColor, 0.8)
      } else {
        e.style.artistTint='#ffffff'
      }

      var awrap=false,bwrap=false;
      if(e.allCaps || (e.allCaps==null && e.style.allCaps)) {
        e.aside=e.aside.toUpperCase();
        e.bside=e.bside.toUpperCase();
        e.artist=e.artist.toUpperCase();
        e.artistb=e.artistb.toUpperCase();
      }
      textSizer.style.fontFamily=e.style.font.name;

      var sq=((e.quotes || (e.quotes==null && e.style.quotes))?true:false);

      //if there's no "/" and there are parethases that are not at the start and end of the entire string
      if(e.aside.indexOf('/')==-1 && (e.aside.indexOf('(')>=0 || e.aside.indexOf(')')>=0) && !(e.aside.indexOf('(')==0 && e.aside.indexOf(')')==e.aside.length-1)) {
        //split based on the parenthases
        var x;
        if(e.aside.indexOf(')')==e.aside.length-1) {
          x=trimArray(e.aside.split("("));
          if(sq)
            x[0]='"'+x[0]+'"';
          x=x.join("\n(");
        } else {
          x=trimArray(e.aside.split(")"));
          if(sq)
            x[1]='"'+x[1]+'"';
          x=x.join(")\n");
        }
        textSizer.innerHTML=x.replace('\n','<br>');
        let w = textSizer.offsetWidth;
        if(w <= e.style.maxwidth) //if the name is too long (with the break around parenthases) then ignore the break (best chance of getting it in two lines)
          e.aside = x;
        awrap=true;
      } else {
        //if there's a "/""
        if(e.aside.indexOf('/')>=1) {
          var xa = trimArray(e.aside.split('/'));
          if(sq)
            for(let i=0; i < xa.length; i++) xa[i]='"'+xa[i]+'"';
          e.aside=xa.join("\n");
          awrap=true;
        } else {
          //just a single line of text
          
          textSizer.innerHTML=e.aside;
          let w = textSizer.offsetWidth;
          if(w > e.style.maxwidth) awrap = true;
          if(sq) e.aside='"'+e.aside+'"';
        }
      }

      if(e.bside.indexOf('/')==-1 && (e.bside.indexOf('(')>=0 || e.bside.indexOf(')')>=0) && !(e.bside.indexOf('(')==0 && e.bside.indexOf(')')==e.bside.length-1)) {
        var xb;
        if(e.bside.indexOf(')')==e.bside.length-1) {
          xb = trimArray(e.bside.split("("));
          if(sq)
            xb[0]='"'+xb[0]+'"';
          xb=xb.join("\n(");
        } else {
          xb=trimArray(e.bside.split(")"));
          if(sq)
            xb[1]='"'+xb[1]+'"';
          xb=xb.join(")\n");
        }
        textSizer.innerHTML=xb.replace('\n','<br>');
        let w = textSizer.offsetWidth;
        if(w <= e.style.maxwidth) //if the name is too long (with the break around parenthases) then ignore the break (best chance of getting it in two lines)
          e.bside = xb;
        bwrap = true;
      } else {
        if(e.bside.indexOf('/')>=1) {
          var xc = trimArray(e.bside.split('/'));
          if(sq)
            for(let i=0; i < xc.length; i++) xc[i]='"'+xc[i]+'"';
          e.bside=xc.join("\n");
          bwrap = true;
        } else {
          textSizer.innerText = e.bside;
          let w = textSizer.offsetWidth;
          if(w > e.style.maxwidth) bwrap = true;
          if(sq) e.bside = '"' + e.bside + '"';
        }
      }
      e.style.font.margins={
        aside:e.style.font.margins.aside[((awrap)?0:1)],
        artist:e.style.font.margins.artist[0],
        bside:e.style.font.margins.bside[((bwrap)?0:1)]
      }
    });
    textSizer.parentNode.removeChild(textSizer);

    if(toArray) titles=titles[0];
    */
  }
}

export default Printer