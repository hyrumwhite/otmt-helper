console.log('NAT MED TRANS PAGE');
let tripTable;
let tripFrame;
const TH_ID = 'otmt-helper-th';
const getDataFromRow = (row, index) => {
  let tripNumberId = `#Repeater1_lbltripno_${index}`;
  let dateId = `#Repeater1_lblappDate_${index}`;
  let customerNameId = `#Repeater1_lblclientname_${index}`;
  let pickupTimeId = `#lblschtime`;
  let dropoffTimeId = `#lblApttime`;
  let pickupAddressId = `#Repeater1_lblori_${index}`;
  let destinationAddressId = `#Repeater1_lbldest_${index}`;
  let customerPhoneId = `#Repeater1_lblph_${index}`;
  let mileageId = `#Repeater1_lblmiles_${index}`;
  let providerNotesId = `#Repeater1_lblpronotes_${index}`;
  let requiresWheelChairId = `#Repeater1_Label2_${index}`;
  return {
    tripNumber: row.querySelector(tripNumberId).textContent,
    date: row.querySelector(dateId).textContent,
    pickupTime: row.querySelector(pickupTimeId).textContent,
    dropoffTime: row.querySelector(dropoffTimeId).textContent,
    pickupAddress: row.querySelector(pickupAddressId).textContent,
    destinationAddress: row.querySelector(destinationAddressId).textContent,
    customerPhone: row.querySelector(customerPhoneId).textContent,
    mileage: row.querySelector(mileageId).textContent,
    providerNotes: row.querySelector(providerNotesId).textContent,
    customerName: row
      .querySelector(customerNameId)
      .textContent.replace(' ', ', '),
    requiresWheelchairVan:
      row.querySelector(requiresWheelChairId).textContent !== 'livery'
  };
};
const addSendButtons = table => {
  let rows = table.querySelectorAll('tbody tr');
  let headerRow = tripFrame.querySelector('#tripTable thead tr');
  if (headerRow.firstChild.id !== TH_ID) {
    let th = tripFrame.createElement('th');
    th.id = TH_ID;
    headerRow.insertBefore(th, headerRow.firstChild);
  }
  for (let [index, row] of rows.entries()) {
    if (
      row.firstChild.className &&
      row.firstChild.className.includes('otmt-helper-td')
    ) {
      continue;
    }
    let sendButtonCell = tripFrame.createElement('td');
    sendButtonCell.className = 'otmt-helper-td';
    let sendButtonFillerDiv = tripFrame.createElement('div');
    sendButtonFillerDiv.style.height = '100%';
    sendButtonFillerDiv.style.width = '100%';
    sendButtonFillerDiv.style.display = 'flex';
    sendButtonFillerDiv.style.alignItems = 'center';
    sendButtonFillerDiv.style.justifyContent = 'center';
    let sendButton = tripFrame.createElement('button');
    sendButtonFillerDiv.appendChild(sendButton);
    sendButtonCell.appendChild(sendButtonFillerDiv);
    sendButton.textContent = 'Send';
    const createClickEvent = (button, parentRow, index) =>
      button.addEventListener('click', $event => {
        $event.preventDefault();
        $event.stopPropagation();
        let data = getDataFromRow(parentRow, index);
        console.log(data);
        chrome.storage.local.set({ tripData: data }, function() {
          button.style.background = '#8ac249';
        });
        console.log(data);
      });
    createClickEvent(sendButton, row, index);
    row.insertBefore(sendButtonCell, row.firstChild);
  }
};
console.log('about to start interval');
let interval = window.setInterval(() => {
  tripFrame = document.querySelector('#contentFrame').contentWindow.document;
  tripTable = tripFrame.querySelector('#tripTable');
  if (tripTable) {
    addSendButtons(tripTable);
  }
}, 500);
