gTrelloPluginType = 'chrome_extension';
var gTrelloPluginTracker = {
	_trackEvent : function(cat,action,label,value) {
		chrome.extension.sendMessage({category: cat,
			action:action,
			label:label,
			value:value }, function(response) {
		});
	},
	_trackPageview : function() {

	}
};

