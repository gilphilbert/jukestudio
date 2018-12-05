window.titleCreator={
  options: JSON.parse(localStorage.getItem('options'))||{
    allCaps:true,
    quotes:true,
    primaryColor:'#ff0000',
    artistFillColor:false,
    titleFillColor:false,
    font:'Retro',
    style:'arrows',
    paperType:'letter'
  },
  styles: {
    arrows:{
      name:'Arrows',
      maxwidth:280,
      margins:0
    },
    diamond:{
      name:'Diamond',
      maxwidth:280,
      margins:0
    },
    holly:{
      name:'Holly',
      artistTint:'#ffffff',
      titleTint:'#ffffff',
      lineColor:'#ff0000',
      maxwidth:242,
      margins:22
    },
    candycane:{
      name:'Candy Cane',
      artistTint:'#ffffff',
      titleTint:'#ABDCA8',
      lineColor:'#D3444A',
      maxwidth:242,
      margins:22
    }
  },
  fonts:{
    Retro:{name:'Retro',titleSize:10,artistSize:9,margins:{aside:[1,7.5],artist:[2.5],bside:[.1,4]}},
    RetroCondensed:{name:'RetroCondensed',titleSize:10,artistSize:9,margins:{aside:[1,7.5],artist:[2.5],bside:[.1,4]}},
    ATypewriter:{name:'ATypewriter',titleSize:8.7,artistSize:8,margins:{aside:[0,7.5],artist:[2.5],bside:[0,4]}}
  },
  titles: {},
  functions:{
    drawDesign: function(style) {
      var s=titleCreator.getStyle();
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
              color: s.artistTint,
              lineColor: titleCreator.options.primaryColor,
              lineWidth: 1.5
            },
            {
              type: 'polyline',
              lineWidth: 3,
              closePath: true,
              points: [{x: 32, y: 27}, {x: 32, y: 45}, {x: 40, y: 36}],
              color: s.lineColor 
            },
            {
              type: 'polyline',
              lineWidth: 3,
              closePath: true,
              points: [{x: 193, y: 27}, {x: 193, y: 45}, {x: 184, y: 36}],
              color: s.lineColor
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
              lineColor: s.lineColor,
            },
            {
              type: 'polyline',
              lineWidth: 1.5,
              closePath: true,
              points: [{x: 35, y: 27},{x: 189, y: 27},{x: 198, y: 36},{x: 189, y: 45},{x: 35, y: 45},{x: 27, y: 36}],
              lineColor: s.lineColor,
              color: s.artistTint
            }
          ];
          break;
        case 'holly':
          return [];
          break;
        case 'candycane':
          return [];
          break;
      }
    },
    buildCanvases: function() {
      var style=titleCreator.getStyle();
      var b=[];
      for(i=0;i<20;i++) {
        var j=((i<10) ? i : i - 10);
        var x=((i<10) ? 81.5 : 305.5 );
        var y=(j*72)+22.5;
        if(titleCreator.options.style=="holly") {
          b.push({
            image: 'data:image/png;base64,'+pdfMake.vfs['holly.png'],
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
                lineColor: style.lineColor
              },
              {
                type: 'line',
                x1: 30, y1: 46,
                x2: 194, y2: 46,
                lineWidth: 1.5,
                lineColor: style.lineColor
              }
            ],
            absolutePosition: {x: x, y: y}
          });
          b.push({
            image: 'data:image/png;base64,'+pdfMake.vfs['holly.png'],
            width: 200,
            absolutePosition: {x: x+200, y: y+20}
          })
        } else if(titleCreator.options.style=='candycane') {
          b.push({
            image: 'data:image/png;base64,'+pdfMake.vfs['candycane.png'],
            width: 22,
            absolutePosition: {x: x+5, y: y+8}
          });
          b.push({
            canvas: [
              {
                type: 'rect',
                x: 32.5,
                y: 27,
                w: 160,
                h: 18,
                color: style.artistTint,
                lineColor: style.lineColor,
                lineWidth: 1.5
              },
              {
                type: 'polyline',
                lineWidth: 3,
                closePath: true,
                points: [{x: 32, y: 27}, {x: 32, y: 45}, {x: 40, y: 36}],
                color: style.lineColor 
              },
              {
                type: 'polyline',
                lineWidth: 3,
                closePath: true,
                points: [{x: 193, y: 27}, {x: 193, y: 45}, {x: 184, y: 36}],
                color: style.lineColor
              }
            ],
            absolutePosition: {x: x, y: y}
          });
          b.push({
            image: 'data:image/png;base64,'+pdfMake.vfs['candycane.png'],
            width: 22,
            absolutePosition: {x: x+197, y: y+8}
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
      var style=titleCreator.getStyle();
      var f=titleCreator.getFont();
      var b=[];

      for(i=0;i<rows;i++){
        var x=[{
          text: ((titles.length>i) ? titles[i].aside : ''),
          style:'title',
          margin:[style.margins,((titles[i])?titles[i].margins.aside:0),style.margins,0],
          border: [true, true, true, false],
          fillColor:style.titleTint
        }];
        var y=[{
          text: ((titles.length>i) ? titles[i].artist : ''),
          style:'artist',
          margin:[style.margins,((titles[i])?titles[i].margins.artist:0),style.margins,0],
          border: [true, false, true, false],
          fillColor:style.titleTint
        }];
        var z=[{
          text: ((titles.length>i) ? titles[i].bside : ''),
          style:'title',
          margin:[style.margins,((titles[i])?titles[i].margins.bside:0),style.margins,0],
          border: [true, false, true, true],
          fillColor:style.titleTint
        }];

        if(columns==2) {
          x.push({
            text: ((titles.length>i+rows) ? titles[i+rows].aside : ''),
            style:'title',
            margin:[style.margins,((titles[i+rows])?titles[i+rows].margins.aside:0),style.margins,0],
            border: [true, true, true, false],
            fillColor:style.titleTint
          });
          y.push({
            text: ((titles.length>i+rows) ? titles[i+rows].artist : ''),
            style:'artist',
            margin:[style.margins,((titles[i+rows])?titles[i+rows].margins.artist:0),style.margins,0],
            border: [true, false, true, false],
            fillColor:style.titleTint
	  });
          z.push({
            text: ((titles.length>i+rows) ? titles[i+rows].bside : ''),
            style:'title',
            margin:[style.margins,((titles[i+rows])?titles[i+rows].margins.bside:0),style.margins,0],
            border: [true, false, true, true],
            fillColor:style.titleTint
	  });
        }
        
        b.push(x);
        b.push(y);
        b.push(z);

      };
      return {
        'alignment': 'center',
        table: {
          heights: [21.5,14,21.5,21.5,14,21.5,21.5,14,21.5,21.5,14,21.5,21.5,14,21.5,21.5,14,21.5,21.5,14,21.5,21.5,14,21.5,21.5,14,21.5,21.5,14,21.5],
          widths: ((columns==2) ? [215,215] : [215]),
          body: b
        },
        layout: {
          hLineWidth: function (i, node) {return 1},
          vLineWidth: function (i, node) {return 1},
          hLineColor: style.lineColor,
          vLineColor: style.lineColor
        },
        'pageBreak':((last===false) ? 'after' : '')
      }
    },
    buildPages: function(columns=2,rows=10) {
      var p=[];
      var last=false;
      var titles=titleCreator.getTitles(true);
      while(titles.length>0) {
        var page=titles.splice(0,rows*columns);
        if(titles.length==0) last=true;
        if(titleCreator.options.paperType=="letter")
          p.push(this.buildCanvases());
        p.push(this.buildTable(page,last,columns,rows));
      }
      return p;
    },
    getDocument: function() {
      var f=titleCreator.getFont();
      var c = {
        content: this.buildPages(),
        styles: {
          artist: {
            fontSize: f.artistSize,
            bold: true,
            color: "#000000",
            font: f.name
          },
          title: {
            fontSize: f.titleSize,
            bold: true,
            color: "#000000",
            font: f.name
          }
        },
        pageSize:'LETTER',
        pageMargins: [ 81, 22.5, 0, 0 ]
      }
      return c;
    },
    single12:function(){
      var f=titleCreator.getFont();
      var columns=1,
          rows=12;
      var c = {
        content: this.buildPages(columns,rows),
        styles: {
          artist: {
            fontSize: f.artistSize,
            bold: true,
            font: f.name 
          },
          title: {
            fontSize: f.titleSize,
            bold: true,
            font: f.name
          }
        },
        pageSize:{width:225, height: 936},
        pageMargins: [ 0, 31.5, 0, 0 ],
        pageSize:'LEGAL',
        pageMargins: [ 193.5, 31.5, 0, 0 ]
      }
      return c; 
    },
    double10:function(){
      var f=titleCreator.getFont();
      var columns=2,
          rows=5;
      var c = {
        content: this.buildPages(columns,rows),
        styles: {
          artist: {
            fontSize: f.artistSize,
            bold: true,
            font: f.name
          },
          title: {
            fontSize: f.titleSize,
            bold: true,
            font: f.name
          }
        },
        pageSize:'LETTER',
        pageMargins: [ 81, 22.5, 0, 0 ]
      }
      return c; 
    },
    formatTitles: function(titles) {
      var f=titleCreator.getFont();
      var s=titleCreator.getStyle();
      $('body').append(crel('span',{'style':'font-family:'+f.name+';font-size:10.5pt;font-weight:bold;display:none','id':'text-sizer'}));

      titles.forEach(function(e){
        var awrap=false,bwrap=false;
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
        if(w>s.maxwidth) awrap=true;
        w=$('#text-sizer').text(e.bside).width();
        if(w>s.maxwidth) bwrap=true;

///still needs to take into account long songs with braces... as well as whether it makes more sense to split on braces than length (so braces first, then check for length)
        if(!awrap) {
          if(e.aside.substr(e.aside.length-1)==')' && e.aside.substr(0,1)!='(') {
            x=e.aside.split("(");
            e.aside=x.join("\n(");
            awrap=true;
          }
        }
        if(!bwrap) {
          if(e.bside.substr(e.bside.length-1)==')' && e.bside.substr(0,1)!='(') {
            x=e.bside.split("(");
            e.bside=x.join("\n(");
            bwrap=true;
          }
        }

        var m=f.margins;
        e.margins={
	  aside:m.aside[((awrap)?0:1)],
	  artist:m.artist[0],
	  bside:m.bside[((bwrap)?0:1)]
	};
      });
      $('#text-sizer').remove();
      return titles;
    }
  },
  start:function() {
    var o=this.getOptions();
    var dd={};
    switch(o.paperType) {
      case 'single12':
        dd=this.functions.single12();
        break;
        case 'double10':
          dd=this.functions.double10();
          break;
      default:
        dd=this.functions.getDocument();
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
    if(!titleCreator.options.hasOwnProperty('paperType')) this.options.paperType='letter';
    if(this.options.paperType=='standard') this.options.paperType='letter';
    return this.options;
  },
  getFont:function(){
    return JSON.parse(JSON.stringify(titleCreator.fonts[titleCreator.options.font]))
  },
  getStyle:function(){
    var s=JSON.parse(JSON.stringify(this.styles[this.options.style]));
    var o=this.getOptions();
    if(o.paperType!='letter') {
      s.artistTint='#ffffff';
      s.titleTint='#ffffff';
      s.lineColor='#ffffff';
    } else {
      if(!s.hasOwnProperty('artistTint'))
        s.artistTint=((o.artistFillColor) ? shadeColor2(o.primaryColor,0.8) : '#ffffff');
      if(!s.hasOwnProperty('titleTint'))
        s.titleTint=((o.titleFillColor) ? shadeColor2(o.primaryColor,0.8) : '#ffffff');
      if(!s.hasOwnProperty('lineColor'))
        s.lineColor=o.primaryColor;
    }
    return s;
  },
  setOption:function(option,value){
    this.options[option]=value;
    localStorage.setItem('options',JSON.stringify(this.getOptions()));
  },
  reset:function(){
    titleCreator.titles=[];
    localStorage.removeItem('titles');
  },
  getTitles:function(formatted=false){
    var t=JSON.parse(JSON.stringify(titleCreator.titles));
    if(formatted)
      return this.functions.formatTitles(t);
    return t;
  },
  getTitle:function(id){
    var found = titleCreator.titles.find(function(e) {
      return e.id==id;
    });
    return found;
  },
  addTitles:function(i){
    i.forEach(function(v){
      v.id=titleCreator.getNewID();
      titleCreator.titles=titleCreator.titles.concat(v);
    });
    this.saveTitles();
    return i;
  },
  saveTitles:function() {
    localStorage.setItem('titles',JSON.stringify(this.getTitles()));
  },
  removeTitle:function(id){
    for (var i=this.titles.length-1; i>=0; --i) {
      if (this.titles[i].id == id) {
        this.titles.splice(i,1);
        this.saveTitles();
        break;
      }
    }
  },
  retrieveTitles:function() {
    var t=JSON.parse(localStorage.getItem('titles'))||[];
    if(t.constructor !== Array) t=[];
    if(t.length>0)
      if(! t[0].hasOwnProperty('id'))
        t=this.addIDs(t);
    this.titles=t;
  },
  addIDs:function(arr){
    var id=0;
    arr.forEach(function(i){
      i['id']=id;
      id++;
    });
    return arr;
  },
  getNewID:function(){
    var t=titleCreator.getTitles();
    var first=((t.length==0) ? true : false);
    if(first) return 0;
    var a=[];
    t.forEach(function(i){
      a.push(i.id);
    });
    a=a.sort(function (a, b) { return a-b; });
    for(j=0;j<a[a.length-1];j++)
      if(a.indexOf(j)==-1)
        return j
    return a[a.length-1]+1;
  },
  updateTitle:function(item){
    var id=item.id;
    this.removeTitle(id);
    delete item.id;
    return this.addTitles([item]);
  }
}


//application startup stuff
titleCreator.retrieveTitles();
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


function shadeColor2(color, percent) {   
  var f=parseInt(color.slice(1),16),t=percent<0?0:255,p=percent<0?percent*-1:percent,R=f>>16,G=f>>8&0x00FF,B=f&0x0000FF;
  return "#"+(0x1000000+(Math.round((t-R)*p)+R)*0x10000+(Math.round((t-G)*p)+G)*0x100+(Math.round((t-B)*p)+B)).toString(16).slice(1);
}
