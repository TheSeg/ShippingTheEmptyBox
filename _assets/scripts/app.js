/* global grunticon */
(function($){
  
  // Grunticon
  var baseurl = $("meta[property='baseurl']").attr("content");
  var grunticonRoot = baseurl+'dist/svg/';
  grunticon([ grunticonRoot+'icons.data.svg.css', grunticonRoot+'icons.data.png.css', grunticonRoot+'icons.fallback.css' ]);
  
})(jQuery);