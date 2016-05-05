/* 
Takes a Gregorian Year and Era as arguments; 
Returns the name of the corresponding Sexagenary Stem/Branch Cycle Year.

The pure code minus html and side effects ==>
*/

//todo:add in greater detail: Months, Days, Hours, Minutes, Seconds
//todo:add time converter function in addition to date.
/*
Notes:
relationships:
1 year = 12 months = 36 xun = 360 days = 4320 shi = 34560 ke = 207360 fen = 20736000 miao
1 month = 3 xun = 30 days = 360 shi = 2880 ke = 17280 fen = 1728000 miao
1 xun = 10 days = 120 shi = 960 ke = 5760 fen = 576000 miao
1 day = 12 shi = 96 ke = 576 fen = 57600 miao
1 shi = 2 hours = 120 minutes = 7200 seconds = 8 ke = 48 fen = 4800 miao
1 ke = 15 minutes = 900 seconds = 6 fen = 600 miao
1 fen = 2.5 minutes = 150 seconds = 100 miao
1 miao = 1.5 seconds
*/

// A switchboard conversion chart; Takes a %60 code number and returns a Sexagenary Stem/Branch name.
function numStemBranch(number) {
	stemNum = number % 10;
	branchNum = number % 12;
	stem = "";
	branch = "";
	switch (stemNum) {
		case 1:
			stem = "Jia";
			break;
		case 2:
			stem = "Yi";
			break;
		case 3:
			stem = "Bing";
			break;
		case 4:
			stem = "Ding";
			break;
		case 5:
			stem = "Wu";
			break;
		case 6:
			stem = "Ji";
			break;
		case 7:
			stem = "Geng";
			break;
		case 8:
			stem = "Xin";
			break;
		case 9:
			stem = "Ren";
			break;
		default:
			stem = "Gui";
			break;
	}
	switch (branchNum) {	
		case 1:
			branch = "Zi";
			break;
		case 2:
			branch = "Chou";
			break;
		case 3:
			branch = "Yin";
			break;
		case 4:
			branch = "Mao";
			break;
		case 5:
			branch = "Chen";
			break;
		case 6:
			branch = "Si";
			break;
		case 7:
			branch = "Wu";
			break;
		case 8:
			branch = "Wei";
			break;
		case 9:
			branch = "Shen";
			break;
		case 10:
			branch = "You";
			break;
		case 11:
			branch = "Xu";
			break;
		default:
			branch = "Hai";
			break;
	}
	return stem + branch + "(" + number + ")";
}

//Massages the yearConverter number to get rid of those pesky negatives
function numPure(rawNum) {
	sixtyNum = 0
	switch (rawNum) {
	case 0:
	    sixtyNum = 60;
	    break;
	case -1:
	    sixtyNum = 59;
	    break;
	case -2:
	    sixtyNum = 58;
	    break;
	case -3:
	    sixtyNum = 60;
	    break;
	default:
	    sixtyNum += rawNum;
	    break;
	}
	return numStemBranch(sixtyNum);
}

// Controls the calibration of Gregorian Years to a %60 code number for numPure to massage the negaitves away and numStemBranch to convert.
// Rounds and ignores finer date/time information coming in the form of floats to get "just the year at that time".
// Accepts a single parameter (year) and assumes that to mean "AD" or "CE".
// era input is non-case-sensitive.
function yearConverter(year, era) {
	var number = 0;
	if (isNaN(year)) {
		return "Please enter an Indian Numeral for the year without quotation marks.";
	} else if ( era === undefined || (era.toUpperCase() === "AD" || era.toUpperCase() === "CE") && year >= 1) {
		number = (year - 3) % 60;
		return numPure(Math.floor(number));
 	} else if ((era === "BC" || era === "BCE") && year >= 1) {
		number = 60 - ((year + 2) % 60);
		return numPure(Math.ceil(number));
	} else if ((era !== "AD" && era !== "BC") && (era !== "CE" && era !== "BCE")) {
		return "Please enter either \"AD\", \"BC\", \"CE\", or \"BCE\" for the era.";
	} else {
		return "Please enter a positive non-zero number for the year.";
  	}
}



//for testing ==>
console.log("Basics ==>")
console.log(yearConverter(221, "BC"));
console.log(yearConverter(1983, "AD"));
console.log("Continuum ==>")
console.log(yearConverter(5, "BC"));
console.log(yearConverter(4, "BC"));
console.log(yearConverter(3, "BC"));
console.log(yearConverter(2, "BC"));
console.log(yearConverter(1, "BC"));
console.log(yearConverter(1, "AD"));
console.log(yearConverter(2, "AD"));
console.log(yearConverter(3, "AD"));
console.log(yearConverter(4, "AD"));
console.log(yearConverter(5, "AD"));
console.log("using BCE and CE ==>")
console.log(yearConverter(221, "BCE"));
console.log(yearConverter(1983, "CE"));
console.log("Float input ==>")
console.log(yearConverter(221.8, "BC"));
console.log(yearConverter(221.2, "BC"));
console.log(yearConverter(1983.8, "AD"));
console.log(yearConverter(1983.2, "AD"));
console.log("Negatives & Zero ==>")
console.log(yearConverter(-5, "BC"));
console.log(yearConverter(-4, "BC"));
console.log(yearConverter(-3, "BC"));
console.log(yearConverter(-2, "BC"));
console.log(yearConverter(-1, "BC"));
console.log(yearConverter(0, "CE"));
console.log(yearConverter(-1, "AD"));
console.log(yearConverter(-2, "AD"));
console.log(yearConverter(-3, "AD"));
console.log(yearConverter(-4, "AD"));
console.log(yearConverter(-5, "AD"));
console.log("Misc Input Vagaries ==>")
console.log(yearConverter(1983, "ad"))
console.log(yearConverter(1983));
console.log(yearConverter("1983", "AD"));
console.log(yearConverter(true));
console.log(yearConverter(false));
console.log(yearConverter(1983, "UCK"));
console.log(yearConverter("Nineteen Eighty-Three"));
