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

//rough draft, but kinda working. pollish to come. don't judge me.
function convToEast(ms) {
    var miao = 0,
	fen = 0,
	xiaoKe = 0,
	ke = 0,
	shiChen = 0,
	day = 0; 

    miao = ms / 144;

    if (miao >= 100) {
	fen = miao / 100;
    } if (miao >= 1000) {
	xiaoKe = miao / 1000;
    } if (miao >= 6000) {
	ke = miao / 6000;
    } if (miao >= 50000) {
	shi = miao / 50000;
    } if (miao >= 600000) {
	day = miao / 600000;
    }

    return day + ":" + shiChen + ":" + ke + ":" + xiaoKe + ":" + fen + ":" + miao;
}

//maual tests:
console.log(convToEast(86400000));
console.log(convToEast(86411235));
console.log(convToEast(7200000));
console.log(convToEast(7274656));
console.log(convToEast(864000));
console.log(convToEast(864451));
console.log(convToEast(144000));
console.log(convToEast(144238));
console.log(convToEast(14400));
console.log(convToEast(14442));
console.log(convToEast(6048));
console.log(convToEast(144));
