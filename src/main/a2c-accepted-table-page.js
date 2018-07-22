export default class AcceptedTablePage {
  constructor() {
    let links = document
      .querySelector(".dgTable")
      .querySelectorAll("tbody tr td:nth-child(2) a");
    let tripIds = [];
    for (let link of links) {
      tripIds.push(link.textContent);
    }
    tripIds.pop();
    console.log(tripIds);
  }
  storeTripNumbers() {}
  clearAllTripNumbers() {}
  selectTrip() {}
}
