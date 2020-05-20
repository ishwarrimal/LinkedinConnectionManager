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
  let params = {
    active: true,
    currentWindow: true,
  };
  chrome.tabs.query(params, gotTabs);
  const inputObj = { type: "redirect" };

  function gotTabs(tabs) {
    console.log({ inputObj });
    chrome.tabs.sendMessage(tabs[0].id, inputObj);
  }
}

document.getElementById("withdraw").addEventListener("click", handleClick);
document.getElementById("redirect").addEventListener("click", handleRedirect);
