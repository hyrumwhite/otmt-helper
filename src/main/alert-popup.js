export default class AlertPopup {
  static show(message, duration) {
    let popupId = "otmt-popup-message";
    let popup = {
      template: `
        <div style="border-bottom: 1px solid #ccc;padding:8px;">${message}</div>
        <div style="display: flex; justify-content:flex-end; align-items:center;padding-top:8px;">
          <button
            id="otmt-popup-acknowledge-button"
            style="background: rgb(3, 169, 244);
              border:none;
              box-shadow: 0 1px 5px 0 rgba(0,0,0,.2), 0 2px 2px 0 rgba(0,0,0,.14), 0 3px 1px -2px rgba(0,0,0,.12);
              border-radius: 3px;
              padding:8px;
              color:white;
              cursor: pointer;"
          >
            Ok
          </button>
        </div>
      `
    };
    let popupDiv = document.createElement("div");
    popupDiv.innerHTML = popup.template;
    let popupDivStyle = {
      padding: "8px",
      boxShadow:
        "0 7px 8px -4px rgba(0,0,0,.2), 0 12px 17px 2px rgba(0,0,0,.14), 0 5px 22px 4px rgba(0,0,0,.12)",
      borderRadius: "2px",
      position: "fixed",
      width: "350px",
      top: "25%",
      left: "calc(50% - 175px)",
      background: "white"
    };
    for (let key in popupDivStyle) {
      popupDiv.style[key] = popupDivStyle[key];
    }
    popupDiv.id = popupId;
    document.body.appendChild(popupDiv);
    popupDiv
      .querySelector("#otmt-popup-acknowledge-button")
      .addEventListener("click", () =>
        popupDiv.parentElement.removeChild(popupDiv)
      );
    window.setTimeout(
      () => popupDiv.parentElement.removeChild(popupDiv),
      duration || 60000
    );
  }
}
