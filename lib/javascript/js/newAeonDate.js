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
        this.docosade = -1;
    }

    /* Static members */

    newAeonDate.dateToProps = function dateToProps(x) {
        var beforeSpring = 1;
        var evYear = evDate.getFullYear();
        var evMonth = evDate.getMonth();
        var evDayOfMonth = evDate.getDate();
        var aeon = "EV";
        var dosocade = -1;
        var revolution = -1;

        // TODO: Calculate actual spring
        if (evMonth > 2 || (evMonth == 2 && evDayOfMonth > 20)) {
            beforeSpring = 0;
        }

        // Determine properties
        if (evYear > 1904 || (evYear == 1904 && !beforeSpring)) {
            aeon = "AL";

            // Whole Years since March Equinox 1904
            var fullYears = (evYear - 1904) - beforeSpring;

            // New Aeon "generation" of 22 years
            dosocade = Math.floor(fullYears / 22);

            // Years in the current cycle
            revolution =  evYear - 1904 - (dosocade * 22);

        }
        else {
            revolution = evYear
        }
        return {
          "aeon": aeon,
          "dosocade":   dosocade,
          "revolution": revolution
        };
    }

    // We only need 0 to 21, so make a table instead of calc
    // TODO: make it calc before 2366 E.V.
    // scope: private
    newAeonDate.toRomanNumeral = function toRomanNumeral(x) {
        var numerals = [
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

        var newAeonYear = null;

        // Seeed the date
        if (arguments.length) {
            evDate = new Date(arguments[0]);
        }
        var props = this.dateToProps(evDate);

        if (props.aeon == "AL") {
            newAeonYear = this.toRomanNumeral(props.dosocade).toUpperCase() + ":" + this.toRomanNumeral(props.revolution);
        }
        else {
            newAeonYear = props.revolution + " EV";
        }

        return newAeonYear;
    };

    // docosade is a period of 22 years
    newAeonDate.getDocosade = function getDocosade() {

        var newAeonYear = null;

        // Seeed the date
        if (arguments.length) {
            evDate = new Date(arguments[0]);
        }
        var props = this.dateToProps(evDate);

        if (props.aeon == "AL") {
            newAeonYear = this.toRomanNumeral(props.dosocade).toUpperCase();
        }
        else {
            newAeonYear = props.revolution + " EV";
        }

        return newAeonYear;
    };

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