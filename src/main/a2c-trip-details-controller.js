import TripDetailsPage from "./a2c-trip-details.page.js";
export default class TripDetailsController {
  constructor() {
    this.page = new TripDetailsPage();
  }
  getPageData() {
    return this.page.getAllData();
  }
  sendData(sendResponse) {
    const pageData = this.getPageData();
    sendResponse(pageData);
  }
}
