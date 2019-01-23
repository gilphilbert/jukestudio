    $(document).ready(function(){
    
      function addRow(content=null){
        if(content==null) return;

        var html=crel('tr',{'class':'title','data-id':content.id},
          crel('td',
            crel('input', {'type':'checkbox', 'class':'print-check', 'data-id':content.id}),
          ),
	  crel('td',{'class':'aside'},content.aside),
          crel('td',{'class':'bside'},content.bside),
          crel('td',{'class':'artist'},content.artist + ((content.artistb!='' && content.artistb!=null) ? ' / '+content.artistb : '')),
          crel('td',
            crel('a',{'href':'#','class':'delete-title text-danger'},
              crel('i',{'class':'fa fa-trash-alt','aria-hidden':'true'})
            )
          )
        );
        $('#titles tbody').append(html);
      }

      function exportLibrary(csv=false) {
        var out={
          titles:titleCreator.getTitles(),
          options:titleCreator.getOptions()
        }

        var data="",
            filename="";

        if(csv==false) {
          data="data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(out));
          filename="jukestudio.json";
        } else {
          data = "data:text/csv;charset=utf-8,";
          out.titles.forEach(function(a){
            data+=a.aside+','+a.bside+','+a.artist+'\r\n';
          });
          filename="jukestudio.csv"
        }
        var a=document.createElement('a');
        a.setAttribute("href", data);
        a.setAttribute("download",filename);
        document.body.appendChild(a);
        a.click();
        a.remove();
      }

      $('#hidden-file').on('change',function(evt){
        var file = evt.target.files[0];
        if(file.name.indexOf('.csv')==-1 && file.type!="application/json") return false;

        readFile = function (file) {
          var reader = new FileReader();
          reader.onload = function () {

            var d=[];
            if(file.name.indexOf('.csv')>-1) {
              var ar=reader.result.split('\r\n');
              ar.reverse;
              ar.forEach(function(e){
                var b=e.split(',');
                if(b.length==3) {
                  d.push({aside:b[0],bside:b[1],artist:b[2]});
                }
              });
            } else {
              var ob=JSON.parse(reader.result);
              if(ob.hasOwnProperty('options') && ob.hasOwnProperty('titles')) {
                titleCreator.options=ob.options; //should fix this
                ob.titles.forEach(function(e){
                  if(e.hasOwnProperty('aside') && e.hasOwnProperty('bside') && e.hasOwnProperty('artist'))
                    var h=0;
                });
                d=ob.titles;
              }
            }
            $('#export-modal').modal('hide');
            d=titleCreator.addTitles(d);
	    $('#titles tr#no-records').remove();
            d.forEach(function(title){
              addRow({aside:title.aside,bside:title.bside,artist:title.artist,artistb:'',id:title.id});
            });
          };
          reader.readAsBinaryString(file);
        }(file);
      });
      
      $('#export').on('click',function(e) {
        exportLibrary($('#export-titles').prop('checked'));
      });

      $('#add-modal').on('shown.bs.modal', function() {
        $("#add-side-a").focus();
      }).on('hidden.bs.modal', function() {
        $('#add-modal input').val('');
      })
      $('#add-modal .save').on('click',function(e){
        e.preventDefault();
        var mand=['add-side-a','add-side-b','add-artist'],
            cancel=false;
        mand.forEach(function(v){
          $input=$('#'+v);
          if($($input).val()=='') {
            $($input).addClass('is-invalid').parent().addClass('has-danger').find('.invalid-feedback').text('Please enter a value');
            cancel=true;
          } else
            $($input).removeClass('is-invalid').parent().removeClass('has-danger').find('.invalid-feedback').text('');
        });
        if(cancel)
          return false;

        var t={
          aside:$('#add-side-a').val(),
          bside:$('#add-side-b').val(),
          artist:$('#add-artist').val(),
          artistb:$('#add-artist-b').val()
        };

        var o=titleCreator.getOptions();
        if($('#title-primaryColor').val()!=o.primaryColor) 
          t.primaryColor=$('#title-primaryColor').val();
        else
          delete(t['primaryColor']);

        if($('#title-style').val()!=o.style) 
          t.style=$('#title-style').val();
        else
          delete(t['style']);

        if($('#title-artistFillColor').prop('checked')!=o.artistFillColor) 
          t.artistFillColor=$('#title-artistFillColor').prop('checked');
        else
          delete(t['artistFillColor']);

        if($('#title-titleFillColor').prop('checked')!=o.titleFillColor)
          t.titleFillColor=$('#title-titleFillColor').prop('checked');
        else
          delete(t['titleFillColor']);

        if($('#add-modal').data('editID')==undefined) {
          t=titleCreator.addTitles([t]);
        } else {
          var id=$('#add-modal').data('editID');
          $('#add-modal').removeData('editID');
          t.id=id;
          titleCreator.updateTitle(t);
          $cells=$('table tbody tr[data-id='+id+'] td');
          $cells.each(function(i,v){
            if($(v).hasClass('aside')) $(v).text(t.aside);
            if($(v).hasClass('bside')) $(v).text(t.bside);
            if($(v).hasClass('artist')) $(v).text(t.artist+((t.artistb!=='') ? ' / '+t.artistb : ''));
          });
        }
        $('#add-modal').modal('hide');

        addRow(t[0]);
	$('#titles tr#no-records').remove();
      });

      $(document).on('click', '.title-menu-button', function(e) {
        var top = e.pageY;
        var left = e.pageX;
        $("#context-menu").css({
          display: "block",
          top: top,
          left: left
        });
        $("#context-menu").data('row',$(this).parent().parent());
        return false;
      });
      $(document).on('click',function(){
        $("#context-menu").hide();
      });
      $(document).on("click", 'a.delete-title',function(e) {
        var id=$(this).closest('tr').data('id');
        $('#confirm-delete-modal').data('id',id);
        var t=titleCreator.getTitle(id);
        $('#confirm-delete-modal p.title').text(t.aside);
        $('#confirm-delete-modal p.artist').text('('+t.artist+')');
        $('#confirm-delete-modal').modal();
      });
      $('#confirm-delete-modal .btn.delete').click(function(e) {
        var id=$(this).closest('.modal').data('id');
        titleCreator.removeTitle(id);
        $('tr[data-id="'+id+'"]').remove();
        $('#confirm-delete-modal').modal('hide');
        e.preventDefault();
      });
      $(document).on("click", 'td.aside',function(e) {
        e.preventDefault();
        var id=$(this).closest('tr').data('id');
	openEdit(id);
      });
      $(".open-add-modal").on("click", function(e) {
	$('#add-modal .modal-header .title').text('Add record');
        $('#add-modal').modal();
      });

      $('#write-document').on('click',function(e) {
        e.preventDefault();
        //need to send an array of ids to print
        var tp=[];
	$x=$('.print-check').each(function(i,v) {
          if($(v).is(":checked"))
            tp.push($(v).data('id'));
        });
        window.titleCreator.start(tp);
      });

      $('#options-clear').on('click',function(e) {
        e.preventDefault();
        $('#titles tbody').empty();
        window.titleCreator.reset();
      });
      
      $('#option-paperType').on('change',function(e){
        e.preventDefault();
	//set note to use LEGAL not letter
        if($(this).val()=='single12')
          $('#paperType-message').html('<small><strong>Note:</strong> For these strips, make sure you set the paper type to LEGAL when printing</small>');
        else
          $('#paperType-message').text('');
        //only enable valid options depending on paperType (letter paper needs designs, others are pre-printed)
        if($(this).val()=='letter') {
          $('.onlyplain').attr('disabled',false);
          $('#option-style').change(); //update the preview
	} else {
          $('.onlyplain').attr('disabled',true);
          if(($("#options-modal").data('bs.modal') || {})._isShown) {
	    inlineSVG($('#design-preview'),'images/designs/plain.svg');
          }
        }
      });

      $('#option-style').on('change',function(e){
        e.preventDefault();
        if($(this).val()=='holly' || $(this).val()=='candycane')
          $('.nocolor').attr('disabled',true);
        else
          $('.nocolor').attr('disabled',false);

      });

      $('#option-artistFillColor, #option-titleFillColor, #option-primaryColor, #option-style, #option-font, #option-uppercase, #option-quotes').on('change',function(e) {
        e.preventDefault();
        if(($("#options-modal").data('bs.modal') || {})._isShown) {
	  inlineSVG($('#design-preview'),'images/designs/'+$('#option-style').val()+'.svg');
        }
      });

      $('#title-artistFillColor, #title-titleFillColor, #title-primaryColor, #title-style').on('change',function(e) {
        e.preventDefault();
        if(($("#add-modal").data('bs.modal') || {})._isShown) {
          var title=titleCreator.getTitle($('#add-modal').data('editID'),true)
          title.style.primaryColor=$('#title-primaryColor').val();
          var tint=shadeColor2(title.style.primaryColor,0.8);
          title.style.artistTint=(($('#title-artistFillColor').prop('checked'))?tint:'#ffffff');
          title.style.titleTint=(($('#title-titleFillColor').prop('checked'))?tint:'#ffffff');
	  inlineSVG($('#title-preview'),'images/designs/'+$('#title-style').val()+'.svg',title);
        }
      });

      $('#menu-options').on('click',function(e) {
        e.preventDefault();
        var options=window.titleCreator.getOptions();
        $('#option-uppercase').prop('checked',options.allCaps);
        $('#option-quotes').prop('checked',options.quotes);
        $('#option-artistFillColor').prop('checked',options.artistFillColor);
        $('#option-titleFillColor').prop('checked',options.titleFillColor);
        $('#option-primaryColor').val(options.primaryColor);
        $('#option-paperType').val(options.paperType);
        $('#option-font').val(options.font);
        $('#option-style').val(options.style);
        $('#option-paperType').change(); //sets note correctly
        $('#option-style').change(); //sets note correctly

	inlineSVG($('#design-preview'),'images/designs/'+options.style+'.svg');

        $('#options-modal').modal();
      });

      $('.btn.save-options').on('click',function(e){
        e.preventDefault();
        window.titleCreator.setOption('allCaps',$('#option-uppercase').prop('checked'));
        window.titleCreator.setOption('quotes',$('#option-quotes').prop('checked'));
        window.titleCreator.setOption('primaryColor',$('#option-primaryColor').val());
        window.titleCreator.setOption('paperType',$('#option-paperType').val());
        window.titleCreator.setOption('artistFillColor',$('#option-artistFillColor').prop('checked'));
        window.titleCreator.setOption('titleFillColor',$('#option-titleFillColor').prop('checked'));
        window.titleCreator.setOption('font',$('#option-font').val());
        window.titleCreator.setOption('style',$('#option-style').val());
        $('#options-modal').modal('hide');
      });
      
      $('#menu-export').on('click',function(e) {
        e.preventDefault();
        $('#export-modal').modal();
      });
      
      var titles=titleCreator.getTitles();
      if(titles.length>0) {
        titles.forEach(function(e){
          addRow(e);
        });
      } else {
        $('#titles tbody').append('<tr id="no-records"><td colspan=4 class="text-center">No records<br>Click <img src="images/record-dark.svg" style="height:20px"> to add a record</td></tr>');
      }

      function openEdit(id) {
        var title=titleCreator.getTitle(id);
        $('#add-modal input#add-side-a').val(title.aside);
        $('#add-modal input#add-side-b').val(title.bside);
        $('#add-modal input#add-artist').val(title.artist);
        $('#add-modal input#add-artist-b').val(title.artistb);
        $('#add-modal').data('editID',id);
	$('#add-modal .modal-header .title').text('Edit record');
        //get the default options
        var o=titleCreator.getOptions();
        //set correct values for style settings
        $('#title-primaryColor').val(((title.primaryColor))?title.primaryColor:o.primaryColor);

        var afc=((title.hasOwnProperty('artistFillColor'))?title.artistFillColor:o.artistFillColor);
        $('#title-artistFillColor').prop('checked',afc);

        var tfc=((title.hasOwnProperty('titleFillColor'))?title.titleFillColor:o.titleFillColor);
        $('#title-titleFillColor').prop('checked',tfc);

        //get the name of the style for this title
        var s=((title.style)?title.style:o.style);
        inlineSVG($('#title-preview'),'images/designs/'+s+'.svg',titleCreator.getTitle(id,true));
        $('#title-style').val(s);
	$('#add-modal').modal();
      }

      function addSVGText($g,text,options) {
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
	}
	var k=Object.keys(options);
        k.forEach(function(key) {
          newText.setAttributeNS(null,key,options[key]);
        });
        $g.append(newText);
      }

      function stringBreaker(string,style) {
        $('body').append(crel('span',{'style':'font-family:'+style.font.name+';font-size:'+style.font.titleSize+'px;font-weight:bold;display:none','id':'text-sizer'}));
        $('#text-sizer').text(string);
        if($('#text-sizer').width()>(225-(style.margins*2))) {
          var x=string.split(" ");
          $('#text-sizer').text('');
          var i=0;
          for(i=0;i<x.length;i++) {
            $('#text-sizer').append(((i>0)?' ':'')+x[i]);
            if($('#text-sizer').width()>(225-(style.margins*2))) {
              i=i-1;
              break;
            }
          }
          tt=[x.splice(i).join(" ")];
          x=x.join(" ");
          tt.unshift(x);
          string=tt;
          delete tt;
        }
        $('#text-sizer').remove();
        return string;
      }

      function buildPreview($svg,text=false,o=false) {
        var tint=shadeColor2($('#option-primaryColor').val(),0.8);
	if(text===false) {
          text=titleCreator.getTitle(0,true)||titleCreator.getTitle(false,true);
          text.style.primaryColor=$('#option-primaryColor').val();
          text.style.font=titleCreator.getFont($('#option-font option:selected').text());
          text.style.allCaps=$('#option-uppercase').is(":checked");
          text.style.quotes=$('#option-quotes').is(":checked");
          text.style.titleTint=(($('#option-titleFillColor').is(':checked'))?tint:'#ffffff');
          text.style.artistTint=(($('#option-artistFillColor').is(':checked'))?tint:'#ffffff');
        }

        //color the design
        $svg.find('#design').css('fill',text.style.primaryColor);
        $svg.find('#artist_fill').css('fill',text.style.artistTint);
        $svg.find('#title_fill').css('fill',text.style.titleTint);


        //now check the song titles and split them if needed
	      ////////////////////////--------------------------------------------
        text.aside=stringBreaker(text.aside,text.style);
        text.bside=stringBreaker(text.bside,text.style);
        //will need to do manually, create the text object and add words (use string.split(' ')) until it's too wide then split on previous word
	      ////////////////////////--------------------------------------------

	//get the content of the SVG
	var $g=$svg.find('g');

	//now add the text objects
	var options={"x":112.5,"y":19,"text-anchor":"middle","font-size":text.style.font.titleSize+"px","font-family":text.style.font.name,"class":"aside"}
        addSVGText($g,text.aside,options);

        options["y"]=61;
        options["id"]="bside"
        addSVGText($g,text.bside,options);

        options["y"]=37;
        options["alignment-baseline"]="central";
        options["font-size"]=text.style.font.artistSize+"px";
        options["id"]="artist"
        addSVGText($g,text.artist,options);
      }

      function inlineSVG($img,file,text=false,o) {
        var imgID = $img.attr('id');
        var imgClass = $img.attr('class');
        var imgURL=file;
        jQuery.get(imgURL, function(data) {
          var $svg = jQuery(data).find('svg');
          if(typeof imgID !== 'undefined') {
            $svg = $svg.attr('id', imgID);
          }
          if(typeof imgClass !== 'undefined') {
            $svg = $svg.attr('class', imgClass+' replaced-svg');
            $svg = $svg.removeAttr('xmlns:a');
            if(!$svg.attr('viewBox') && $svg.attr('height') && $svg.attr('width')) {
              $svg.attr('viewBox', '0 0 ' + $svg.attr('height') + ' ' + $svg.attr('width'))
            }
            $img.replaceWith($svg);
            buildPreview($svg,text,o);
	  }
        }, 'xml');
      };

      //only show the welcome screen the first time you visit
      if(!localStorage.getItem('welcome-hidden'))
        $('#welcome-screen').modal();
      $('#welcome-screen').on('hidden.bs.modal', function () {
        localStorage.setItem('welcome-hidden',true);
      });

      //add local fonts to the main page
      var style = document.createElement('style');
      style.type = 'text/css';
      for(var key in pdfMake.vfs) {
        if(pdfMake.vfs.hasOwnProperty(key) && key.indexOf('.ttf')>0) {
          style.append('@font-face {font-family: '+key.substr(0,key.length-4)+';src: url(data:font/ttf;base64,'+pdfMake.vfs[key]+');}');
          $('#option-font').append('<option value="'+key.substr(0,key.length-4)+'" style="font-family:'+key.substr(0,key.length-4)+'">'+key.substr(0,key.length-4)+'</option>');
        }
      }
      document.getElementsByTagName('head')[0].appendChild(style);

      //populate the list of styles from titleCreator
      var keys=Object.keys(titleCreator.styles)
      keys.forEach(function(key){
        $('#option-style').append(crel('option',{'value':key},titleCreator.styles[key].name));
        $('#title-style').append(crel('option',{'value':key},titleCreator.styles[key].name));
      });

    });
