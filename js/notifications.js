
const elements = {
    info: document.querySelector("#infoBox"),
    error: document.querySelector("#errorBox"),
    loading: document.querySelector("#loadingBox")
};

elements.info.addEventListener("click", hideInfo);
elements.error.addEventListener("click", hideError);

export function showInfo(message) {
    elements.info.children[0].textContent = message;
    elements.info.style.display = "block";
    setTimeout(hideInfo, 3000);
}
let request=0;

export function beginRequest() {
    request++;
    elements.loading.style.display = "block";
}

export function endRequest() {
    request--;
    if(request==0){

        elements.loading.style.display = "none";
    }
}

export function showError(message) {
    elements.error.children[0].textContent = message;
    elements.error.style.display = "block";

}

function hideInfo() {
    elements.info.style.display = "none";
}

function hideError() {
    elements.error.style.display = "none";
}