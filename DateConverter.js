/* solar & lunar calculator
 * this code returns the Chinese calendar date 
 * from ms relative to UTC 1/1/1970 00:00:00:000
 *
 * this data can then be passed to TempConV2.js to get the CC Time 
 *
 * notes:
 * Avg Synodic Month           =   2551442802 ms
 * Mean Tropical Year          =  31556925000 ms
 * ms to next great Solar Term =   2629743750 ms
 * ms to next Solar Term       =   1314871875 ms
 *
 * Closest CC new day to	   UTC 1/1/1970 00:00:000 =
 *	UTC 31/12/1969 23:00:000 =   -3600000 ms
 * Closest Winter Solstice to      UTC 1/1/1970 00:00:000 = 
 *	UTC 22/12/1969 00:44:000 = -861360000 ms
 * Closest New Moon to 		   UTC 1/1/1970 00:00:000 =
 *	UTC 07/01/1970 20:35:000 =  592500000 ms
 *
 * FEAR: Avg and Mean times may not be accurate enough, but what to do about
 * chaotic perturbations in the orbits of the celestial bodies? :/
 *
 * New Year = 2nd New Moon after winter Solstice
 * New Year starts at 23:00:000 because CC Days start then 
 * (unless Daylight savings, then its 00:00:000 again)
 */

//todo: retool functions so they can handle dates before 1970.

//constants:
var zHOffset =   -3600000,
    wSOffset = -861360000,
    nMOffset =  592500000,
    day     =    86400000,
    mTropYr = 31556925000,
    synodMo =  2551442802,
    SolTerm = mTropYr / 24,
    majSTrm = mTropYr / 12;

//gets the ms useable time of the start of the last CC day, at 23:00 UTC
function getDayLast(ms) {
    var dayLast = Math.floor((ms - zHOffset) / day) * day;
    return dayLast;
}

//returns the ms useable time of the most recent winter solstice 
function getWinterLast(ms) {
    var winterlast = Math.floor((ms - wSOffset) / mTropYr) * mTropYr;
    return winterLast; 
}

//returns the most recent new moon
function getMoonLast(ms) {
    var moonLast = Math.floor((ms - nMOffset) / synodMo) * synodMo;
    return moonLast;
}

//gets the ms usable date of the last major solar term.
function getMSTLast(ms) {
    var mSTLast = Math.floor((ms - wSOffset) / majSTrm) * majSTrm;
    return mSTLast;
}

//returns the starting time of the new moon 
//in ms for the last chinese new year
function getYearLast(ms) {
	//gets the # of months since 1970.
    var moonNum = Math.floor((ms - nMOffset) / synodMo),
	//a counter for the loop
	moonCount = getMoonLast(ms) + synodMo,
	//an important piece of the puzzle to get CCC 1/1
	moonFrag = 0,
	//ms precise start of newest new year.
	moonYearLast = 0,

    for (var i = moonNum; i > 0; i--) {
	if (moonCount < (getWinterLast(ms) + synodMo)) {
	    moonFrag = moonCount - getWinterLast(ms);
	    break;
	} else {
	    moonCount -= synodMo;
	}
    }

    //Chinese new year is the 2nd new moon after the winter solstice
    moonYearLast = getWinterLast(ms) + moonFrag + synodMo;
    
    return moonYearLast; 
}

//todo: make month not count from the artificial start of day.
//returns the CC month
function getMonth(ms) {
    var moonNum = Math.ceil((ms - getYearLast(ms)) / synodMo);

	moonNext = getMoonLast(ms) + synodMo,
	mSTLast = getMSTLast(moonNext),

	month = moonNum,
	monthAry = [];

    //tests if it's the first month
    if (moonNum) {
	for (var i = 0; i < moonNum; i++) {
	    //tests if it's a run (intercalary) month
	    if (moonNext - mSTLast > synodMo) {
	        monthAry.unshift("run" + month);
		moonNext -= synodMo;
	    } else {
	        month -= 1;
		monthAry.unshift(month);
		moonNext -= synodMo;
	    }
	}
    } else {
	monthAry.push(month);
    }

    return monthAry.pop();
}

//returns the CC day of the month.
//worry: should getMoonLast be day-truncated in this case?
function getDay(ms) {
    var dayOfMonth = Math.ceil((ms - getMoonLast(ms)) / day);
    return dayOfMonth;
}

//returns the CC "week" which is 10 or 9 days long depending.
//only the lower xun is ever 9 in the case of a 29 day month.
function getXun(ms) {
    var xunNum = Math.ceil(getDay(ms) / 10),
	xun = "";
    switch (xunNum) {
	case 1:
	    xun = "Upper Xun";
	    break;
	case 2:
	    xun = "Middle Xun";
	    break;
	default:
	    xun = "Lower Xun";
	    break;
    }
    return xun;
}

function getTime(ms) {
    var msTime = (ms - zHOffset) % day;
    return msTime;
}
