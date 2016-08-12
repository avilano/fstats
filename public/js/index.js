

// initialize and setup facebook js sdk
window.fbAsyncInit = function() {
FB.init({
appId      : '284122015294950',
status     : 'true',
cookie     : 'true',
xfbml      : 'true',
oauth      : 'true',
version    : 'v2.7'
});
FB.getLoginStatus(function(response) {
if (response.status === 'connected') {
document.getElementById('status').innerHTML = 'You are connected.';
document.getElementById('login').style.visibility = 'hidden';
} else if (response.status === 'not_authorized') {
document.getElementById('getstats').style.visibility = 'hidden';
document.getElementById('status').innerHTML = 'We are not logged in.'
} else {
document.getElementById('getstats').style.visibility = 'hidden';
document.getElementById('logout').style.visibility = 'hidden';
document.getElementById('status').innerHTML = 'You are not logged into Facebook.';
}
});
};
(function(d, s, id){
var js, fjs = d.getElementsByTagName(s)[0];
if (d.getElementById(id)) {return;}
js = d.createElement(s); js.id = id;
js.src = "//connect.facebook.net/en_US/sdk.js";
fjs.parentNode.insertBefore(js, fjs);
}(document, 'script', 'facebook-jssdk'));

// login with facebook
function login() {
FB.login(function(response) {
if (response && response.status === 'connected') {
document.getElementById('status').innerHTML = 'Welcome!';
document.getElementById('getstats').style.visibility = 'visible';
document.getElementById('logout').style.visibility = 'visible';
document.getElementById('login').style.visibility = 'hidden';
} else if (response.status === 'not_authorized') {
document.getElementById('status').innerHTML = 'Please Log In'
} else {
document.getElementById('status').innerHTML = 'You are not logged into Facebook.';
}
}, {scope: 'public_profile,email'});
}

// getting basic user info
function getStats() {
FB.api('/me', 'GET', {fields: 'first_name,last_name,name,id,age_range,verified,gender,email,picture,location'}, function(response) {
//console.log(response.bio);
document.getElementById('status').innerHTML = "<img src="+response.picture.data.url+">" + "<br><div id='statsDiv'><p>You are: " + response.name+"<br><br>Your id is: " + response.id+"<br><br>You are over the : " + response.age_range.min + " age range."+"<br><br>You are: " + response.gender+"<br><br>Your email is: " + response.email +"</p>";
});
}

function logout() {
FB.getLoginStatus(function(response) {
  if (response && response.status === 'connected') {
      FB.logout(function(response) {
          document.location.reload();
        });
      }
  });
}
