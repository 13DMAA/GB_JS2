const text = document.querySelector(".text-container");
const replace = document.querySelector("#replace");
replace.addEventListener("click", () =>{
text.textContent = text.textContent.replace(/\B'|'\B/g, '"');
});