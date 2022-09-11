"use strict";

function _createForOfIteratorHelper(o, allowArrayLike) { var it = typeof Symbol !== "undefined" && o[Symbol.iterator] || o["@@iterator"]; if (!it) { if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e) { throw _e; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = it.call(o); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e2) { didErr = true; err = _e2; }, f: function f() { try { if (!normalCompletion && it["return"] != null) it["return"](); } finally { if (didErr) throw err; } } }; }

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _iterableToArray(iter) { if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null) return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return _arrayLikeToArray(arr); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

var body = document.querySelector('body');
var card = document.getElementsByClassName('card');
var countdown = document.getElementById('countdown');
var selector = document.getElementById('selector');
card = _toConsumableArray(card);

var _iterator = _createForOfIteratorHelper(card),
    _step;

try {
  for (_iterator.s(); !(_step = _iterator.n()).done;) {
    var v = _step.value;
    v.setAttribute("src", "./images/card.png");
  }
} catch (err) {
  _iterator.e(err);
} finally {
  _iterator.f();
}

var prevSibling = selector.previousElementSibling;
var indexOfPrevSibling = card.indexOf(prevSibling);
var targetedIndex = indexOfPrevSibling;
var t = 30;
var noticeBoard = document.getElementById('noticeBoard');
var mainCards = ["./images/chest.png", "./images/coin.png", "./images/flower.png", "./images/mushroom.png", "./images/star.png"]; // I have placed a pair of cards here, so that no card is missing. And the remaining four pairs of cards I have randomly inserted here
// if you want insert data there full randomly you can remove all element from "hiddenCard" Array. But remember there may be some missing cards from these five cards.

var hiddenCard = ["./images/chest.png", "./images/chest.png", "./images/coin.png", "./images/coin.png", "./images/flower.png", "./images/flower.png", "./images/mushroom.png", "./images/mushroom.png", "./images/star.png", "./images/star.png"];

while (hiddenCard.length < 18) {
  var random = Math.floor(Math.random() * 5);
  hiddenCard.push(mainCards[random]);
  hiddenCard.push(mainCards[random]);
}

shuffle(hiddenCard);
var collectionOfTarget = [];
var x = setInterval(function () {
  if (t < 10) {
    countdown.innerText = "0".concat(t);
  } else {
    countdown.innerText = t;
  }

  t--;
  var found = card.find(function (a) {
    return a.getAttribute("src") === "./images/card.png";
  });

  if (found === undefined) {
    noticeBoard.innerText = 'You Win!';
    body.removeEventListener('keypress', gameOn);
    clearInterval(x);
  }

  if (t === -2) {
    body.removeEventListener('keypress', gameOn);
    clearInterval(x);
    noticeBoard.innerText = 'You Lose!';
  }

  if (collectionOfTarget.length === 2) {
    body.removeEventListener('keypress', gameOn);
  }
}, 1000);
body.addEventListener('keypress', gameOn);

function gameOn(e) {
  var name = e.key;

  if (name == 's' || name == 'S') {
    selector.remove();
    targetedIndex += 6;

    if (targetedIndex > 17) {
      targetedIndex -= 18;
    }

    var target = card[targetedIndex];
    insert(target, selector);
  }

  if (name == 'w' || name == 'W') {
    selector.remove();
    targetedIndex -= 6;

    if (targetedIndex < 0) {
      targetedIndex += 18;
    }

    var _target = card[targetedIndex];
    insert(_target, selector);
  }

  if (name == 'd' || name == 'D') {
    selector.remove();
    targetedIndex += 1;

    if (targetedIndex === 18) {
      targetedIndex = 12;
    } else if (targetedIndex === 12) {
      targetedIndex = 6;
    } else if (targetedIndex === 6) {
      targetedIndex = 0;
    } else {}

    var _target2 = card[targetedIndex];
    insert(_target2, selector);
  }

  if (name == 'a' || name == 'A') {
    selector.remove();
    targetedIndex -= 1;

    if (targetedIndex === 11) {
      targetedIndex = 17;
    } else if (targetedIndex === 5) {
      targetedIndex = 11;
    } else if (targetedIndex === -1) {
      targetedIndex = 5;
    } else {}

    var _target3 = card[targetedIndex];
    insert(_target3, selector);
  }

  if (name == 'Enter') {
    var _target4 = card[targetedIndex];

    if (_target4.getAttribute("src") === "./images/card.png") {
      _target4.style.animation = "0.2s cubic-bezier(0, 0.84, 0.74, 0.22) 0s 1 normal none running ani";

      _target4.setAttribute("src", hiddenCard[targetedIndex]);

      collectionOfTarget.push(_target4);

      if (collectionOfTarget.length === 2) {
        setTimeout(function () {
          if (collectionOfTarget[0].src !== collectionOfTarget[1].src) {
            _target4.style.animation = "0.2s cubic-bezier(0, 0.84, 0.74, 0.22) 0s 1 normal none running rev";
            collectionOfTarget[0].setAttribute("src", "./images/card.png");
            collectionOfTarget[1].setAttribute("src", "./images/card.png");
          }

          collectionOfTarget = [];
          body.addEventListener('keypress', gameOn);
        }, 500);
      }
    }
  }
}

function insert(parent, s) {
  parent.parentNode.insertBefore(s, parent.nextSibling);
}

function shuffle(array) {
  var currentIndex = array.length,
      randomIndex; // While there remain elements to shuffle.

  while (currentIndex != 0) {
    // Pick a remaining element.
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--; // And swap it with the current element.

    var _ref = [array[randomIndex], array[currentIndex]];
    array[currentIndex] = _ref[0];
    array[randomIndex] = _ref[1];
  }

  return array;
}