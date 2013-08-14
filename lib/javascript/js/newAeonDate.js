/**
 * newAeonDate - Provides flexible interface for displaying New Aeon dates
 * 
 * Do what thou wilt shall be the whole of the Law.
 *
 * Original source code is available at:
 *  - <https://github.com/touchmagick/newAeonDate/>
 *  
 * This is free and unencumbered software released into the public domain.
 * For more information, please refer to <http://unlicense.org/>
 *
 * Love is the law, love under will.
 */

/**
 * Initialize module
 */
(function(global) {
    var originalNewAeonDate = global.newAeonDate;
    function newAeonDate() {
        this.debug = 1;
        this.evDate = new Date();
    }

    /* Static members */

    // We only need 0 to 21, so make a table instead of calc
    // TODO: make it calc before 2366 E.V.
    // scope: private
    newAeonDate.toRomanNumeral = function toRomanNumeral(x) {
        numerals = [
            '0', 'i', 'ii', 'iii', 'iv',
            'v', 'vi', 'vii', 'viii', 'ix',
            'x', 'xi', 'xii', 'xiii', 'xiv',
            'xv', 'xvi', 'xvii', 'xviii', 'xix',
            'xx', 'xxi', 'xxii'
        ];
        return numerals[x];
    };

    /* Instance members */

    newAeonDate.fromEraVulgaris = function fromEraVulgaris() {
        if (arguments.length) {
            evDate = new Date(arguments[0]);
        }
        return this; // chainable
    };

    newAeonDate.fromEV = newAeonDate.fromEraVulgaris;

    newAeonDate.getYear = function getYear() {

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
            dosocade = Math.floor(fullYears / 22);
            if (this.debug) console.log("dosocade:" + dosocade);

            // Years in the current cycle
            year =  evYear - 1904 - (dosocade * 22);
            if (this.debug) console.log("year:" + year);

            newAeonYear = this.toRomanNumeral(dosocade).toUpperCase() + ":" + this.toRomanNumeral(year);
        }

        // TODO: Fail gracefully on historic dates

        if (this.debug) console.log("END getYear(" + timeString + ") = " + newAeonYear);
        return newAeonYear;
    };

/*
    // TODO: complete
    // dosocade is a period of 22 years
    newAeonDate.getDocosade = function getDocosade(timeString) {

    };
*/

    if (typeof module !== 'undefined' && module.exports) {
        module.exports = newAeonDate();
    } else {
        global.newAeonDate = newAeonDate;

        /**
         * For browsers, also implement a noConflict that restores
         * the orignal value of the used global (if any).
         * @example
         * <code>
         *     var someLib = newAeonDate.noConflict();
         * </code>
         */
        newAeonDate.noConflict = function () {
            global.newAeonDate = originalNewAeonDate;
            return newAeonDate;
        };
    }

}(this));