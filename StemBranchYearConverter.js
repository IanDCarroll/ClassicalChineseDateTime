/* 
Takes a Gregorian Year and Era as arguments; 
Returns the name of the corresponding Sexagenary Stem/Branch Cycle Year.

The pure code minus html and side effects ==>
*/



// A switchboard conversion chart; Takes a %60 code number and returns a Sexagenary Stem/Branch name.
function numberToStemBranch(number) {
	stemNumber = number % 10;
	branchNumber = number % 12;
	stem = "";
	branch = "";
	switch (stemNumber) {
		case 0:
			stem = "Gui";
			break;	
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
		case 10:
			stem = "Gui";
			break;
		case -1:
			stem = "Ren";
			break;
		case -2:
			stem = "Xin";
			break;
		default:
			stem = "numberToStemBranch Error.";
			break;
	}
	switch (branchNumber) {
		case 0:
			branch = "Hai";
			break;	
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
		case 12:
			branch = "Hai";
			break;
		case -1:
			branch = "Xu";
			break;
		case -2:
			branch = "You";
			break;
		default:
			stem = "numberToStemBranch Error.";
	}
	return stem + branch;
}



// Controls the calibration of Gregorian Years to a %60 code number for numberToStemBranch to convert.
// Rounds and ignores finer date/time information coming in the form of floats to get "just the year at that time".
function yearConverter(year, era) {
	var number = 0;
	if ((era === "AD" || era === "CE") && year >= 1) {
		number = (year - 3) % 60;
		return numberToStemBranch(Math.floor(number));
  } else if ((era === "BC" || era === "BCE") && year >= 1) {
		number = 60 - ((year + 2) % 60);
		return numberToStemBranch(Math.ceil(number));
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
console.log("Misc Input Errors ==>")
console.log(yearConverter(1983, "ad"))
console.log(yearConverter(1983));
console.log(yearConverter("Nineteen Eighty-Three"));
