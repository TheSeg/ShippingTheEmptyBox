/*! ShippingTheEmptyBox - v0.1.0
* https://github.com/TheSeg/ShippingTheEmptyBox
* Copyright (c) 2017 ; Licensed Creative Commons (CA-BY-SA) */
(function($){
  
  // Grunticon
  var baseurl = $("meta[property='baseurl']").attr("content");
  var grunticonRoot = baseurl+'dist/svg/';
  grunticon([ grunticonRoot+'icons.data.svg.css', grunticonRoot+'icons.data.png.css', grunticonRoot+'icons.fallback.css' ]);
  
})(jQuery);