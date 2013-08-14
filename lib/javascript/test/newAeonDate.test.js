test(".getYear", function() {
  function dateTest(timeString, expected) {
    equal(newAeonDate.getYear(timeString), expected);
  }
  dateTest("1904-04-09", "0:0");
  dateTest("1905-03-21", "0:i");
  dateTest("2013-08-11", "IV:xxi");
});

test(".fromEraVulgaris.getYear", function() {
  function dateTest(timeString, expected) {
    equal(newAeonDate.fromEraVulgaris(timeString).getYear(), expected);
  }
  dateTest("1904-04-09", "0:0");
  dateTest("1905-03-21", "0:i");
  dateTest("2013-08-11", "IV:xxi");
});

test(".fromEV.getYear", function() {
  function dateTest(timeString, expected) {
    equal(newAeonDate.fromEV(timeString).getYear(), expected);
  }
  dateTest("1904-04-09", "0:0");
  dateTest("1905-03-21", "0:i");
  dateTest("2013-08-11", "IV:xxi");
});

