var xmlhttp = new XMLHttpRequest();
var apiurl = "https://api.instagram.com/v1/media/popular?access_token=1075466.1677ed0.07e7f544d7dd41c1a7abb2295cd35a9a&callback=?";

xmlhttp.onreadystatechange = function() {
  if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
    arr = JSON.parse(xmlhttp.responseText);
    displayPhotos(arr);
    lightboxTrigger(arr);
  } else {
    //todo
  }
};
xmlhttp.open("GET", apiurl, true);
xmlhttp.send();

function displayPhotos(arr) {
  var i, result = "";
  for (i = 0; i < arr.data.length; i++) {
    result += '<li data-pid = ' + i + '> <img src =' + arr.data[i].images.low_resolution.url + '></li>';
  }
  document.getElementById("photo_gallery").innerHTML = result;
}

function lightboxTrigger(arr) {
  var pid;
  var img = document.getElementsByTagName("li");
  for (var i = 0, len = img.length; i < len; i++) {
    img[i].onclick = function(e) {
      pid = e.target.parentNode.getAttribute('data-pid');
      lightboxDisplay(pid, arr);
      document.getElementById("light_box").style.display = "block";
    };
  }
}

function lightboxDisplay(pid, arr) {
  var result = "";
  result = '<img src = "' + arr.data[pid].images.standard_resolution.url + '" data-pid = ' + pid + '>';
  document.getElementById("light_box_img").innerHTML = result;
  var text = arr.data[pid].caption.text;
  document.getElementById("light_box_text").innerHTML = '<p>' + text + '</p>';
}

var close_btn = document.getElementById("close_btn");
close_btn.onclick = function() {
  lightbox.style.display = "none";
};

var left_btn = document.getElementById("left_btn");
left_btn.onclick = function(e) {
  var img = e.target.parentNode.childNodes[7].childNodes[0];
  var pid = img.getAttribute('data-pid');
  if (pid > 0) {
    lightboxDisplay(--pid, arr);
  }
};

var right_btn = document.getElementById("right_btn");
right_btn.onclick = function(e) {
  var img = e.target.parentNode.childNodes[7].childNodes[0];
  var pid = img.getAttribute('data-pid');
  if (pid < arr.data.length - 1) {
    lightboxDisplay(++pid, arr);
  }
};
