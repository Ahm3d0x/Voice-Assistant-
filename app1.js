let Commands;
const API_KEY = "df7ca5ac3a3b8bec26e45a4f089afb1d";
const one = "Ed Sheeran   Shape of you.webm";
const two = "Imran Khan - Satisfya.webm";
const three = "Senorita.webm";
const four = "Chand_Tare_Tod_Full_Video_Song.mp3";
const five = "Imagine Dragons - Believer.mp3";
const six = "Justin Bieber – Despacito.mp3";
const seven = "The Chainsmokers - Closer.mp3";
const eight = "Baby Song.mp3";
let dad = document.querySelector('.dad')
let body = document.querySelector('body')
let replay = document.querySelector('.replay')
let norm = 'en-US'
let modsearch = 'en'
let mod = 'english'
let data;
let vo;
let me = document.querySelector('.me')
let you = document.querySelector('.you')

function fetchCommands()
{
  fetch("/mic/Process.json")
    .then(response => {
      response.json()
        .then(data => {
          Commands = data;
        })
    })
}
fetchCommands();

if (mod == 'english') {
  modsearch = 'en'
  norm = 'en-US'
}
if (mod == 'arabic') {
  modsearch = 'ar'
  norm = 'ar-EG'
}
const speechRecognition = window.webkitSpeechRecognition //Google Chrome 
  ||
  window.SpeechRecognition; //Firefox
let e;

function startListening()
{
  const recong = new speechRecognition();
  if (mod == 'english') {
    modsearch = 'en'
    norm = 'en-US'
  } else if (mod == 'arabic') {
    modsearch = 'ar'
    norm = 'ar-EG'
  }
  recong.lang = norm;
  recong.start();


  recong.onstart = micbutton.classList.add("Listen");

  recong.onresult = function(data)
  {
    micbutton.classList.remove("Listen");
    handleResults(data);


  }
}

function youz() {

  dad.insertAdjacentHTML('beforeend',
    `
         <div class="you">
               ${vo}</div>
`
  )
}

function handleResults(data)
{
  let text = data.results[0][0].transcript;
  text = text.toLowerCase();

  ProcessCommand(text);

}

function ProcessCommand(UserText)
{
  dad.insertAdjacentHTML('beforeend',
    `
    <div class="me">${UserText}</div>

`
  )

  if (UserText.includes("good morning")) {
    vo = 'Good morning Sir.'
    Speak(vo);
    youz();
    getTodayDate();
    getWeatherDetails();
    getCurrentTime();
  } else if (UserText.includes("goodnight")) {
    vo = 'Goodnight Sir.'
    Speak(vo);
    youz();
  } else if (UserText.includes("good afternoon")) {
    vo = 'Good afternoon Sir.'
    Speak(vo);
    youz();
  } else if (UserText.includes("good evening")) {
    vo = 'Good evening Sir.'
    Speak(vo);
    youz();
  } else if (UserText.includes("how are you")) {
    vo = 'I am good Sir.';
    Speak(vo);
    youz();
  } else if (UserText.includes("are you fine")) {
    vo = 'Yes Sir, I\'m fine, What about you?';
    Speak(vo);
    youz();
  } else if (UserText.includes("are you ok")) {
    vo = 'Yes Sir, I\'m ok, What about you?';
    Speak(vo);
    youz();
  } else if (UserText.includes("are you good")) {
    vo = 'Yes Sir, I am good, What about you?';
    Speak(vo);
    youz();
  } else if (UserText.includes("i am fine") || UserText.includes("i\'m fine")) {
    vo = 'This is very good.I wish you a wonderful day.How can I help you Sir?';
    Speak(vo);
    youz();
  } else if (UserText.includes("i am ok") || UserText.includes("i\'m ok")) {
    vo = 'I am happy to hear that.I wish you wonderful day.but,How can I help you Sir?';
    Speak(vo);
    youz();
  } else if (UserText.includes("i am good") || UserText.includes("i\'m good")) {
    vo = 'I am happy to hear that.I wish you wonderful day.but,How can I help you Sir?';
    Speak(vo);
    youz();
  } else if (UserText.includes("i am not fine") || UserText.includes("i\'m not fine")) {
    vo = 'I am sorry to hear that sir.I hope you get better quickly.but,How can I help you Sir?';
    Speak(vo);
    youz();
  } else if (UserText.includes("i am not ok") || UserText.includes("i\'m not ok")) {
    vo = 'I am sad to hear that sir.I hope you get better quickly.but,How can I help you Sir?';
    Speak(vo);
    youz();
  } else if (UserText.includes("i am not good") || UserText.includes("i\'m not good")) {
    vo = 'I am sad to hear that sir.I hope you get better quickly.but,How can I help you Sir?';
    Speak(vo);
    youz();
  } else if (UserText.includes("your name")) {
    vo = 'my name is nitro';
    Speak(vo);
    youz();
  } else if (UserText.includes("my name")) {
    vo = 'Your name is Ahmed Mohamed Attia';
    Speak(vo);
    youz();
  } else if (UserText.includes("when were you created")) {
    vo = 'Started on my programming in October 2022';
    Speak(vo);
    youz();
  } else if (UserText.includes("who is the creator") || UserText.includes("who programmed you")) {
    vo = 'My creator is the genius programmer Ahmed Mohamed';
    Speak(vo);
    youz();
  } else if (UserText.includes("do you know me")) {
    vo = 'yes Sir. you are the genius programmer Ahmed Mohamed.';
    Speak(vo);
    youz();
  } else if (UserText.includes("do you think i am smart")) {
    vo = 'Sir. you are very smart';
    Speak(vo);
    youz();
  } else if (UserText.includes("are you smart")) {
    vo = 'Yes Sir. I have been programmed by you. and That\'s enough to make me smart';
    Speak(vo);
    youz();
  } else if (UserText.includes("you are smart")) {
    vo = 'yes  Sir. I know that.';
    Speak(vo);
    youz();
  } else if (UserText.includes("when were you born") || UserText.includes("when you born")) {
    vo = 'in October 2022.';
    Speak(vo);
    youz();

  } else if (UserText.includes("hallo" || UserText.includes("hello"))) {
    vo = 'hello Sir.'
    Speak(vo);
    youz();
  } else if (UserText.includes("clear nitro") || UserText.includes("nitro clear")) {
    cls()
  } else if (UserText.includes("time")) {
    getCurrentTime();
  } else if (UserText.includes("date")) {
    getTodayDate();
  } else if (UserText.includes("battery")) {
    getBattery();
  } else if (UserText.includes("weather")) {
    getWeatherDetails();
    vo = 'please wait ma Sir.';
    Speak(vo);
    youz();
  } else if (UserText.includes("goodbye") || UserText.includes("sleep nitro")) {
    vo = 'Good bye sir and take care...';
    Speak(vo);
    youz();
    closenitro();
  } else if (UserText.includes("reload") || UserText.includes("restart")) {
    reloadnitro();
  } else if (UserText.includes("my family")) {
    getFamilyInfo();
  } else if (UserText.includes("welcome to my friends")) {
    welcomeToFriends();
  } else if (UserText.includes("system information") || UserText.includes("system info")) {
    systemInfo();
  } else if (UserText.includes("internet speed")) {
    internetSpeed();
  }else if (UserText.includes("search on google"))
    {
      UserText = UserText.slice(16);
      vo = 'Searching initiated...' + UserText;
      youz()
      Speak(vo);
      searchOnGoogle(UserText);
    }
    else if (UserText.includes("hey nitro"))
    {
      UserText = UserText.slice(10);
      vo = 'Searching initiated...' + UserText
      Speak(vo);
      youz();
      searchOnGoogle(UserText);
    }
    else if (UserText.includes("search on youtube"))
    {
      vo = 'Searchin initiated...' + UserText
      UserText = UserText.slice(17);
      SpeakSpeak(vo);
      youz();

      searchOnYoutube(UserText);

    } else if (UserText.includes("micro")) {
      UserText = UserText.slice(6);


      searchwika(UserText)
    } else if (UserText.includes("مايكرو")) {
      UserText = UserText.slice(6);

      searchwika(UserText)
    }
    else if (UserText.includes("arabic") || UserText.includes("search by arabic") || UserText.includes("switch to arabic"))
    {
      mod = 'arabic'
      vo = 'Activate searching by Arabic sir'

      SpeakSpeak(vo);
      youz();


    } else if (UserText.includes("تغيير الى الانجليزيه") || UserText.includes("search by english") || UserText.includes("switch to english")) {
      mod = 'english'
      vo = 'Activate searching by English sir'

      SpeakSpeak(vo);
      youz();

    } else if(UserText.includes('what')) {
  vo = 'guughu'
  youz()
    }

  
}

function Speak(TEXT) {
  const utter = new SpeechSynthesisUtterance();
  utter.lang = 'en-US';
  utter.rate = 0.8;
  utter.pitch = 0.9;
  let counter = 0;

  utter.text = TEXT;
  utter.voice = window.speechSynthesis.getVoices()[1];

  window.speechSynthesis.speak(utter);
  utter.onend = () => {
    setTimeout(startListening, 3000);
  };
}


//To get currentTime
function getCurrentTime()
{
  const date = new Date();
  let hours = date.getHours();
  let minutes = date.getMinutes();

  currentTimeIs = hours + 'hours' + minutes + 'minutes';
  vo = "The time is..." + currentTimeIs;
  youz();

  Speak(vo);

}


//Calls function onload
micbutton.addEventListener("click", startListening);

function openWeb(Url)
{
  window.open(Url);
}

// Get weather details

function getWeatherDetails()
{
  if ("geolocation" in navigator)
  {
    navigator.geolocation.getCurrentPosition(async function(position) {
      let lat = position.coords.latitude;
      let lon = position.coords.longitude;

      const api_url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`;

      let response = await fetch(api_url);

      let data = await response.json();

      manipulateWeatherData(data);

    });
  }
}


function manipulateWeatherData(data)
{
  let city = data.name;
  let temp = data.main.temp;
  let humidity = data.main.humidity;

  let icon = data.weather[0].icon;
  let description = data.weather[0].main;
  // console.log(data);
  let msg = `temperature is ${temp} degree , and humidity is ${humidity} grams of water vapour per kilogram`;
  vo = msg
  youz();

  Speak(vo);
  //We can use other data if we want to show on screen
  // let imageUrl = `https://openweathermap.org/img/w/${icon}.png`;

  // let image = `<img src="${imageUrl}">`;
  // document.write(image);
}


// Get today's date
function getTodayDate()
{
  var d = new Date();
  var months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
  var month = months[d.getMonth()];
  var date = d.getDate();
  var days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
  var weekDay = days[d.getDay()];
  var year = d.getFullYear();
  vo = "Today date is " + weekDay + " " + date + " " + month + " " + year;
  youz();

  Speak(vo);
}


async function searchwika(ask) {
  console.log(modsearch)

  const endpoint = `https://${modsearch}.wikipedia.org/w/api.php?action=query&list=search&prop=info&inprop=url&utf8=&format=json&origin=*&srlimit=20&srsearch=${ask}`;
  const response = await fetch(endpoint);
  if (!response.ok) {
    throw Error(response.statusText);
  }
  const json = await response.json();
  let data = json.query.search[0]
  console.log(data)


  const datax = `https://${modsearch}.wikipedia.org/w/api.php?action=parse&origin=*&format=json&pageid=${data.pageid}`
  const dataz = await fetch(datax);
  const datar = await dataz.json();
  let dataf = datar.parse.text['*']
  let xdata = dataf.replace(/<[^>]+>/g, '');
  console.log(dataf)
  vo = data.snippet
  youz();
  //vo = data.pageid
//  Speak(vo.replace(/<[^>]+>/g, ''))
  //Speak(vo);
  vo = dataf.slice(0, 15000);
    youz();


}

function cls() {
  vo = 'clearing window ...'
  Speak(vo)
  body.style.background = '#ff0'

  youz();


  setTimeout
    (function() {
      body.style.background = '#010'
    }, 1 * 1000);

  setTimeout
    (function() {
      body.style.background = '#100'
    }, 2 * 1000);

  setTimeout
    (function() {
      dad.innerHTML = '',
        body.style.background = '#000'
    }, 3 * 1000);
}




//Opening camera
function openCamera()
{
  vo = 'opening camera'
  youz();

  openCamera = window.location = 'intent://com.sec.android.app.camera/#Intent;scheme=android-app;end';
}

//Closing Camera


//Search on Google
function searchOnGoogle(data)
{
  window.open(
    `https://www.google.com/search?q=${data}`,
    "Google",
  );

}
//Search on Youtube
function searchOnYoutube(data)
{
  window.open(
    `https://www.youtube.com/search?q=${data}`,
    "Youtube",
  );
}

//Close to nitro
function closenitro()
{
  setTimeout(function() {
    window.close();
  }, 2 * 1000);
}

//Reload nitro
function reloadnitro()
{
  vo = "please wait. reloading.";
  youz();

  Speak(vo);

  setTimeout(function() {
    location.reload();
  }, 7 * 1000);
}

//To move nitro window upside
function stepUp()
{
  window.moveBy(0, -100);
}

//To move nitro window downside
function stepDown()
{
  window.moveBy(0, 100);
}

//To move against x-axis out
function moveToXAxisOut()
{
  window.moveBy(100, 0);
}

//To move against x-axis in
function moveToXAxisIn()
{
  window.moveBy(-100, 0);
}

//To get a Battery
let batteryPromise = navigator.getBattery();
batteryPromise.then(printBatteryStatus);

function printBatteryStatus(batteryObject) {
  // console.log("IsCharging", batteryObject.charging);
  window.batteryLevel = Math.round(batteryObject.level * 100);
  // console.log("Percentage", batteryLevel+"%");
}

function getBattery()
{
  vo = "Battery left in the device is " + batteryLevel + "percent"
  youz();

  Speak(vo);
}
//Get family Information
function getFamilyInfo()
{
  vo = "Your family is 7 people. Your father is Mahammad atia. your mother is Saeeda Hassan. your sisters Asmaa Muhammad and Esraa Muhammad. and your brother is Khaled Muhammad. and you are my Sir. you live in Abu Al-Shoqoq. i have lot to say but i think it will be enough"
  youz();

  Speak(vo);
}
//Play Music
function playMusic()
{
  Speak("Playing music...");
  window.shutter = new Audio();
  shutter.autoplay = true;
  // play sound effect
  var randomNumber = Math.floor((Math.random() * 11) + 1);
  //randomNumber = 11;
  console.log(randomNumber);
  let songNumber;
  if (randomNumber == 1)
  {
    // songNumber = one;
    shutter.src = one;
  }
  else if (randomNumber == 2)
  {
    shutter.src = two;
  }
  else if (randomNumber == 3)
  {
    shutter.src = three;
  }
  else if (randomNumber == 4)
  {
    shutter.src = four;
  }
  else if (randomNumber == 5)
  {
    shutter.src = five;
  }
  else if (randomNumber == 6)
  {
    shutter.src = six;
  }
  else if (randomNumber == 7)
  {
    shutter.src = four;
  }
  else if (randomNumber == 8)
  {
    shutter.src = eight;
  }
  else if (randomNumber == 11)
  {
    shutter.src = "Background Music.mp3";
  }
  else
  {
    shutter.src = eleven;
  }
  shutter.play();
}

//Stop Music
function stopMusic()
{
  shutter.pause();
}
var randomNumber = Math.floor((Math.random() * 3) + 1);
console.log(randomNumber);
//Telling a Joke
function tellMeAJoke()
{
  window.shutter1 = new Audio(); //window is use here to access variable anywhere in Program
  shutter1.autoplay = true;
  // play sound effect
  window.randomNumber = Math.floor((Math.random() * 6) + 1);
  console.log(randomNumber);
  if (randomNumber == 1)
  {
    shutter1.src = 'Joke 1.mp3';
  }
  else if (randomNumber == 2)
  {
    shutter1.src = 'Joke 2.mp3';
  }
  else if (randomNumber == 3)
  {
    shutter1.src = 'Joke 3.mp3';
  }
  else if (randomNumber == 4)
  {
    shutter1.src = 'Joke 4.mp3';
  }
  else if (randomNumber == 5)
  {
    shutter1.src = 'Joke 5.mp3';
  }
  else
  {
    shutter1.src = 'Joke 6.mp3';
  }
  shutter1.play();
}
//Next Joke
function nextJoke()
{
  if (randomNumber < 6)
  {
    randomNumber = randomNumber + 1;
  }
  else
  {
    randomNumber = 0;
  }

  if (randomNumber == 1)
  {
    shutter1.src = 'Joke 1.mp3';
  }
  else if (randomNumber == 2)
  {
    shutter1.src = 'Joke 2.mp3';
  }
  else if (randomNumber == 3)
  {
    shutter1.src = 'Joke 3.mp3';
  }
  else if (randomNumber == 4)
  {
    shutter1.src = 'Joke 4.mp3';
  }
  else if (randomNumber == 5)
  {
    shutter1.src = 'Joke 5.mp3';
  }
  else
  {
    shutter1.src = 'Joke 6.mp3';
  }
}
//Welcome to friends
function welcomeToFriends()
{
  Speak("Welcome you all.. i am nitro... nice to meet you...");
  Speak("I have a big list and am sure that you are one from that...");
  Speak("Sir... should i pack up...I think you want to talk to your friends...");
}
//Show friends list
function friendList()
{
  window.friendList = window.open(
    "http://localhost:5500/mic/friendList.html",
    "",
    "width=700px,height=500px"
  )
}
//Close Friend List
function closeList()
{
  friendList.close();
}

//System Information
function systemInfo()
{
  var type = navigator.connection.effectiveType;
  type = type.slice(0, 1);
  var platform = navigator.platform;
  platform = platform.slice(3, 5);

  vo = "The system is online with the speed of " + navigator.connection.downlink + " MB per second" + '. ' + "Keyboard language is " + navigator.language + '. ' + "The type of connection this system is using is " + type + " G" + '. ' + " The system is windows " + platform + " bits";
  youz();

  Speak(vo)
}
//Internet Speed
function internetSpeed()
{
  if (navigator.onLine)
  {
    vo = "The system is online with the speed of " + navigator.connection.downlink + " MB per second";
    youz();

    Speak(vo)
  }
  else {
    vo = "The system is not online...";
    youz();

    Speak(vo)
  }
}

function readList() {
  var friendList = [];
  var friendList1 = "";
  friendList1 = localStorage.getItem("array");
  friendList = friendList1.split(",");
  console.log(friendList);

  for (let friend of friendList)
  {
    console.log(friend);
    Speak(friend);
  }
}

function nitroSaysHello()
{
  let d = new Date();
  var hours = d.getHours();
  Speak("i am nitro");
  if (hours <= 12)
  {
    Speak("Good morning...");
  }
  else if (hours > 12 && hours <= 16)
  {
    Speak("Good afternoon...");
  }
  else if (hours > 16 && hours <= 20)
  {
    Speak("Good evening...");
  }
  else
  {

  }
  Speak("say what can i do for you sir...");
}