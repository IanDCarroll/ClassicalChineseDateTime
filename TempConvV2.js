/* Temporal Converter Version 2.0
 * Like the previous version this is open source, please refer to the license
 * for details.
 * Temporal Converter converts Modern Western to Classical Chinese
 * systems of time measurement. Future versions may do the reverse, or allow
 * more generalized methods for converting to other non-standard time systems.
 * Version 2.0 is intended to give more accurate time information, down to the
 * millisecond. And access the JS Date function for greater utility.
 */

/* Conversion chart for millisenconds:
 * 1 Miao =         144 ms (100 per Fen)
 * 1 Fen =        14400 ms (500 per Shi, 60 per Ke)
 * 1 XiaoKe =    144000 ms (50 per Shi)
 * 1 Ke =        864000 ms (100 per Day)
 * 1 ShiChen =  7200000 ms (12 per Day)
 * 1 Day =     86400000 ms
 * Xun are varriable, some have 10 and some have 9 days.
 * 1 Xun =    864000000 ms -or-
 *            777600000 ms (3 per month)
 * Months are variable, some have 30 and some have 29 days.
 * 1 Month = 2592000000 ms -or-
 *           2505600000 ms (12 or 13 per year)
 * Years are varriable, some have leap months added to them.
 * 1 Year = 12 or 13 Months (In rare cases, 14)
 * 1 Sixtyear = 60 years
 * 1 Great Cycle = 3 sixtyears
 * The first day of the first year of the first Great Cycle was in 2697 BC.
 */

//public data table
var temprlAry = [];

//the core converter. Uses ms because that's the base time unit in Date().
function convToCCT(ms) {
    var rawMiao = 0,
	miao = 0,
	fen = 0,
	xiaoKe = 0,
	ke = 0,  
	shiChenNum = 0,
	day = 0,
	localAry = [];

    rawMiao = ms / 144;
    miao = Math.floor(rawMiao) % 100;

    if (rawMiao >= 100) {
	fen = Math.floor(rawMiao / 100) % 60;
    } if (rawMiao >= 1000) {
	xiaoKe = Math.floor(rawMiao / 1000) % 50;
    } if (rawMiao >= 6000) {
	ke = Math.floor(rawMiao / 6000) % 100;
    } if (rawMiao >= 50000) {
	shiChenNum = Math.floor(rawMiao / 50000) % 12;
    } if (rawMiao >= 600000) {
	day = Math.floor(rawMiao / 600000);
    }

    localAry.push(day, shiChenNum, ke, xiaoKe, fen, miao);
    temprlAry = localAry;
    return temprlAry;
}

//separating out display from calc so it's easy to delete.
function displayCCT (ms) {
    convToCCT(ms);

    var shiChen = "";

    switch(temprlAry[1]) {
	case 0:
	    shiChen = "Zi";
	    break;
	case 1:
	    shiChen = "Chou";
	    break;
	case 2:
	    shiChen = "Yin";
	    break;
	case 3:
	    shiChen = "Mao";
	    break;
	case 4:
	    shiChen = "Chen";
	    break;
	case 5:
	    shiChen = "Si";
	    break;
	case 6:
	    shiChen = "Wu";
	    break;
	case 7:
	    shiChen = "Wei";
	    break;
	case 8:
	    shiChen = "Shen";
	    break;
	case 9:
	    shiChen = "You";
	    break;
	case 10:
	    shiChen = "Xu";
	    break;
	case 11:
	    shiChen = "Hai";
	    break;
    }

    var display = "Day " + temprlAry[0] + ", " 
		+ shiChen + ":" + temprlAry[3] + " Shi, " 
		+ "Ke " + temprlAry[2] + ":" + temprlAry[4] + ":" 
		+ temprlAry[5] + " o'day.";

    return display;
}

function getCCTNow() {
    var nowUTC = new Date,
	nowUTCms = Date.parse(nowUTC),
	//60,000ms = the minutes of Timezone offset
	//The 3,600,000 is the hour earlier that Classical Chinese time 
	//recons the start of day (11pm)
	nowTZ = -(nowUTC.getTimezoneOffset() * 60000 - 3600000),
	now = nowUTCms + nowTZ;

    return displayCCT(now);
}

//maual tests:
console.log(getCCTNow());
console.log(Date());
