const mainDivSpans = document.querySelector('.list');
const divList = document.querySelectorAll('div');
const spans = document.querySelectorAll('span')

console.log(spans);

function textClear(){
    for(let i = 0; i < spans.length; i++){
        const textLength = spans[i].textContent.length 

        if(textLength > 50){
            spans[i].textContent = spans[i].textContent.substring(0,45) + ' .....'
        }
    }
    }

function init(){
    textClear();

} init()
