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
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
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

/***/ "./src/main/api.js":
/*!*************************!*\
  !*** ./src/main/api.js ***!
  \*************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"default\", function() { return Api; });\nclass Api {\n  static fetch(promise) {\n    return promise.then(response => {\n      if (!response.ok) {\n        return Promise.reject(response);\n      }\n      let responseData;\n      try {\n        responseData = response.json();\n      } catch (e) {\n        responseData = response.text();\n      }\n      return responseData;\n    });\n  }\n  static post({ url, body }) {\n    return this.fetch(window.fetch(url, {\n      credentials: \"include\",\n      method: \"POST\",\n      mode: \"cors\",\n      referrer: \"http://dmelive.com/Trips/mgmttrips.aspx\",\n      referrerPolicy: \"no-referrer-when-downgrade\",\n      body\n    }));\n  }\n  static get(url) {\n    return this.fetch(window.fetch(url), {\n      credentials: \"include\",\n      mode: \"cors\",\n      referrer: \"http://dmelive.com/Trips/mgmttrips.aspx\",\n      referrerPolicy: \"no-referrer-when-downgrade\"\n    });\n  }\n}\n\n//# sourceURL=webpack:///./src/main/api.js?");

/***/ }),

/***/ "./src/main/content.js":
/*!*****************************!*\
  !*** ./src/main/content.js ***!
  \*****************************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _a2c_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./a2c.js */ \"./src/main/a2c.js\");\n/* harmony import */ var _dme_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./dme.js */ \"./src/main/dme.js\");\n\n\nObject(_a2c_js__WEBPACK_IMPORTED_MODULE_0__[\"default\"])();\nObject(_dme_js__WEBPACK_IMPORTED_MODULE_1__[\"default\"])();\n\n//# sourceURL=webpack:///./src/main/content.js?");

/***/ }),

/***/ "./src/main/dme-service.js":
/*!*********************************!*\
  !*** ./src/main/dme-service.js ***!
  \*********************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"default\", function() { return DMEService; });\n/* harmony import */ var _api_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./api.js */ \"./src/main/api.js\");\n\n\nclass DMEService {\n  getUserExists(customerName) {\n    customerName = encodeURIComponent(customerName);\n    let timeStamp = new Date().getTime();\n    return _api_js__WEBPACK_IMPORTED_MODULE_0__[\"default\"].get({\n      url: `http://dmelive.com/WS/AutoCompleteCustomer.ashx?q=${customerName}&limit=10&timestamp=${timeStamp}`\n    });\n  }\n  getUserInfo(customerId) {\n    return _api_js__WEBPACK_IMPORTED_MODULE_0__[\"default\"].post({\n      url: \"http://dmelive.com/WS/CustomerManager.asmx/GetCustomerForTrip\",\n      body: JSON.stringify({\n        pintCustomerID: customerId\n      })\n    });\n  }\n}\n\n//# sourceURL=webpack:///./src/main/dme-service.js?");

/***/ }),

/***/ "./src/main/dme-trip.page.js":
/*!***********************************!*\
  !*** ./src/main/dme-trip.page.js ***!
  \***********************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"default\", function() { return TripPage; });\nclass TripPage {\n  constructor() {}\n  updateElementValue(id, value) {\n    let element = document.getElementById(id);\n    if (element) {\n      console.log(element);\n      element.value = value;\n    }\n  }\n  updateForm(data) {\n    for (let key in data) {\n      this[key] && this[key](data[key]);\n    }\n    this.notes(data.customerPhone, data.tripNumber, data.providerNotes);\n    this.clickCalculate();\n  }\n  customerName(value) {\n    this.updateElementValue(\"ctl00_ContentPlaceHolder1_txtCustomerName\", value);\n  }\n  date(value) {\n    this.updateElementValue(\"ctl00_ContentPlaceHolder1_txtDate\", value);\n  }\n  pickupTime(value) {\n    this.updateElementValue(\"ctl00_ContentPlaceHolder1_txtTime\", value);\n  }\n  pickupAddress(value) {\n    this.updateElementValue(\"ctl00_ContentPlaceHolder1_txtFrom\", value);\n  }\n  destinationAddress(value) {\n    this.updateElementValue(\"ctl00_ContentPlaceHolder1_txtTo\", value);\n  }\n  requiresWheelchairVan(value) {\n    let wheelchairRadio = document.getElementById(\"ctl00_ContentPlaceHolder1_chkChair\");\n    let ambulatoryRadio = document.getElementById(\"ctl00_ContentPlaceHolder1_chkAmbulatory\");\n    value ? wheelchairRadio.checked = true : ambulatoryRadio.checked = true;\n  }\n  notes(phone, tripNumber, notes) {\n    let notesElement = document.getElementById(\"ctl00_ContentPlaceHolder1_txtNotesforDriver\");\n    notesElement.value = `${phone}, ${tripNumber}, a2c\n    ${notes}`;\n  }\n  clickCalculate() {\n    let button = document.querySelector('[onclick=\"calculateDistances();\"]');\n    button.click();\n  }\n}\n\n//# sourceURL=webpack:///./src/main/dme-trip.page.js?");

/***/ }),

/***/ "./src/main/dme.js":
/*!*************************!*\
  !*** ./src/main/dme.js ***!
  \*************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"default\", function() { return MessageListener; });\n/* harmony import */ var _dme_service_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./dme-service.js */ \"./src/main/dme-service.js\");\n/* harmony import */ var _dme_trip_page_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./dme-trip.page.js */ \"./src/main/dme-trip.page.js\");\n\n\n\nfunction MessageListener() {\n  const tripPage = new _dme_trip_page_js__WEBPACK_IMPORTED_MODULE_1__[\"default\"]();\n  if (window.location.href.includes(\"dmelive.com/Trips/\")) {\n    console.log(\"hey this is the dme site\");\n    chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {\n      console.log({ request });\n      tripPage.updateForm(request);\n      sendResponse({ success: true });\n    });\n  }\n}\n\n//# sourceURL=webpack:///./src/main/dme.js?");

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