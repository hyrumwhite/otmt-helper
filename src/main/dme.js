import DMEService from "./dme-service.js";
import TripPage from "./dme-trip.page.js";

export default function MessageListener() {
  const tripPage = new TripPage();
  if (window.location.href.includes("dmelive.com/Trips/")) {
    console.log("hey this is the dme site");
    chrome.runtime.onMessage.addListener(function(
      request,
      sender,
      sendResponse
    ) {
      console.log({ request });
      tripPage.updateForm(request);
      sendResponse({ success: true });
    });
  }
}
