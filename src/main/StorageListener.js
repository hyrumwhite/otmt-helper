import DMEService from './dme-service.js';
import TripPage from './dme-trip.page.js';
import AlertPopup from './alert-popup.js';
const { href } = window.location;
export default async function StorageListener() {
  const tripPage = new TripPage();
  if (href.includes('dmelive.com')) {
    console.log('hey this is storage listener');
    chrome.storage.onChanged.addListener(async function({ tripData }) {
      chrome.storage.local.set({ tripData: null }, function() {
        console.log('clearing storage');
      });
      console.log('hey change detected');
      if (!tripData) {
        console.log('tripData has been cleared');
        return;
      }
      console.log({ tripData });
      const request = tripData.newValue;
      tripPage.updateForm(request, 'MT');
      tripPage.showCustomerInfoLoader();
      let customerList = await DMEService.getUserExists(request.customerName);
      if (customerList.length === 0) {
        tripPage.hideCustomerInfoLoader();
        return AlertPopup.show(
          'No entries found for customer name. You likely need to enter this name as a new customer.'
        );
      }
      if (customerList.length > 1) {
        tripPage.hideCustomerInfoLoader();
        return AlertPopup.show(
          'Multiple entries for customer name detected. Manual selection required.'
        );
      }
      let customerData = await DMEService.getUserInfo(customerList[0].id);
      tripPage.updateCustomerInfo(customerData.d);
      tripPage.hideCustomerInfoLoader();
    });
  }
}
