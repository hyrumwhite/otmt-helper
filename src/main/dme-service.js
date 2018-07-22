import Api from "./api.js";

export default class DMEService {
  getUserExists(customerName) {
    customerName = encodeURIComponent(customerName);
    let timeStamp = new Date().getTime();
    return Api.get({
      url: `http://dmelive.com/WS/AutoCompleteCustomer.ashx?q=${customerName}&limit=10&timestamp=${timeStamp}`
    });
  }
  getUserInfo(customerId) {
    return Api.post({
      url: "http://dmelive.com/WS/CustomerManager.asmx/GetCustomerForTrip",
      body: JSON.stringify({
        pintCustomerID: customerId
      })
    });
  }
}
