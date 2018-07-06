window.titleCreator={
  options: JSON.parse(localStorage.getItem('options'))||{
    allCaps:true,
    quotes:true,
    primaryColor:'#ff0000',
    artistFillColor:false,
    titleFillColor:false,
    font:'Retro',
    style:'arrows',
    paperType:'standard'
  },
  functions:{
    drawDesign: function(style) {
      switch(style) {
        case 'arrows':
          return [
            {
              type: 'line',
              x1: 0, y1: 36,
              x2: 224, y2: 36,
              lineWidth: 9,
              lineColor: titleCreator.options.primaryColor,
            },
            {
              type: 'rect',
              x: 32.5,
              y: 27,
              w: 160,
              h: 18,
              color: ((titleCreator.options.artistFillColor) ? getTintedColor(titleCreator.options.primaryColor,200) : 'white'),
              lineColor: titleCreator.options.primaryColor,
              lineWidth: 1.5
            },
            {
              type: 'polyline',
              lineWidth: 3,
              closePath: true,
              points: [{x: 32, y: 27}, {x: 32, y: 45}, {x: 40, y: 36}],
              color: titleCreator.options.primaryColor
            },
            {
              type: 'polyline',
              lineWidth: 3,
              closePath: true,
              points: [{x: 193, y: 27}, {x: 193, y: 45}, {x: 184, y: 36}],
              color: titleCreator.options.primaryColor
            }
          ];
          break;
        case 'diamond':
          return [
            {
              type: 'line',
              x1: 0, y1: 36,
              x2: 224, y2: 36,
              lineWidth: 9,
              lineColor: titleCreator.options.primaryColor,
            },
            {
              type: 'polyline',
              lineWidth: 1.5,
              closePath: true,
              points: [{x: 35, y: 27},{x: 189, y: 27},{x: 198, y: 36},{x: 189, y: 45},{x: 35, y: 45},{x: 27, y: 36}],
              lineColor: titleCreator.options.primaryColor,
              color: ((titleCreator.options.artistFillColor) ? getTintedColor(titleCreator.options.primaryColor,200) : 'white')
            }
          ];
          break;
        case 'holly':
          return [];
          break;
        case 'trees':
          return [
            {
              type: 'line',
              x1: 48, y1: 36,
              x2: 58, y2: 36,
              lineWidth: 1.5,
              lineColor: '#2DAA5F'
            },
            {
              type: 'ellipse',
              x:15,
              y:36,
              r1:2,
              color: '#ff0000'
            },
            {
              type: 'polyline',
              closePath: true,
              points: [
                {x: 36.75, y: 44.5},
                {x: 36.75, y: 42.25},
                {x: 30, y: 42.25},
                {x: 33.75, y: 36.5},
                {x: 31.75, y: 36.5},
                {x: 34.5, y: 32.25},
                {x: 33.25, y: 32.25},
                {x: 37.25, y: 25},
                {x: 41.25, y: 32.25},
                {x: 40.25, y: 32.25},
                {x: 43, y: 36.5},
                {x: 41, y: 36.5},
                {x: 44.5, y: 42.25},
                {x: 37.75, y: 42.25},
                {x: 37.75, y: 44.5}
              ],
              color: '#2DAA5F'
            },
            {
              type: 'polyline',
              closePath: true,
              points: [
                {x: 26.75, y: 44.5},
                {x: 26.75, y: 42.25},
                {x: 20, y: 42.25},
                {x: 23.75, y: 36.5},
                {x: 21.75, y: 36.5},
                {x: 24.5, y: 32.25},
                {x: 23.25, y: 32.25},
                {x: 27.25, y: 25},
                {x: 31.25, y: 32.25},
                {x: 30.25, y: 32.25},
                {x: 33, y: 36.5},
                {x: 31, y: 36.5},
                {x: 34.5, y: 42.25},
                {x: 27.75, y: 42.25},
                {x: 27.75, y: 44.5}
              ],
              color: '#2DAA5F'
            },
            {
              type: 'line',
              x1: 167, y1: 36,
              x2: 177, y2: 36,
              lineWidth: 1.5,
              lineColor: '#2DAA5F'
            },
            {
              type: 'ellipse',
              x:208,
              y:36,
              r1:2,
              color: '#ff0000'
            },
          ];
          break;
      }
    },
    buildCanvases: function() {
      var b=[];
      for(i=0;i<20;i++) {
        var j=((i<10) ? i : i - 10);
        var x=((i<10) ? 81.5 : 305.5 );
        var y=(j*72)+22.5;
        if(titleCreator.options.style=="holly") {
          b.push({
            image: 'data:image/png;base64,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',
            width: 200,
            absolutePosition: {x: x+10, y: y+20}
          });
          b.push({
            canvas: [
              {
                type: 'line',
                x1: 30, y1: 26,
                x2: 194, y2: 26,
                lineWidth: 1.5,
                lineColor: '#ff0000'
              },
              {
                type: 'line',
                x1: 30, y1: 46,
                x2: 194, y2: 46,
                lineWidth: 1.5,
                lineColor: '#ff0000'
              }
            ],
            absolutePosition: {x: x, y: y}
          });
          b.push({
            image: 'data:image/png;base64,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',
            width: 200,
            absolutePosition: {x: x+200, y: y+20}
          })
        } else {
          b.push({
            canvas: this.drawDesign(titleCreator.options.style),
            absolutePosition: {x: x, y: y}
          })
        }
      }
      return b;
    },
    buildTable: function(titles,last,columns,rows){
      var b=[];
      for(i=0;i<rows;i++){
        var x=[
          { text: ((titles.length>i) ? titles[i].aside : ''), style:'title', margin:[0,((titles.length>i && titles[i].awrap) ? 1.2 : 7.5 ),0,0], border: [true, true, true, false], fillColor:((titleCreator.options.titleFillColor) ? getTintedColor(titleCreator.options.primaryColor,200) : 'white')},
        ];
        if(columns==2) x.push({ text: ((titles.length>i+rows) ? titles[i+rows].aside : ''), style:'title', margin:[0,((titles.length>i+rows && titles[i+rows].awrap) ? 1.2 : 7.5 ),0,0], border: [true, true, true, false], fillColor:((titleCreator.options.titleFillColor) ? getTintedColor(titleCreator.options.primaryColor,200) : 'white')});

        var y=[
          { text: ((titles.length>i) ? titles[i].artist : ''), style:'artist', margin:[0,2.5,0,0], border: [true, false, true, false], fillColor:((titleCreator.options.titleFillColor) ? getTintedColor(titleCreator.options.primaryColor,200) : 'white')},
        ];
        if(columns==2) y.push({ text: ((titles.length>i+rows) ? titles[i+rows].artist : ''), style:'artist', margin:[0,2.5,0,0], border: [true, false, true, false], fillColor:((titleCreator.options.titleFillColor) ? getTintedColor(titleCreator.options.primaryColor,200) : 'white')})
        
        var z=[
          { text: ((titles.length>i) ? titles[i].bside : ''), style:'title', margin:[0,((titles.length>i && titles[i].bwrap) ? .3 : 4 ),0,0], border: [true, false, true, true], fillColor:((titleCreator.options.titleFillColor) ? getTintedColor(titleCreator.options.primaryColor,200) : 'white')},
        ];
        if(columns==2) z.push({ text: ((titles.length>i+rows) ? titles[i+rows].bside : ''), style:'title', margin:[0,((titles.length>i+10 && titles[i+rows].bwrap) ? .3 : 4 ),0,0], border: [true, false, true, true], fillColor:((titleCreator.options.titleFillColor) ? getTintedColor(titleCreator.options.primaryColor,200) : 'white')})
        
        b.push(x);
        b.push(y);
        b.push(z);
      }
      return {
        'alignment': 'center',
        table: {
          heights: [
            21.5,14,21.5,21.5,14,21.5,21.5,14,21.5,21.5,14,21.5,21.5,14,21.5,21.5,14,21.5,21.5,14,21.5,21.5,14,21.5,21.5,14,21.5,21.5,14,21.5
          ],
          widths: ((columns==2) ? [215,215] : [215]),
          body: b
        },
        layout: {
          hLineWidth: function (i, node) {return 1},
          vLineWidth: function (i, node) {return 1},
          hLineColor: ((titleCreator.options.paperType=="standard") ? titleCreator.options.primaryColor : '#ffffff'),
          vLineColor: ((titleCreator.options.paperType=="standard") ? titleCreator.options.primaryColor : '#ffffff')
        },
        'pageBreak':((last===false) ? 'after' : '')
      }
    },
    buildPages: function(titles,columns=2,rows=10) {
      var p=[];
      var last=false;
      while(titles.length>0) {
        var page=titles.splice(0,rows*columns);
        if(titles.length==0) last=true;
        if(titleCreator.options.paperType=="standard")
          p.push(this.buildCanvases());
        p.push(this.buildTable(page,last,columns,rows));
      }
      return p;
    },
    getDocument: function(titles) {
      titles=this.formatTitles(titles);
      var c = {
        content: this.buildPages(titles),
        styles: {
          artist: {
            fontSize: 9,
            bold: true,
            font: titleCreator.options.font
          },
          title: {
            fontSize: 10.5,
            bold: true,
            font: titleCreator.options.font
          }
        },
        pageSize:'LETTER',
        pageMargins: [ 81, 22.5, 0, 0 ]
      }
      return c;
    },
    single12:function(titles){
      var columns=1,
          rows=12;
      titles=this.formatTitles(titles);
      var c = {
        content: this.buildPages(titles,columns,rows),
        styles: {
          artist: {
            fontSize: 9,
            bold: true,
            font: titleCreator.options.font
          },
          title: {
            fontSize: 10.5,
            bold: true,
            font: titleCreator.options.font
          }
        },
        pageSize:{width:225, height: 936},
        pageMargins: [ 0, 31.5, 0, 0 ]
        /*
                pageSize:'LETTER',
        pageMargins: [ 193.5, 31.5, 0, 0 ]
*/
      }
      return c; 
    },
    double10:function(titles){
      var columns=2,
          rows=5;
      titles=this.formatTitles(titles);
      var c = {
        content: this.buildPages(titles,columns,rows),
        styles: {
          artist: {
            fontSize: 9,
            bold: true,
            font: titleCreator.options.font
          },
          title: {
            fontSize: 10.5,
            bold: true,
            font: titleCreator.options.font
          }
        },
        /*pageSize:{width:450, height: 450},
        pageMargins: [ 0, 22.5, 0, 40.5 ]*/
        pageSize:'LETTER',
        pageMargins: [ 81, 22.5, 0, 0 ]
      }
      return c; 
    },
    formatTitles: function(titles) {
      $('body').append(crel('span',{'style':'font-family:'+titleCreator.options.font+';font-size:10.5pt;font-weight:bold;display:none','id':'text-sizer'}));
      titles.forEach(function(e){
        if(titleCreator.options.allCaps) {
          e.aside=e.aside.toUpperCase();
          e.bside=e.bside.toUpperCase();
          e.artist=e.artist.toUpperCase();
        }
        if(titleCreator.options.quotes) {
          e.aside='"'+e.aside+'"';
          e.bside='"'+e.bside+'"';
        }
        var w=$('#text-sizer').text(e.aside).width();
        if(w>266) e.awrap=true;
        w=$('#text-sizer').text(e.bside).width();
        if(w>266) e.bwrap=true;
      });
      $('#text-sizer').remove();
      return titles;
    }
  },
  start:function(titles) {
    var o=this.getOptions();
    var dd={};
    switch(o.paperType) {
      case 'single12':
        dd=this.functions.single12(titles);
        break;
        case 'double10':
          dd=this.functions.double10(titles);
          break;
      default:
        dd=this.functions.getDocument(titles);
        break;
    }
    pdfMake.createPdf(dd).open();
  },
  getOptions:function(){
    if(!titleCreator.options.hasOwnProperty('primaryColor')) this.options.primaryColor='#ff0000';
    if(!titleCreator.options.hasOwnProperty('artistFillColor')) this.options.artistFillColor='false';
    if(!titleCreator.options.hasOwnProperty('titleFillColor')) this.options.titleFillColor='false';
    if(!titleCreator.options.hasOwnProperty('font')) this.options.font='Retro';
    if(!titleCreator.options.hasOwnProperty('design')) this.options.design='arrows';
    if(!titleCreator.options.hasOwnProperty('paperType')) this.options.design='standard';
    return this.options;
  },
  setOption:function(option,value){
    this.options[option]=value;
    localStorage.setItem('options',JSON.stringify(this.getOptions()));
  },
  reset:function(){
    localStorage.removeItem('titles')
  }
}

pdfMake.fonts = {
  Retro: {
    bold: 'Retro.ttf'
  },
  RetroCondensed: {
    bold: 'RetroCondensed.ttf'
  },
  ATypewriter: {
    bold: 'ATypewriter.ttf'
  }
}

function getTintedColor(color, v) {
  if (color.length >6) { color= color.substring(1,color.length)}
  var rgb = parseInt(color, 16); 
  var r = Math.abs(((rgb >> 16) & 0xFF)+v); if (r>255) r=r-(r-255);
  var g = Math.abs(((rgb >> 8) & 0xFF)+v); if (g>255) g=g-(g-255);
  var b = Math.abs((rgb & 0xFF)+v); if (b>255) b=b-(b-255);
  r = Number(r < 0 || isNaN(r)) ? 0 : ((r > 255) ? 255 : r).toString(16); 
  if (r.length == 1) r = '0' + r;
  g = Number(g < 0 || isNaN(g)) ? 0 : ((g > 255) ? 255 : g).toString(16); 
  if (g.length == 1) g = '0' + g;
  b = Number(b < 0 || isNaN(b)) ? 0 : ((b > 255) ? 255 : b).toString(16); 
  if (b.length == 1) b = '0' + b;
  return "#" + r + g + b;
} 