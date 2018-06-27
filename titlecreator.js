window.titleCreator={
  options: JSON.parse(sessionStorage.getItem('options'))||{
    allCaps:true,
    quotes:true,
    primaryColor:'#ff0000',
    artistFillColor:false,
    titleFillColor:false,
    font:'Retro'
  },
  functions:{
    buildCanvases: function() {
      var b=[];
      for(i=0;i<20;i++) {
        var j=((i<10) ? i : i - 10);
        var x=((i<10) ? 40.5 : 264.5 );
        var y=(j*72)+40.5;
        b.push({
          canvas: [
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
          ],
          absolutePosition: {x: x, y: y}
        });
      }
      return b;
    },
    buildTable: function(titles,last){
      var b=[];
      for(i=0;i<10;i++){
        b.push([
          { text: ((titles.length>i) ? titles[i].aside : ''), style:'title', margin:[0,((titles.length>i && titles[i].awrap) ? 1.2 : 5.7 ),0,0], border: [true, true, true, false], fillColor:((titleCreator.options.titleFillColor) ? getTintedColor(titleCreator.options.primaryColor,200) : 'white')},
          { text: ((titles.length>i+10) ? titles[i+10].aside : ''), style:'title', margin:[0,((titles.length>i+10 && titles[i+10].awrap) ? 1.2 : 5.7 ),0,0], border: [true, true, true, false], fillColor:((titleCreator.options.titleFillColor) ? getTintedColor(titleCreator.options.primaryColor,200) : 'white')}
        ]);
        b.push([
          { text: ((titles.length>i) ? titles[i].artist : ''), style:'artist', margin:[0,2,0,0], border: [true, false, true, false], fillColor:((titleCreator.options.titleFillColor) ? getTintedColor(titleCreator.options.primaryColor,200) : 'white')},
          { text: ((titles.length>i+10) ? titles[i+10].artist : ''), style:'artist', margin:[0,2,0,0], border: [true, false, true, false], fillColor:((titleCreator.options.titleFillColor) ? getTintedColor(titleCreator.options.primaryColor,200) : 'white')}
        ]);
        b.push([
          { text: ((titles.length>i) ? titles[i].bside : ''), style:'title', margin:[0,((titles.length>i && titles[i].bwrap) ? .3 : 4.5 ),0,0], border: [true, false, true, true], fillColor:((titleCreator.options.titleFillColor) ? getTintedColor(titleCreator.options.primaryColor,200) : 'white')},
          { text: ((titles.length>i+10) ? titles[i+10].bside : ''), style:'title', margin:[0,((titles.length>i+10 && titles[i+10].bwrap) ? .3 : 4.5 ),0,0], border: [true, false, true, true], fillColor:((titleCreator.options.titleFillColor) ? getTintedColor(titleCreator.options.primaryColor,200) : 'white')}
        ]);
      }
      return {
        'alignment': 'center',
        table: {
          heights: [
            21.5,14,21.5,21.5,14,21.5,21.5,14,21.5,21.5,14,21.5,21.5,14,21.5,21.5,14,21.5,21.5,14,21.5,21.5,14,21.5,21.5,14,21.5,21.5,14,21.5
          ],
          widths: [215,215],
          body: b
        },
        layout: {
          hLineWidth: function (i, node) {return 1},
          vLineWidth: function (i, node) {return 1},
          hLineColor: titleCreator.options.primaryColor,
          vLineColor: titleCreator.options.primaryColor
        },
        'pageBreak':((last===false) ? 'after' : '')
      }
    },
    buildPages: function(titles) {
      var p=[];
      var last=false;
      while(titles.length>0) {
        var page=titles.splice(0,20);
        if(titles.length==0) last=true;
        p.push(this.buildCanvases());
        p.push(this.buildTable(page,last));
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
        }
      }
      return c;
    },
    formatTitles(titles) {
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
    this.getOptions();
    var dd=this.functions.getDocument(titles);
    pdfMake.createPdf(dd).open();
  },
  getOptions:function(){
    if(!titleCreator.options.hasOwnProperty('primaryColor')) this.options.primaryColor='#ff0000';
    if(!titleCreator.options.hasOwnProperty('artistFillColor')) this.options.artistFillColor='false';
    if(!titleCreator.options.hasOwnProperty('titleFillColor')) this.options.titleFillColor='false';
    if(!titleCreator.options.hasOwnProperty('font')) this.options.font='Retro';
    return this.options;
  },
  setOption:function(option,value){
    this.options[option]=value;
    sessionStorage.setItem('options',JSON.stringify(this.getOptions()));
  },
  reset:function(){
    sessionStorage.removeItem('titles')
  }
}

pdfMake.fonts = {
  Retro: {
    bold: 'Retro.ttf'
  },
  RetroCondensed: {
    bold: 'RetroCondensed.ttf'
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