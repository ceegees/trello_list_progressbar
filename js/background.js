var _gaq = _gaq || [];
_gaq.push(['_setAccount', 'UA-30327290-2']);
(function() {
  	var ga = document.createElement('script'); ga.type = 'text/javascript'; ga.async = true;
  	ga.src = 'https://ssl.google-analytics.com/ga.js';
  	var s = document.getElementsByTagName('script')[0];
  	s.parentNode.insertBefore(ga, s); 
})();

chrome.extension.onMessage.addListener(
  function(request, sender, sendResponse) {
    var data = {status:true};
    if (request.type == 'status_query') {
        data.result = localStorage[request.name];
    } else if (request.type =='event') {
      _gaq.push(['_trackEvent',request.category,request.action,request.label,request.value]);
    } else {
      _gaq.push(['_trackPageview',request.url]);
    }
    sendResponse(data);
 });
