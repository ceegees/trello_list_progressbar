var _gaq = _gaq || [];
_gaq.push(['_setAccount', 'UA-30327290-1']);

(function() {
  	var ga = document.createElement('script'); ga.type = 'text/javascript'; ga.async = true;
  	ga.src = 'https://ssl.google-analytics.com/ga.js';
  	var s = document.getElementsByTagName('script')[0]; s.parentNode.insertBefore(ga, s); 
})();

chrome.extension.onMessage.addListener(
  function(request, sender, sendResponse) {
  	_gaq.push(['_trackEvent',request.category,request.action,request.label,request.value]);
    sendResponse({status:true});
 });