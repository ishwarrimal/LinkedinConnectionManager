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

function handleRedirect(e) {
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
document.getElementById("redirect").addEventListener("click", handleRedirect);
document.getElementById("back-btn-redirect").addEventListener("click", backButtonForWithdraw);
document.getElementById("back-btn-redirect_add").addEventListener("click", backButtonForAdd);

