window.titleCreator={
  styles: {
    arrows:{
      name:'Arrows',
      style:'arrows',
      maxwidth:265,
      margins:8,
      mergeArtist: true
    },
    diamond:{
      name:'Diamond',
      style:'diamond',
      maxwidth:265,
      margins:8,
      mergeArtist: true
    },
    multiple:{
      name:'Split Artist',
      style:'multiple',
      maxwidth:265,
      margins:8,
      mergeArtist: false
    },
    holly:{
      name:'Holly',
      style:'holly',
      artistTint:'#ffffff',
      titleTint:'#ffffff',
      primaryColor:'#ff0000',
      maxwidth:242,
      margins:22,
      mergeArtist: true
    },
    candycane:{
      name:'Candy Cane',
      style:'candycane',
      artistTint:'#ffffff',
      titleTint:'#ABDCA8',
      primaryColor:'#D3444A',
      maxwidth:242,
      margins:22,
      mergeArtist: true
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
        if(style.style=="holly") {
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
        } else if(style.style=='candycane') {
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
        } else if(style.style=="diamond") {
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
        } else if(style.style=="arrows") {
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
        } else if(style.style=="multiple") {
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
                x1: 30, y1: 36,
                x2: 194, y2: 36,
                lineWidth: 2,
                lineColor: style.primaryColor,
              }
            ],
            absolutePosition: {x: x, y: y}
          });
        }
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
        if(t.style.mergeArtist===true) {
          var y=[{
            text: ((titles.length>i) ? t.artist+((t.artistb!='')?' / '+t.artistb:''):''),
            margin:[t.style.margins,((t)?t.style.font.margins.artist:0),t.style.margins,0],
            border: [false, false, false, false],
            fillColor:t.style.titleTint,
            font:t.style.font.name,
            fontSize:t.style.font.artistSize,
            bold:true
          }];
        } else {
          x[0].margin[3]=-10;
          var y=[{
            text: ((titles.length>i) ? t.artist+'\n\n'+((t.artistb==='')?t.artist:t.artistb) : ''),
            margin:[t.style.margins,((t)?-7:0),t.style.margins,-7],
            border: [false, false, false, false],
            fillColor:t.style.titleTint,
            font:t.style.font.name,
            fontSize:t.style.font.artistSize,
            bold:true
          }];
        }
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
            text: ((t) ? t.artist+((t.artistb!='' && t.style.mergeArtist===true)?' / '+t.artistb:'') : ''),
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
      var tx=titleCreator.getTitles(true,((ts.length>0)?ts:[]));
      var titles=tx;
      while(titles.length>0) {
        var page=titles.splice(0,rows*columns);
        if(titles.length==0) last=true;
        if(titleCreator.getOptions('paperType')=="letter")
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
      var textSizer=document.body.appendChild(crel('span'));//,{'style':'font-family:Arial;font-size:10.5pt;font-weight:bold','id':'text-sizer'}));
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
          w=textSizer.offsetWidth;
          if(w<=e.style.maxwidth) //if the name is too long (with the break around parenthases) then ignore the break (best chance of getting it in two lines)
            e.aside=x;
          awrap=true;
        } else {
          //if there's a "/""
          if(e.aside.indexOf('/')>=1) {
            //e.aside=e.aside.replace('/',"\n");
            var x=trimArray(e.aside.split('/'));
            if(sq)
              for(i=0;i<x.length;i++) x[i]='"'+x[i]+'"';
	          e.aside=x.join("\n");
	          awrap=true;
          } else {
            //just a single line of text
            
            textSizer.innerHTML=e.aside;
            w=textSizer.offsetWidth;
                        console.log(w + " of "+e.style.maxwidth);
            if(w>e.style.maxwidth) awrap=true;
            if(sq) e.aside='"'+e.aside+'"';
          }
	      }

        if(e.bside.indexOf('/')==-1 && (e.bside.indexOf('(')>=0 || e.bside.indexOf(')')>=0) && !(e.bside.indexOf('(')==0 && e.bside.indexOf(')')==e.bside.length-1)) {
          var x;
          if(e.bside.indexOf(')')==e.bside.length-1) {
            x=trimArray(e.bside.split("("));
            if(sq)
              x[0]='"'+x[0]+'"';
            x=x.join("\n(");
	        } else {
            x=trimArray(e.bside.split(")"));
            if(sq)
              x[1]='"'+x[1]+'"';
            x=x.join(")\n");
          }
          textSizer.innerHTML=x.replace('\n','<br>');
          w=textSizer.offsetWidth;
          if(w<=e.style.maxwidth) //if the name is too long (with the break around parenthases) then ignore the break (best chance of getting it in two lines)
            e.bside=x;
          bwrap=true;
        } else {
          if(e.bside.indexOf('/')>=1) {
            var x=trimArray(e.bside.split('/'));
            if(sq)
              for(i=0;i<x.length;i++) x[i]='"'+x[i]+'"';
	          e.bside=x.join("\n");
	          bwrap=true;
          } else {
            textSizer.innerText=e.bside;
            w=textSizer.offsetWidth;
            if(w>e.style.maxwidth) bwrap=true;
            if(sq) e.bside='"'+e.bside+'"';
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
      return titles;
    }
  },
  start:function(titles) {
    var dd={};
    switch(this.getOptions('paperType')) {
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
  getOptions:function(x=false){
    var o=titleCreator.db.getCollection('options').findOne();
    o=stripMD(o);
    if(x && o.hasOwnProperty(x))
      return o[x];
    return o;
  },
  getFont:function(f){
    return JSON.parse(JSON.stringify(titleCreator.fonts[f]))
  },
  getStyle:function(t){
    var o=titleCreator.db.getCollection('options').findOne();
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
    s.font=this.fonts[s.font];
    return s;
  },
  setOption:function(option,value){
    var o=titleCreator.db.getCollection('options');
    var oo=o.findOne();
    if(oo.hasOwnProperty(option))
      oo[option]=value;
    o.update(oo);
    titleCreator.db.saveDatabase();
  },
  reset:function(){
    var titles=titleCreator.db.getCollection('titles');
    titles.clear();
    titleCreator.db.saveDatabase();
    window.location.reload();
  },
  getTitles:function(formatted=false,list=[]){
    var col=titleCreator.db.getCollection('titles');
    var t=false;
    if(list.length==0)
      t=col.find();
    else
      t=col.find({'id':{$in:list}});
    if(formatted)
      return this.functions.formatTitles(t);
    return t;
  },
  getTitle:function(id=false,formatted=false){
    var found=null;
    if(id===false) {
      found={
        id:0,
        artist: 'Artist',
        aside: 'Side A',
        bside: 'Side B',
        artistb: ''
      }
    } else {
      found=titleCreator.db.getCollection('titles').findOne({'id':parseInt(id)});
      found=stripMD(found);
    }

    if(formatted===true && found!==null)
      return this.functions.formatTitles(found);
    return found;
  },
  addTitles:function(i){
    var titles=titleCreator.db.getCollection('titles');
    var o=[];
    i.forEach(function(v){
      o.push(titles.insert(v));
    });
    titleCreator.db.saveDatabase();
    return o;
  },
  removeTitle:function(id){
    id=parseInt(id);
    var titles=titleCreator.db.getCollection('titles');
    var r=titles.findOne({'id':id});
    titles.remove(r);
    titleCreator.db.saveDatabase();
  },
  updateTitle:function(inItem){
    var titles=titleCreator.db.getCollection('titles');
    var dbItem=titles.findOne({'id':parseInt(inItem.id)});
    var k=Object.keys(inItem);
    k.forEach(function(key){
      if(key!=='id')
        dbItem[key]=inItem[key]
    });
    var k=Object.keys(dbItem);
    k.forEach(function(key){
       if(key!='$loki' && key!='meta') {
        if(!inItem.hasOwnProperty(key)) {
          delete(dbItem[key]);
        }
      }
    });
    titles.update(dbItem);
    titleCreator.db.saveDatabase();
  },
  exportDB:function(csv=false) {
    var data='',
        ext='';
    if(csv) {
      //export CSV
      data="data:text/csv;charset=utf-8,";
      var titles=this.getTitles();
      titles.forEach(function(t){
        data+=t.aside+','+t.bside+','+t.artist+','+t.artistb+"\r\n";
      });
      ext='csv';
    } else {
      //export JSON
      data="data:text/json;charset=utf-8,";
      data+=encodeURIComponent(this.db.serialize());
      ext='json';
    }

    var a=document.createElement('a');
    a.setAttribute('href', data);
    a.setAttribute('download','jukestudio.'+ext);
    document.body.appendChild(a);
    a.click();
    a.remove();
  },
  importDB:function(data,type) {
    var out=[];
    if(type=='csv') {
      var lines=data.split('\r\n');
      var inTitles=[];
      lines.reverse;
      lines.forEach(function(line){
        var fields=line.split(',');
        if(fields.length>=3) {
          inTitles.push({aside:fields[0],bside:fields[1],artist:fields[2],artistb:((fields.length==4)?fields[3]:'')});
        }
      });
      if(inTitles!=[])
        out=this.addTitles(inTitles);

    } else {
      var ob=JSON.parse(data);
      if(ob.filename=='jukestudio.db') {
        titleCreator.db.loadJSONObject(ob);
        titleCreator.db.saveDatabase();
        out=titleCreator.db.getCollection("titles").data;
      }
    }
    return out;
  },
  loadDB:function(){
    titleCreator.db=new loki("jukestudio.db",{
      autoload: true,
      autoloadCallback : databaseInitialize
    });
  }
}

function databaseInitialize() {
  //if creating, trigger the import action
  var titles=titleCreator.db.getCollection("titles");
  if (titles===null) {
    titles=titleCreator.db.addCollection("titles",{'clone':true});
    options=titleCreator.db.addCollection("options",{'clone':true});
    importLocalStorage(titles,options);
  }
  titles.addListener('insert',function(input){ input.id=input.$loki; titleCreator.db.getCollection('titles').update(input); });

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

  startApp();
}


function importLocalStorage(titles,options) {
  //import the old titles
  var oldTitles=localStorage.getItem('titles');
  if(oldTitles!==null) {
    JSON.parse(oldTitles).forEach(function(e){
       titles.insert(e);
    });
    localStorage.removeItem('titles')
  }

  //import the old options
  var oldOptions=localStorage.getItem('options');
  if(oldOptions!==null) {
    oldOptions=JSON.parse(oldOptions)
    options.insert(oldOptions);
  } else {
    options.insert({
      allCaps:true,
      quotes:true,
      primaryColor:'#ff0000',
      artistFillColor:false,
      titleFillColor:false,
      font:'Retro',
      style:'arrows',
      paperType:'letter'
    });
  }
  localStorage.removeItem('options')
  titleCreator.db.saveDatabase();
}


function shadeColor2(color, percent) {   
  var f=parseInt(color.slice(1),16),t=percent<0?0:255,p=percent<0?percent*-1:percent,R=f>>16,G=f>>8&0x00FF,B=f&0x0000FF;
  return "#"+(0x1000000+(Math.round((t-R)*p)+R)*0x10000+(Math.round((t-G)*p)+G)*0x100+(Math.round((t-B)*p)+B)).toString(16).slice(1);
}
function trimArray(arr) {
  for(i=0;i<arr.length;i++)
    arr[i]=arr[i].trim();
  return arr;
}
function stripMD(results) {
  var record={}
  var keys=Object.keys(results);
  for(i=0;i<keys.length;i++) {
    if(keys[i]!=='$loki' && keys[i]!=='meta')
      record[keys[i]]=results[keys[i]]
  }
  return record
}
