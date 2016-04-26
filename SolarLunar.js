/* solar & lunar carlulator
 * this code returns the Chinese calendar year and month.
 *    1. The new moon in ms relative to UTC 1/1/1970 00:00:00:000
 *    2. The 24 solar terms of CCT as above.
 * this data can then be passed to TempConV2.js to calculate the year, 
 * month, xun, and day along with any intercalary months, and whether those  * months are long (30 days) or short (29)
 *
 * Avg Synodic Month  = 	   2551442802 ms
 * Mean Tropical Year = 	  31556925000 ms
 * ms to next great Solar Term =   2629743750 ms
 * ms to next Solar Term = 	   1314871875 ms
 *
 * Closest Winter Solstice to      UTC 1/1/1970 00:00:000 = 
 *	UTC 22/12/1969 00:44:000 = -861360000 ms
 * Closest New Moon to 		   UTC 1/1/1970 00:00:000 =
 *	UTC 07/01/1970 20:35:000 =  592500000 ms
 *
 * FEAR: Avg and Mean times may not be accurate enough, but what to do about * chaotic perturbations in the orbits of the celestial bodies? :/
 *
 * New Year = 2nd New Moon after winter Solstice
 * New Year starts at 23:00:000 because CC Days start then 
 * (unless Daylight savings, then its 00:00:000 again)
 */

//todo: remember Chinese days start at UTC -1 Hours! 
//Make sure to account for it! (first func: ms + 1 hr)
//todo: retool functions so they can handle dates before 1970.

//constants:
var wSOffset = -861360000,
    nMOffset =  592500000,
    mTropYr = 31556925000,
    synodMo =  2551442802,
    day =        86400000,
    SolTerm = mTropYr / 24,
    majSTrm = mTropYr / 12;

//returns the starting time (ms) for the last chinese new year
//will be used as the starting point for the Chinese Date
function getYearLast(ms) {
	//gets the # of months since 1970.
    var moonNum = Math.floor((ms - nMOffset) / synodMo),
	//gets the # of winters since 1969.
	winterNum = Math.floor((ms - wSOffset) / mTropYr),
	//gets the date in ms of the last solstice
	winterLast = winterNum * mTropYr,
	//a counter for the loop
	moonCount = ms,
	//an important piece of the puzzle to get CCC 1/1
	moonFrag = 0,
	//ms precise start of newest new year.
	rawYearLast = 0,
	//more useful day precise start of new year.
	yearLast = 0;

    for (var i = 0; i < moonNum; i++) {
	if (moonCount < (winterLast + synodMo)) {
	    moonFrag = moonCount - winterLast;
	    break;
	} else {
	    moonCount -= synodMo;
	}
    }

    rawYearLast = winterLast + moonFrag + synodMo;
    yearLast = (Math.floor(rawYearLast / day)) * day;
    return yearLast; 
}

//doesn't yet identify which are intercalary months. Sometimes there's a month 13 here. todo: use majSTrm to identify the intercalary (run) month.
function getMonth(ms) {
    var monthNum = Math.floor((ms - getYearLast(ms)) / synodMo);
    return monthNum;
}
