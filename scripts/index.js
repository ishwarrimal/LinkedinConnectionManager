chrome.runtime.onMessage.addListener(gotMessage);
const connectionUrl =
  "https://www.linkedin.com/mynetwork/invitation-manager/sent/";

async function gotMessage(inputObj, sender, sendresponse) {
  console.log({ inputObj });
  if (inputObj.type === "redirect") {
    console.log("hey");
    window.location.replace(connectionUrl);
  } else if (inputObj.type === "withdraw") {
    console.log({ inputObj });
    var totalConnections = document.querySelectorAll(
      '[data-control-name="withdraw_single"]'
    );
    const olderFirst = inputObj.order === "old";
    var totalLength = totalConnections.length;
    var noOfUsers = inputObj.noOfUser || totalLength;
    var startCounter = olderFirst ? totalLength - 1 : 0;
    var counter = 0;
    var waitForClick;
    var syncIt = () => {
      if (counter > noOfUsers) {
        clearInterval(waitForClick);
        return;
      }
      totalConnections[startCounter].click();
      waitForClick = setTimeout(() => {
        console.log("removeing inner");
        var elem = document.querySelector("[data-test-dialog-primary-btn]");
        console.log(elem);
        elem.click();
        startCounter = olderFirst ? startCounter-- : startCounter++;
        counter++;
        syncIt();
      }, 500);
    };
    syncIt();
  }
}
