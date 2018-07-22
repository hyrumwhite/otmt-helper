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
const getDMETab = () => {
  return new Promise((resolve, reject) => {
    chrome.tabs.query({ currentWindow: true }, tabs => {
      let dmeTab;
      for (let tab of tabs) {
        if (tab.url.includes("dmelive.com/Trips/")) {
          dmeTab = tab;
          return resolve(dmeTab);
        }
      }
      reject({ error: "no dme tab found" });
    });
  });
};
const sendMessageToDMETab = async message => {
  let dmeTab = await getDMETab();
  return new Promise((resolve, reject) => {
    sendMessage(dmeTab, message).then(resolve);
  });
};

const simpleCopy = async $event => {
  try {
    let pageData = await sendMessageToActiveTab({ action: "sendDataToDME" });
    pageData.action = "fillDataFromA2C";
    let fillResults = await sendMessageToDMETab(pageData);
  } catch (e) {
    throw new Error(e);
  }
};

document
  .getElementById("start-transfer-button")
  .addEventListener("click", simpleCopy);
