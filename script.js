let spinnerWrapper = document.querySelector(".spinner-wrapper");
let actitivitiesContainer = document.querySelector(".activities-container");

let userAvatar = document.getElementById("user_avatar");
let userBanner = document.getElementById("user_banner");
let userNickname = document.getElementById("user_nickname");
let userUsername = document.getElementById("user_username");
let userActivitiePlaying = document.getElementById("user_activitie_playing");
let userActivitieName = document.getElementById("user_activitie_name");
let userActivitieDoing = document.getElementById("user_activitie_doing");
let userActivitieImage = document.getElementById("user_activitie_image");
let userAge = document.getElementById("user_age");

const userId = "113063556865392640";
const discordCdn = "https://cdn.discordapp.com";

window.onload = function () {
  userAge.innerHTML = JSON.stringify(calculate_age(new Date(2002, 05, 10))) + "y"

  fetch("https://api.lanyard.rest/v1/users/" + userId, {
    method: "get",
  })
    .then((response) => response.json())
    .then((data) => {
      user = data.data;

      userAvatar.src =
        discordCdn + "/avatars/" + userId + "/" + user.discord_user.avatar;

      if (user.discord_user.username)
        userUsername.innerHTML =
          user.discord_user.username + "#" + user.discord_user.discriminator;
      else removeUsername();

      if (user.activities.length > 0) {
        if (user.activities[0].name === "Spotify") {
          userActivitiePlaying.innerHTML = "Listening to Spotify";
          userActivitieName.innerHTML = user.activities[0].details;
          userActivitieDoing.innerHTML = user.activities[0].state;
          userActivitieImage.src = "./images/spotify.png";
        } else {
          userActivitiePlaying.innerHTML = "Playing a game";
          userActivitieName.innerHTML = user.activities[0].name;
          userActivitieDoing.innerHTML = user.activities[0].details;
        }
      } else removeActivities();

      
      userBanner.src = "https://dcdn.dstn.to/banners/113063556865392640"

      removeSpinner();
    })
    .catch(() => {
      removeActivities();
      removeUsername();
      removeSpinner();
    });
};

userBanner.onerror = () =>{
  userBanner.src = "images/a_a9d4f02a7b3131022a7a3d56b99cf292.gif"
}

function calculate_age(dob) { 
  var diff_ms = Date.now() - dob.getTime();
  var age_dt = new Date(diff_ms); 

  return Math.abs(age_dt.getUTCFullYear() - 1970);
}

function removeSpinner() {
  setTimeout(() => {
    spinnerWrapper.parentElement.removeChild(spinnerWrapper);
  }, 50);
}

function removeActivities() {
  actitivitiesContainer.parentElement.removeChild(actitivitiesContainer);
}

function removeUsername() {
  userUsername.parentElement.removeChild(userUsername);
}
