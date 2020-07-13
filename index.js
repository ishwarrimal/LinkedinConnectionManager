function handleClick(e) {
  e.preventDefault();
  let params = {
    active: true,
    currentWindow: true,
  };
  chrome.tabs.query(params, gotTabs);
  const inputObj = { type: "withdraw" };
  inputObj.noOfUser = document.getElementById("noOfUser").value;
  inputObj.order = document.getElementById("order").value;

  function gotTabs(tabs) {
    console.log(inputObj);
    chrome.tabs.sendMessage(tabs[0].id, inputObj);
  }
}

function handleRedirectWithdraw(e) {
  e.preventDefault();
  document.getElementById("form").style.display = "block";
  document.getElementById("back-btn-redirect").style.display = "block";
  document.getElementById("redirect_add").style.display = "none";
  let params = {
    active: true,
    currentWindow: true,
  };
  chrome.tabs.query(params, gotTabs);
  const inputObj = { type: "redirect" };

  function gotTabs(tabs) {
    chrome.tabs.sendMessage(tabs[0].id, inputObj);
  }
}

function backButtonForWithdraw(event) {
  event.preventDefault();
  document.getElementById("form").style.display = "none";
  document.getElementById("back-btn-redirect").style.display = "none";
  document.getElementById("redirect_add").style.display = "block";
}

function backButtonForAdd(event) {
  event.preventDefault();
  // document.getElementById("form").style.display = "none"; This should be implimented after Add connection
  document.getElementById("back-btn-redirect_add").style.display = "none";
  document.getElementById("withdraw").style.display = "block";
}

document.getElementById("withdraw").addEventListener("click", handleClick);
document
  .getElementById("redirect_withdraw")
  .addEventListener("click", handleRedirectWithdraw);
document
  .getElementById("back-btn-redirect")
  .addEventListener("click", backButtonForWithdraw);
document
  .getElementById("back-btn-redirect_add")
  .addEventListener("click", backButtonForAdd);

if ("webkitSpeechRecognition" in window) {
  navigator.webkitGetUserMedia(
    {
      audio: true,
    },
    function (stream) {
      stream.stop();
      // Now you know that you have audio permission. Do whatever you want...
    },
    function () {
      // Aw. No permission (or no microphone available).
    }
  );
  function processResult(result) {
    recognition.stop();
    console.log(result);
    var count = 0;
    var position = null;
    result = result.toLowerCase().split(" ");
    result.forEach((subStr) => {
      if (position && count) {
        return;
      }
      if (["one", "tow"].indexOf(subStr) > -1) {
        count = subStr == "one" ? 1 : 2;
      } else if (!count && !isNaN(subStr)) {
        count = subStr;
      } else if (["newest", "newer", "new", "first"].indexOf(subStr) > -1) {
        position = "new";
      } else if (["oldest", "older", "old", "last"].indexOf(subStr) > -1) {
        position = "old";
      }
    });
    console.log(count, position);
    if (!position || !count) {
      alert("Couldn't recognize. Please try again");
    } else {
      order.value = position;
      noOfUser.value = count;
    }
  }

  // speech recognition API supported
  var recognition = new webkitSpeechRecognition();
  recognition.continuous = true;
  recognition.interimResults = true;
  recognition.onresult = function (event) {
    var interim_transcript = "";
    for (var i = event.resultIndex; i < event.results.length; ++i) {
      if (event.results[i].isFinal) {
        final_transcript += event.results[i][0].transcript;
      } else {
        interim_transcript += event.results[i][0].transcript;
      }
    }
    interim.innerHTML = interim_transcript;
    if (final_transcript.length > 0) {
      processResult(final_transcript);
    }
  };

  recognition.onerror = function (event) {
    alert("Error: ", event.error);
    //   if (event.error == 'no-speech') {
    //     start_img.src = 'assets/mic.gif';
    //     showInfo('no_speech');
    //     ignore_onend = true;
    //   }
    //   if (event.error == 'audio-capture') {
    //     start_img.src = 'assets/mic.gif';
    //     showInfo('no_microphone');
    //     ignore_onend = true;
    //   }
    //   if (event.error == 'not-allowed') {
    //     if (event.timeStamp - start_timestamp < 100) {
    //       showInfo('blocked');
    //     } else {
    //       showInfo('denied');
    //     }
    //     ignore_onend = true;
    //   }
  };

  recognition.onend = function () {
    start_img.src = "assets/mic.gif";
  };

  start_button.addEventListener("click", function () {
    // showInfo('speak_now');
    start_img.src = "assets/mic-animation.gif";
    final_transcript = "";
    recognition.start();
  });
} else {
  // speech recognition API not supported
  // upgrade();
}
