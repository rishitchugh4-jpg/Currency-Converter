const base_url="https://latest.currency-api.pages.dev/v1/currencies/";
const dropdown=document.querySelectorAll(".dropdown select");
const btn=document.querySelector("button");
const fromCurr=document.querySelector('select[name="from"]');
const toCurr=document.querySelector('select[name="to"]');
const msg=document.querySelector('.info p');
for(let select of dropdown){
    for(let code in countryList){
        let option=document.createElement("option");
        option.innerText=code;
        option.value=code;
        
        if(select.name==="from" && code==="USD"){
            option.selected="selected";
        }
        else if(select.name==="to" && code==="INR"){
            option.selected="selected";
        }
        select.append(option);
    }
    select.addEventListener("change", (evt) =>{
        updateFlag(evt.target);
    })
}


const updateFlag=(element)=>{
    let code=element.value;
    let countryCode=countryList[code];
    let newSrc=`https://flagsapi.com/${countryCode}/flat/64.png`;
    let container = element.closest('.select-container1, .select-container2');
    let img = container.querySelector("img");
    img.src=newSrc;

}
btn.addEventListener("click",async(evt)=>{
    evt.preventDefault();
    let amt=document.querySelector(".ph input");
    let amt_val=amt.value;
    console.log(amt_val);
    if(amt_val==""||amt_val<0){
        amt_val==1;
        amt.value=1;
    }
    const url = `${base_url}${fromCurr.value.toLowerCase()}.json`;
    let response=await fetch(url);
    let data=await response.json();
    let rate = data[fromCurr.value.toLowerCase()][toCurr.value.toLowerCase()];
    console.log(rate);

    let finalAmt=rate*(amt.value);
    msg.innerText=`${amt.value} ${fromCurr.value} is Equal to ${finalAmt} ${toCurr.value}`;
})
