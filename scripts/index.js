chrome.runtime.onMessage.addListener(gotMessage);
const connectionUrl =
  "https://www.linkedin.com/mynetwork/invitation-manager/sent/";

async function gotMessage(inputObj, sender, sendresponse) {
  if (inputObj.type === "redirect") {
    window.location.replace(connectionUrl);
  } else if (inputObj.type === "withdraw") {
    
    const olderFirst = inputObj.order === "old";
    goToLastPage(olderFirst);
    setTimeout(() => {
      var totalConnections = document.querySelectorAll(
        '[data-control-name="withdraw_single"]'
      );
      var totalLength = totalConnections.length;
      var noOfUsersToWithdraw = inputObj.noOfUser || totalLength;
      var startCounter = olderFirst ? totalLength - 1 : 0;
      var removeCounter = 0;
      var refNumber = olderFirst ? totalLength - 1 : 0;
      var waitForClick;

      var syncIt = () => {
        if (document.readyState !== 'loading') {
          if (removeCounter > Number(noOfUsersToWithdraw)) {
            clearInterval(waitForClick);
            return;
          }
          totalConnections[startCounter].click();
          waitForClick = setTimeout(() => {
            var elem = document.querySelector("[data-test-dialog-primary-btn]");
            elem.click();
            startCounter = olderFirst ? startCounter - 1 : startCounter + 1;
            removeCounter++; // 1
            if (olderFirst && refNumber < removeCounter - 1) {
              console.log("last page navigated");
              goToLastPage(olderFirst);
            }
            if (removeCounter < Number(noOfUsersToWithdraw)) {
              syncIt();
            }
          }, 700);
        }
        
      };
      syncIt();
    }, 2000);
  }

  function goToLastPage(olderFirst) {
    if (olderFirst) {
      var requestPageList = document.querySelectorAll(".artdeco-pagination__indicator");
      var button = requestPageList[requestPageList.length - 1].querySelector("button");
      button.click();
    }
  }
}
