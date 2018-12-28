function imgToInlineSvg() {

    $('img.inline-svg').each(function(){

        var $img = $(this);
        var imgID = $img.attr('id');
        var imgClass = $img.attr('class');
        var imgURL = $img.attr('src');
     
        $.get(imgURL, function(data) {
            /* Get the SVG tag, ignore the rest */
            var $svg = $(data).find('svg');
     
            /* Add replaced image's ID to the new SVG */
            if(typeof imgID !== 'undefined') {
                $svg = $svg.attr('id', imgID);
            }
     
            /* Add replaced image's classes to the new SVG */
            if(typeof imgClass !== 'undefined') {
                $svg = $svg.attr('class', imgClass+' replaced-svg');
            }
     
            /* Remove any invalid XML tags as per http://validator.w3.org */
            $svg = $svg.removeAttr('xmlns:a');
     
            /* Replace image with new SVG */
            $img.replaceWith($svg);
     
        }, 'xml');
     
    });

    // $.get("/content/themes/settlementmusic/img/spritemap.svg", function(data) {
    //   var div = document.createElement("div");
    //   div.innerHTML = new XMLSerializer().serializeToString(data.documentElement);
    //   div.style.display='none';
    //   document.body.insertBefore(div, document.body.childNodes[0]);
    // });

}