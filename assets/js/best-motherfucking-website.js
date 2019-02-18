"use strict";
// I wish I could have used ES6 extravaganza, but not everyone supports it :(
var documentElement = document.getElementsByTagName("html")[0],
  clickEvent = "ontouchstart" in window ? "touchend" : "click",
  classMethods = ["remove", "add"];

function someControl(id, textArr, className) {
  checkCookie(
    id,
    textArr,
    className
  );
  /* You see? No fucking jQuery needed, check:
   * http://www.vanilla-js.com/
   * http://jsperf.com/getelementbyid-vs-jquery-id/44
   */
  var el = document.getElementsByTagName("html")[0];
  var acbox = document.getElementById(id),
    textNode = acbox.firstChild,
    toggled = getCookie(id) === "true";
  acbox.addEventListener(
    clickEvent,
    function() {
      setCookie(id, !toggled, 365);
      // TODO: Below used here and in checkCookie; ideally, it can be refactored.
      var selector = Number((toggled = !toggled));
      textNode.data = textArr[selector];
      el.classList[classMethods[selector]](className);
    },
    false
  );
}

function addContrastControl() {
  someControl(
    "contrast",
    ["Add more contrast", "Remove additional contrast"],
    "contrast"
  );
}

function addInvertedControl() {
  someControl(
    "invmode",
    ["Inverted mode", "Normal mode"],
    "inverted"
  );
}

addContrastControl();
addInvertedControl();

// HugoModo

function setCookie(cname, cvalue, exdays) {
  var d = new Date();
  d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000));
  var expires = "expires="+d.toUTCString();
  document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
}

function getCookie(cname) {
  var name = cname + "=";
  var ca = document.cookie.split(';');
  for(var i = 0; i < ca.length; i++) {
    var c = ca[i];
    while (c.charAt(0) == ' ') {
      c = c.substring(1);
    }
    if (c.indexOf(name) == 0) {
      return c.substring(name.length, c.length);
    }
  }
  return "";
}

function checkCookie(cname, textArr, className) {
  var status = getCookie(cname);
  if (getCookie(cname) === "true") {
    var el = document.getElementsByTagName("html")[0];
    var acbox = document.getElementById(cname),
      textNode = acbox.firstChild

    textNode.data = textArr[1];
    el.classList[classMethods[1]](className);
  }
}
