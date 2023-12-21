// DOM elements
const container = document.querySelector(".qr-code-container");
const generateBtn = document.getElementById("qrGenerate");
const downloadBtn = document.getElementById("qrDownload");
const userInput = document.getElementById("placement");
const sizeOptions = document.querySelector(".size");
const BGColor = document.getElementById("color1");
const FGColor = document.getElementById("color2");

// Variables
let QR_Code;
let sizeChoice = 100;
let BGColorChoice = "#000000";
let FGColorChoice = "#ffffff";

// Event listeners
sizeOptions.addEventListener("change", () => {
    sizeChoice = sizeOptions.value;
});

BGColor.addEventListener("input", () => {
    BGColorChoice = BGColor.value;
});

FGColor.addEventListener("input", () => {
    FGColorChoice = FGColor.value;
});

userInput.addEventListener("input", () => {
    if (userInput.value.trim().length < 1) {
        generateBtn.disabled = true;
        downloadBtn.href = "";
        downloadBtn.style.display = "none";
    }
    else {
        generateBtn.disabled = false;
        generateBtn.style.cursor = "pointer";
    }
});

// Functions
function inputFormatter(value) {
    value = value.replace(/[^a-z0-9A-Z]+/g, "");
    return value;
}

async function generateQRCode() {
    container.innerHTML = "";

    QR_Code = await new QRCode(container, {
        text: userInput.value,
        width: sizeChoice,
        height: sizeChoice,
        colorDark: FGColorChoice,
        colorLight: BGColorChoice
    });

    const src = container.firstChild.toDataURL("image/png");
    downloadBtn.href = src;

    let userValue = userInput.value;
    try {
        userValue = new URL(userValue).hostname;
    } catch (_) {
        userValue = inputFormatter(userValue);
    }
    downloadBtn.download = `${userValue}QR`;
    downloadBtn.style.display = "block";
    generateBtn.disabled = true;
    generateBtn.style.cursor = "default";
}

window.onload = () => {
    container.innerHTML = "";
    sizeOptions.value = sizeChoice;
    userInput.value = "";
    BGColor.value = BGColorChoice;
    FGColor.value = FGColorChoice;
    downloadBtn.style.display = "none";
    generateBtn.disabled = true;
};

generateBtn.addEventListener("click", generateQRCode);