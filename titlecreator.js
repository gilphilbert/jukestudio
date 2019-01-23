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
      sname:'arrows',
      maxwidth:280,
      margins:8
    },
    diamond:{
      name:'Diamond',
      sname:'diamond',
      maxwidth:280,
      margins:8
    },
    holly:{
      name:'Holly',
      sname:'holly',
      artistTint:'#ffffff',
      titleTint:'#ffffff',
      primaryColor:'#ff0000',
      maxwidth:242,
      margins:22
    },
    candycane:{
      name:'Candy Cane',
      sname:'candycane',
      artistTint:'#ffffff',
      titleTint:'#ABDCA8',
      primaryColor:'#D3444A',
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
    buildCanvases: function(titles) {
      var b=[];
      for(i=0;i<titles.length;i++) {
        var style=titles[i].style;
        var j=((i<10) ? i : i - 10);
        var x=((i<10) ? 81.5 : 305.5 );
        var y=(j*72)+22.5;
        if(style.sname=="holly") {
          b.push({
            image: 'data:image/png;base64,'+pdfMake.vfs['holly.png'],
            width: 200,
            absolutePosition: {x: x+10, y: y+20}
          });
          b.push({
            canvas: [
              {
                type: 'rect',
                x: 0,
                y: 0,
                w: 224,
                h: 72,
                lineColor: style.primaryColor,
                lineWidth: 1
              },
              {
                type: 'line',
                x1: 30, y1: 26,
                x2: 194, y2: 26,
                lineWidth: 1.5,
                lineColor: style.primaryColor
              },
              {
                type: 'line',
                x1: 30, y1: 46,
                x2: 194, y2: 46,
                lineWidth: 1.5,
                lineColor: style.primaryColor
              }
            ],
            absolutePosition: {x: x, y: y}
          });
          b.push({
            image: 'data:image/png;base64,'+pdfMake.vfs['holly.png'],
            width: 200,
            absolutePosition: {x: x+200, y: y+20}
          })
        } else if(style.sname=='candycane') {
          b.push({
            image: 'data:image/png;base64,'+pdfMake.vfs['candycane.png'],
            width: 22,
            absolutePosition: {x: x+5, y: y+8}
          });
          b.push({
            canvas: [
              {
                type: 'rect',
                x: 0,
                y: 0,
                w: 224,
                h: 72,
                lineColor: style.primaryColor,
                lineWidth: 1
              },
              {
                type: 'rect',
                x: 32.5,
                y: 27,
                w: 160,
                h: 18,
                color: style.artistTint,
                lineColor: style.primaryColor,
                lineWidth: 1.5
              },
              {
                type: 'polyline',
                lineWidth: 3,
                closePath: true,
                points: [{x: 32, y: 27}, {x: 32, y: 45}, {x: 40, y: 36}],
                color: style.primaryColor 
              },
              {
                type: 'polyline',
                lineWidth: 3,
                closePath: true,
                points: [{x: 193, y: 27}, {x: 193, y: 45}, {x: 184, y: 36}],
                color: style.primaryColor
              }
            ],
            absolutePosition: {x: x, y: y}
          });
          b.push({
            image: 'data:image/png;base64,'+pdfMake.vfs['candycane.png'],
            width: 22,
            absolutePosition: {x: x+197, y: y+8}
          })
        } else if(style.sname=="diamond") {
          b.push({
            canvas:[
              {
                type: 'rect',
                x: 0,
                y: 0,
                w: 224,
                h: 72,
                lineColor: style.primaryColor,
                lineWidth: 1
              },
              {
                type: 'line',
                x1: 0, y1: 36,
                x2: 224, y2: 36,
                lineWidth: 9,
                lineColor: style.primaryColor,
              },
              {
                type: 'polyline',
                lineWidth: 1.5,
                closePath: true,
                points: [{x: 35, y: 27},{x: 189, y: 27},{x: 198, y: 36},{x: 189, y: 45},{x: 35, y: 45},{x: 27, y: 36}],
                lineColor: style.primaryColor,
                color: style.artistTint
              }
            ],
            absolutePosition: {x: x, y: y}
          });
        } else if(style.sname=="arrows") {
          b.push({
            canvas:[
              {
                type: 'rect',
                x: 0,
                y: 0,
                w: 224,
                h: 72,
                lineColor: style.primaryColor,
                lineWidth: 1
              },
              {
                type: 'line',
                x1: 0, y1: 36,
                x2: 224, y2: 36,
                lineWidth: 9,
                lineColor: style.primaryColor,
              },
              {
                type: 'rect',
                x: 32.5,
                y: 27,
                w: 160,
                h: 18,
                color: style.artistTint,
                lineColor: style.primaryColor,
                lineWidth: 1.5
              },
              {
                type: 'polyline',
                lineWidth: 3,
                closePath: true,
                points: [{x: 32, y: 27}, {x: 32, y: 45}, {x: 40, y: 36}],
                color: style.primaryColor 
              },
              {
                type: 'polyline',
                lineWidth: 3,
                closePath: true,
                points: [{x: 193, y: 27}, {x: 193, y: 45}, {x: 184, y: 36}],
                color: style.primaryColor
              }
            ],
            absolutePosition: {x: x, y: y}
          });
        }
	      /*
	if(true){
          b.push({
            image: 'data:image/png;base64,'+pdfMake.vfs['star.png'],
            width: 12,
            absolutePosition: { x:x, y:y+30 }
          });
	}
	*/
      }
      return b;
    },
    buildTable: function(titles,last,columns,rows){
      var b=[];
      for(i=0;i<rows&&i<titles.length;i++){
        var t=titles[i];
        var x=[{
          text: ((titles.length>i) ? t.aside : ''),
          margin:[t.style.margins,((t)?t.style.font.margins.aside:0),t.style.margins,0],
          border: [false, false, false, false],
          fillColor:t.style.titleTint,
          font:t.style.font.name,
          fontSize:t.style.font.titleSize,
          bold:true
        }];
        var y=[{
          text: ((titles.length>i) ? t.artist : ''),
          margin:[t.style.margins,((t)?t.style.font.margins.artist:0),t.style.margins,0],
          border: [false, false, false, false],
          fillColor:t.style.titleTint,
          font:t.style.font.name,
          fontSize:t.style.font.artistSize,
          bold:true
        }];
        var z=[{
          text: ((titles.length>i) ? t.bside : ''),
          margin:[t.style.margins,((t)?t.style.font.margins.bside:0),t.style.margins,0],
          border: [false, false, false, false],
          fillColor:t.style.titleTint,
          font:t.style.font.name,
          fontSize:t.style.font.titleSize,
          bold:true
        }];
        if(columns==2) {
          t=((titles.length>i+rows)?titles[i+rows]:false);
          x.push({
            text: ((t) ? t.aside : ''),
            margin:((t)?[t.style.margins,t.style.font.margins.aside,t.style.margins,0]:[0,0,0,0]),
            border: [false, false, false, false],
            fillColor:((t)?t.style.titleTint:false),
            font:((t)?t.style.font.name:false),
            fontSize:((t)?t.style.font.titleSize:0),
            bold:true
          });
          y.push({
            text: ((t) ? t.artist : ''),
            margin:((t)?[t.style.margins,t.style.font.margins.artist,t.style.margins,0]:[0,0,0,0]),
            border: [false, false, false, false],
            fillColor:((t)?t.style.titleTint:false),
            font:((t)?t.style.font.name:false),
            fontSize:((t)?t.style.font.artistSize:0),
            bold:true
	  });
          z.push({
            text: ((t) ? t.bside : ''),
            margin:((t)?[t.style.margins,t.style.font.margins.bside,t.style.margins,0]:[0,0,0,0]),
            border: [false, false, false, false],
            fillColor:((t)?t.style.titleTint:false),
            font:((t)?t.style.font.name:false),
            fontSize:((t)?t.style.font.titleSize:0),
            bold:true
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
        'pageBreak':((last===false) ? 'after' : '')
      }
    },
    buildPages: function(ts,columns=2,rows=10) {
      var p=[];
      var last=false;
      var tx=titleCreator.getTitles(true);
      var titles=[];
      if(ts.length>0) {
        ts.forEach(function(t){
          titles.push(tx[t]);
        });
      } else {
        titles=tx;
      }
      while(titles.length>0) {
        var page=titles.splice(0,rows*columns);
        if(titles.length==0) last=true;
        if(titleCreator.getPaperType()=="letter")
          p.push(this.buildCanvases(page));
        p.push(this.buildTable(page,last,columns,rows));
      }
      return p;
    },
    getDocument: function(titles) {
      var c = {
        content: this.buildPages(titles),
        pageSize:'LETTER',
        pageMargins: [ 81, 22.5, 0, 0 ]
      }
      return c;
    },
    single12:function(titles){
      var columns=1,
          rows=12;
      var c = {
        content: this.buildPages(titles,columns,rows),
        pageSize:{width:225, height: 936},
        pageMargins: [ 0, 31.5, 0, 0 ],
        pageSize:'LEGAL',
        pageMargins: [ 193.5, 31.5, 0, 0 ]
      }
      return c; 
    },
    double10:function(titles){
      var columns=2,
          rows=5;
      var c = {
        content: this.buildPages(titles,columns,rows),
        pageSize:'LETTER',
        pageMargins: [ 81, 22.5, 0, 0 ]
      }
      return c; 
    },
    formatTitles: function(titles) {
      $('body').append(crel('span',{'style':'font-family:Arial;font-size:10.5pt;font-weight:bold;display:none','id':'text-sizer'}));
      var toArray=false;
      if(!Array.isArray(titles)) {
        titles=[titles];
        toArray=true;
      }
      titles.forEach(function(e){
        e.style=titleCreator.getStyle(((e.style)?e.style:false));

        var k=['primaryColor','font','allCaps','quotes','titleFillColor','artistFillColor'];
        k.forEach(function(key){
          if(e.hasOwnProperty(key)) {
            e.style[key]=e[key];
            if(key=='titleFillColor')
              if(e.titleFillColor)
                e.style.titleTint=shadeColor2(e.style.primaryColor,0.8);
              else
                e.style.titleTint='#ffffff';
            if(key=='artistFillColor')
              if(e.artistFillColor)
                e.style.artistTint=shadeColor2(e.style.primaryColor,0.8);
              else
                e.style.artistTint='#ffffff';
          }
          delete(e[key]);
        });
        e.style.font=titleCreator.getFont(((e.font)?e.font:titleCreator.getOptions('font')));

        var awrap=false,bwrap=false;
        if(e.allCaps || (e.allCaps==null && e.style.allCaps)) {
          e.aside=e.aside.toUpperCase();
          e.bside=e.bside.toUpperCase();
          e.artist=e.artist.toUpperCase();
        }
        $('#text-sizer').css('font-family',e.style.font.name);

        if(e.aside.indexOf('/')==-1 && (e.aside.lastIndexOf('(')>0 || e.aside.indexOf(')')<e.aside.length<1)) {
          var x=e.aside.split("(");
          if(e.aside.indexOf('(')==0)
            x.join(")\n");
          else
            x=x.join("\n(");
          w=$('#text-sizer').html(x.replace('\n','<br>')).width();
          if(w<=e.style.maxwidth) //if the name is too long (with the break around parenthases) then ignore the break (best chance of getting it in two lines)
            e.aside=x;
          awrap=true;
        } else {
          if(e.aside.indexOf('/')>=1) {
            e.aside=e.aside.replace('/',"\n");
	    awrap=true;
          } else {
            w=$('#text-sizer').text(e.aside).width();
            if(w>e.style.maxwidth) awrap=true;
          }
	}

        if(e.bside.indexOf('/')==-1 && (e.bside.lastIndexOf('(')>0 || e.bside.indexOf(')')<e.bside.length<1)) {
          var x=e.bside.split("(");
          if(e.bside.indexOf('(')==0)
            x.join(")\n");
          else
            x=x.join("\n(");
          w=$('#text-sizer').html(x.replace('\n','<br>')).width();
          if(w<=e.style.maxwidth) //if the name is too long (with the break around parenthases) then ignore the break (best chance of getting it in two lines)
            e.bside=x;
          bwrap=true;
        } else {
          if(e.bside.indexOf('/')>=1) {
            e.bside=e.bside.replace('/',"\n");
	    bwrap=true;
          } else {
            w=$('#text-sizer').text(e.bside).width();
            if(w>e.style.maxwidth) bwrap=true;
          }
	}

        if(e.style.quotes || (e.quotes==null && e.style.quotes)) {
          e.aside='"'+e.aside.trim()+'"';
          e.bside='"'+e.bside.trim()+'"';
        }

        e.style.font.margins={
	  aside:e.style.font.margins.aside[((awrap)?0:1)],
	  artist:e.style.font.margins.artist[0],
	  bside:e.style.font.margins.bside[((bwrap)?0:1)]
        }

      });
      $('#text-sizer').remove();

      if(toArray) titles=titles[0];
      return titles;
    }
  },
  start:function(titles) {
    var dd={};
    switch(this.getPaperType()) {
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
  getPaperType:function(){
    return this.options.paperType;
  },
  getOptions:function(x=false){
    if(!titleCreator.options.hasOwnProperty('primaryColor')) this.options.primaryColor='#ff0000';
    if(!titleCreator.options.hasOwnProperty('artistFillColor')) this.options.artistFillColor='false';
    if(!titleCreator.options.hasOwnProperty('titleFillColor')) this.options.titleFillColor='false';
    if(!titleCreator.options.hasOwnProperty('font')) this.options.font='Retro';
    if(!titleCreator.options.hasOwnProperty('paperType')) this.options.paperType='letter';
    if(this.options.paperType=='standard') this.options.paperType='letter'
    if(x && this.options.hasOwnProperty(x))
      return this.options[x];
    return this.options;
  },
  getFont:function(f){
    return JSON.parse(JSON.stringify(titleCreator.fonts[f]))
  },
  getStyle:function(t){
    var o=this.getOptions();
    var s=JSON.parse(JSON.stringify(this.styles[((t)?t:o.style)]));
    if(o.paperType!='letter') {
      s.artistTint='#ffffff';
      s.titleTint='#ffffff';
      s.primaryColor='#ffffff';
    } else {
      if(!s.hasOwnProperty('artistTint'))
        s.artistTint=((o.artistFillColor) ? shadeColor2(o.primaryColor,0.8) : '#ffffff');
      if(!s.hasOwnProperty('titleTint'))
        s.titleTint=((o.titleFillColor) ? shadeColor2(o.primaryColor,0.8) : '#ffffff');
      if(!s.hasOwnProperty('primaryColor'))
        s.primaryColor=o.primaryColor;
    }
    var k=Object.keys(o);
    k.forEach(function(key){
      if(key!='paperType' && key!='style')
        if(!s.hasOwnProperty(key)) s[key]=o[key];
    });
    return s;
  },
  setOption:function(option,value){
    this.options[option]=value;
    localStorage.setItem('options',JSON.stringify(this.getOptions()));
  },
  reset:function(){
    titleCreator.titles={};
    localStorage.removeItem('titles');
    window.location.reload();
  },
  getTitles:function(formatted=false){
    var t=JSON.parse(JSON.stringify(titleCreator.titles));
    if(formatted)
      return this.functions.formatTitles(t);
    return t;
  },
  getTitle:function(id=false,formatted=false){
    var t=JSON.parse(JSON.stringify(titleCreator.titles));
    var found = false;
    if(!jQuery.isEmptyObject(t)) {
      found=t.find(function(e) {
        return e.id==id;
      });
    }
    if(id===false) {
      found={
        id:0,
        artist: 'Artist',
        aside: 'A-Side',
        bside: 'B-Side',
        artistb: ''
      }
    }
    if(formatted && found)
      return this.functions.formatTitles(found);
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
    titleCreator.titles[item.id]=item;
    this.saveTitles();
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
