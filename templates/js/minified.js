!function(a,i){"use strict";var e,t,n,s="._tap",r="._tapActive",o="tap",c="clientX clientY screenX screenY pageX pageY".split(" "),d={count:0,event:0},l=function(a,e){var t=e.originalEvent,n=i.Event(t);n.type=a;for(var s=0,r=c.length;r>s;s++)n[c[s]]=e[c[s]];return n},f=function(a){if(a.isTrigger)return!1;var e=d.event,t=Math.abs(a.pageX-e.pageX),n=Math.abs(a.pageY-e.pageY),s=Math.max(t,n);return a.timeStamp-e.timeStamp<i.tap.TIME_DELTA&&s<i.tap.POSITION_DELTA&&(!e.touches||1===d.count)&&h.isTracking},p=function(a){if(!n)return!1;var e=Math.abs(a.pageX-n.pageX),t=Math.abs(a.pageY-n.pageY),s=Math.max(e,t);return Math.abs(a.timeStamp-n.timeStamp)<750&&s<i.tap.POSITION_DELTA},u=function(a){if(0===a.type.indexOf("touch")){a.touches=a.originalEvent.changedTouches;for(var i=a.touches[0],e=0,t=c.length;t>e;e++)a[c[e]]=i[c[e]]}a.timeStamp=Date.now?Date.now():+new Date},h={isEnabled:!1,isTracking:!1,enable:function(){h.isEnabled||(h.isEnabled=!0,e=i(a.body).on("touchstart"+s,h.onStart).on("mousedown"+s,h.onStart).on("click"+s,h.onClick))},disable:function(){h.isEnabled&&(h.isEnabled=!1,e.off(s))},onStart:function(a){a.isTrigger||(u(a),(!i.tap.LEFT_BUTTON_ONLY||a.touches||1===a.which)&&(a.touches&&(d.count=a.touches.length),h.isTracking||(a.touches||!p(a))&&(h.isTracking=!0,d.event=a,a.touches?(n=a,e.on("touchend"+s+r,h.onEnd).on("touchcancel"+s+r,h.onCancel)):e.on("mouseup"+s+r,h.onEnd))))},onEnd:function(a){var e;a.isTrigger||(u(a),f(a)&&(e=l(o,a),t=e,i(d.event.target).trigger(e)),h.onCancel(a))},onCancel:function(a){a&&"touchcancel"===a.type&&a.preventDefault(),h.isTracking=!1,e.off(r)},onClick:function(a){return!a.isTrigger&&t&&t.isDefaultPrevented()&&t.target===a.target&&t.pageX===a.pageX&&t.pageY===a.pageY&&a.timeStamp-t.timeStamp<750?(t=null,!1):void 0}};i(a).ready(h.enable),i.tap={POSITION_DELTA:10,TIME_DELTA:400,LEFT_BUTTON_ONLY:!0}}(document,jQuery),$(document).ready(function(){function a(a,i,t){var n=i.row(a),s=t.row.add(n.data()).draw().node();return n.remove().draw(),e(),s}function i(a){return"undefined"==typeof a}function e(){0===l.data().length&&0===f.data().length&&0===p.data().length?$("#iscrizioni").addClass("hidden"):$("#iscrizioni").removeClass("hidden")}$(".page-wrap").css("margin-bottom",-$(".footer").height()),$("<style>.page-wrap:after{height:"+$(".footer").height()+"px}</style>").appendTo("head");var t="/edsa-Autogestione",n={bLengthChange:!1,paging:!0,ordering:!0,info:!0,responsive:!0,language:{decimal:",",zeroRecords:"Nessun risultato :(",info:"Pagina _PAGE_ di _PAGES_",infoEmpty:"",infoFiltered:"",emptyTable:"Nessun risultato :(",infoPostFix:"",thousands:".",loadingRecords:"Caricamento...",processing:"Elaborazione...",search:"Ricerca:",paginate:{first:"Prima",last:"Ultima",next:"Successivo",previous:"Precedente"},aria:{sortAscending:"Ordinamento alfabetico",sortDescending:"Ordinamento inverso"}},order:[1,"desc"],columns:[null,{visible:!1},{visible:!1},{visible:!1}]},s={bLengthChange:!1,bFilter:!1,paging:!1,ordering:!0,info:!1,language:{emptyTable:"Nessun risultato :("},responsive:!0,columns:[null,{visible:!1},{visible:!1},{visible:!1}]},r=$("#iscritto").DataTable(n),o=$("#good").DataTable(n),c=$("#blocked").DataTable(n),d=$("#to").DataTable(n),l=$("#primo").DataTable(s),f=$("#secondo").DataTable(s),p=$("#terzo").DataTable(s),u=$("#first").DataTable(n),h=$("#second").DataTable(n),v=$("#third").DataTable(n),m="primo turno",b="secondo turno",g="giornata intera (torneo)";$(".scroll").DataTable({paging:!0,ordering:!0,info:!0,responsive:!0,language:{decimal:",",lengthMenu:"_MENU_ risultati per pagina",zeroRecords:"Nessun risultato :(",info:"_TOTAL_ risultati",infoEmpty:"",infoFiltered:"(filtrato da _MAX_ risultati totali)",emptyTable:"Nessun risultato :(",infoPostFix:"",thousands:".",loadingRecords:"Caricamento...",processing:"Elaborazione...",search:"Ricerca:",paginate:{first:"Prima",last:"Ultima",next:"Successivo",previous:"Precedente"},aria:{sortAscending:"Ordinamento alfabetico",sortDescending:"Ordinamento inverso"}},scrollY:400,scrollCollapse:!0,paging:!1}),$(document).on("tap","#professore",function(){$(this).parent().parent().find(".active").removeClass("active"),$(this).parent().addClass("active");var a=$(this).find("#nome").text(),i=".";a&&"Tutti i professori"!=a?(i="^\\s*"+$(this).find("#nome").text()+"\\s*$",$("#who").text("di "+$(this).find("#nome").text())):$("#who").text(""),d.columns(2).search(i,!0).draw(),o.columns(2).search(i,!0).draw(),c.columns(2).search(i,!0).draw()}),$(document).on("tap","#sort",function(){$(this).parent().parent().find(".active").removeClass("active"),$(this).parent().addClass("active");var a,i=$(this).find("#val").text().toLowerCase();a="1"==i?[1,"asc"]:"1d"==i?[1,"desc"]:"2"==i?[2,"asc"]:"2d"==i?[2,"desc"]:"3"==i?[3,"asc"]:"3d"==i?[3,"desc"]:[0,"asc"],r.order(a).draw(),o.order(a).draw(),c.order(a).draw(),d.order(a).draw(),l.order(a).draw(),f.order(a).draw(),p.order(a).draw(),u.order(a).draw(),h.order(a).draw(),v.order(a).draw()}),$(document).on("tap","#reset",function(){var a=$(this);a.html('<i class="fa fa-circle-o-notch fa-spin"></i>'),$.ajax({method:"GET",url:t+"/utenti/reset/"+a.parent().find("#value").text(),data:{ajax:!0}}).done(function(i){a.parent().html(i)})}),$(document).on("tap","#presenza",function(){var a=$(this);a.html('<i class="fa fa-circle-o-notch fa-spin"></i>'),a.removeClass("btn-success"),a.removeClass("btn-danger"),a.addClass("btn-info"),$.ajax({method:"GET",url:t+"presente/"+a.parent().find("#persona").text()+"/"+$("#value").text(),data:{ajax:!0}}).done(function(i){1==i?(a.addClass("btn-danger"),a.removeClass("btn-info"),a.parent().parent().find("#pres").html("Attualmente presente"),a.html("Assente")):0==i&&(a.removeClass("btn-info"),a.addClass("btn-success"),a.parent().parent().find("#pres").html("Attualmente assente"),a.html("Presente"))})}),$(document).on("tap","#like",function(){var a=$(this),i=$(this).parent().parent().parent();a.find("#text").html('<i class="fa fa-circle-o-notch fa-spin"></i>'),a.removeClass("btn-success").removeClass("btn-danger").addClass("btn-info disabled");var e=t+"/";"proposte"==$("#page").text().toLowerCase()?e+="proposte":"citazioni"==$("#page").text().toLowerCase()&&(e+="citazioni"),e+="/"+i.find("#value").text(),$.ajax({method:"GET",url:e,data:{ajax:!0}}).done(function(e){1==e?(a.removeClass("btn-info disabled").addClass("btn-danger").find("#text").html('<i class="fa fa-thumbs-o-up"></i>'),i.parent().parent().find("#cont").text(parseInt(a.parent().find("#cont").text())+1)):0==e&&(a.removeClass("btn-info disabled").addClass("btn-success").find("#text").html('<i class="fa fa-thumbs-o-up"></i>'),i.parent().parent().find("#cont").text(parseInt(a.parent().find("#cont").text())-1))})}),e(),$(document).on("tap","#iscriviti",function(){var e=$(this),n=$(this).parent().parent().parent().parent().parent(),s=n.find("#orario").text().toLowerCase();e.removeClass("btn-success").removeClass("btn-danger").addClass("btn-info disabled").html('<i class="fa fa-circle-o-notch fa-spin"></i>');var c=t+"/";"corsi"==$("#page").text().toLowerCase()?c+="corsi":"aula"==$("#page").text().toLowerCase()&&(c+="aule"),c+="/"+n.find("#value").text(),alert(c),$.ajax({method:"GET",url:c,data:{ajax:!0}}).done(function(e){alert(e);var t;1==e?(s&&"corsi"==$("#page").text().toLowerCase()?(s==m?(t=a(n,u,l),$("#first").find("#iscriviti").parent().remove(),$("#third").find("#iscriviti").parent().remove()):s==b?(t=a(n,h,f),$("#second").find("#iscriviti").parent().remove(),$("#third").find("#iscriviti").parent().remove()):s==g?(t=a(n,v,p),$(t).find(".links").append('<li><a id="sqaud" href=indirizzo + "/squadra" class="btn btn-primary btn-lg">Crea squadra</a></li>'),$("#first").find("#iscriviti").parent().remove(),$("#second").find("#iscriviti").parent().remove(),$("#third").find("#iscriviti").parent().remove()):t=a(n,o,sub),$(t).find("#orario").parent().parent().removeClass("hidden")):s==g&&$(t).find(".links").append('<li><a id="sqaud" href=indirizzo + "/squadra" class="btn btn-primary btn-lg">Crea squadra</a></li>'),i($(t).find("#iscriviti").html())?$(t).find(".links").prepend('<li><a id="iscriviti" class="btn btn-success"><i class="fa fa-close"> Elimina iscrizione</a></li>'):$(t).find("#iscriviti").removeClass("btn-success").addClass("btn-danger").html('<i class="fa fa-close"></i> Elimina iscrizione'),$(t).find("#number").text(parseInt(n.find("#number").text())+1),$(t).find("#stato").removeClass("btn-success").addClass("btn-warning").html('<i class="fa fa-eye-slash"></i> Blocca')):0==e&&(s&&"corsi"==$("#page").text().toLowerCase()&&(s==m?($("#first").find("section").not(".yellow").find(".links").prepend('<li><a id="iscriviti" class="btn btn-success"><i class="fa fa-check"></i> Iscriviti</a></li></li>'),0===f.data().length&&$("#third").find("section").not(".yellow").find(".links").prepend('<li><a id="iscriviti" class="btn btn-success"><i class="fa fa-check"></i> Iscriviti</a></li>'),t=a(n,l,u)):s==b?($("#second").find("section").not(".yellow").find(".links").prepend('<li><a id="iscriviti" class="btn btn-success"><i class="fa fa-check"></i> Iscriviti</a></li>'),0===l.data().length&&$("#third").find("section").not(".yellow").find(".links").prepend('<li><a id="iscriviti" class="btn btn-success"><i class="fa fa-check"></i> Iscriviti</a></li>'),t=a(n,f,h)):s==g?($("#first").find("section").not(".yellow").find(".links").prepend('<li><a id="iscriviti" class="btn btn-success"><i class="fa fa-check"></i> Iscriviti</a></li>'),$("#second").find("section").not(".yellow").find(".links").prepend('<li><a id="iscriviti" class="btn btn-success"><i class="fa fa-check"></i> Iscriviti</a></li>'),$("#third").find("section").not(".yellow").find(".links").prepend('<li><a id="iscriviti" class="btn btn-success"><i class="fa fa-check"></i> Iscriviti</a></li>'),t=a(n,p,v)):t=a(n,r,o),$(t).find("#orario").parent().parent().addClass("hidden")),i($(t).find("#iscriviti").html())?$(t).find(".links").prepend('<li><a id="iscriviti" class="btn btn-danger"><i class="fa fa-check"></i> Iscriviti</a></li>'):$(t).find("#iscriviti").removeClass("btn-danger").addClass("btn-success").html('<i class="fa fa-check"></i> Iscriviti'),$(t).find("#number").text(parseInt(n.find("#number").text())-1),$(t).find("#squad").parent().remove(),$(t).find("#stato").removeClass("btn-success").addClass("btn-warning").html('<i class="fa fa-eye-slash"></i> Blocca')),$(t).find(".progress-bar").attr("aria-valuenow",100*parseInt(n.find("#number").text())/parseInt(n.find("#max").text())),$(t).find(".progress-bar").css("width",100*parseInt(n.find("#number").text())/parseInt(n.find("#max").text())+"%")})}),$(document).on("tap","#stato",function(){var e=$(this),n=$(this).parent().parent().parent().parent().parent(),s=n.find("#orario").text().toLowerCase();e.removeClass("btn-success").removeClass("btn-warning").addClass("btn-info disabled").html('<i class="fa fa-circle-o-notch fa-spin"></i>');var r=t+"/";"corsi"==$("#page").text().toLowerCase()?r+="stato":"proposte"==$("#page").text().toLowerCase()?r+="accettare":"aula"==$("#page").text().toLowerCase()?r+="accetta":"citazioni"==$("#page").text().toLowerCase()&&(r+="cit"),r+="/"+n.find("#value").text(),$.ajax({method:"GET",url:r,data:{ajax:!0}}).done(function(e){var t;1==e?(s?(s==m?n.find("#orario").parent().parent().hasClass("hidden")?t=a(n,u,c):($("#first").find("section").not(".yellow").find(".links").prepend('<li><a id="iscriviti" class="btn btn-success"><i class="fa fa-check"> Iscriviti</a></li>'),0===f.data().length&&$("#third").find("section").find(".links").prepend('<li><a id="iscriviti" class="btn btn-success"><i class="fa fa-check"> Iscriviti</a></li>'),t=a(n,l,c)):s==b?n.find("#orario").parent().parent().hasClass("hidden")?t=a(n,h,c):($("#second").find("section").not(".yellow").find(".links").prepend('<li><a id="iscriviti" class="btn btn-success"><i class="fa fa-check"> Iscriviti</a></li>'),0===l.data().length&&$("#third").find("section").find(".links").prepend('<li><a id="iscriviti" class="btn btn-success"><i class="fa fa-check"> Iscriviti</a></li>'),t=a(n,f,c)):s==g&&(n.find("#orario").parent().parent().hasClass("hidden")?t=a(n,v,c):($("#first").find("section").not(".yellow").find(".links").prepend('<li><a id="iscriviti" class="btn btn-success"><i class="fa fa-check"> Iscriviti</a></li>'),$("#second").find("section").not(".yellow").find(".links").prepend('<li><a id="iscriviti" class="btn btn-success"><i class="fa fa-check"> Iscriviti</a></li>'),$("#third").find("section").not(".yellow").find(".links").prepend('<li><a id="iscriviti" class="btn btn-success"><i class="fa fa-check"> Iscriviti</a></li>'),t=a(n,p,c))),$(t).find("#orario").parent().parent().removeClass("hidden")):t=a(n,o,c),$(t).find("#stato").removeClass("btn-warning").addClass("btn-success").html('<i class="fa fa-eye"></i> Abilita'),$(t).find("#squad").parent().remove(),$(t).find("#like").parent().remove(),$(t).find(".level").remove(),$(t).find("#iscriviti").parent().remove()):0==e&&(s?(s==m?t=a(n,c,u):s==b?t=a(n,c,h):s==g&&(t=a(n,c,v)),$(t).find("#orario").parent().parent().addClass("hidden"),s=$(t).find("#orario").text().toLowerCase(),$(t).find("section").not(".yellow")&&(s==m&&0===l.data().length&&0===p.data().length||s==b&&0===f.data().length&&0===p.data().length||s==g&&0===l.data().length&&0===f.data().length&&0===p.data().length?i($(t).find("#iscriviti").html())?$(t).find(".links").prepend('<li><a id="iscriviti" class="btn btn-success"><i class="fa fa-check"> Iscriviti</a></li>'):$(t).find("#iscriviti").removeClass("btn-danger").addClass("btn-success").html('<i class="fa fa-check"></i> Iscriviti'):$(t).find("#iscriviti")&&$(t).find("#iscriviti").parent().remove())):(t="to"==n.parent().parent().attr("id")?a(n,d,o):a(n,c,o),i($(t).find("#like").html())&&$(t).find(".links").prepend('<li><a id="like" class="btn btn-success"><span id="text"><i class="fa fa-thumbs-o-up"></i></span> <span id="cont">0</span></a></li>')),$(t).find("#stato").removeClass("btn-success").addClass("btn-warning").html('<i class="fa fa-eye-slash"></i> Blocca'),$(t).find("#dis").remove()),$(t).find("#cambia").parent().remove()})}),$(document).on("tap","#cambia",function(){var i=$(this),e=i.parent().parent().parent().parent().parent();i.html('<i class="fa fa-circle-o-notch fa-spin"></i>').addClass("disabled");var n=t+"/";"proposte"==$("#page").text().toLowerCase()?n+="blocca":"aula"==$("#page").text().toLowerCase()?n+="sospendi":"citazioni"==$("#page").text().toLowerCase()&&(n+="cambia"),n+="/"+e.find("#value").text(),$.ajax({method:"GET",url:n,data:{ajax:!0}}),$.ajax({method:"POST",url:t+"/templates/ajax/cambia.php",data:{id:i.parent().parent().parent().find("#value").text(),page:$("#page").text()}}).done(function(i){var t=a(e,d,c);$(t).find("#cambia").parent().remove(),$("#change").text(parseInt($("#change").text())-1)})})});