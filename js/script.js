var slide1;
$(".circle-slide").each(function (index) {
  slide1 = document.getElementsByClassName('item1');
});

var itemsId = Array.from(slide1);
var sectionDeg = 360 / 5;
var radianSectionDeg = sectionDeg * Math.PI * 2 / 360;
var dWidth = innerWidth;
if (dWidth < 767) {
  var radiusLength = 115;
} else {
  var radiusLength = 250;
}

for (var i = 0; i < itemsId.length; i++) {
  itemsId[i].style.top = radiusLength * Math.sin(radianSectionDeg * i - 1.5708) + 'px';
  itemsId[i].style.left = radiusLength * Math.cos(radianSectionDeg * i - 1.5708) + 'px';
}

function makeATurn() {
  for (var i = 0; i < itemsId.length; i++) {
    itemsId[i].style.top = radiusLength * Math.sin(radianSectionDeg * i - 1.5708) + 'px';
    itemsId[i].style.left = radiusLength * Math.cos(radianSectionDeg * i - 1.5708) + 'px';
  }
}

var list = [];
function turnRight(el) {
  $(".item1").removeClass("active");
  el.classList.add("active");
  var currentClick = el.getAttribute("data-val");

  var holder = [];
  for (var j = 0; j < currentClick; j++) {
    var getEl = itemsId.shift();
    holder.push(getEl);
  }

  itemsId = itemsId.concat(holder);
  makeATurn();
  itemsId = Array.from(slide1);
}

var slide2 = document.getElementsByClassName('item2');
$(".circle-slide").each(function (index) {
  slide2 = document.getElementsByClassName('item');
});

var itemsId2 = Array.from(slide2);
for (var i = 0; i < itemsId2.length; i++) {
  itemsId2[i].style.top = radiusLength * Math.sin(radianSectionDeg * i - 1.5708) + 'px';
  itemsId2[i].style.left = radiusLength * Math.cos(radianSectionDeg * i - 1.5708) + 'px';
}

function makeATurn2() {
  for (var i = 0; i < itemsId2.length; i++) {
    itemsId2[i].style.top = radiusLength * Math.sin(radianSectionDeg * i - 1.5708) + 'px';
    itemsId2[i].style.left = radiusLength * Math.cos(radianSectionDeg * i - 1.5708) + 'px';
  }
}

function turnRight2(el) {
  $(".item2").removeClass("active");
  el.classList.add("active");
  var currentClick = el.getAttribute("data-val");

  var holder = [];
  for (var j = 0; j < currentClick; j++) {
    var getEl = itemsId2.shift();
    holder.push(getEl);
  }

  itemsId2 = itemsId2.concat(holder);
  makeATurn2();
  itemsId2 = Array.from(slide2);
}

var slide3;
$(".circle-slide").each(function (index) {
  slide3 = document.getElementsByClassName('item3');
});

var itemsId3 = Array.from(slide3);
for (var i = 0; i < itemsId3.length; i++) {
  itemsId3[i].style.top = radiusLength * Math.sin(radianSectionDeg * i - 1.5708) + 'px';
  itemsId3[i].style.left = radiusLength * Math.cos(radianSectionDeg * i - 1.5708) + 'px';
}

function makeATurn3() {
  for (var i = 0; i < itemsId3.length; i++) {
    itemsId3[i].style.top = radiusLength * Math.sin(radianSectionDeg * i - 1.5708) + 'px';
    itemsId3[i].style.left = radiusLength * Math.cos(radianSectionDeg * i - 1.5708) + 'px';
  }
}

function turnRight3(el) {
  $(".item3").removeClass("active");
  el.classList.add("active");
  var currentClick = el.getAttribute("data-val");

  var holder = [];
  for (var j = 0; j < currentClick; j++) {
    var getEl = itemsId3.shift();
    holder.push(getEl);
  }
  itemsId3 = itemsId3.concat(holder);

  makeATurn3();
  itemsId3 = Array.from(slide3);
}

var slide4;
$(".circle-slide").each(function (index) {
  slide4 = document.getElementsByClassName('item4');
});

var itemsId4 = Array.from(slide4);
for (var i = 0; i < itemsId4.length; i++) {
  itemsId4[i].style.top = radiusLength * Math.sin(radianSectionDeg * i - 1.5708) + 'px';
  itemsId4[i].style.left = radiusLength * Math.cos(radianSectionDeg * i - 1.5708) + 'px';
}

function makeATurn4() {
  for (var i = 0; i < itemsId4.length; i++) {
    itemsId4[i].style.top = radiusLength * Math.sin(radianSectionDeg * i - 1.5708) + 'px';
    itemsId4[i].style.left = radiusLength * Math.cos(radianSectionDeg * i - 1.5708) + 'px';
  }
}

function turnRight4(el) {
  $(".item4").removeClass("active");
  el.classList.add("active");
  var currentClick = el.getAttribute("data-val");

  var holder = [];
  for (var j = 0; j < currentClick; j++) {
    var getEl = itemsId4.shift();
    holder.push(getEl);
  }

  itemsId4 = itemsId4.concat(holder);
  makeATurn4();
  itemsId4 = Array.from(slide4);
}

var slide5;
$(".circle-slide").each(function (index) {
  slide5 = document.getElementsByClassName('item5');
});

var itemsId5 = Array.from(slide5);
for (var i = 0; i < itemsId5.length; i++) {
  itemsId5[i].style.top = radiusLength * Math.sin(radianSectionDeg * i - 1.5708) + 'px';
  itemsId5[i].style.left = radiusLength * Math.cos(radianSectionDeg * i - 1.5708) + 'px';
}

function makeATurn5() {
  for (var i = 0; i < itemsId5.length; i++) {
    itemsId5[i].style.top = radiusLength * Math.sin(radianSectionDeg * i - 1.5708) + 'px';
    itemsId5[i].style.left = radiusLength * Math.cos(radianSectionDeg * i - 1.5708) + 'px';
  }
}

function turnRight5(el) {
  $(".item5").removeClass("active");
  el.classList.add("active");
  var currentClick = el.getAttribute("data-val");

  var holder = [];
  for (var j = 0; j < currentClick; j++) {
    var getEl = itemsId5.shift();
    holder.push(getEl);
  }
  itemsId5 = itemsId5.concat(holder);

  makeATurn5();
  itemsId5 = Array.from(slide5);
}