const Base_url = "https://latest.currency-api.pages.dev/v1/currencies/";

const dropDown = document.querySelectorAll(".form select");
const btn = document.querySelector(".btn");
const fromCurr = document.querySelector(".from select");
const toCurr = document.querySelector(".to select");
const msg = document.querySelector(".msg");
const change = document.querySelector(".fa-solid");
const fromChange = document.querySelector("#fromSelect");
const toChange = document.querySelector("#toSelect");
const from = document.querySelector("#from");
const to = document.querySelector("#to");
const fromImg = document.querySelector(".img1");
const toImg = document.querySelector(".img2");



const updateFlag = (element) => {
    let currCode = element.value;
    let countryCode = countryList[currCode];
    
    let newSrc = `https://flagsapi.com/${countryCode}/flat/64.png`;
    let img = element.parentElement.querySelector("img");
    img.src = newSrc;
}

btn.addEventListener("click", async (evt) => {
    evt.preventDefault();
    let amount = document.querySelector(".amount input");
    let amountValue = amount.value;
    if (amountValue === "" || amountValue < 1) {
        amountValue = 1;
        amount.value = 1;
    }
    
    const URL = `${Base_url}${fromCurr.value.toLowerCase()}.json`;
    let result = await fetch(URL);
    let data = await result.json();
    
    let fromVal = fromCurr.value.toLowerCase();
    let toVal = toCurr.value.toLowerCase();
    let finalData = data[fromVal][toVal];
   
    let finalAmount = amount.value * finalData;
    msg.innerText = `${amount.value} ${fromCurr.value} = ${finalAmount} ${toCurr.value}`;
             
    }
);

function exchange() {
     let swap = fromImg.src;
     fromImg.src = toImg.src;
     toImg.src = swap;

    let temp = fromCurr.value;
    fromCurr.value = toCurr.value;
    toCurr.value = temp;


    
    
}


for (let select of dropDown) {
    for (code in countryList) {
        let newOption = document.createElement("option");
        newOption.classList.add("option");
        newOption.innerText = code;
        newOption.value = code;
        select.append(newOption);
        if (select.id === "from" && code === "USD") {
            newOption.selected = "selected";
        }
        if (select.id === "to" && code === "INR") {
            newOption.selected = "selected";
        }
        select.addEventListener("change", (evt) => {
            updateFlag(evt.target);
        });
    }
}
change.addEventListener("click", exchange);

