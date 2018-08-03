import CreateLoader from "./create-loader.js";

export default class TripPage {
  constructor() {}
  updateElementValue(id, value) {
    let element = document.getElementById(id);
    if (element) {
      element.value = value;
    }
  }
  updateForm(data) {
    for (let key in data) {
      this[key] && this[key](data[key]);
    }
    this.notes(
      data.customerPhone,
      data.tripNumber,
      data.providerNotes,
      data.pickupTime
    );
    this.clickCalculate();
  }
  showCustomerInfoLoader() {
    let input = document.querySelector(
      "#ctl00_ContentPlaceHolder1_txtPersonCalling"
    );
    let inputContainer = input.parentElement;
    this.loader = CreateLoader(inputContainer);
  }
  hideCustomerInfoLoader() {
    this.loader.parentElement.removeChild(this.loader);
  }
  updateCustomerInfo({ PhoneNum, Address }) {
    this.updateElementValue(
      "ctl00_ContentPlaceHolder1_txtTelephoneNumber",
      PhoneNum
    );
    this.updateElementValue("ctl00_ContentPlaceHolder1_txtAddress", Address);
  }
  customerName(value) {
    this.updateElementValue("ctl00_ContentPlaceHolder1_txtCustomerName", value);
  }
  date(value) {
    this.updateElementValue("ctl00_ContentPlaceHolder1_txtDate", value);
  }
  pickupTime(value) {
    value = value === "Will Call" ? "12:00 AM" : value;
    this.updateElementValue("ctl00_ContentPlaceHolder1_txtTime", value);
  }
  pickupAddress(value) {
    this.updateElementValue("ctl00_ContentPlaceHolder1_txtFrom", value);
  }
  destinationAddress(value) {
    this.updateElementValue("ctl00_ContentPlaceHolder1_txtTo", value);
  }
  requiresWheelchairVan(value) {
    let wheelchairRadio = document.getElementById(
      "ctl00_ContentPlaceHolder1_chkChair"
    );
    let ambulatoryRadio = document.getElementById(
      "ctl00_ContentPlaceHolder1_chkAmbulatory"
    );
    value ? (wheelchairRadio.checked = true) : (ambulatoryRadio.checked = true);
  }
  notes(phone, tripNumber, notes, time) {
    time = time === "Will Call" ? "12:00 AM" : time;
    let notesElement = document.getElementById(
      "ctl00_ContentPlaceHolder1_txtNotesforDriver"
    );
    notesElement.value = `${phone}, ${tripNumber}, ${time}, a2c

    ${notes}`;
  }
  clickCalculate() {
    let button = document.querySelector('[onclick="calculateDistances();"]');
    button.click();
  }
}
