/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/main/StorageListener.js":
/*!*************************************!*\
  !*** ./src/main/StorageListener.js ***!
  \*************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _dme_service_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./dme-service.js */ \"./src/main/dme-service.js\");\n/* harmony import */ var _dme_trip_page_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./dme-trip.page.js */ \"./src/main/dme-trip.page.js\");\n/* harmony import */ var _alert_popup_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./alert-popup.js */ \"./src/main/alert-popup.js\");\n\n\n\nconst { href } = window.location;\n/* harmony default export */ __webpack_exports__[\"default\"] = (async function StorageListener() {\n  const tripPage = new _dme_trip_page_js__WEBPACK_IMPORTED_MODULE_1__[\"default\"]();\n  if (href.includes('dmelive.com')) {\n    console.log('hey this is storage listener');\n    chrome.storage.onChanged.addListener(async function ({ tripData }) {\n      chrome.storage.local.set({ tripData: null }, function () {\n        console.log('clearing storage');\n      });\n      console.log('hey change detected');\n      if (!tripData) {\n        console.log('tripData has been cleared');\n        return;\n      }\n      console.log({ tripData });\n      const request = tripData.newValue;\n      tripPage.updateForm(request, 'MT');\n      tripPage.showCustomerInfoLoader();\n      let customerList = await _dme_service_js__WEBPACK_IMPORTED_MODULE_0__[\"default\"].getUserExists(request.customerName);\n      if (customerList.length === 0) {\n        tripPage.hideCustomerInfoLoader();\n        return _alert_popup_js__WEBPACK_IMPORTED_MODULE_2__[\"default\"].show('No entries found for customer name. You likely need to enter this name as a new customer.');\n      }\n      if (customerList.length > 1) {\n        tripPage.hideCustomerInfoLoader();\n        return _alert_popup_js__WEBPACK_IMPORTED_MODULE_2__[\"default\"].show('Multiple entries for customer name detected. Manual selection required.');\n      }\n      let customerData = await _dme_service_js__WEBPACK_IMPORTED_MODULE_0__[\"default\"].getUserInfo(customerList[0].id);\n      tripPage.updateCustomerInfo(customerData.d);\n      tripPage.hideCustomerInfoLoader();\n    });\n  }\n});\n\n//# sourceURL=webpack:///./src/main/StorageListener.js?");

/***/ }),

/***/ "./src/main/a2c-trip-details-controller.js":
/*!*************************************************!*\
  !*** ./src/main/a2c-trip-details-controller.js ***!
  \*************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"default\", function() { return TripDetailsController; });\n/* harmony import */ var _a2c_trip_details_page_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./a2c-trip-details.page.js */ \"./src/main/a2c-trip-details.page.js\");\n\nclass TripDetailsController {\n  constructor() {\n    this.page = new _a2c_trip_details_page_js__WEBPACK_IMPORTED_MODULE_0__[\"default\"]();\n  }\n  getPageData() {\n    return this.page.getAllData();\n  }\n  sendData(sendResponse) {\n    const pageData = this.getPageData();\n    sendResponse(pageData);\n  }\n}\n\n//# sourceURL=webpack:///./src/main/a2c-trip-details-controller.js?");

/***/ }),

/***/ "./src/main/a2c-trip-details.page.js":
/*!*******************************************!*\
  !*** ./src/main/a2c-trip-details.page.js ***!
  \*******************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"default\", function() { return TripDetailsPage; });\nclass TripDetailsPage {\n  constructor() {}\n  getElementText(element, textKey = \"textContent\") {\n    if (element) {\n      return element[textKey];\n    }\n    alert(\"Unable to find element, ask Seth to fix this.\");\n  }\n  getTextById(id, textKey) {\n    let element = document.getElementById(id);\n    return this.getElementText(element, textKey);\n  }\n  getAllData() {\n    return {\n      tripNumber: this.getTripNumber(),\n      date: this.getDate(),\n      pickupTime: this.getPickupTime(),\n      pickupAddress: this.getPickupAddress(),\n      destinationAddress: this.getDestinationAddress(),\n      customerPhone: this.getCustomerPhone(),\n      mileage: this.getMileage(),\n      providerNotes: this.getProviderNotes(),\n      customerName: this.getCustomerName(),\n      requiresWheelchairVan: this.requiresWheelchairVan()\n    };\n  }\n  getPickupTime() {\n    return this.getTextById(\"ctl00_ContentPlaceHolder1_TripDetailsView_lblAppointmentTime\");\n  }\n  getTripNumber() {\n    return this.getTextById(\"ctl00_ContentPlaceHolder1_TripDetailsView_lblTripNumber\");\n  }\n  getDate() {\n    return this.getTextById(\"ctl00_ContentPlaceHolder1_TripDetailsView_lblTripDate\");\n  }\n  getPickupAddress() {\n    return this.getTextById(\"ctl00_ContentPlaceHolder1_TripDetailsView_divPickupAddress\", \"innerText\").replace(\"\\n\", \" \");\n  }\n  getDestinationAddress() {\n    return this.getTextById(\"ctl00_ContentPlaceHolder1_TripDetailsView_divDestinationAddress\", \"innerText\").replace(\"\\n\", \" \");\n  }\n  getCustomerPhone() {\n    return this.getTextById(\"ctl00_ContentPlaceHolder1_TripDetailsView_lblMemberPhone\");\n  }\n  getMileage() {\n    return this.getTextById(\"ctl00_ContentPlaceHolder1_TripDetailsView_lblMileage\");\n  }\n  getProviderNotes() {\n    return this.getTextById(\"ctl00_ContentPlaceHolder1_TripDetailsView_divNotes\").replace(\"Provider Notes: \", \"\");\n  }\n  getCustomerName() {\n    return this.getTextById(\"ctl00_ContentPlaceHolder1_TripDetailsView_lblMemberName\");\n  }\n  requiresWheelchairVan() {\n    return this.getTextById(\"ctl00_ContentPlaceHolder1_TripDetailsView_lblVehicleType\").includes(\"WC Van\");\n  }\n}\n\n//# sourceURL=webpack:///./src/main/a2c-trip-details.page.js?");

/***/ }),

/***/ "./src/main/a2c.js":
/*!*************************!*\
  !*** ./src/main/a2c.js ***!
  \*************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"default\", function() { return MessageListener; });\n/* harmony import */ var _a2c_trip_details_controller_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./a2c-trip-details-controller.js */ \"./src/main/a2c-trip-details-controller.js\");\n\n\nfunction MessageListener() {\n  const tripDetailsController = new _a2c_trip_details_controller_js__WEBPACK_IMPORTED_MODULE_0__[\"default\"]();\n\n  if (window.location.href.includes(\"a2ctp.emsc.net\")) {\n    console.log(\"hey this is the a2c site\");\n    chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {\n      console.log(sender.tab, request);\n      if (!sender.tab) {\n        if (request.action === \"sendDataToDME\") {\n          tripDetailsController.sendData(sendResponse);\n        }\n      }\n      if (request.greeting == \"hello\") sendResponse({ state: \"success\" });\n    });\n  }\n}\n\n//# sourceURL=webpack:///./src/main/a2c.js?");

/***/ }),

/***/ "./src/main/alert-popup.js":
/*!*********************************!*\
  !*** ./src/main/alert-popup.js ***!
  \*********************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"default\", function() { return AlertPopup; });\nclass AlertPopup {\n  static show(message, duration) {\n    let popupId = \"otmt-popup-message\";\n    let popup = {\n      template: `\n        <div style=\"border-bottom: 1px solid #ccc;padding:8px;\">${message}</div>\n        <div style=\"display: flex; justify-content:flex-end; align-items:center;padding-top:8px;\">\n          <button\n            id=\"otmt-popup-acknowledge-button\"\n            style=\"background: rgb(3, 169, 244);\n              border:none;\n              box-shadow: 0 1px 5px 0 rgba(0,0,0,.2), 0 2px 2px 0 rgba(0,0,0,.14), 0 3px 1px -2px rgba(0,0,0,.12);\n              border-radius: 3px;\n              padding:8px;\n              color:white;\n              cursor: pointer;\"\n          >\n            Ok\n          </button>\n        </div>\n      `\n    };\n    let popupDiv = document.createElement(\"div\");\n    popupDiv.innerHTML = popup.template;\n    let popupDivStyle = {\n      padding: \"8px\",\n      boxShadow: \"0 7px 8px -4px rgba(0,0,0,.2), 0 12px 17px 2px rgba(0,0,0,.14), 0 5px 22px 4px rgba(0,0,0,.12)\",\n      borderRadius: \"2px\",\n      position: \"fixed\",\n      width: \"350px\",\n      top: \"25%\",\n      left: \"calc(50% - 175px)\",\n      background: \"white\"\n    };\n    for (let key in popupDivStyle) {\n      popupDiv.style[key] = popupDivStyle[key];\n    }\n    popupDiv.id = popupId;\n    document.body.appendChild(popupDiv);\n    popupDiv.querySelector(\"#otmt-popup-acknowledge-button\").addEventListener(\"click\", () => popupDiv.parentElement.removeChild(popupDiv));\n    window.setTimeout(() => popupDiv.parentElement.removeChild(popupDiv), duration || 60000);\n  }\n}\n\n//# sourceURL=webpack:///./src/main/alert-popup.js?");

/***/ }),

/***/ "./src/main/api.js":
/*!*************************!*\
  !*** ./src/main/api.js ***!
  \*************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"default\", function() { return Api; });\nclass Api {\n  static fetch(promise, type) {\n    return promise.then(response => {\n      if (!response.ok) {\n        return Promise.reject(response);\n      }\n      console.log(response);\n      let responseData;\n      try {\n        responseData = response[type]();\n      } catch (e) {\n        console.log(e);\n        responseData = response.text();\n      }\n      return responseData;\n    });\n  }\n  static post({ url, body }) {\n    console.log(\"fetching the stuuf\");\n    return this.fetch(window.fetch(url, {\n      credentials: \"include\",\n      method: \"POST\",\n      mode: \"cors\",\n      referrer: \"https://dmelive.com/Trips/mgmttrips.aspx\",\n      referrerPolicy: \"no-referrer-when-downgrade\",\n      headers: {\n        \"Content-Type\": \"application/json, text/javascript, */*; q=0.01\"\n      },\n      body\n    }));\n  }\n  static get({ url, responseType }) {\n    return this.fetch(window.fetch(url, {\n      credentials: \"include\",\n      mode: \"cors\",\n      referrer: \"https://dmelive.com/Trips/mgmttrips.aspx\",\n      referrerPolicy: \"no-referrer-when-downgrade\"\n    }), responseType);\n  }\n}\n\n//# sourceURL=webpack:///./src/main/api.js?");

/***/ }),

/***/ "./src/main/content.js":
/*!*****************************!*\
  !*** ./src/main/content.js ***!
  \*****************************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _a2c_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./a2c.js */ \"./src/main/a2c.js\");\n/* harmony import */ var _dme_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./dme.js */ \"./src/main/dme.js\");\n/* harmony import */ var _StorageListener_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./StorageListener.js */ \"./src/main/StorageListener.js\");\n\n\n\nObject(_a2c_js__WEBPACK_IMPORTED_MODULE_0__[\"default\"])();\nObject(_dme_js__WEBPACK_IMPORTED_MODULE_1__[\"default\"])();\nObject(_StorageListener_js__WEBPACK_IMPORTED_MODULE_2__[\"default\"])();\n\n//# sourceURL=webpack:///./src/main/content.js?");

/***/ }),

/***/ "./src/main/create-loader.js":
/*!***********************************!*\
  !*** ./src/main/create-loader.js ***!
  \***********************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony default export */ __webpack_exports__[\"default\"] = (function (element) {\n  let loadingDiv = document.createElement(\"div\");\n  loadingDiv.className = \"otmt-loader\";\n  loadingDiv.style.left = \"100%\";\n  loadingDiv.style.marginLeft = \"4px\";\n  element.appendChild(loadingDiv);\n  return loadingDiv;\n});\n\n//# sourceURL=webpack:///./src/main/create-loader.js?");

/***/ }),

/***/ "./src/main/dme-service.js":
/*!*********************************!*\
  !*** ./src/main/dme-service.js ***!
  \*********************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"default\", function() { return DMEService; });\n/* harmony import */ var _api_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./api.js */ \"./src/main/api.js\");\n\n\nclass DMEService {\n  static async getUserExists(customerName) {\n    customerName = encodeURIComponent(customerName);\n    let timeStamp = new Date().getTime();\n    let customerData = await _api_js__WEBPACK_IMPORTED_MODULE_0__[\"default\"].get({\n      url: `https://dmelive.com/WS/AutoCompleteCustomer.ashx?q=${customerName}&limit=10&timestamp=${timeStamp}`,\n      responseType: \"text\"\n    });\n    if (customerData.length === 0) {\n      return [];\n    }\n    customerData = customerData.split(\"\\n\");\n    let newCustomerData = [];\n    for (let i = 0; i < customerData.length; i++) {\n      let item = customerData[i].split(\"|\");\n      item[0] && newCustomerData.push({ name: item[0], id: item[1] });\n    }\n    return newCustomerData;\n  }\n  static getUserInfo(customerId) {\n    return fetch(\"https://dmelive.com/WS/CustomerManager.asmx/GetCustomerForTrip\", {\n      credentials: \"include\",\n      headers: {\n        Accept: \"application/json, text/javascript, */*; q=0.01\",\n        \"Content-Type\": \"application/json; charset=UTF-8\"\n      },\n      referrer: \"https://dmelive.com/Trips/mgmttrips.aspx\",\n      referrerPolicy: \"no-referrer-when-downgrade\",\n      body: '{\"pintCustomerID\":' + customerId + \"}\",\n      method: \"POST\",\n      mode: \"cors\"\n    }).then(response => {\n      if (!response.ok) {\n        return Promise.reject(response);\n      }\n      return response.json();\n    });\n    // return Api.post({\n    //   url: \"https://dmelive.com/WS/CustomerManager.asmx/GetCustomerForTrip\",\n    //   body: JSON.stringify({\n    //     pintCustomerID: customerId\n    //   })\n    // });\n  }\n}\n\n//# sourceURL=webpack:///./src/main/dme-service.js?");

/***/ }),

/***/ "./src/main/dme-trip.page.js":
/*!***********************************!*\
  !*** ./src/main/dme-trip.page.js ***!
  \***********************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"default\", function() { return TripPage; });\n/* harmony import */ var _create_loader_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./create-loader.js */ \"./src/main/create-loader.js\");\n\n\nclass TripPage {\n  constructor() {}\n  hideMessages() {\n    let messages = document.getElementById('messages');\n    messages && messages.parentElement.removeChild(messages);\n  }\n  updateElementValue(id, value) {\n    let element = document.getElementById(id);\n    if (element) {\n      element.value = value;\n    }\n  }\n  updateForm(data, source) {\n    source = source || 'a2c';\n    for (let key in data) {\n      this[key] && this[key](data[key]);\n    }\n    this.notes(data.customerPhone, data.tripNumber, data.providerNotes, data.pickupTime, data.dropoffTime, source);\n    this.clickCalculate();\n  }\n  showCustomerInfoLoader() {\n    let input = document.querySelector('#ctl00_ContentPlaceHolder1_txtPersonCalling');\n    let inputContainer = input.parentElement;\n    this.loader = Object(_create_loader_js__WEBPACK_IMPORTED_MODULE_0__[\"default\"])(inputContainer);\n  }\n  hideCustomerInfoLoader() {\n    this.loader.parentElement.removeChild(this.loader);\n  }\n  updateCustomerInfo({ PhoneNum, Address }) {\n    this.updateElementValue('ctl00_ContentPlaceHolder1_txtTelephoneNumber', PhoneNum);\n    this.updateElementValue('ctl00_ContentPlaceHolder1_txtAddress', Address);\n  }\n  customerName(value) {\n    this.updateElementValue('ctl00_ContentPlaceHolder1_txtCustomerName', value);\n  }\n  date(value) {\n    this.updateElementValue('ctl00_ContentPlaceHolder1_txtDate', value);\n  }\n  pickupTime(value) {\n    value = value === 'Will Call' ? '12:00 AM' : value;\n    this.updateElementValue('ctl00_ContentPlaceHolder1_txtTime', value);\n  }\n  pickupAddress(value) {\n    this.updateElementValue('ctl00_ContentPlaceHolder1_txtFrom', value);\n  }\n  destinationAddress(value) {\n    this.updateElementValue('ctl00_ContentPlaceHolder1_txtTo', value);\n  }\n  requiresWheelchairVan(value) {\n    let wheelchairRadio = document.getElementById('ctl00_ContentPlaceHolder1_chkChair');\n    let ambulatoryRadio = document.getElementById('ctl00_ContentPlaceHolder1_chkAmbulatory');\n    value ? wheelchairRadio.checked = true : ambulatoryRadio.checked = true;\n  }\n  notes(phone, tripNumber, notes, pickupTime, dropoffTime, sourceSite) {\n    pickupTime = pickupTime === 'Will Call' ? '12:00 AM' : `pickup: ${pickupTime}`;\n    dropoffTime = dropoffTime ? `dropoff: ${dropoffTime}, ` : '';\n    let notesElement = document.getElementById('ctl00_ContentPlaceHolder1_txtNotesforDriver');\n    notesElement.value = `${phone}, ${tripNumber}, ${pickupTime}, ${dropoffTime} ${sourceSite}\n\n    ${notes}`;\n  }\n  clickCalculate() {\n    let button = document.querySelector('[onclick=\"calculateDistances();\"]');\n    button.click();\n  }\n}\n\n//# sourceURL=webpack:///./src/main/dme-trip.page.js?");

/***/ }),

/***/ "./src/main/dme.js":
/*!*************************!*\
  !*** ./src/main/dme.js ***!
  \*************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _dme_service_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./dme-service.js */ \"./src/main/dme-service.js\");\n/* harmony import */ var _dme_trip_page_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./dme-trip.page.js */ \"./src/main/dme-trip.page.js\");\n/* harmony import */ var _alert_popup_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./alert-popup.js */ \"./src/main/alert-popup.js\");\n\n\n\nconst { href } = window.location;\nconsole.log(href);\n/* harmony default export */ __webpack_exports__[\"default\"] = (async function MessageListener() {\n  const tripPage = new _dme_trip_page_js__WEBPACK_IMPORTED_MODULE_1__[\"default\"]();\n  if (href.includes(\"dmelive.com\")) {\n    console.log(\"hey this is the dme site\");\n    chrome.runtime.onMessage.addListener(async function (request, sender, sendResponse) {\n      if (request.hideMessages === \"true\") {\n        return tripPage.hideMessages();\n      }\n      console.log({ request });\n      tripPage.updateForm(request);\n      sendResponse({ success: true });\n      tripPage.showCustomerInfoLoader();\n      let customerList = await _dme_service_js__WEBPACK_IMPORTED_MODULE_0__[\"default\"].getUserExists(request.customerName);\n      if (customerList.length === 0) {\n        tripPage.hideCustomerInfoLoader();\n        return _alert_popup_js__WEBPACK_IMPORTED_MODULE_2__[\"default\"].show(\"No entries found for customer name. You likely need to enter this name as a new customer.\");\n      }\n      if (customerList.length > 1) {\n        tripPage.hideCustomerInfoLoader();\n        return _alert_popup_js__WEBPACK_IMPORTED_MODULE_2__[\"default\"].show(\"Multiple entries for customer name detected. Manual selection required.\");\n      }\n      let customerData = await _dme_service_js__WEBPACK_IMPORTED_MODULE_0__[\"default\"].getUserInfo(customerList[0].id);\n      tripPage.updateCustomerInfo(customerData.d);\n      tripPage.hideCustomerInfoLoader();\n    });\n  }\n});\n\n//# sourceURL=webpack:///./src/main/dme.js?");

/***/ }),

/***/ 0:
/*!***********************************!*\
  !*** multi ./src/main/content.js ***!
  \***********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("module.exports = __webpack_require__(/*! ./src/main/content.js */\"./src/main/content.js\");\n\n\n//# sourceURL=webpack:///multi_./src/main/content.js?");

/***/ })

/******/ });