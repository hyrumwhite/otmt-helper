export default function(element) {
  let loadingDiv = document.createElement("div");
  loadingDiv.className = "otmt-loader";
  loadingDiv.style.left = "100%";
  loadingDiv.style.marginLeft = "4px";
  element.appendChild(loadingDiv);
  return loadingDiv;
}
