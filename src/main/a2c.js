import TripDetailsController from "./a2c-trip-details-controller.js";

export default function MessageListener() {
  const tripDetailsController = new TripDetailsController();

  if (window.location.href.includes("a2ctp.emsc.net")) {
    console.log("hey this is the a2c site");
    chrome.runtime.onMessage.addListener(function(
      request,
      sender,
      sendResponse
    ) {
      console.log(sender.tab, request);
      if (!sender.tab) {
        if (request.action === "sendDataToDME") {
          tripDetailsController.sendData(sendResponse);
        }
      }
      if (request.greeting == "hello") sendResponse({ state: "success" });
    });
  }
}
