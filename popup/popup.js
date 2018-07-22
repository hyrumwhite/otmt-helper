const sendMessage = (tab, message) => {
  return new Promise((resolve, reject) => {
    console.log(tab, tab.id);
    chrome.tabs.sendMessage(tab.id, message, response => {
      response.error ? reject(response) : resolve(response);
    });
  });
};

const sendMessageToActiveTab = message => {
  return new Promise((resolve, reject) => {
    chrome.tabs.query({ active: true, currentWindow: true }, tabs =>
      sendMessage(tabs[0], message)
        .then(resolve)
        .catch(reject)
    );
  });
};
const getTabByUrl = url => {
  return new Promise((resolve, reject) => {
    chrome.tabs.query({ currentWindow: true }, tabs => {
      let dmeTab;
      for (let tab of tabs) {
        if (tab.url.includes(url)) {
          dmeTab = tab;
          return resolve(dmeTab);
        }
      }
      reject({ error: "no tab found with url: " + url });
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

const startButton = document.getElementById("start-transfer-button");
startButton.addEventListener("click", simpleCopy);
const a2cStatusElement = document.getElementById("a2c-page-status");
const dmeStatusElement = document.getElementById("dme-page-status");
getTabByUrl("TripDetails.aspx")
  .then(tab => {
    a2cStatusElement.textContent = "Found A2C trip details page";
    a2cStatusElement.style.color = "rgb(76, 175, 80)";
  })
  .catch(error => {
    a2cStatusElement.textContent = "A2C trip details page not found";
    a2cStatusElement.style.color = "rgb(244, 67, 54)";
    startButton.setAttribute("disabled", "true");
  });

getTabByUrl("http://dmelive.com/Trips/mgmttrips.aspx")
  .then(tab => {
    dmeStatusElement.textContent = "Found DME trip entry page";
    dmeStatusElement.style.color = "rgb(76, 175, 80)";
  })
  .catch(error => {
    dmeStatusElement.textContent = "DME trip entry page not found";
    dmeStatusElement.style.color = "rgb(244, 67, 54)";
    startButton.setAttribute("disabled", "true");
  });
