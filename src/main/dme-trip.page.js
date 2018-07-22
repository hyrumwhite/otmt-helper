export default class TripPage {
  constructor() {}
  updateElementValue(id, value) {
    let element = document.getElementById(id);
    if (element) {
      console.log(element);
      element.value = value;
    }
  }
  updateForm(data) {
    for (let key in data) {
      this[key] && this[key](data[key]);
    }
    this.notes(data.customerPhone, data.tripNumber, data.providerNotes);
    this.clickCalculate();
  }
  customerName(value) {
    this.updateElementValue("ctl00_ContentPlaceHolder1_txtCustomerName", value);
  }
  date(value) {
    this.updateElementValue("ctl00_ContentPlaceHolder1_txtDate", value);
  }
  pickupTime(value) {
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
  notes(phone, tripNumber, notes) {
    let notesElement = document.getElementById(
      "ctl00_ContentPlaceHolder1_txtNotesforDriver"
    );
    notesElement.value = `${phone}, ${tripNumber}, a2c
    ${notes}`;
  }
  clickCalculate() {
    let button = document.querySelector('[onclick="calculateDistances();"]');
    button.click();
  }
}
