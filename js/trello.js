
var months = { 
	'JAN' : { pos : 1 , days : 31 },
	'FEB' : { pos : 2 , days : 28 }, 
	'MAR' : { pos : 3 , days : 31 },
	'APR' : { pos : 4,  days : 30 },
	'MAY' : { pos : 5,  days : 31 },
	'JUN' : { pos : 6,  days : 30 },
	'JUL' : { pos : 7,  days : 31 },
	'AUG' : { pos : 8,  days : 31 }, 
	'SEP' : { pos : 9,  days : 30 },
	'OCT' : { pos : 10, days : 31 },
	'NOV' : { pos : 11, days : 30 },
	'DEC':  { pos : 12, days : 31 },
	'JAN2': { pos : 13, days : 31 },
}

function dateDifference(monBig,dayBig,monSmall,daySmall) {
	if (monBig == monSmall) {
		return dayBig - daySmall;
	}
	if (monBig == 'JAN') {
		monBig = 'JAN2';
	}
	return 10;

	var diff = 0;
	for(key in months) {
		if (key == monSmall) {
			diff = months[monSmall].days - daySmall;
		} else if (key == monBig) {
			diff += dayBig;
			break;
		} else {
			diff += months[key].days;
		}
	}
	return diff;
}

function isFirstAfterSecond(monFirst,dayFirst, monSecond,daySecond) {
	if (months[monFirst].pos == months[monSecond].pos) {
		return dayFirst > daySecond;
	} else if (monFirst == 'DEC' && monSecond == 'JAN') {
		return false;
	}
	return months[monFirst].pos > months[monSecond].pos;
}

function trelloPluginUpdateProgress() {
	var clsTrelloListProgress = '.trello-list-progress';
	var clsTrelloCard = '.list-card';
	var clsTrelloList = '.list';
	var clsTrelloIconCheckList = '.icon-checklist'
	var clsTrelloBadgeText = '.badge-text';
	var clsTrelloIconClock = '.icon-clock';
	var dt = new Date();

	var todayMonth =  'JAN';

	for(var key in months) {
		if ((dt.getMonth() + 1) == months[key].pos) {
			todayMonth = key;
			break;
		}
	}
	var todayDate = dt.getDate();
	$(clsTrelloListProgress).remove(); //remove previous progressbars , calculate add again
	var cumulativeTotal = 0;
	$(clsTrelloList).each(function() {
		var progress = 0;
		var total = 0;
		var maxMon  = null;
		var maxDay = null;
		var minMon = null;
		var minDay = null;
		var leftMargin = 70; 
		/* We dont want to query trello API as the information 
		is already present on the cards parse it and use it.
		*/
		$(this).find(clsTrelloCard).each(function() {
			var checkList = $(this).find(clsTrelloIconCheckList);
			if (checkList.length > 0) {
				var countByTotal = checkList.parent().find(clsTrelloBadgeText).html()
				var counts = countByTotal.split("/");
				progress += parseInt(counts[0]);
				total  += parseInt(counts[1]);
			} else {
				total++;
			}

			var dueDate = $(this).find(clsTrelloIconClock);
			if (dueDate.length > 0) { // A due date is set
				var monthDay = dueDate.parent().find(clsTrelloBadgeText).html()
				var monthNDay = monthDay.split(" ");
				var mon = monthNDay[0].toUpperCase();
				var day = parseInt(monthNDay[1]);

				if (maxMon == null ) {
					maxMon = mon;
					maxDay = day;
				} else {
					if (!isFirstAfterSecond(maxMon,maxDay,mon,day)) {
						maxMon = mon;
						maxDay = day;
					}
				}

				if (minMon == null) {
					minMon = mon;
					minDay = day;
				} else {
					if (isFirstAfterSecond(minMon,minDay,mon,day)) {
						minMon = mon;
						minDay = day;
					}
				}
			}
		});

		if (total == 0) {
			total = 1; //handle NaN
		}

		progress = Math.floor(progress * 100 / total);
		cumulativeTotal += total;

		if ($(this).width() < 250) {
			leftMargin = 60;
		}
		$(this).find(".list-header").append(
			'<div class="task-progress-total gutter trello-list-progress" style="margin-left:'+leftMargin+'px;width:70%;margin-top:10px"> '
			+' <div class="progress-current" style="width: '+ progress +'%;"> '
			+'<span class="progress-percentage" style="width:75px;left:-70px	"> Task '+ progress +'%</span> </div> </div>');


		if (maxMon != null ){

			var dateRange = dateDifference(maxMon,maxDay,minMon,minDay);
			
			var daysPast = dateDifference(todayMonth ,todayDate,  minMon,minDay);
			if (dateRange == 0) {
				dateRange = 1;
			}
			if(!isFirstAfterSecond(todayMonth,todayDate,minMon,minDay) ) {
				daysPast = 0;
			}

			if(daysPast > dateRange) {
				daysPast = dateRange;
			}

			var timeProgress = Math.floor(daysPast *100/ dateRange);

			$(this).find(".list-header").append(
				'<div class="task-progress-total gutter trello-list-progress" style="margin-left:'+leftMargin+'px;width:70%;margin-top:10px"> '
				+' <div class="progress-current" style="border:solid red 1px; background:red;width: '+ timeProgress +'%;"> '
				+'<span class="progress-percentage " style="width:75px;left:-70px"> Time '+ timeProgress +'%</span> </div> </div>');
		}



	});

	if (typeof _gat != 'undefined' && typeof gTrelloPluginTracker == 'undefined') {
		gTrelloPluginTracker = _gat._createTracker('UA-30327290-1');	
	}
	if (gTrelloPluginTracker && gTrelloPluginTracker._trackEvent) {
		gTrelloPluginTracker._trackEvent('Trello','Progress_Update',gTrelloPluginType,cumulativeTotal);		
	}
		
}

var gTrelloPluginLoadAttemptCount = 0;

function trelloPluginDoFirstLoad() {

	if (typeof gTrelloPluginType == 'undefined') {
		gTrelloPluginType = 'bookmarklet';
	}

	if ($("#button-reload-progress").length != 0) {
		return;
	}
	try {

		$(".header-user").prepend('<a id="button-reload-progress" class="header-btn header-notifications" '
		+'title="Update Progress" href="#" >'
		+'  <span class="header-btn-text">Update List Progress</span> </a>');
		
		$("#button-reload-progress").click(trelloPluginUpdateProgress);

		trelloPluginUpdateProgress();
		if ($(".trello-list-progress").length == 0) {
			setTimeout(trelloPluginDoFirstLoad,3000)
		}
	}	catch(e) {
		if (gTrelloPluginLoadAttemptCount > 20 ) {
			return;
		}
		gTrelloPluginLoadAttemptCount++;
		setTimeout(trelloPluginDoFirstLoad,3000)
	}
}
setTimeout(trelloPluginDoFirstLoad,1000);

