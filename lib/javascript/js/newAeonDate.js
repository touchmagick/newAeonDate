
/**
 * Builtin Javascript "Date" does not have normal object behavior, so we can't
 * simply inherit from it. newAeonDate will be on it's own.
 */
var newAeonDate = (function () {
    var my = {},
        debug = 1,
        evDate = new Date();

    // We only need 0 to 21, so make a table instead of calc
    // TODO: make it calc before 2366 E.V.
    // scope: private
    function toRomanNumeral(x) {
        numerals = [
            '0', 'i', 'ii', 'iii', 'iv',
            'v', 'vi', 'vii', 'viii', 'ix',
            'x', 'xi', 'xii', 'xiii', 'xiv',
            'xv', 'xvi', 'xvii', 'xviii', 'xix',
            'xx', 'xxi', 'xxii'
        ];
        return numerals[x];
    }

    my.fromEraVulgaris = function() {
        if (arguments.length) {
            evDate = new Date(arguments[0]);
        }
        return this; // chainable
    };

    // Alias
    my.fromEV = my.fromEraVulgaris;

    my.getYear = function () {

        newAeonYear = null;
        beforeSpring = 1;

        // Seeed the date
        if (arguments.length) {
            evDate = new Date(arguments[0]);
            timeString = arguments[0];
        }
        else {
            timeString = evDate.toString();
        }

        evYear = evDate.getFullYear();
        if (debug) console.log("evYear:" + evYear);

        evMonth = evDate.getMonth();
        if (debug) console.log("evMonth:" + evMonth);

        evDayOfMonth = evDate.getDate();
        if (debug) console.log("evDayOfMonth:" + evDayOfMonth);

        // TODO: Calculate actual spring
        if (evMonth > 2 || (evMonth == 2 && evDayOfMonth > 20)) {
            beforeSpring = 0;
            if (debug) console.log("beforeSpring:" + beforeSpring);
        }

        if (evYear > 1904 || (evYear == 1904 && !beforeSpring)) {

            // Whole Years since March Equinox 1904
            fullYears = (evYear - 1904) - beforeSpring;

            // New Aeon "generation" of 22 years
            dosocade = Math.floor(fullYears / 22);
            if (debug) console.log("dosocade:" + dosocade);

            // Years in the current cycle
            year =  evYear - 1904 - (dosocade * 22);
            if (debug) console.log("year:" + year);

            newAeonYear = toRomanNumeral(dosocade).toUpperCase() 
                + ":" + toRomanNumeral(year)
        }

        // TODO: Fail gracefully on historic dates

        if (debug) console.log("END getYear(" + timeString + ") = " + newAeonYear);
        return newAeonYear;
    };

    // TODO: complete
    // dosocade is a period of 22 years
    my.getDocosade = function(timeString) {

    };

    return my;
}());
