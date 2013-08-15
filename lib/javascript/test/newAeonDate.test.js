QUnit.module('newAeonDate');

QUnit.test(".getYear", function() {
  equal(newAeonDate.getYear("1904-04-09"), "0:0");
  equal(newAeonDate.getYear("1905-03-21"), "0:i");
  equal(newAeonDate.getYear("2013-08-11"), "IV:xxi");
});

QUnit.test(".fromEraVulgaris.getYear", function() {
  equal(newAeonDate.fromEraVulgaris("1904-04-09").getYear(), "0:0");
  equal(newAeonDate.fromEraVulgaris("1905-03-21").getYear(), "0:i");
  equal(newAeonDate.fromEraVulgaris("2013-08-11").getYear(), "IV:xxi");
});

QUnit.test(".fromEV.getYear", function() {
  equal(newAeonDate.fromEV("1904-04-09").getYear(), "0:0");
  equal(newAeonDate.fromEV("1905-03-21").getYear(), "0:i");
  equal(newAeonDate.fromEV("2013-08-11").getYear(), "IV:xxi");
});

QUnit.test(".fromEV.getDocosade", function() {
  equal(newAeonDate.fromEV("1904-04-09").getDocosade(), "0");
  equal(newAeonDate.fromEV("1905-03-21").getDocosade(), "0");
  equal(newAeonDate.fromEV("2013-08-11").getDocosade(), "IV");
});

