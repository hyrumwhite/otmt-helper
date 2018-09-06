import Api from "./api.js";

export default class DMEService {
  static async getUserExists(customerName) {
    customerName = encodeURIComponent(customerName);
    let timeStamp = new Date().getTime();
    let customerData = await Api.get({
      url: `https://dmelive.com/WS/AutoCompleteCustomer.ashx?q=${customerName}&limit=10&timestamp=${timeStamp}`,
      responseType: "text"
    });
    if (customerData.length === 0) {
      return [];
    }
    customerData = customerData.split("\n");
    let newCustomerData = [];
    for (let i = 0; i < customerData.length; i++) {
      let item = customerData[i].split("|");
      item[0] && newCustomerData.push({ name: item[0], id: item[1] });
    }
    return newCustomerData;
  }
  static getUserInfo(customerId) {
    return fetch(
      "https://dmelive.com/WS/CustomerManager.asmx/GetCustomerForTrip",
      {
        credentials: "include",
        headers: {
          Accept: "application/json, text/javascript, */*; q=0.01",
          "Content-Type": "application/json; charset=UTF-8"
        },
        referrer: "https://dmelive.com/Trips/mgmttrips.aspx",
        referrerPolicy: "no-referrer-when-downgrade",
        body: '{"pintCustomerID":' + customerId + "}",
        method: "POST",
        mode: "cors"
      }
    ).then(response => {
      if (!response.ok) {
        return Promise.reject(response);
      }
      return response.json();
    });
    // return Api.post({
    //   url: "https://dmelive.com/WS/CustomerManager.asmx/GetCustomerForTrip",
    //   body: JSON.stringify({
    //     pintCustomerID: customerId
    //   })
    // });
  }
}
