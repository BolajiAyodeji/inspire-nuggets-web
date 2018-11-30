function startTime() {
  var today = new Date();
  var h = today.getHours();
  var m = today.getMinutes();
  var s = today.getSeconds();
  var ampm = "";
  m = checkTime(m);

  if (h > 12) {
    h = h - 12;
    ampm = " PM";
  } else if (h == 12 && m == 0) {
    h = 12;
    ampm = " AM";
  } else if (h < 12) {
    ampm = " AM";
  } else {
    ampm = "PM";
  };

  if (h == 0) {
    h = 12;
  }

  document.getElementById('display').innerHTML = h + ":" + m + ampm;
  var t = setTimeout(function () {
    startTime()
  }, 500);
}

function checkTime(i) {
  if (i < 10) {
    i = "0" + i
  }; // add zero in front of numbers < 10
  return i;
}

//date
function startDate() {
  var d = new Date();
  var days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
  document.getElementById("date").innerHTML = days[d.getDay()] + " | " + [d.getMonth() + 1] + "/" + d.getDate() + "/" + d.getFullYear();
}

function tweet(message) {
  window.open('https://twitter.com/intent/tweet?hashtags= #InspireNuggets&text=' + encodeURIComponent(message));
  // when you click on this function, it opens the window with text ready to be inputted
  // smart way to slice  window.open("https://twitter.com/intent/tweet?text=" + currentQuote.slice(0, 136) + "...");
}

var tweetmsg;
var tweetname;

function tweetHandler() {
  var message = tweetmsg + " " + tweetname
  tweet(message);
  //tweet(msg);
}

//Trigger for mobile
$('#trigger-btn').click(function() {
  $("#quote").addClass("reset");
    $("#quote").removeClass("executed");
    $("#writer").toggleClass("fade");
    setTimeout(function () {
      $.ajax({
        crossOrigin: true,
        url: "https://quotesondesign.com/wp-json/posts?filter[orderby]=rand&filter[posts_per_page]=1&_jsonp=mycallback",
        dataType: "jsonp"
      });
    }, 50);
});

//Trigger for desktop
$(window).keypress(function (e) {
  if (e.which === 32) {
    $("#quote").addClass("reset");
    $("#quote").removeClass("executed");
    $("#writer").toggleClass("fade");
    setTimeout(function () {
      $.ajax({
        crossOrigin: true,
        url: "https://quotesondesign.com/wp-json/posts?filter[orderby]=rand&filter[posts_per_page]=1&_jsonp=mycallback",
        dataType: "jsonp"
      });
    }, 50);
  }
});

function mycallback(json) {
  var quote = json[0];
  $("#quote").html(quote.content)
  $("#writer").html(quote.title)
  $("#quote").addClass("executed");
  $("#quote").removeClass("reset");
  $("#writer").toggleClass("fade");
}