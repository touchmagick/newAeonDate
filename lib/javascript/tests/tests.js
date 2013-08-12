test(".getYear", function() {
  function dateTest(timeString, expected) {
    equal(newAeonDate.getYear(timeString), expected);
  }
  dateTest("1904-04-09", "00");
  dateTest("1905-03-21", "0i");
  dateTest("2013-08-11", "IVxxi");
});

