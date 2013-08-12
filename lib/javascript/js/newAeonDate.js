/**
 * Builtin Javascript "Date" does not have normal object behavior, so we can't
 * simply inherit from it. newAeonDate will be on it's own.
 */
function newAeonDate(){}

newAeonDate.debug = 0;

// We only need 0 to 21, so make a table instead of calc
// TODO: make it calc before 2366 E.V.
newAeonDate.toRomanNumeral = function(x) {
  numerals = [
    '0', 'i', 'ii', 'iii', 'iv', 
    'v', 'vi', 'vii', 'viii', 'ix', 
    'x', 'xi', 'xii', 'xiii', 'xiv', 
    'xv', 'xvi', 'xvii', 'xviii', 'xix', 
    'xx', 'xxi', 'xxii'
  ]
  return numerals[x];
}

newAeonDate.getYear = function(timeString) {

  newAeonYear = null;
  beforeSpring = 1;

  if (this.debug) console.log("BEGIN getYear(" + timeString + ")");

  // Seeed the date
  if (typeof timeString === "undefined") {
    evDate = new Date();
  }
  else {
    evDate = new Date(timeString);
  }

  evYear = evDate.getFullYear();
  if (this.debug) console.log("evYear:" + evYear);
  evMonth = evDate.getMonth();
  if (this.debug) console.log("evMonth:" + evMonth);
  evDayOfMonth = evDate.getDate();
  if (this.debug) console.log("evDayOfMonth:" + evDayOfMonth);


  // TODO: Calculate actual spring
  if (evMonth > 2 || (evMonth == 2 && evDayOfMonth > 20)) {
    beforeSpring = 0;
    if (this.debug) console.log("beforeSpring:" + beforeSpring);
  }
  
  if (evYear > 1904 || (evYear == 1904 && !beforeSpring)) {
      
    // Whole Years since March Equinox 1904
    fullYears = (evYear - 1904) - beforeSpring;
    
    // New Aeon "generation" of 22 years
    generation = Math.floor(fullYears / 22);
    if (this.debug) console.log("generation:" + generation);

    // Years in the current cycle
    year =  evYear - 1904 - (generation * 22);
    if (this.debug) console.log("year:" + year);

    newAeonYear = this.toRomanNumeral(generation).toUpperCase() 
      + this.toRomanNumeral(year)
  }
  // TODO: Fail gracefully on historic dates

  if (this.debug) console.log("END getYear(" + timeString + ") = " + newAeonYear);
  return newAeonYear;
}
