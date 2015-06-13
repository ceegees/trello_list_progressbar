trello_list_progressbar
=======================

Functionality
--------------
Adds more statistical information about the different card lists on a trello board. Plugin calculates individual card weights based on the number of todo items [considers each todo item as a story point]. This weight is used to calculate different statistical data.


Download
---------------
https://chrome.google.com/webstore/detail/trello-list-progress-bar/klhahganeobopkelbdeljamclomlhhjg/details?hl=en


Use Case
--------------
you have N tasks to be completed for a milestone which started from D1 and ends on D2  on any day  D [ D1 <= D <= D2 ] .You can see the percentage completion of cards -[condiering the weight of the card] to the  percentage of total time finished. Which will convey a good deal about the health of target deadline for milestone.

If you are using trello in the "Todo" "Doing"  "Done" way the plugin shows the card distribution [there is an option to consider the todo weight and ignore the todo weightage ] on each of those lists as a pie chart. So that you can quickly get an idea about overall project status.
eg: If there are 10 cards on "Todo" , 10 on "Doing" ,30 on done "Done" - Todo: 20% , Doing : 20% , Done : 60% .


Supported browsers :
----------------------
The plugin is available as a chrome extension.

Other browsers can make use of the Bookmarklet 
javascript:(function(){var s=document.createElement("script");s.type="text/javascript";s.src="https://s3.amazonaws.com/cgs-dev/trello.js?r=6";document.body.appendChild(s)})();

Credits
---------------
 Raphael js - Used for plotting the pie chart
 
Version 1.9.1 & 1.9.2
----------------
* Updates for handling new Trello version changes 
 
Version 1.9
----------------
* Updates for handling new Trello version changes 

Version 1.8 
----------------
* Bug Fixes #1


Version 1.7
----------------
* Added Changes for accomodating the trello style changes

Version 1.6.3
----------------
* Added Options tab for turning off the pie chart . Options can be accessed from the extensions preference pane


Version 1.6.2
-----------------
* Bug fixes, removing unwanted js references


Version 1.6.1
----------------
* Hook to board load events from trello home page 


Version 1.6
----------------
* Hook to board change events to update progress without a reload.
* Hook to Filter change events to update progress.
* Add the card distribution pie chart to show count of cards on each board.
* Show legends with colors same as that of pie chart.
* Option to toggle the card distribution wrt individual Todo Items Or Number of cards in the list.


Version 1.5
---------------
* Adds a progress bar to trello on individual card list to track progress of individual tasks.
* Extension helps to give a quick overview of the current list status.
* It adds a progress bar to show the cumulative  percentage of completion of individual cards on a list . 
* If the due dates are set on the individual card item, extension calculates the total number of days allocated for entire items in the card list and based on the today's date show the percentage of time depleted .



