export default class TripDetailsPage {
  constructor() {}
  getElementText(element, textKey = "textContent") {
    if (element) {
      return element[textKey];
    }
    alert("Unable to find element, ask Seth to fix this.");
  }
  getTextById(id, textKey) {
    let element = document.getElementById(id);
    return this.getElementText(element, textKey);
  }
  getAllData() {
    return {
      tripNumber: this.getTripNumber(),
      date: this.getDate(),
      pickupTime: this.getPickupTime(),
      pickupAddress: this.getPickupAddress(),
      destinationAddress: this.getDestinationAddress(),
      customerPhone: this.getCustomerPhone(),
      mileage: this.getMileage(),
      providerNotes: this.getProviderNotes(),
      customerName: this.getCustomerName(),
      requiresWheelchairVan: this.requiresWheelchairVan()
    };
  }
  getPickupTime() {
    return this.getTextById(
      "ctl00_ContentPlaceHolder1_TripDetailsView_lblAppointmentTime"
    );
  }
  getTripNumber() {
    return this.getTextById(
      "ctl00_ContentPlaceHolder1_TripDetailsView_lblTripNumber"
    );
  }
  getDate() {
    return this.getTextById(
      "ctl00_ContentPlaceHolder1_TripDetailsView_lblTripDate"
    );
  }
  getPickupAddress() {
    return this.getTextById(
      "ctl00_ContentPlaceHolder1_TripDetailsView_divPickupAddress",
      "innerText"
    ).replace("\n", " ");
  }
  getDestinationAddress() {
    return this.getTextById(
      "ctl00_ContentPlaceHolder1_TripDetailsView_divDestinationAddress",
      "innerText"
    ).replace("\n", " ");
  }
  getCustomerPhone() {
    return this.getTextById(
      "ctl00_ContentPlaceHolder1_TripDetailsView_lblMemberPhone"
    );
  }
  getMileage() {
    return this.getTextById(
      "ctl00_ContentPlaceHolder1_TripDetailsView_lblMileage"
    );
  }
  getProviderNotes() {
    return this.getTextById(
      "ctl00_ContentPlaceHolder1_TripDetailsView_divNotes"
    ).replace("Provider Notes: ", "");
  }
  getCustomerName() {
    return this.getTextById(
      "ctl00_ContentPlaceHolder1_TripDetailsView_lblMemberName"
    );
  }
  requiresWheelchairVan() {
    return this.getTextById(
      "ctl00_ContentPlaceHolder1_TripDetailsView_lblVehicleType"
    ).includes("WC Van");
  }
}
