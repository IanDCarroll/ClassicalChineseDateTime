/* solar & lunar carlulator
 * this code returns the Chinese calendar year and month.
 *    1. The new moon in ms relative to UTC 1/1/1970 00:00:00:000
 *    2. The 24 solar terms of CCT as above.
 * this data can then be passed to TempConV2.js to calculate the year, 
 * month, xun, and day along with any intercalary months, and whether those  * months are long (30 days) or short (29)
 *
 * Avg Synodic Month  = 	  2551442802 ms
 * Mean Tropical Year = 	 31556925000 ms
 * ms to next great Solar Term =  2629743750 ms
 * ms to next Solar Term = 	  1314871875 ms
 * Closest Winter Solstice to      UTC 1/1/1970 00:00:000 = 
 *	UTC 22/12/1969 00:44:00 = -861360000 ms
 *
 * New Year = 2nd New Moon after winter Solstice
 * New Year 1970 = UTC 6/2/1970 07:00:000 
 * 	China Timezone UTC +8, -1 because CCT new day starts at 23:00
 *	so UTC +7 for China-centric New year start time.
 */
