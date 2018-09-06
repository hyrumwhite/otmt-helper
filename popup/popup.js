const sendMessage = (tab, message) => {
  console.log("sending message");
  return new Promise((resolve, reject) => {
    console.log(tab, tab.id);
    chrome.tabs.sendMessage(tab.id, message, response => {
      response.error || !response ? reject(response) : resolve(response);
    });
  });
};

const sendMessageToActiveTab = message => {
  return new Promise((resolve, reject) => {
    chrome.tabs.query({ active: true, currentWindow: false }, tabs =>
      sendMessage(tabs[0], message)
        .then(resolve)
        .catch(reject)
    );
  });
};
const getTabByUrl = url => {
  console.log(url);
  return new Promise((resolve, reject) => {
    chrome.windows.getAll({ populate: true }, windows => {
      windows.forEach(window => {
        window.tabs.forEach(tab => {
          console.log(tab.url);
          if (tab.url.includes(url)) {
            console.log("found tab!");
            return resolve(tab);
          }
        });
      });
      return reject({ error: "tab not found" });
    });
  });
};
const sendMessageToTabByURL = async (url, message) => {
  let dmeTab = await getTabByUrl(url);
  return new Promise((resolve, reject) => {
    sendMessage(dmeTab, message).then(resolve);
  });
};

const simpleCopy = async $event => {
  try {
    let pageData = await sendMessageToTabByURL(
      "https://a2ctp.emsc.net/TripDetails.aspx",
      { action: "sendDataToDME" }
    );
    pageData.action = "fillDataFromA2C";
    let fillResults = await sendMessageToTabByURL(
      "dmelive.com/Trips/",
      pageData
    );
  } catch (e) {
    throw new Error(e);
  }
};

const requestToggleMessages = async () => {
  console.log("hide messages");
  await sendMessageToTabByURL("dmelive.com", { hideMessages: "true" });
};

const startButton = document.getElementById("start-transfer-button");
startButton.addEventListener("click", simpleCopy);
const hideDMEMessagesButton = document.getElementById("hide-dme-messages");
hideDMEMessagesButton.addEventListener("click", requestToggleMessages);
const a2cStatusElement = document.getElementById("a2c-page-status");
const dmeStatusElement = document.getElementById("dme-page-status");
console.log("trying to get page");
getTabByUrl("TripDetails.aspx")
  .then(tab => {
    console.log("tab!!!");
    a2cStatusElement.textContent = "Found A2C trip details page";
    a2cStatusElement.style.color = "rgb(76, 175, 80)";
  })
  .catch(error => {
    console.log("failed to get tag");
    a2cStatusElement.textContent = "A2C trip details page not found";
    a2cStatusElement.style.color = "rgb(244, 67, 54)";
    startButton.setAttribute("disabled", "true");
  });

getTabByUrl("dmelive.com/Trips/mgmttrips.aspx")
  .then(tab => {
    dmeStatusElement.textContent = "Found DME trip entry page";
    dmeStatusElement.style.color = "rgb(76, 175, 80)";
  })
  .catch(error => {
    dmeStatusElement.textContent = "DME trip entry page not found";
    dmeStatusElement.style.color = "rgb(244, 67, 54)";
    startButton.setAttribute("disabled", "true");
  });
