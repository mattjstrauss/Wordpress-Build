function youtube(){function e(e){e.target.playVideo(),e.target.seekTo(0,!0);var t=document.getElementById("play-button");t.addEventListener("click",function(){a.playVideo()}),$iframe=a.getIframe(),console.log($iframe)}function t(e){e.data==YT.PlayerState.UNSTARTED||(e.data==YT.PlayerState.PLAYING?($(".slide").addClass("active-media"),console.log("playing")):e.data==YT.PlayerState.PAUSED?(paused=!0,setTimeout(function(){1==paused&&($(".slide").removeClass("active-media"),console.log(paused))},100),console.log("paused")):e.data==YT.PlayerState.ENDED?(console.log("ended"),$(".slide").removeClass("active-media"),a.pauseVideo().seekTo(0,!0)):e.data==YT.PlayerState.BUFFERING?(paused=!1,console.log("buffering"),console.log(paused)):e.data==YT.PlayerState.CUED&&console.log("video cued"))}var a;a=new YT.Player("video",{events:{onReady:e,onStateChange:t}})}function vimeo(){$iframe=$(".slick-current iframe"),$playButton=$(".play-button");var e=new Vimeo.Player($iframe);$playButton.on("click",function(t){e.play()}),e.on("pause",function(e){$(".slide").removeClass("active-media")})}$(document).ready(function(){$accordion=$(".accordion-component"),$accordionPanel=$(".accordion-panel"),$panelButton=$(".panel-heading button"),$panelContent=$(".accordion-panel .panel-content"),$accordionPanel.each(function(){$this=$(this),$this.addClass("inactive-panel"),$this.hasClass("inactive-panel")&&($currentPanelContent=$this.find(".panel-content"),TweenMax.to($currentPanelContent,0,{height:0}),$panelButton.attr({"aria-expanded":"false"}),$panelContent.attr({"aria-hidden":"true"}))}),$panelButton.on("click",function(e){function t(){TweenMax.from($currentPanelContent,.3,{height:0})}e.preventDefault(),$this=$(this),$currentPanel=$this.closest(".accordion-panel"),$currentPanelContent=$currentPanel.find(".panel-content"),$headerHeight=$(".site-header").outerHeight(),$currentPanel.hasClass("inactive-panel")?($panelButton.attr({"aria-expanded":"false"}),$this.attr({"aria-expanded":"true"}),$panelContent.attr({"aria-hidden":"true"}),$currentPanelContent.attr({"aria-hidden":"false"}),$accordionPanel.removeClass("active-panel").addClass("inactive-panel"),TweenMax.to($panelContent,.3,{height:0}),$currentPanel.removeClass("inactive-panel").addClass("active-panel"),TweenMax.set($currentPanelContent,{height:"auto",onComplete:t()}),setTimeout(function(){$("html, body").animate({scrollTop:$this.offset().top-$headerHeight},300)},300)):($this.attr({"aria-expanded":"false"}),$currentPanelContent.attr({"aria-hidden":"true"}),TweenMax.to($currentPanelContent,.2,{height:0}),$currentPanel.addClass("inactive-panel").removeClass("active-panel"))})}),$(document).ready(function(){$(".multimedia-carousel").each(function(){$this=$(this),$(".carousel-slides",$this).slick({arrows:!1,dots:!1,lazyLoad:"ondemand",asNavFor:$(".carousel-thumbs",$this)}),$(".carousel-thumbs",$this).slick({slidesToShow:3,slidesToScroll:1,asNavFor:$(".carousel-slides",$this),dots:!1,arrows:!1,centerMode:!0,focusOnSelect:!0}),$(".carousel-slides",$this).on("lazyLoaded",function(e,t,a,n){a.closest(".slide-poster").addClass("loaded")}),$(".carousel-slides",$this).on("beforeChange",function(e,t,a,n){$(".slick-current").removeClass("active-media")}),$(".carousel-slides",$this).on("afterChange",function(e,t,a,n){$(".slide-object").empty(),$(".slide").removeClass("active-media")})}),$(document).keyup(function(e){27==e.keyCode&&(e.preventDefault(),$slideObject.empty(),$(".slide").removeClass("active-media"))});$playButton=$(".play-button"),$iframe=$(".slick-current iframe"),$playButton.on("click",function(e){if(e.preventDefault(),$(this).closest(".slide").addClass("active-media"),$iframe=$(".slick-current iframe"),$slideType=$(this).closest(".slide").attr("data-type"),$slideObject=$(this).closest(".slide").find(".slide-object"),$videoId=$(this).closest(".slide").find(".video").attr("data-id"),$embedUrl=$(this).closest(".slide").find(".iframe").attr("data-embed"),"youtube"==$slideType){if(!$('script[src="https://www.youtube.com/iframe_api"]').length){var t=document.createElement("script");t.src="https://www.youtube.com/iframe_api";var a=document.getElementsByTagName("script")[0];a.parentNode.insertBefore(t,a)}$iframe.length||($slideObject.html('<iframe id="video" src="//www.youtube.com/embed/'+$videoId+'?&enablejsapi=1" frameborder="0" allowfullscreen allow-same-origin allow-scripts></iframe>'),setTimeout(function(){youtube()},1e3))}else if("vimeo"==$slideType){if(!$('script[src="https://player.vimeo.com/api/player.js"]').length){var t=document.createElement("script");t.src="https://player.vimeo.com/api/player.js";var a=document.getElementsByTagName("script")[0];a.parentNode.insertBefore(t,a)}$iframe.length||($slideObject.html('<iframe src="//player.vimeo.com/video/'+$videoId+'?autoplay=1" frameborder="0" webkitallowfullscreen mozallowfullscreen allowfullscreen></iframe>'),setTimeout(function(){vimeo()},1e3))}else"matterport"==$slideType&&($iframe.length||($slideObject.html('<iframe src="'+$embedUrl+'" frameborder="0" allowfullscreen></iframe>'),$(".slide .close-button").on("click",function(e){e.preventDefault(),$slideObject.empty(),$(".slide").removeClass("active-media")})))})}),$(document).ready(function(){$("body").removeClass("loading")}),$(document).ready(function(){$(".site-header").headroom({offset:100,tolerance:0,tolerance:{up:5,down:10},classes:{initial:"header",pinned:"header-pinned",unpinned:"header-unpinned",top:"header-top",notTop:"header-not-top",bottom:"header-bottom",notBottom:"header-not-bottom"}})}),$(document).ready(function(){$menuGroup=$(".main-menu .menu"),$(".main-menu .caret").on("click",function(e){e.preventDefault(),$this=$(this),$breadcrumbWrapper=$(".breadcrumb-wrapper"),$breadcrumb=$(".breadcrumb"),$breadcrumbText=$this.prev(".link-text"),$breadcrumbText=$breadcrumbText.text(),$breadcrumbItem=$('<a href="#" class="breadcrumb">'+$breadcrumbText+"</a>"),$breadcrumbWrapper.length?($breadcrumbWrapper.append($breadcrumbItem),$breadcrumbHeight=$breadcrumbItem.height()):($('<div class="breadcrumb-wrapper"></div>').insertBefore(".main-menu").append($breadcrumbItem),$breadcrumbHeight=$breadcrumbItem.height()),console.log($breadcrumbHeight),$(".main-menu").css({top:$breadcrumbHeight}),$menuGroup.removeClass("active-menu-group"),$this.closest(".menu").addClass("inactive-menu-group"),$this.parent().next(".menu").addClass("active-menu-group")}),$(document).on("click",".breadcrumb",function(e){e.preventDefault(),$this=$(this),$index=$this.index(".breadcrumb"),$breadcrumbHeight=$this.outerHeight,$breadcrumbWrapper=$(".breadcrumb-wrapper"),$menuGroup.removeClass("active-menu-group"),$(".site-navigation").find(".menu").slice($index).removeClass("inactive-menu-group"),$(".site-navigation").find(".menu").eq($index).removeClass("inactive-menu-group").addClass("active-menu-group"),$this.is(":first-child")?($breadcrumbWrapper.fadeOut().remove(),$(".main-menu").css({top:0})):$this.fadeOut().remove()})}),$(document).ready(function(){$scrollableTable=$(".scrollable-table"),$scrollableTable.each(function(){$table=$(this),$table.scroll(function(){$currentTable=$(this),$distanceX=$table.scrollLeft(),$distanceY=$table.scrollTop(),$distanceX>0?($rowLabel=$table.find("tr th:first-child"),$columnLabel=$table.find("thead tr"),$currentTable.hasClass("scroll-y")||($currentTable.addClass("scroll-x"),$rowLabel.each(function(){$(this).css({transform:"translateX("+$distanceX+"px)"})}))):($rowLabel.each(function(){$(this).removeAttr("style")}),$currentTable.removeClass("scroll-x")),$distanceY>0?($rowLabel=$table.find("tbody tr th:first-child"),$columnLabel=$table.find("thead tr"),$currentTable.hasClass("scroll-x")||($currentTable.addClass("scroll-y"),$columnLabel.each(function(){$(this).css({transform:"translateY("+$distanceY+"px)"})}))):($columnLabel.each(function(){$(this).removeAttr("style")}),$currentTable.removeClass("scroll-y"))})})}),$(document).ready(function(){$(".tabs-component").each(function(){var e=$(this),t=(e.find(".tab-list"),e.find(".tab-panel")),a=e.find(".tab-list button"),n=e.find(".panel-label");$(window).width()>768&&(a.first().attr({"aria-selected":"true"}).addClass("active-tab"),t.first().attr({"aria-hidden":"true"}).addClass("active-content")),a.on("click",function(e){e.preventDefault(),$this=$(this),$tabIndex=$this.index(),$tabTarget=t.eq($tabIndex),a.attr({"aria-selected":"false"}).removeClass("active-tab"),$this.attr({"aria-selected":"true"}).addClass("active-tab"),t.attr({"aria-hidden":"false"}).removeClass("active-content"),$tabTarget.attr({"aria-hidden":"true"}).addClass("active-content")}),n.on("click",function(e){e.preventDefault(),$this=$(this),$labelTarget=$this.closest(t),$labelTarget.hasClass("active-content")?$labelTarget.attr({"aria-hidden":"false"}).removeClass("active-content"):(t.attr({"aria-hidden":"false"}).removeClass("active-content"),$labelTarget.attr({"aria-hidden":"true"}).addClass("active-content"),setTimeout(function(){$headerHeight=$(".site-header").outerHeight(),$("html, body").animate({scrollTop:$this.offset().top-$headerHeight},300)},300))})})});