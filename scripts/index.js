chrome.runtime.onMessage.addListener(gotMessage);
const connectionUrl =
  "https://www.linkedin.com/mynetwork/invitation-manager/sent/";

async function gotMessage(inputObj, sender, sendresponse) {
  if (inputObj.type === "redirect") {
    window.location.replace(connectionUrl);
  } else if (inputObj.type === "withdraw") {
    var totalConnections = document.querySelectorAll(
      '[data-control-name="withdraw_single"]'
    );
    const olderFirst = inputObj.order === "old";
    goToLastPage(olderFirst);
    var totalLength = totalConnections.length;
    var noOfUsers = inputObj.noOfUser || totalLength;
    var startCounter = olderFirst ? totalLength - 1 : 0;
    var counter = 0;
    var waitForClick;
    var syncIt = () => {
      if (counter > Number(noOfUsers)) {
        clearInterval(waitForClick);
        return;
      }
      totalConnections[startCounter].click();
      waitForClick = setTimeout(() => {
        var elem = document.querySelector("[data-test-dialog-primary-btn]");
        elem.click();
        startCounter = olderFirst ? startCounter - 1 : startCounter + 1;
        counter++;
        syncIt();
      }, 700);
    };
    syncIt();
  }

  function goToLastPage(olderFirst) {
    if (olderFirst) {
      var requestPageList = document.querySelectorAll(".artdeco-pagination__indicator");
      var button = requestPageList[requestPageList.length - 1].querySelector("button");
      button.click();
    }
  }
}
