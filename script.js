botToken = 'ODIyNzUwNDgyMjQ5OTQxMDEy.GMBAbu.mPVRzhkEbahyi3ckr-TnxaD7lDo7C7v7iNKcMU';
userId = '113063556865392640';
window.onload = function() {

  fetch('https://discord.com/api/v9/users/113063556865392640', {
    method: 'get',
    headers: new Headers({
      'Authorization': 'Bot ODIyNzUwNDgyMjQ5OTQxMDEy.GMBAbu.mPVRzhkEbahyi3ckr-TnxaD7lDo7C7v7iNKcMU'
    })
  }).then(response => response.json()).then(data => console.log(data))

  // fetch('https://discord.com/api/v9/users/' + JSON.stringify(userId), {
  //   method: 'get',
  //   headers: new Headers({
  //     'Authorization': 'Bot ' + JSON.stringify(botToken),
  //     'Content-type': 'application/json'
  //   })
  // }).then(response => response.json()).then(data => console.log(data))
};