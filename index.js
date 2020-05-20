function handleClick() {
  let params = {
    active: true,
    currentWindow: true,
  };
  chrome.tabs.query(params, gotTabs);
  let noOfUser = document.getElementById("noOfUser").value;

  function gotTabs(tabs) {
    console.log(tabs);
    chrome.tabs.sendMessage(tabs[0].id, noOfUser);
  }
}

document.getElementById("withdraw").addEventListener("click", handleClick);
