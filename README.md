trello_list_progressbar
=======================

Adds a progress bar to trello on individual card list to track progress of individual tasks.

Extension helps to give a quick overview of the current list status.

It adds a progress bar to show the cumulative  percentage of completion of individual cards on a list . 

If the due dates are set on the individual card item, extension calculates the total number of days allocated for entire items in the card list and based on the today's date show the percentage of time depleted .

Use Case

you have N tasks to be completed for a milestone which started from D1 and ends on D2  on any day  D [ D1 <= D <= D2 ]  . you can see the percentage completion of tasks to the  percentage of total time finished. So if the percentage of completion of taks is .

Support:

The plugin is available as a chrome extension.

Other browsers can make use of the Bookmarklet

javascript:(function(){var s=document.createElement("script");s.type="text/javascript";s.src="https://s3.amazonaws.com/cgs-dev/trello.js?r=6";document.body.appendChild(s)})() 