# Classical Chinese Date Time

As an inhabitant from an alternate timeline where The Song Dynasty did not fall to the Liao or the Mongols,
I need a form of time keeping that more accurately reflects my world-view,
So that I can orient myself in this parallel dimension by my own non-eurocentric reckoning.

### The Stopwatch Problem

Convert milliseconds to elapsed time as measured by our "visitor"
so that she doesn't have to do math in her head whenever some one says "5 Minutes".

Conversion chart for Classical Chinese time measurements:
 * 1 Miao =         144 ms (100 per Fen)
 * 1 Fen =        14400 ms (500 per ShiChen, 60 per Ke)
 * 1 Ke =        864000 ms (100 per Day)
 * 1 ShiChen =  7200000 ms (12 per Day)
  - Names 1:Zi 2:Chou 3:Yin 4:Mao 5:Chen 6:Si 7:Wu 8:Wei 9:Shen 10:You 11:Xu 12:Hai
 * 1 Day =     86400000 ms

### The Clock Problem

From the stopwatch, give her a clock that can give her the time of day in a form she understands.

 * Days in Classical Chinese reckoning begin at 11pm our time.
 * Historically, CLassical Chinese time never encountered the problem of time zones. By the time rails, telegraph lines and mechanical watches were introduced, western time reckoning "Scientifically" came with them. But "Wu" needs to still be noon.

### The Calendar Problem

She will need a way to figure out what year it is. Her world is at a vastly different technological progression. And it would be good to have the month, xun and day as well.

calendar date from ms relative to UTC 1/1/1970 00:00:00:000 

Conversion Chart for greater Classical Chinese time Measurements:
 * Avg Synodic Month           =   2551442802 ms
 * Mean Tropical Year          =  31556925000 ms
 * ms to next great Solar Term =   2629743750 ms
 * ms to next Solar Term       =   1314871875 ms

Anchor points for conversion:
 * Closest CC new day to	   UTC 1/1/1970 00:00:000 = UTC 31/12/1969 23:00:000 =   -3600000 ms
 * Closest Winter Solstice to      UTC 1/1/1970 00:00:000 = UTC 22/12/1969 00:44:000 = -861360000 ms
 * Closest New Moon to 		   UTC 1/1/1970 00:00:000 = UTC 07/01/1970 20:35:000 =  592500000 ms
 * The first day of the first year of the first Great Cycle was in 2697 BC.
 
Rules:
 * New Year = 2nd New Moon after winter Solstice
 * New Year starts at 23:00:000 because CC Days start then 
 * (unless Daylight savings, then its 00:00:000 again)

Rules needing more specifics:
 * Xun are varriable, some have 10 and some have 9 days.
 * 1 Xun =    864000000 ms -or-
 *            777600000 ms (3 per month)
 * Months are variable, some have 30 and some have 29 days.
 * 1 Month = 2592000000 ms -or-
 *           2505600000 ms (12 or 13 per year)
 * Years are varriable, some have Run ("leap") Months added to them.
 * 1 Year = 12 or 13 Months
 * 1 Sixtyear = 60 years
 * 1 Great Cycle = 3 sixtyears

