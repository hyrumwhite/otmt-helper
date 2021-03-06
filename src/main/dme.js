import DMEService from "./dme-service.js";
import TripPage from "./dme-trip.page.js";
import AlertPopup from "./alert-popup.js";
const { href } = window.location;
console.log(href);
export default async function MessageListener() {
  const tripPage = new TripPage();
  if (href.includes("dmelive.com")) {
    console.log("hey this is the dme site");
    chrome.runtime.onMessage.addListener(async function(
      request,
      sender,
      sendResponse
    ) {
      if (request.hideMessages === "true") {
        return tripPage.hideMessages();
      }
      console.log({ request });
      tripPage.updateForm(request);
      sendResponse({ success: true });
      tripPage.showCustomerInfoLoader();
      let customerList = await DMEService.getUserExists(request.customerName);
      if (customerList.length === 0) {
        tripPage.hideCustomerInfoLoader();
        return AlertPopup.show(
          "No entries found for customer name. You likely need to enter this name as a new customer."
        );
      }
      if (customerList.length > 1) {
        tripPage.hideCustomerInfoLoader();
        return AlertPopup.show(
          "Multiple entries for customer name detected. Manual selection required."
        );
      }
      let customerData = await DMEService.getUserInfo(customerList[0].id);
      tripPage.updateCustomerInfo(customerData.d);
      tripPage.hideCustomerInfoLoader();
    });
  }
}
