let spinnerWrapper = document.querySelector(".spinner-wrapper");
let actitivitiesContainer = document.querySelector(".activities-container");

let userAvatar = document.getElementById("user_avatar");
let userAvatarEffect = document.getElementById("user_avatar_effect");
let userBanner = document.getElementById("user_banner");
let userDiscordStatus = document.getElementById("user_discord_status");
let userNickname = document.getElementById("user_nickname");
let userUsername = document.getElementById("user_username");
let userActivitiePlaying = document.getElementById("user_activitie_playing");
let userActivitieName = document.getElementById("user_activitie_name");
let userActivitieDoing = document.getElementById("user_activitie_doing");
let userActivitieImageLarge = document.getElementById(
  "user_activitie_image_large"
);
let userActivitieImageSmall = document.getElementById(
  "user_activitie_image_small"
);
let userAge = document.getElementById("user_age");

const userId = "113063556865392640";
const discordCdn = "https://cdn.discordapp.com";

window.onload = function () {
  userAge.innerHTML =
    JSON.stringify(calculate_age(new Date(2002, 04, 10))) + "y";

  fetch("https://api.lanyard.rest/v1/users/" + userId, {
    method: "get",
  })
    .then((response) => response.json())
    .then((data) => {
      user = data.data;

      userAvatar.src =
        discordCdn + "/avatars/" + userId + "/" + user.discord_user.avatar;

      if(user.discord_user?.avatar_decoration_data) userAvatarEffect.src = discordCdn + "/avatar-decoration-presets/" + user.discord_user.avatar_decoration_data.asset + ".png?size=96&passthrough=true";
      else removeAvatarEffect()

      user_discord_status.className = "discord-status " + user.discord_status;

      if (user.discord_user.username)
        userUsername.innerHTML = user.discord_user.username;
      else removeUsername();

      let indexToUse = user.activities?.[0]?.name.toLowerCase() === "custom status" ? 1 : 0;

      if (user.activities.length > 0) {
        if (
          user.activities[0].name.toLowerCase() === "custom status" &&
          user.activities.length < 2
        )
          removeActivities();
        else if (user.activities[indexToUse].name === "Spotify") {
          userActivitiePlaying.innerHTML = "Listening to Spotify";
          userActivitieName.innerHTML = user.activities[indexToUse].details;
          userActivitieDoing.innerHTML = user.activities[indexToUse].state;
          userActivitieImageLarge.src = "./images/spotify.png";
          removeSmallImageActivitie();
        } else {
          userActivitiePlaying.innerHTML = "Playing a game";
          userActivitieName.innerHTML = user.activities[indexToUse].name;

          if (user.activities[indexToUse]?.assets?.large_image)
            userActivitieImageLarge.src =
              discordCdn +
              "/app-assets/" +
              user.activities[indexToUse].application_id +
              "/" +
              user.activities[indexToUse].assets.large_image;
          else userActivitieImageLarge.src = "./images/UndefinedActivitie.svg";

          if (user.activities[indexToUse]?.assets?.small_image)
            userActivitieImageSmall.src =
              discordCdn +
              "/app-assets/" +
              user.activities[indexToUse].application_id +
              "/" +
              user.activities[indexToUse].assets.small_image;
          else removeSmallImageActivitie();

          if (user.activities[indexToUse]?.details)
            userActivitieDoing.innerHTML = user.activities[indexToUse].details;
          else removeActivitieDoing();
        }
      } else removeActivities();

      userBanner.style.backgroundImage =
        "url(https://dcdn.dstn.to/banners/113063556865392640)";

      removeSpinner();
    })
    .catch(() => {
      removeActivities();
      removeUsername();
      removeSpinner();
    });
};

userBanner.onerror = () => {
  userBanner.src = "images/defaultBanner.png";
};

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

function removeAvatarEffect() {
  userAvatarEffect.parentElement.removeChild(userAvatarEffect);
}

function removeActivities() {
  actitivitiesContainer.parentElement.removeChild(actitivitiesContainer);
}

function removeUsername() {
  userUsername.parentElement.removeChild(userUsername);
}

function removeActivitieDoing() {
  userActivitieDoing.parentElement.removeChild(userActivitieDoing);
}

function removeSmallImageActivitie() {
  userActivitieImageSmall.parentElement.removeChild(userActivitieImageSmall);
}
