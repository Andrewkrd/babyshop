/* 1f.jquery.noConflict.js */

jQuery.noConflict();;

/* 64.vmsite.js */

(function($){var undefined,methods={list:function(options){var dest=options.dest;var ids=options.ids;methods.update(this,dest,ids);$(this).change(function(){methods.update(this,dest)});},update:function(org,dest,ids){var opt=$(org),optValues=opt.val()||[],byAjax=[];if(!$.isArray(optValues))optValues=jQuery.makeArray(optValues);if(typeof oldValues!=="undefined"){$.each(oldValues,function(key,oldValue){if(($.inArray(oldValue,optValues))<0)$("#group"+oldValue+"").remove();});}
$.each(optValues,function(optkey,optValue){if(opt.data('d'+optValue)===undefined)byAjax.push(optValue);});if(byAjax.length>0){$.getJSON('index.php?option=com_virtuemart&view=state&format=json&virtuemart_country_id='+byAjax,function(result){var virtuemart_state_id=$('#virtuemart_state_id');var status=virtuemart_state_id.attr('required');if(status=='required'){if(result[byAjax].length>0){virtuemart_state_id.attr('required','required');}else{virtuemart_state_id.removeAttr('required');}}
$.each(result,function(key,value){if(value.length>0){opt.data('d'+key,value);}else{opt.data('d'+key,0);}});methods.addToList(opt,optValues,dest);if(typeof ids!=="undefined"){var states=ids.length?ids.split(','):[];$.each(states,function(k,id){$(dest).find('[value='+id+']').attr("selected","selected");});}
$(dest).trigger("liszt:updated");});}else{methods.addToList(opt,optValues,dest)
$(dest).trigger("liszt:updated");}
oldValues=optValues;},addToList:function(opt,values,dest){$.each(values,function(dataKey,dataValue){var groupExist=$("#group"+dataValue+"").size();if(!groupExist){var datas=opt.data('d'+dataValue);if(datas.length>0){var label=opt.find("option[value='"+dataValue+"']").text();var group='<optgroup id="group'+dataValue+'" label="'+label+'">';$.each(datas,function(key,value){if(value)group+='<option value="'+value.virtuemart_state_id+'">'+value.state_name+'</option>';});group+='</optgroup>';$(dest).append(group);}}});}};$.fn.vm2front=function(method){if(methods[method]){return methods[method].apply(this,Array.prototype.slice.call(arguments,1));}else if(typeof method==='object'||!method){return methods.init.apply(this,arguments);}else{$.error('Method '+method+' does not exist on Vm2 front jQuery library');}};})(jQuery);

/* 5f.facebox.js */

(function($){$.facebox=function(data,klass){$.facebox.loading()
if(data.ajax)fillFaceboxFromAjax(data.ajax,klass)
else if(data.iframe)fillFaceboxFromHref(data.iframe,klass,data.rev)
else if(data.image)fillFaceboxFromImage(data.image,klass)
else if(data.div)fillFaceboxFromHref(data.div,klass,data.rev)
else if(data.text)fillFaceboxFromText(data.text,klass)
else if($.isFunction(data))data.call($)
else $.facebox.reveal(data,klass)}
$.extend($.facebox,{settings:{opacity:0.2,overlay:true,loadingImage:'components/com_virtuemart/assets/images/facebox/loading.gif',closeImage:'components/com_virtuemart/assets/images/facebox/closelabel.png',imageTypes:['png','jpg','jpeg','gif'],faceboxHtml:'\
    <div id="facebox" style="display:none;"> \
      <div class="popup"> \
        <div class="content"> \
        </div> \
        <a href="#" class="close"></a> \
      </div> \
    </div>'},loading:function(){init()
if($('#facebox .loading').length==1)return true
showOverlay()
$('#facebox .content').empty()
$('#facebox .body').children().hide().end().append('<div class="loading"><img src="'+$.facebox.settings.loadingImage+'"/></div>')
$('#facebox').css({top:getPageScroll()[1]+($(window).height()/10),left:($(window).width()-$('#facebox').width())/2}).show()
$(document).bind('keydown.facebox',function(e){if(e.keyCode==27)$.facebox.close()
return true})
$(document).trigger('loading.facebox')},reveal:function(data,klass){$(document).trigger('beforeReveal.facebox')
if(klass)$('#facebox .content').addClass(klass)
$('#facebox .content').append(data)
$('#facebox .loading').remove()
$('#facebox .body').children().fadeIn('normal')
$('#facebox').css('left',$(window).width()/2-($('#facebox .popup').width()/2))
$(document).trigger('reveal.facebox').trigger('afterReveal.facebox')},close:function(){$(document).trigger('close.facebox')
return false}})
$.fn.facebox=function(settings){if($(this).length==0)return
init(settings)
function clickHandler(){$.facebox.loading(true)
var klass=this.rel.match(/facebox\[?\.(\w+)\]?/)
if(klass)klass=klass[1]
fillFaceboxFromHref(this.href,klass,this.rev)
return false}
return this.bind('click.facebox',clickHandler)}
function init(settings){if($.facebox.settings.inited)return true
else $.facebox.settings.inited=true
$(document).trigger('init.facebox')
makeCompatible()
var imageTypes=$.facebox.settings.imageTypes.join('|')
$.facebox.settings.imageTypesRegexp=new RegExp('\.('+imageTypes+')$','i')
if(settings)$.extend($.facebox.settings,settings)
$('body').append($.facebox.settings.faceboxHtml)
var preload=[new Image(),new Image()]
preload[0].src=$.facebox.settings.closeImage
preload[1].src=$.facebox.settings.loadingImage
$('#facebox').find('.b:first, .bl').each(function(){preload.push(new Image())
preload.slice(-1).src=$(this).css('background-image').replace(/url\((.+)\)/,'$1')})
$('#facebox .close').click($.facebox.close)
$('#facebox .close_image').attr('src',$.facebox.settings.closeImage)}
function getPageScroll(){var xScroll,yScroll;if(self.pageYOffset){yScroll=self.pageYOffset;xScroll=self.pageXOffset;}else if(document.documentElement&&document.documentElement.scrollTop){yScroll=document.documentElement.scrollTop;xScroll=document.documentElement.scrollLeft;}else if(document.body){yScroll=document.body.scrollTop;xScroll=document.body.scrollLeft;}
return new Array(xScroll,yScroll)}
function getPageHeight(){var windowHeight
if(self.innerHeight){windowHeight=self.innerHeight;}else if(document.documentElement&&document.documentElement.clientHeight){windowHeight=document.documentElement.clientHeight;}else if(document.body){windowHeight=document.body.clientHeight;}
return windowHeight}
function makeCompatible(){var $s=$.facebox.settings
$s.loadingImage=$s.loading_image||$s.loadingImage
$s.closeImage=$s.close_image||$s.closeImage
$s.imageTypes=$s.image_types||$s.imageTypes
$s.faceboxHtml=$s.facebox_html||$s.faceboxHtml}
function fillFaceboxFromHref(href,klass,rev){if(href.match(/#/)){var url=window.location.href.split('#')[0]
var target=href.replace(url,'')
if(target=='#')return
$.facebox.reveal($(target).html(),klass)}else if(rev.split('|')[0]=='iframe'){fillFaceboxFromIframe(href,klass,rev.split('|')[1],rev.split('|')[2])}else if(href.match($.facebox.settings.imageTypesRegexp)){fillFaceboxFromImage(href,klass)}else{fillFaceboxFromAjax(href,klass)}}
function fillFaceboxFromIframe(href,klass,height,width){$.facebox.reveal('<iframe scrolling="auto" marginwidth="0" width="'+width+'" height="'+height+'" frameborder="0" src="'+href+'" marginheight="0"></iframe>',klass)}
function fillFaceboxFromImage(href,klass){var image=new Image()
image.onload=function(){$.facebox.reveal('<div class="image"><img src="'+image.src+'" /></div>',klass)}
image.src=href}
function fillFaceboxFromText(text,klass){$.facebox.reveal('<div>'+text+'</div>',klass)}
function fillFaceboxFromAjax(href,klass){$.get(href,function(data){$.facebox.reveal(data,klass)})}
function skipOverlay(){return $.facebox.settings.overlay==false||$.facebox.settings.opacity===null}
function showOverlay(){if(skipOverlay())return
if($('#facebox_overlay').length==0)
$("body").append('<div id="facebox_overlay" class="facebox_hide"></div>')
$('#facebox_overlay').hide().addClass("facebox_overlayBG").css('opacity',$.facebox.settings.opacity).click(function(){$(document).trigger('close.facebox')}).fadeIn(200)
return false}
function hideOverlay(){if(skipOverlay())return
$('#facebox_overlay').fadeOut(200,function(){$("#facebox_overlay").removeClass("facebox_overlayBG")
$("#facebox_overlay").addClass("facebox_hide")
$("#facebox_overlay").remove()})
return false}
$(document).bind('close.facebox',function(){$(document).unbind('keydown.facebox')
$('#facebox').fadeOut(function(){$('#facebox .content').removeClass().addClass('content')
$('#facebox .loading').remove()
$(document).trigger('afterClose.facebox')})
hideOverlay()})
$(document).bind('afterReveal.facebox',function(){var windowHeight=$(window).height();var faceboxHeight=$('#facebox').height();if(faceboxHeight<windowHeight){var scrolltop=$(window).scrollTop();var top=Math.floor((windowHeight-faceboxHeight)/2)+scrolltop;$('#facebox').css('top',(top));}
else{$('#facebox').css('top',$(window).scrollTop());}});})(jQuery);;

/* 6c.vmprices.js */

if(typeof Virtuemart==="undefined")
{var Virtuemart={setproducttype:function(form,id){form.view=null;var $=jQuery,datas=form.serialize(),prices=$("#productPrice"+id);datas=datas.replace("&view=cart","");prices.fadeTo("fast",0.75);$.getJSON(window.vmSiteurl+'index.php?option=com_virtuemart&nosef=1&view=productdetails&task=recalculate&format=json'+window.vmLang,encodeURIComponent(datas),function(datas,textStatus){prices.fadeTo("fast",1);for(var key in datas){var value=datas[key];if(value!=0)prices.find("span.Price"+key).show().html(value);else prices.find(".Price"+key).html(0).hide();}});return false;},productUpdate:function(mod){var $=jQuery;$.ajaxSetup({cache:false})
$.getJSON(window.vmSiteurl+"index.php?option=com_virtuemart&nosef=1&view=cart&task=viewJS&format=json"+window.vmLang,function(datas,textStatus){if(datas.totalProduct>0){mod.find(".vm_cart_products").html("");$.each(datas.products,function(key,val){$("#hiddencontainer .container").clone().appendTo(".vmCartModule .vm_cart_products");$.each(val,function(key,val){if($("#hiddencontainer .container ."+key))mod.find(".vm_cart_products ."+key+":last").html(val);});});mod.find(".total").html(datas.billTotal);mod.find(".show_cart").html(datas.cart_show);}
mod.find(".total_products").html(datas.totalProductTxt);});},sendtocart:function(form){if(Virtuemart.addtocart_popup==1){Virtuemart.cartEffect(form);}else{form.append('<input type="hidden" name="task" value="add" />');form.submit();}},cartEffect:function(form){var $=jQuery;$.ajaxSetup({cache:false})
var datas=form.serialize();$.getJSON(vmSiteurl+'index.php?option=com_virtuemart&nosef=1&view=cart&task=addJS&format=json'+vmLang,encodeURIComponent(datas),function(datas,textStatus){if(datas.stat==1){var txt=form.find(".pname").val()+' '+vmCartText;$.facebox.settings.closeImage=closeImage;$.facebox.settings.loadingImage=loadingImage;$.facebox.settings.faceboxHtml=faceboxHtml;$.facebox({text:datas.msg+"<H4>"+txt+"</H4>"},'my-groovy-style');}else if(datas.stat==2){var value=form.find('.quantity-input').val();var txt=form.find(".pname").val();$.facebox.settings.closeImage=closeImage;$.facebox.settings.loadingImage=loadingImage;$.facebox.settings.faceboxHtml=faceboxHtml;$.facebox({text:datas.msg+"<H4>"+txt+"</H4>"},'my-groovy-style');}else{$.facebox.settings.closeImage=closeImage;$.facebox.settings.loadingImage=loadingImage;$.facebox.settings.faceboxHtml=faceboxHtml;$.facebox({text:"<H4>"+vmCartError+"</H4>"+datas.msg},'my-groovy-style');}
if($(".vmCartModule")[0]){Virtuemart.productUpdate($(".vmCartModule"));}});$.ajaxSetup({cache:true});},product:function(carts){carts.each(function(){var cart=jQuery(this),addtocart=cart.find('input.addtocart-button'),plus=cart.find('.quantity-plus'),minus=cart.find('.quantity-minus'),select=cart.find('select'),radio=cart.find('input:radio'),virtuemart_product_id=cart.find('input[name="virtuemart_product_id[]"]').val(),quantity=cart.find('.quantity-input');addtocart.click(function(e){Virtuemart.sendtocart(cart);return false;});plus.click(function(){var Qtt=parseInt(quantity.val());if(!isNaN(Qtt)){quantity.val(Qtt+1);Virtuemart.setproducttype(cart,virtuemart_product_id);}});minus.click(function(){var Qtt=parseInt(quantity.val());if(!isNaN(Qtt)&&Qtt>1){quantity.val(Qtt-1);}else quantity.val(1);Virtuemart.setproducttype(cart,virtuemart_product_id);});select.change(function(){Virtuemart.setproducttype(cart,virtuemart_product_id);});radio.change(function(){Virtuemart.setproducttype(cart,virtuemart_product_id);});quantity.keyup(function(){Virtuemart.setproducttype(cart,virtuemart_product_id);});});}};jQuery.noConflict();jQuery(document).ready(function($){Virtuemart.product($("form.product"));$("form.js-recalculate").each(function(){if($(this).find(".product-fields").length){var id=$(this).find('input[name="virtuemart_product_id[]"]').val();Virtuemart.setproducttype($(this),id);}});});};

/* 5e.core.js */

function switchFontSize(ckname,val){var bd=document.getElementsByTagName('body');if(!bd||!bd.length)return;bd=bd[0];switch(val){case'inc':if(CurrentFontSize+1<7){CurrentFontSize++;}
break;case'dec':if(CurrentFontSize-1>0){CurrentFontSize--;}
break;case'reset':default:CurrentFontSize=DefaultFontSize;}
var newclass='fs'+CurrentFontSize;bd.className=bd.className.replace(new RegExp('fs.?','g'),'');bd.className=trim(bd.className);bd.className+=(bd.className?' ':'')+newclass;createCookie(ckname,CurrentFontSize,365);}
function switchTool(ckname,val){createCookie(ckname,val,365);window.location.reload();}
function cpanel_reset(){var matches=document.cookie.match(new RegExp('(?:^|;)\\s*'+tmpl_name.escapeRegExp()+'_([^=]*)=([^;]*)','g'));if(!matches)return;for(var i=0;i<matches.length;i++){var ck=matches[i].match(new RegExp('(?:^|;)\\s*'+tmpl_name.escapeRegExp()+'_([^=]*)=([^;]*)'));if(ck){createCookie(tmpl_name+'_'+ck[1],'',-1);}}
if(window.location.href.indexOf('?')>-1){window.location.href=window.location.href.substr(0,window.location.href.indexOf('?'));}else{window.location.reload(true);}}
function cpanel_apply(){var elems=document.getElementById('ja-cpanel-main').getElementsByTagName('*');var usersetting={};for(var i=0;i<elems.length;i++){var el=elems[i];if(el.name&&(match=el.name.match(/^user_(.*)$/))){var name=match[1];var value='';if(el.tagName.toLowerCase()=='input'&&(el.type.toLowerCase()=='radio'||el.type.toLowerCase()=='checkbox')){if(el.checked)value=el.value;}else{value=el.value;}
if(usersetting[name]){if(value)usersetting[name]=value+','+usersetting[name];}else{usersetting[name]=value;}}}
for(var k in usersetting){name=tmpl_name+'_'+k;value=usersetting[k].trim();if(value.length>0){createCookie(name,value,365);}}
if(window.location.href.indexOf('?')>-1){window.location.href=window.location.href.substr(0,window.location.href.indexOf('?'));}else{window.location.reload(true);}}
function createCookie(name,value,days){if(days){var date=new Date();date.setTime(date.getTime()+(days*24*60*60*1000));var expires="; expires="+date.toGMTString();}else{expires="";}
document.cookie=name+"="+value+expires+"; path=/";}
function trim(str,chars){return ltrim(rtrim(str,chars),chars);}
function ltrim(str,chars){chars=chars||"\\s";return str.replace(new RegExp("^["+chars+"]+","g"),"");}
function rtrim(str,chars){chars=chars||"\\s";return str.replace(new RegExp("["+chars+"]+$","g"),"");}
function getScreenWidth(){var x=0;if(self.innerHeight){x=self.innerWidth;}else if(document.documentElement&&document.documentElement.clientHeight){x=document.documentElement.clientWidth;}else if(document.body){x=document.body.clientWidth;}
return x;}
function equalHeight(els){els=$$_(els);if(!els||els.length<2)return;var maxh=0;var els_=[];els.each(function(el,i){if(!el)return;els_[i]=el;var ch=els_[i].getCoordinates().height;maxh=(maxh<ch)?ch:maxh;},this);els_.each(function(el,i){if(!el)return;if(el.getStyle('padding-top')!=null&&el.getStyle('padding-bottom')!=null){if(maxh-el.getStyle('padding-top').toInt()-el.getStyle('padding-bottom').toInt()>0){el.setStyle('min-height',maxh-el.getStyle('padding-top').toInt()-el.getStyle('padding-bottom').toInt());}}else{if(maxh>0)el.setStyle('min-height',maxh);}},this);}
function getDeepestWrapper(el){while(el.getChildren().length==1){el=el.getChildren()[0];}
return el;}
function fixHeight(els,group1,group2){els=$$_(els);group1=$$_(group1);group2=$$_(group2);if(!els||!group1)return;var height=0;group1.each(function(el){if(!el)return;height+=el.getCoordinates().height;});if(group2){group2.each(function(el){if(!el)return;height-=el.getCoordinates().height;});}
els.each(function(el,i){if(!el)return;if(el.getStyle('padding-top')!=null&&el.getStyle('padding-bottom')!=null){if(height-el.getStyle('padding-top').toInt()-el.getStyle('padding-bottom').toInt()>0){el.setStyle('min-height',height-el.getStyle('padding-top').toInt()-el.getStyle('padding-bottom').toInt());}}else{if(height>0){el.setStyle('min-height',height);}}});}
function addFirstLastItem(el){el=$(el);if(!el||!el.getChildren()||!el.getChildren().length)return;el.getChildren()[0].addClass('first-item');el.getChildren()[el.getChildren().length-1].addClass('last-item');}
function $$_(els){if($type(els)=='string')return $$(els);var els_=[];els.each(function(el){el=$(el);if(el)els_.push(el);});return els_;};

/* 9e.mega.js */

var jaMegaMenuMoo=new Class({Implements:Options,options:{slide:0,duration:300,fading:0,bgopacity:0.9,delayHide:500,direction:'down',action:'mouseenter',hidestyle:'normal',offset:5,fixArrow:false},toElement:function(){return this.menu;},initialize:function(menu,options){this.menu=$(menu);if(!this.menu){return;}
this.setOptions(options);if(!this.options.slide&&!this.options.fading){this.options.delayHide=10;}
this.childopen=[];this.imgloaded=false;this.loaded=false;this.prepare();},prepare:function(){var imgElms=this.menu.getElements('img');if(imgElms.length&&!this.imgloaded){var imgSrcs=[];imgElms.each(function(image){imgSrcs.push(image.src)});new Asset.images(imgSrcs,{onComplete:function(){this.start();}.bind(this)});this.imgloaded=true;this.start.delay(3000,this);}else{this.start();}},start:function(){if(this.loaded){return;}
this.loaded=true;this.zindex=1000;var pw=this.menu;while(pw=pw.getParent()){if(pw.hasClass('main')||pw.hasClass('wrap')){this.wrapper=pw;break;}}
this.items=this.menu.getElements('li.mega');this.items.each(function(li){var link=li.getChildren('a.mega')[0],child=li.getChildren('.childcontent')[0],level0=li.getParent().hasClass('level0'),parent=this.getParent(li),item={stimer:null,direction:((level0&&this.options.direction=='up')?0:1)};if(child){var childwrap=child.getElement('.childcontent-inner-wrap'),childinner=child.getElement('.childcontent-inner'),width=childinner.getWidth(),height=childinner.getHeight(),padding=childwrap.getStyle('padding-left').toInt()+childwrap.getStyle('padding-right').toInt(),overflow=false;child.setStyles({width:width+20,height:height+20});childwrap.setStyle('width',width);if(['auto','scroll'].contains(childinner.getStyle('overflow'))){overflow=true;if(Browser.ie){if(Browser.version<=7){childinner.setStyle('position','relative');}
if(Browser.version==6){childinner.setStyle('height',childinner.getStyle('max-height')||400);}}}
if(this.options.direction=='up'){if(level0){child.setStyle('top',-child.getHeight());}else{child.setStyle('bottom',0);}}}
if(child&&this.options.bgopacity){new Element('div',{'class':'childcontent-bg',styles:{width:'100%',height:height,opacity:this.options.bgopacity,position:'absolute',top:0,left:0,zIndex:1,background:child.getStyle('background'),backgroundImage:child.getStyle('background-image'),backgroundRepeat:child.getStyle('background-repeat'),backgroundColor:child.getStyle('background-color')}}).inject(childwrap,'top');child.setStyle('background','none');childwrap.setStyles({position:'relative',zIndex:2});}
if(child&&(this.options.slide||this.options.fading)){if(child.hasClass('right')){child.setStyle('right',0);}
var fx=new Fx.Morph(childwrap,{duration:this.options.duration,transition:Fx.Transitions.linear,onComplete:this.itemAnimDone.bind(this,item),link:'cancel'}),stylesOn={};if(this.options.slide){if(level0){stylesOn[item.direction==1?'margin-top':'bottom']=0;}else{stylesOn[window.isRTL?'margin-right':'margin-left']=0;}}
if(this.options.fading){stylesOn['opacity']=1;}}
if(child&&this.options.action=='click'){li.addEvent('click',function(e){e.stopPropagation();if(li.hasClass('group')){return;}
if(item.status=='open'){if(this.cursorIn(li,e)){this.itemHide(item);}else{this.hideOthers(li);}}else{this.itemShow(item);}}.bind(this));}
if(this.options.action=='mouseover'||this.options.action=='mouseenter'){li.addEvent('mouseover',function(e){if(li.hasClass('group')){return;}
e.stop();clearTimeout(item.stimer);clearTimeout(this.atimer);this.intent(item,'open');this.itemShow(item);}.bind(this)).addEvent('mouseleave',function(e){if(li.hasClass('group')){return;}
clearTimeout(item.stimer);this.intent(item,'close');if(child){item.stimer=this.itemHide.delay(this.options.delayHide,this,[item]);}else{this.itemHide(item);}}.bind(this));if(link&&child){link.addEvent('click',function(e){if(!item.clickable){e.stop();}});}
li.addEvent('click',function(e){e.stopPropagation()});if(child){child.addEvent('mouseover',function(){clearTimeout(item.stimer);clearTimeout(this.atimer);this.intent(item,'open');this.itemShow(item);}.bind(this)).addEvent('mouseleave',function(e){e.stop();this.intent(item,'close');clearTimeout(item.stimer);if(!this.cursorIn(item.el,e)){this.atimer=this.hideAlls.delay(this.options.delayHide,this);}}.bind(this))}}
if(link&&!child){link.addEvent('click',function(e){e.stopPropagation();this.hideOthers(null);this.menu.getElements('.active').removeClass('active');var p=li;while(p){var idata=p.retrieve('item');p.addClass('active');idata.link.addClass('active');p=idata.parent;}}.bind(this));}
Object.append(item,{el:li,parent:parent,link:link,child:child,childwrap:childwrap,childinner:childinner,width:width,height:height,padding:padding,level0:level0,fx:fx,stylesOn:stylesOn,overflow:overflow,clickable:!(link&&child)});li.store('item',item);},this);var container=$('ja-wrapper');if(!container){container=document.body;}
container.addEvent('click',function(e){this.hideAlls();}.bind(this));this.menu.getElements('.childcontent').setStyle('display','none');},getParent:function(el){var p=el;while((p=p.getParent())){if(this.items.contains(p)&&!p.hasClass('group')){return p;}
if(!p||p==this.menu){return null;}}},intent:function(item,action){item.intent=action;while(item.parent&&(item=item.parent.retrieve('item'))){item.intent=action;}},cursorIn:function(el,event){if(!el||!event){return false;}
var pos=el.getPosition(),cursor=event.page;return(cursor.x>pos.x&&cursor.x<pos.x+el.getWidth()&&cursor.y>pos.y&&cursor.y<pos.y+el.getHeight());},itemOver:function(item){item.el.addClass('over');if(item.el.hasClass('haschild')){item.el.removeClass('haschild').addClass('haschild-over');}
if(item.link){item.link.addClass('over');}},itemOut:function(item){item.el.removeClass('over');if(item.el.hasClass('haschild-over')){item.el.removeClass('haschild-over').addClass('haschild');}
if(item.link){item.link.removeClass('over');}},itemShow:function(item){if(this.childopen.indexOf(item)<this.childopen.length-1){this.hideOthers(item.el);}
if(item.status=='open'){return;}
this.itemOver(item);if(item.level0){this.childopen.length=0;}
if(item.child){this.childopen.push(item);}
item.intent='open';item.status='open';this.enableclick.delay(100,this,item);if(item.child){this.positionSubmenu(item);if(item.fx&&!item.stylesOff){item.stylesOff={};if(this.options.slide){if(item.level0){item.stylesOff[item.direction==1?'margin-top':'bottom']=-item.height;}else{item.stylesOff[window.isRTL?'margin-right':'margin-left']=(item.direction==1?-item.width:item.width);}}
if(this.options.fading){item.stylesOff['opacity']=0;}
item.fx.set(item.stylesOff);}
item.child.setStyles({display:'block',zIndex:this.zindex++});}
if(!item.fx||!item.child){return;}
item.child.setStyle('overflow','hidden');if(item.overflow){item.childinner.setStyle('overflow','hidden');}
item.fx.start(item.stylesOn);},itemHide:function(item){clearTimeout(item.stimer);item.status='close';item.intent='close';this.itemOut(item);this.childopen.erase(item);if(!item.fx&&item.child){item.child.setStyle('display','none');}
if(!item.fx||!item.child||item.child.getStyle('opacity')=='0'){return;}
item.child.setStyle('overflow','hidden');if(item.overflow){item.childinner.setStyle('overflow','hidden');}
switch(this.options.hidestyle){case'fast':item.fx.options.duration=100;item.fx.start(item.stylesOff);break;case'fastwhenshow':item.fx.start(Object.merge(item.stylesOff,{'opacity':0}));break;case'normal':default:item.fx.start(item.stylesOff);break;}},itemAnimDone:function(item){if(item.status=='close'){if(this.options.hidestyle.test(/fast/)){item.fx.options.duration=this.options.duration;if(!this.options.fading){item.childwrap.setStyle('opacity',1);}}
item.child.setStyle('display','none');this.disableclick.delay(100,this,item);var pitem=item.parent?item.parent.retrieve('item'):null;if(pitem&&pitem.intent=='close'){this.itemHide(pitem);}}
if(item.status=='open'){item.child.setStyle('overflow','');if(item.overflow){item.childinner.setStyle('overflow-y','auto');}
item.childwrap.setStyle('opacity',1);item.child.setStyle('display','block');}},hideOthers:function(el){this.childopen.each(function(item){if(!el||(item.el!=el&&!item.el.contains(el))){item.intent='close';}});var last=this.childopen.getLast();if(last&&last.intent=='close'){this.itemHide(last);}},hideAlls:function(el){this.childopen.flatten().each(function(item){if(!item.fx){this.itemHide(item);}else{item.intent='close';}},this);if(this.options.slide||this.options.fading){var last=this.childopen.getLast();if(last&&last.intent=='close'){this.itemHide(last);}}},enableclick:function(item){if(item.link&&item.child){item.clickable=true;}},disableclick:function(item){item.clickable=false;},positionSubmenu:function(item){var options=this.options,offsleft,offstop,left,top,stylesOff={},icoord=item.el.getCoordinates(),bodySize=$(document.body).getScrollSize(),winRect={top:window.getScrollTop(),left:window.getScrollLeft(),width:window.getWidth(),height:window.getHeight()},wrapRect=this.wrapper?this.wrapper.getCoordinates():{top:0,left:0,width:winRect.width,height:winRect.height};winRect.top=Math.max(winRect.top,wrapRect.top);winRect.left=Math.max(winRect.left,wrapRect.left);winRect.width=Math.min(winRect.width,wrapRect.width);winRect.height=Math.min(winRect.height,$(document.body).getScrollHeight());winRect.right=winRect.left+winRect.width;winRect.bottom=winRect.top+winRect.height;if(!item.level0){var pitem=item.parent.retrieve('item'),offsety=parseFloat(pitem.child.getFirst().getStyle('margin-top')),offsetx=parseFloat(pitem.child.getFirst().getStyle(window.isRTL?'margin-right':'margin-left'));item.direction=pitem.direction;window.isRTL&&(offsetx=0-offsetx);icoord.top-=offsety;icoord.bottom-=offsety;icoord.left-=offsetx;icoord.right-=offsetx;}
if(item.level0){if(window.isRTL){offsleft=Math.max(winRect.left,icoord.right-item.width-20);left=Math.max(0,offsleft-winRect.left);}else{offsleft=Math.max(winRect.left,Math.min(winRect.right-item.width,icoord.left));left=Math.max(0,Math.min(winRect.right-item.width,icoord.left)-winRect.left);}}else{if(window.isRTL){if(item.direction==1){offsleft=icoord.left-item.width-20+options.offset;left=-icoord.width-20;if(offsleft<winRect.left){item.direction=0;offsleft=Math.min(winRect.right,Math.max(winRect.left,icoord.right+item.padding-20-options.offset));left=icoord.width-20;stylesOff['margin-right']=item.width;}}else{offsleft=icoord.right+item.padding-20;left=icoord.width-20;if(offsleft+item.width>winRect.right){item.direction=1;offsleft=Math.max(winRect.left,icoord.left-item.width-20);left=-icoord.width-20;stylesOff['margin-right']=-item.width;}}}else{if(item.direction==1){offsleft=icoord.right-options.offset;left=icoord.width;if(offsleft+item.width>winRect.right){item.direction=0;offsleft=Math.max(winRect.left,icoord.left-item.width-item.padding+options.offset);left=-icoord.width;stylesOff['margin-left']=item.width;}}else{offsleft=icoord.left-item.width-item.padding+options.offset;left=-icoord.width;if(offsleft<winRect.left){item.direction=1;offsleft=Math.max(winRect.left,Math.min(winRect.right-item.width,icoord.right-options.offset));left=icoord.width;stylesOff['margin-left']=-item.width;}}}}
if(options.slide&&item.fx&&Object.getLength(stylesOff)){item.fx.set(stylesOff);}
if(options.fixArrow&&item.childinner){item.childinner.setStyle('background-position',(icoord.left-offsleft+(icoord.width/2-4.5))+'px top');}
var oldp=item.child.getStyle('display');item.child.setStyle('display','block');if(item.child.getOffsetParent()){left=offsleft-item.child.getOffsetParent().getCoordinates().left;}
item.child.setStyles({'margin-left':0,'left':left,'display':oldp});}});;

/* 6b.acymailing_module.js */

function submitacymailingform(task,formName){var varform=eval('document.'+formName);var filterEmail=/^([a-z0-9_'&\.\-\+=])+\@(([a-z0-9\-])+\.)+([a-z0-9]{2,10})+$/i;if(!varform.elements){if(varform[0].elements['user[email]']&&varform[0].elements['user[email]'].value&&filterEmail.test(varform[0].elements['user[email]'].value)){varform=varform[0];}else{varform=varform[varform.length-1];}}
if(task!='optout'){nameField=varform.elements['user[name]'];if(nameField&&((typeof acymailing!='undefined'&&nameField.value==acymailing['NAMECAPTION'])||nameField.value.length<2)){if(typeof acymailing!='undefined'){alert(acymailing['NAME_MISSING']);}
nameField.className=nameField.className+' invalid';return false;}}
var emailField=varform.elements['user[email]'];if(emailField){if(typeof acymailing=='undefined'||emailField.value!=acymailing['EMAILCAPTION'])emailField.value=emailField.value.replace(/ /g,"");if(!emailField||(typeof acymailing!='undefined'&&emailField.value==acymailing['EMAILCAPTION'])||!filterEmail.test(emailField.value)){if(typeof acymailing!='undefined'){alert(acymailing['VALID_EMAIL']);}
emailField.className=emailField.className+' invalid';return false;}}
if(varform.elements['hiddenlists'].value.length<1){var listschecked=false;var alllists=varform.elements['subscription[]'];if(alllists&&typeof alllists.value=='undefined'){for(b=0;b<alllists.length;b++){if(alllists[b].checked)listschecked=true;}
if(!listschecked){alert(acymailing['NO_LIST_SELECTED']);return false;}}}
if(task!='optout'&&typeof acymailing!='undefined'&&typeof acymailing['reqFields'+formName]!='undefined'&&acymailing['reqFields'+formName].length>0){for(var i=0;i<acymailing['reqFields'+formName].length;i++){elementName='user['+acymailing['reqFields'+formName][i]+']';elementToCheck=varform.elements[elementName];if(elementToCheck){var isValid=false;if(typeof elementToCheck.value!='undefined'){if(elementToCheck.value==' '&&typeof varform[elementName+'[]']!='undefined'){if(varform[elementName+'[]'].checked){isValid=true;}else{for(var a=0;a<varform[elementName+'[]'].length;a++){if((varform[elementName+'[]'][a].checked||varform[elementName+'[]'][a].selected)&&varform[elementName+'[]'][a].value.length>0)isValid=true;}}}else{if(elementToCheck.value.length>0){if(typeof acymailing['excludeValues'+formName]=='undefined'||typeof acymailing['excludeValues'+formName][acymailing['reqFields'+formName][i]]=='undefined'||acymailing['excludeValues'+formName][acymailing['reqFields'+formName][i]]!=elementToCheck.value)isValid=true;}}}else{for(var a=0;a<elementToCheck.length;a++){if(elementToCheck[a].checked&&elementToCheck[a].value.length>0)isValid=true;}}
if(!isValid){elementToCheck.className=elementToCheck.className+' invalid';alert(acymailing['validFields'+formName][i]);return false;}}else{if((varform.elements[elementName+'[day]']&&varform.elements[elementName+'[day]'].value<1)||(varform.elements[elementName+'[month]']&&varform.elements[elementName+'[month]'].value<1)||(varform.elements[elementName+'[year]']&&varform.elements[elementName+'[year]'].value<1902)){if(varform.elements[elementName+'[day]']&&varform.elements[elementName+'[day]'].value<1)varform.elements[elementName+'[day]'].className=varform.elements[elementName+'[day]'].className+' invalid';if(varform.elements[elementName+'[month]']&&varform.elements[elementName+'[month]'].value<1)varform.elements[elementName+'[month]'].className=varform.elements[elementName+'[month]'].className+' invalid';if(varform.elements[elementName+'[year]']&&varform.elements[elementName+'[year]'].value<1902)varform.elements[elementName+'[year]'].className=varform.elements[elementName+'[year]'].className+' invalid';alert(acymailing['validFields'+formName][i]);return false;}}}}
var captchaField=varform.elements['acycaptcha'];if(captchaField){if(captchaField.value.length<1){if(typeof acymailing!='undefined'){alert(acymailing['CAPTCHA_MISSING']);}
captchaField.className=captchaField.className+' invalid';return false;}}
if(task!='optout'){var termsandconditions=varform.terms;if(termsandconditions&&!termsandconditions.checked){if(typeof acymailing!='undefined'){alert(acymailing['ACCEPT_TERMS']);}
termsandconditions.className=termsandconditions.className+' invalid';return false;}}
taskField=varform.task;taskField.value=task;if(!varform.elements['ajax']||!varform.elements['ajax'].value||varform.elements['ajax'].value=='0'){varform.submit();return false;}
var form=$(formName);data=form.toQueryString();if(typeof Ajax=='function'){new Ajax(form.action,{data:data,method:'post',onRequest:function()
{form.addClass('acymailing_module_loading');form.setStyle("filter:","alpha(opacity=50)");form.setStyle("-moz-opacity","0.5");form.setStyle("-khtml-opacity","0.5");form.setStyle("opacity","0.5");},onSuccess:function(response)
{response=Json.evaluate(response);acymailingDisplayAjaxResponse(unescape(response.message),response.type,formName);},onFailure:function(){acymailingDisplayAjaxResponse('Ajax Request Failure','error',formName);}}).request();}else{new Request.JSON({url:$(formName).action,data:data,method:'post',onRequest:function()
{form.addClass('acymailing_module_loading');form.setStyle("filter:","alpha(opacity=50)");form.setStyle("-moz-opacity","0.5");form.setStyle("-khtml-opacity","0.5");form.setStyle("opacity","0.5");},onSuccess:function(response)
{acymailingDisplayAjaxResponse(unescape(response.message),response.type,formName);},onFailure:function(){acymailingDisplayAjaxResponse('Ajax Request Failure','error',formName);}}).send();}
return false;}
function acymailingDisplayAjaxResponse(message,type,formName)
{var toggleButton=$('acymailing_togglemodule_'+formName);if(toggleButton&&toggleButton.hasClass('acyactive')){var wrapper=toggleButton.getParent().getParent().getChildren()[1];wrapper.setStyle('height','');};var responseContainer=$$('#acymailing_fulldiv_'+formName+' .responseContainer')[0];if(typeof responseContainer=='undefined'){responseContainer=new Element('div');responseContainer.inject($('acymailing_fulldiv_'+formName),'top');oldContainerHeight='0px';}else{oldContainerHeight=responseContainer.getStyle('height');}
responseContainer.className='responseContainer';$(formName).removeClass('acymailing_module_loading');responseContainer.innerHTML=message;var form=$(formName);if(type=='success'){responseContainer.addClass('acymailing_module_success');}else{responseContainer.addClass('acymailing_module_error');form.setStyle("filter:","alpha(opacity=100)");form.setStyle("-moz-opacity","1");form.setStyle("-khtml-opacity","1");form.setStyle("opacity","1");}
newContainerHeight=responseContainer.getStyle('height');if(typeof Ajax=='function')
{if(type=='success'){var myEffect=new Fx.Styles(form,{duration:500,transition:Fx.Transitions.linear});myEffect.start({'height':[form.getSize().size.y,0],'opacity':[1,0]});}
try{responseContainer.setStyle('height',oldContainerHeight+'px');responseContainer.setStyle("filter:","alpha(opacity=0)");responseContainer.setStyle("-moz-opacity","0");responseContainer.setStyle("-khtml-opacity","0");responseContainer.setStyle("opacity","0");}
catch(e){}
var myEffect2=new Fx.Styles(responseContainer,{duration:500,transition:Fx.Transitions.linear});myEffect2.start({'height':[oldContainerHeight,newContainerHeight],'opacity':[0,1]});}
else
{if(type=='success'){form.set('morph');form.morph({'height':'0px','opacity':0});}
responseContainer.setStyles({'height':oldContainerHeight,'opacity':0});responseContainer.set('morph');responseContainer.morph({'height':newContainerHeight,'opacity':1});}};

/* 92.ja_contentslider.js */

var JS_ContentSlider=new Class({initialize:function(options)
{this.options=$extend({w:100,h:200,num_elem:4,total:0,url:'',mode:'horizontal',direction:'right',wrapper:'ja-slide-wrapper',duration:1000,interval:3000,auto:1},options||{});if(this.options.total){if(this.options.total<this.options.num_elem)this.options.num_elem=this.options.total;this.elements=new Array(this.options.total);}else
this.elements=new Array();this.current=0;this.options.wrapper.setStyle('position','relative');this.options.wrapper.setStyle('overflow','hidden');if(this.options.mode=='vertical'){this.options.wrapper.setStyle('width',this.options.w);this.options.wrapper.setStyle('height',this.options.h*this.options.num_elem);}else{this.options.wrapper.setStyle('width',this.options.w*this.options.num_elem);this.options.wrapper.setStyle('height',this.options.h);}
elems=this.options.wrapper.getElements('.content_element');for(i=0;i<elems.length;i++){elems[i].setStyle('width',this.options.w);elems[i].setStyle('height',this.options.h);elems[i].setStyle('display','none');}
this.ef_u={};this.ef_d={};this.ef_l={};this.ef_r={};for(i=0;i<=this.options.num_elem;i++){this.ef_u[i]={'top':[i*this.options.h,(i-1)*this.options.h]};this.ef_d[i]={'top':[(i-1)*this.options.h,i*this.options.h]};this.ef_l[i]={'left':[i*this.options.w,(i-1)*this.options.w]};this.ef_r[i]={'left':[(i-1)*this.options.w,i*this.options.w]};}},getFx:function(){if(this.options.mode=='vertical'){if(this.options.direction=='left'||this.options.direction=='up'){return this.ef_u;}else{return this.ef_d;}}else{if(this.options.direction=='left'||this.options.direction=='up'){return this.ef_l;}else{return this.ef_r;}}},add:function(text){var divobj=new Element('DIV',{'id':'jsslide_'+this.elements.length,'class':'jsslide'});divobj.innerHTML=text;divobj.setStyle('position','absolute');divobj.setStyle('width',this.options.w);divobj.setStyle('height',this.options.h);if(this.elements.length>1){divobj.injectAfter(this.elements[this.elements.length-2]);}else{divobj.inject(this.options.wrapper);}
this.hide(divobj);this.elements.push(divobj);},update:function(text,ind){divobj=new Element('DIV',{'id':'jsslide_'+ind,'class':'jsslide'});divobj.innerHTML=text;divobj.setStyle('position','absolute');divobj.setStyle('z-index',1);divobj.setStyle('width',this.options.w);divobj.setStyle('height',this.options.h);divobj.inject(this.options.wrapper);this.hide(divobj);this.elements[ind]=divobj;},hide:function(el){if(this.options.mode=='vertical'){el.setStyle('top','-999em');el.setStyle('left','0');}else{el.setStyle('top','0');el.setStyle('left','-999em');}},setPos:function(elems){if(!elems)elems=this.getRunElems();var posT;var posL;var display;for(var i=0;i<elems.length;i++){var el=elems[i];if(el){if(this.options.mode=='vertical'){if(this.options.direction=='left'||this.options.direction=='up'){posT=this.options.h*i;}else{posT=this.options.h*(i-1);}
el.setStyle('top',posT);this.loadImage(el);}else{if(this.options.direction=='left'||this.options.direction=='up'){el.setStyle('left',this.options.w*i);}else{el.setStyle('left',this.options.w*(i-1));}
this.loadImage(el);}}}},loadImage:function(el){var holder=el.getElement(".ja-image");if(holder){var image=holder.getProperty('rel');if(image!=''&&image!=null){holder.setHTML(image);holder.setProperty('rel','')}}},getRunElems:function(){var objs=new Array();if(this.options.direction=='left'||this.options.direction=='up'){adj=0;}else{adj=this.elements.length-1;}
for(var i=0;i<=this.options.num_elem;i++){objs[i]=this.elements[(this.current+i+adj)%this.elements.length];}
if(this.options.total<=this.options.num_elem){if(this.options.direction=='left'||this.options.direction=='up'){objs[this.options.num_elem]=null;}else{objs[0]=null;}}
return objs;},start:function(){this.clearTimeOut();if(!this.elements[this.next()]){this.nextRun();return;}
if(this.elements[this.next()]=='fetching'){this.nextRun();return;}
if(this.running)return;this.running=1;var objs=this.getRunElems();this.setPos(objs);this.x=new Fx.Elements(objs,{duration:this.options.duration,onComplete:this.end.bind(this)});this.x.start(this.getFx());this.current=this.nextCurr();},end:function(){this.running=0;this.nextRun();},clearTimeOut:function(){if(this.timeOut){clearTimeout(this.timeOut);this.timeOut=0;}},nextRun:function(){this.clearTimeOut();if(this.options.total<=this.options.num_elem)return;if(this.options.auto){this.timeOut=setTimeout(this.start.bind(this),this.options.interval);this.fetchNext();}},nextCurr:function(){var next=0;if(this.options.direction=='left'||this.options.direction=='up'){next=(this.current+1)%this.elements.length;}else{next=(this.current+this.elements.length-1)%this.elements.length;}
return next;},next:function(){var next=0;if(this.options.direction=='left'||this.options.direction=='up'){next=(this.current+this.options.num_elem)%this.elements.length;}else{next=(this.current+this.elements.length-1)%this.elements.length;}
return next;},fetchNext:function(){var next=this.next();if(!this.elements[next]){this.elements[next]='fetching';url=this.options.url+'?total='+this.options.total+'&news='+next+'&loadajax=1&modid='+this.options.modid;new Request(url,{method:'get',onComplete:function(request){this.update(request,next)}.bind(this)}).send();return;}},fetchUpdate:function(text,next){this.update(text,next);},setDirection:function(direction){this.options.direction=direction;}});;

/* 00.script.js */

var jaboxes=[];var jaboxoverlay=null;showBox=function(box,focusobj,caller,e){if(!jaboxoverlay){jaboxoverlay=new Element('div',{id:"jabox-overlay"}).injectBefore($(box));jaboxoverlay.setStyle('opacity',0.01);jaboxoverlay.addEvent('click',function(e){jaboxes.each(function(box){if(box.status=='show'){box.status='hide';box.setStyle('visibility','hidden');var fx=new Fx.Tween(box);fx.pause();fx.start('opacity',box.getStyle('opacity'),0);if(box._caller)box._caller.removeClass('show');}},this);jaboxoverlay.setStyle('display','none');});}
caller.blur();box=$(box);if(!box)return;if($(caller))box._caller=$(caller);if(!jaboxes.contains(box)){jaboxes.include(box);}
if(box.getStyle('display')=='none'){box.setStyles({display:'block',opacity:0});}
if(box.status=='show'){box.status='hide';box.setStyle('visibility','hidden');var fx=new Fx.Tween(box);fx.pause();fx.start('opacity',box.getStyle('opacity'),0);if(box._caller)box._caller.removeClass('show');jaboxoverlay.setStyle('display','none');}else{jaboxes.each(function(box1){if(box1!=box&&box1.status=='show'){box1.status='hide';box1.setStyle('visibility','hidden');var fx=new Fx.Tween(box1);fx.pause();fx.start('opacity',box1.getStyle('opacity'),0);if(box1._caller)box1._caller.removeClass('show');}},this);box.status='show';box.setStyle('visibility','visible');var fx=new Fx.Tween(box,{onComplete:function(){if($(focusobj))$(focusobj).focus();}});fx.pause();fx.start('opacity',box.getStyle('opacity'),1);if(box._caller)box._caller.addClass('show');jaboxoverlay.setStyle('display','block');}};

/*  */
/*
		GNU General Public License version 2 or later; see LICENSE.txt
*/
Object.append(Browser.Features,{inputemail:function(){var a=document.createElement("input");a.setAttribute("type","email");return a.type!=="text"}()});
var JFormValidator=new Class({initialize:function(){this.handlers={};this.custom={};this.setHandler("username",function(a){regex=/[<|>|"|'|%|;|(|)|&]/i;return!regex.test(a)});this.setHandler("password",function(a){regex=/^\S[\S ]{2,98}\S$/;return regex.test(a)});this.setHandler("numeric",function(a){regex=/^(\d|-)?(\d|,)*\.?\d*$/;return regex.test(a)});this.setHandler("email",function(a){regex=/^[a-zA-Z0-9._-]+(\+[a-zA-Z0-9._-]+)*@([a-zA-Z0-9.-]+\.)+[a-zA-Z0-9.-]{2,4}$/;return regex.test(a)});$$("form.form-validate").each(function(a){this.attachToForm(a)},
this)},setHandler:function(a,b,c){this.handlers[a]={enabled:c==""?!0:c,exec:b}},attachToForm:function(a){a.getElements("input,textarea,select,button").each(function(a){a.hasClass("required")&&(a.set("aria-required","true"),a.set("required","required"));if((document.id(a).get("tag")=="input"||document.id(a).get("tag")=="button")&&document.id(a).get("type")=="submit"){if(a.hasClass("validate"))a.onclick=function(){return document.formvalidator.isValid(this.form)}}else if(a.addEvent("blur",function(){return document.formvalidator.validate(this)}),
a.hasClass("validate-email")&&Browser.Features.inputemail)a.type="email"})},validate:function(a){a=document.id(a);if(a.get("disabled"))return this.handleResponse(!0,a),!0;if(a.hasClass("required"))if(a.get("tag")=="fieldset"&&(a.hasClass("radio")||a.hasClass("checkboxes")))for(var b=0;;b++)if(document.id(a.get("id")+b)){if(document.id(a.get("id")+b).checked)break}else return this.handleResponse(!1,a),!1;else if(!a.get("value"))return this.handleResponse(!1,a),!1;b=a.className&&a.className.search(/validate-([a-zA-Z0-9\_\-]+)/)!=
-1?a.className.match(/validate-([a-zA-Z0-9\_\-]+)/)[1]:"";if(b=="")return this.handleResponse(!0,a),!0;if(b&&b!="none"&&this.handlers[b]&&a.get("value")&&this.handlers[b].exec(a.get("value"))!=!0)return this.handleResponse(!1,a),!1;this.handleResponse(!0,a);return!0},isValid:function(a){for(var b=!0,a=a.getElements("fieldset").concat(Array.from(a.elements)),c=0;c<a.length;c++)this.validate(a[c])==!1&&(b=!1);(new Hash(this.custom)).each(function(a){a.exec()!=!0&&(b=!1)});return b},handleResponse:function(a,
b){b.labelref||$$("label").each(function(a){if(a.get("for")==b.get("id"))b.labelref=a});a==!1?(b.addClass("invalid"),b.set("aria-invalid","true"),b.labelref&&(document.id(b.labelref).addClass("invalid"),document.id(b.labelref).set("aria-invalid","true"))):(b.removeClass("invalid"),b.set("aria-invalid","false"),b.labelref&&(document.id(b.labelref).removeClass("invalid"),document.id(b.labelref).set("aria-invalid","false")))}});document.formvalidator=null;
window.addEvent("domready",function(){document.formvalidator=new JFormValidator});

