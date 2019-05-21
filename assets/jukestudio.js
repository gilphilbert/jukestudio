//----- HELPER FUNCTIONS
function startApp() {
  //add vfs fonts to the main page
  var style = document.createElement('style');
  style.type = 'text/css';
  var frag=document.createDocumentFragment();
  for(var key in pdfMake.vfs) {
    if(pdfMake.vfs.hasOwnProperty(key) && key.indexOf('.ttf')>0) {
      style.append('@font-face {font-family: '+key.substr(0,key.length-4)+';src: url(data:font/ttf;base64,'+pdfMake.vfs[key]+');}');
       frag.appendChild(crel('option',{'value':key.substr(0,key.length-4),'style':'font-family:'+key.substr(0,key.length-4)},key.substr(0,key.length-4)));
    }
  }
  document.getElementById('design-font').appendChild(frag);
  document.getElementsByTagName('head')[0].appendChild(style);

  //populate the list of styles from titleCreator
  var f1=document.createDocumentFragment(),f2=document.createDocumentFragment();
  var keys=Object.keys(titleCreator.styles);
  keys.forEach(function(key){
    f1.appendChild(crel('option',{'value':key},titleCreator.styles[key].name))
    f2.appendChild(crel('option',{'value':key},titleCreator.styles[key].name))
  });
  document.getElementById('design-style').appendChild(f1);
  document.getElementById('title-style').appendChild(f2);

  //load the titles into the app
  var titles=titleCreator.getTitles();
  if(titles.length>0)
    addRow(titles);
  else
    document.querySelector('#record-table tbody').append(crel('tr',{'id':'no-records'},crel('td',{'colspan':'4','class':'is-center'},'no records! add a record to get started')));

  //only show the welcome screen the first time you visit
  if(!localStorage.getItem('welcome-hidden'))
    document.getElementById('welcome-modal').classList.add('is-active');
}

function toggleModal(id,dataID=null) {
  var m=document.getElementById(id);
  if(m.classList.contains('is-active')) {
    m.classList.remove('is-active');
    m.removeAttribute('data-id')
  } else {
    m.classList.add('is-active');
    if(dataID!==null)
      m.setAttribute('data-id',dataID)
  }
}

function addRow(content=null){
  if(content==null) return;

  var row;
  var fragment=document.createDocumentFragment();

  if(content.constructor!==Array)
    content=[content];

  var i;
  for(i=0;i<content.length;i++) {
    row=crel('tr',{'class':'is-compact','data-id':content[i].id},
      crel('td',{'class':'is-middle'},
        crel('div',{'class':'field'},
          crel('input',{'class':'is-checkradio print-check','data-id':content[i].id,'id':'printcheck'+content[i].id,'type':'checkbox'}),
          crel('label',{'for':'printcheck'+content[i].id})
        )
      ), //td
      crel('td',{'class':'aside'},
        crel('p',
          crel('strong',content[i].aside)
        ),
        crel('p',
          crel('small',content[i].artist)
        )
      ), //td
      crel('td',{'class':'bside'},
        crel('p',
          crel('strong',content[i].bside)
        ),
        crel('p',
          crel('small',((content[i].artistb=='')?content[i].artist:content[i].artistb))
        )
      ), //td
      crel('td',{'class':'is-middle'},
        crel('a',{'class':'button is-small is-danger delete-button','href':'#','data-modal':'open','data-target':'delete-modal'},'delete')
      ) //td
    ); //tr
    fragment.appendChild(row);
  }

  var nr=document.querySelector('#record-table #no-records');
  if(nr!==null) nr.remove();

  document.querySelector('#record-table tbody').appendChild(fragment);
}

function removeRow(id) {
  var row=document.querySelector('#record-table tr[data-id="'+id+'"]');
  row.parentNode.removeChild(row);
  if(document.querySelector('#record-table tbody tr')==null)
    document.querySelector('#record-table tbody').innerHTML='<tr id="no-records"><td colspan=4 class="is-center">no records! add a record to get started</td></tr>';
}

function addSVGText(g,text,options) {
  var newText = document.createElementNS('http://www.w3.org/2000/svg',"text");
  if(Array.isArray(text)) {
    text.forEach(function(t,i){
       var tsp = document.createElementNS('http://www.w3.org/2000/svg',"tspan");
       tsp.setAttributeNS(null,'x',options["x"]);
       if(i>0)
        tsp.setAttributeNS(null,'dy','10px');
      var tn=document.createTextNode(t);
      tsp.appendChild(tn);
      newText.appendChild(tsp);
    });
    options["y"]=options["y"]-7;
  } else {
    var textNode = document.createTextNode(text);
    newText.appendChild(textNode);

    var k=Object.keys(options);
     k.forEach(function(key) {
       newText.setAttributeNS(null,key,options[key]);
     });
     g.append(newText);
   }
}

function stringBreaker(str,style) {
  var ts=document.body.appendChild(crel('span',{'style':'font-family:'+style.font.name+';font-size:'+style.font.titleSize+'px;font-weight:bold;position:absolute;left:0;top:0','id':'text-sizer'}));
  ts.innerText=str;
  if(ts.offsetWidth>(225-(style.margins*2))) {
    var x=str.split(" ");
    ts.innerText='';
    var i=0;
    for(i=0;i<x.length;i++) {
      ts.innerText=ts.innerText+(((i>0)?' ':'')+x[i]);
      if(ts.offsetWidth>(225-(style.margins*2))) {
        i=i-1;
        break;
      }
    }
    tt=[x.splice(i).join(" ")];
    x=x.join(" ");
    tt.unshift(x);
    str=tt;
    delete tt;
  }
  //ts.remove();
  return str;
}
function alterSVGText(img,text) {
  document.querySelector('#'+img+' .aside').textContent=text.sidea;
  document.querySelector('#'+img+' .bside').textContent=text.sideb;
  document.querySelector('#'+img+' .artist').textContent=text.artist;
}
function buildPreview(img,o) {
  img=document.getElementById(img);
  var imgID = img.id;
  var imgClass = img.classList;
  parser = new DOMParser();
  data=parser.parseFromString(atob(pdfMake.vfs[o.style.style+'.svg']),"text/xml");
  var svg = data.querySelector('svg');
  if(typeof imgID !== 'undefined') {
    svg.id=imgID;
  }
  for(var i=0;i<imgClass.length;i++) svg.classList.add(imgClass[i]);
  svg.classList.add('replaced-svg');
  svg.removeAttribute('xmlns:a');
  if(!svg.getAttribute('viewBox') && svg.getAttribute('height') && svg.getAttribute('width')) {
    svg.setAttribute('viewBox', '0 0 ' + svg.getAttribute('height') + ' ' + svg.getAttribute('width'))
  }

  if(!o.artistTint) {
    o.style.artistTint=((o.style.artistFillColor)?shadeColor2(o.style.primaryColor,0.8):'#ffffff');
    o.style.titleTint=((o.style.titleFillColor)?shadeColor2(o.style.primaryColor,0.8):'#ffffff');
  }
  var des=svg.querySelector('#design');
  if(des!==null) {
    des.style.fill=o.style.primaryColor;
    if(o.style.artistFillColor) svg.querySelector('#artist_fill').style.fill=o.style.artistTint;
    if(o.style.titleFillColor) svg.querySelector('#title_fill').style.fill=o.style.titleTint;
  }

  var g=svg.querySelector('g');
  var options={"x":112.5,"y":19,"text-anchor":"middle","font-size":o.style.font.titleSize+"px","font-family":o.style.font.name,"class":"aside"};
  addSVGText(g,stringBreaker(o.aside,o.style),options);

  options["y"]=61;
  options["class"]="bside"
  addSVGText(g,stringBreaker(o.bside,o.style),options);

  options["y"]=37;
  options["alignment-baseline"]="central";
  options["font-size"]=o.style.font.artistSize+"px";
  options["class"]="artist"
  addSVGText(g,o.artist+((o.artistb=='')?'':' / '+o.artistb),options);

  img.replaceWith(svg);

  
};

//----- END HELPER FUNCTIONS

//----- EVENT HANDLERS

//-- GENERIC CLOSE MODAL HANDLER --//
document.querySelectorAll('.close-modal').forEach(function(e){
  e.addEventListener('click', function (event) {
    var modal=event.target.closest('.modal');
    toggleModal(modal.id);
    if(modal.id=='welcome-modal')
      localStorage.setItem('welcome-hidden',true);
    else if(modal.id=="add-record-modal")
      document.querySelectorAll('#add-record-modal input').forEach(function(e){e.value=''});
  });
});

document.querySelector('.navbar-burger').addEventListener('click', function(event) {
  event.target.classList.toggle('is-active');
  document.getElementById(event.target.dataset['target']).classList.toggle('is-active');
  console.log(event.target.dataset['target']);
});

//-- DESIGN MODAL OPENER --//
document.querySelector('.navbar .change-design').addEventListener('click', function(event) {
  event.preventDefault();
  var o=titleCreator.getOptions();
  document.getElementById('design-paper-type').value=o.paperType;
  document.getElementById('design-font').value=o.font;
  document.getElementById('design-uppercase').checked=o.allCaps;
  document.getElementById('design-quotes').checked=o.quotes;
  document.getElementById('design-style').value=o.style;
  document.getElementById('design-primary-color').value=o.primaryColor;
  document.getElementById('design-artist-fill').checked=o.artistFillColor;
  document.getElementById('design-title-fill').checked=o.titleFillColor;
  buildPreview('design-preview',titleCreator.getTitle(false,true));
  toggleModal('design-modal');
});
//-- DESIGN MODAL UPDATE SVG --//
document.querySelectorAll('#design-paper-type,#design-font,#design-uppercase,#design-quotes,#design-style,#design-primary-color,#design-artist-fill,#design-title-fill').forEach(function(e){
  e.addEventListener('change', function(event) {
    s=titleCreator.getTitle(false,true);
    s.style.allCaps=document.getElementById('design-uppercase').checked;
    s.style.artistFillColor=document.getElementById('design-artist-fill').checked;
    s.style.font.name=document.getElementById('design-font').value;
    s.style.primaryColor=document.getElementById('design-primary-color').value;
    s.style.style=document.getElementById('design-style').value;
    s.style.quotes=document.getElementById('design-quotes').checked;
    s.style.titleFillColor=document.getElementById('design-title-fill').checked;
    s.aside=((s.style.quotes)?'"':'')+((s.style.allCaps)?'SIDE A':'Side A')+((s.style.quotes)?'"':'');
    s.bside=((s.style.quotes)?'"':'')+((s.style.allCaps)?'SIDE B':'Side B')+((s.style.quotes)?'"':'');
    s.artist=((s.style.allCaps)?'ARTIST':'Artist');
    buildPreview('design-preview',s);
  });
});
//-- DESIGN MODAL SAVE --//
document.querySelector('#design-modal .save').addEventListener('click', function(event) {
  titleCreator.setOption('paperType',document.getElementById('design-paper-type').value);
  titleCreator.setOption('font',document.getElementById('design-font').value);
  titleCreator.setOption('allCaps',document.getElementById('design-uppercase').checked);
  titleCreator.setOption('quotes',document.getElementById('design-quotes').checked);
  titleCreator.setOption('style',document.getElementById('design-style').value);
  titleCreator.setOption('primaryColor',document.getElementById('design-primary-color').value);
  titleCreator.setOption('artistFillColor',document.getElementById('design-artist-fill').checked);
  titleCreator.setOption('titleFillColor',document.getElementById('design-title-fill').checked);
  toggleModal('design-modal');
});

//-- ADD RECORD OPENER --//
document.querySelector('.navbar .add-record').addEventListener('click', function(event) {
  event.preventDefault();
  document.querySelector('#add-record-modal .title-text').innerText='add record';
  var s=titleCreator.getStyle();
  document.getElementById('title-style').value=s.style;
  document.getElementById('title-primary-color').value=s.primaryColor;
  document.getElementById('title-artist-fill').checked=s.artistFillColor;
  document.getElementById('title-title-fill').checked=s.titleFillColor;
  document.getElementById('title-style-override').checked=false;
  document.querySelectorAll('#add-record-modal .box input,#add-record-modal .box select').forEach(function(e){
    if(e.id!=='title-style-override')
      e.disabled=true;
  });

  //clear the existing fields
  var mand=['add-side-a','add-side-b','add-artist', 'add-artist-b'];
  mand.forEach(function(v){ document.getElementById(v).value='' });

  var t=titleCreator.getTitle(false,true);
  t.aside='';
  t.bside='';
  t.artist='';
  buildPreview('add-record-preview',t);
  toggleModal('add-record-modal');
  document.querySelector("#add-side-a").focus();
});
function buildAddPreview() {
    s=titleCreator.getTitle(false,true);
    var art=document.getElementById('add-artist').value+((document.getElementById('add-artist-b').value=='')?'':' / '+document.getElementById('add-artist-b').value);
    s.aside=((s.style.quotes)?'"':'')+((s.style.allCaps)?document.getElementById('add-side-a').value.toUpperCase():document.getElementById('add-side-a').value)+((s.style.quotes)?'"':''),
    s.bside=((s.style.quotes)?'"':'')+((s.style.allCaps)?document.getElementById('add-side-b').value.toUpperCase():document.getElementById('add-side-b').value)+((s.style.quotes)?'"':''),
    s.artist=((s.style.allCaps)?art.toUpperCase():art)
    if(document.getElementById('title-style-override').checked) {
      s.style.primaryColor=document.getElementById('title-primary-color').value;
      s.style.style=document.getElementById('title-style').value;
      s.style.artistFillColor=document.getElementById('title-artist-fill').checked;
      s.style.titleFillColor=document.getElementById('title-title-fill').checked;
    }
    if(s.bside=='""') s.bside='';
    if(s.aside=='""') s.aside='';
    buildPreview('add-record-preview',s);
}
//-- UPDATE SVG TEXT WHEN ADD INPUTS CHANGE --//
document.querySelectorAll('#add-side-a,#add-side-b,#add-artist,#add-artist-b').forEach(function(e){
  e.addEventListener('keyup', function(event) {
    buildAddPreview();
  });
});
document.querySelectorAll('#title-style,#title-primary-color,#title-artist-fill,#title-title-fill,#title-style-override').forEach(function(e){
  e.addEventListener('change', function(event) {
    buildAddPreview();
  });
});
//-- STYLE OVERRRIDE (ADD RECORD) --//
document.getElementById('title-style-override').addEventListener('click',function(e){
  document.querySelectorAll('#add-record-modal .box input,#add-record-modal .box select').forEach(function(e){
    if(e.id!=='title-style-override')
      e.disabled=!document.getElementById('title-style-override').checked;
  });
});
document.querySelector('#add-record-modal .save').addEventListener('click',function(event) {
  var mand=['add-side-a','add-side-b','add-artist'],
      cancel=false;
  mand.forEach(function(v){
    var input=document.getElementById(v);
    if(input.value=='') {
      input.classList.add('is-danger');//.parent().addClass('has-danger').find('.invalid-feedback').text('Please enter a value');
      if(input.parentNode.querySelector('.help')==null)
        input.parentNode.appendChild(crel('p',{'class':'help is-danger'},'This field is required'));
      cancel=true;
    } else {
      input.classList.remove('is-danger');
      var h=input.parentNode.querySelector('.help');
      if(h!==null)
        h.remove();
    }
  });

  if(cancel) return false;

  var id=false;
  var dl=document.getElementById('add-record-modal').dataset;
  if(dl.hasOwnProperty('id'))
    id=dl['id'];

  var t=((id!==false)?titleCreator.getTitle(id):{});
  t.aside=document.getElementById('add-side-a').value;
  t.bside=document.getElementById('add-side-b').value;
  t.artist=document.getElementById('add-artist').value;
  t.artistb=document.getElementById('add-artist-b').value;


  if(document.getElementById('title-style-override').checked) {
    //correct formatting
    var o=titleCreator.getOptions();
    var x=document.getElementById('title-primary-color').value;
    if(x!=o.primaryColor) 
      t.primaryColor=x;
    else
      delete(t['primaryColor']);

    x=document.getElementById('title-style').value;
    if(x!=o.style) 
      t.style=x;
    else
      delete(t['style']);

    x=document.getElementById('title-artist-fill').checked;
    if(x!=o.artistFillColor) 
      t.artistFillColor=x;
    else
      delete(t['artistFillColor']);

    x=document.getElementById('title-title-fill').checked;
    if(x!=o.titleFillColor)
      t.titleFillColor=x;
    else
      delete(t['titleFillColor']);
  } else {
    delete(t['primaryColor']);
    delete(t['style']);
    delete(t['artistFillColor']);
    delete(t['titleFillColor']);
  }

  if(t.hasOwnProperty('id')) {
    titleCreator.updateTitle(t);
    var c=document.querySelector('#record-table tr[data-id="'+t.id+'"]');
    c.querySelector('.aside strong').innerText=t.aside;
    c.querySelector('.aside small').innerText=t.artist;
    c.querySelector('.bside strong').innerText=t.bside;
    c.querySelector('.bside small').innerText=((t.artistb!='')?t.artistb:t.artist);
  } else {
    t=titleCreator.addTitles([t]);
    addRow(t[0]);
  }
  toggleModal('add-record-modal');
});


document.querySelectorAll('#record-table tbody').forEach(function(e){
  e.addEventListener('click', function (event) {
    var id=event.target.closest('tr').dataset.id;
    var classList=event.target.classList;
    if(event.target.classList.contains('delete-button')) {
      event.preventDefault();
      var rd=document.querySelector('#delete-modal .record-detail');
      while(rd.firstChild) { rd.removeChild(rd.firstChild) }
      var td=event.target.parentNode.parentNode.childNodes[1].cloneNode(true);
      while(td.childNodes.length)
        rd.appendChild(td.childNodes[0]);
      toggleModal('delete-modal',id);
    } else {
      //edit the record
      document.querySelector('#add-record-modal .title-text').innerText='edit record';
      var t=titleCreator.getTitle(id);
      var s=titleCreator.getStyle();
      document.getElementById('add-side-a').value=t.aside;
      document.getElementById('add-side-b').value=t.bside;
      document.getElementById('add-artist').value=t.artist;
      document.getElementById('add-artist-b').value=t.artistb;
      var override=false;
      ['style','primaryColor','artistFillColor','titleFillColor'].forEach(function(e) {
        if(t.hasOwnProperty(e)) {
          override=true;
          switch(e) {
            case 'style': document.getElementById('title-style').value=t.style; break;
            case 'primaryColor': document.getElementById('title-primary-color').value=t.primaryColor; break;
            case 'artistFillColor': document.getElementById('title-artist-fill').checked=t.artistFillColor; break;
            case 'titleFillColor': document.getElementById('title-title-fill').checked=t.titleFillColor; break;
          }
        } else if(s.hasOwnProperty(e)) {
          switch(e) {
            case 'style': document.getElementById('title-style').value=s.style; break;
            case 'primaryColor': document.getElementById('title-primary-color').value=s.primaryColor; break;
            case 'artistFillColor': document.getElementById('title-artist-fill').checked=s.artistFillColor; break;
            case 'titleFillColor': document.getElementById('title-title-fill').checked=s.titleFillColor; break;
          }
        }
      });
      document.querySelectorAll('#style-override input, #style-override select').forEach(function(e){
        if(e.id!=='title-style-override')
          e.disabled=!override;
      });
      document.getElementById('title-style-override').checked=override;
      buildPreview('add-record-preview',titleCreator.getTitle(id,true));
      toggleModal('add-record-modal',id);

    }
  });
});


//-- DELETE RECORD --//
document.getElementById('delete-record').addEventListener('click',function(e){
  var id=document.getElementById('delete-modal').dataset.id;
  if(id!==undefined) {
    titleCreator.removeTitle(id);
    removeRow(id);
    document.getElementById('delete-modal').classList.remove('is-active'); 
  }
});


//-- PRINT --//
document.querySelector('.navbar .print-titles').addEventListener('click', function(event) {
  event.preventDefault();
  var selected=[];
  document.querySelectorAll('.print-check:checked').forEach(function(e){
    selected.push(parseInt(e.dataset.id)); 
  });
  titleCreator.start([]);
});

//-- IMPORT/EXPORT --//
document.querySelector('.navbar .import-export').addEventListener('click', function(event) {
  event.preventDefault();
  toggleModal('import-export-modal');
});

//-- EXPORT --//
document.querySelector('#export-library').addEventListener('click', function(event) {
  titleCreator.exportDB(((document.getElementById('export-csv').checked)?true:false));
});

//-- IMPORT --//
document.querySelector('#import-library').addEventListener('click', function(event) {
  document.getElementById('file-import').click();
});

document.getElementById('file-import').addEventListener('change', function(evt){
  var file = evt.target.files[0];
  if(file.name.indexOf('.csv')==-1 && file.type!="application/json") return false;

  readFile = function (file) {
    var reader = new FileReader();
    reader.onload = function (){
      var type='json';
      if(file.name.indexOf('.csv')>-1)
        type='csv'

      var rows=titleCreator.importDB(reader.result,type);
      if(rows.length) { 
        for(i=0;i<rows.length;i++)
          addRow(rows[i]);
      }
    };
    reader.readAsBinaryString(file);
  }(file);
});
//----- END EVENT HANDLERS
