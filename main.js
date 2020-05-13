const button =  document.querySelector('.add');
const div = document.querySelector('.list');

const LS = 'ls'
let LISTS = [];

function save(){
    localStorage.setItem(LS,JSON.stringify(LISTS));
}

(function load(){
    const ld = localStorage.getItem(LS);
    if(ld !== null){
        const parsedLd = JSON.parse(ld);
        parsedLd.forEach(element => {
            paint(element.url,element.title)
        });
    }
})();



function paint(url,title){

    const obj = {
        title:title,
        url:url
    }

    LISTS.push(obj)
    save();

        const span = document.createElement('span')
        const ld = document.createElement('div')
        const dButton = document.createElement('button')
        const br = document.createElement('br')

        dButton.textContent = '제거'
        
        span.value = url
        span.style = 'CURSOR: pointer;'
        span.textContent = title

        

        span.addEventListener('click',(e)=>{
            e.preventDefault();
            window.open(url)
        })

        dButton.addEventListener('click',(e)=>{
            e.preventDefault()

            const text = e.target.parentNode.textContent.split('제거')[1]
            div.removeChild(e.target.parentNode)

            console.log(text)
            const clean = LISTS.filter((LISTS)=>{
                return LISTS.title !== text;
            });
            console.log(clean)
            LISTS = clean
            save();
            
            
        })

        ld.appendChild(br)
        ld.appendChild(dButton)
        ld.appendChild(span)
        div.appendChild(ld)
}

button.addEventListener('click',(e)=>{

    e.preventDefault();

    
    chrome.tabs.executeScript({
        code:'[document.querySelector("title").innerText,window.location.href]'
    },(result)=>{
        
        const title = result[0][0]
        const url = result[0][1]

        paint(url,title)


        
        

    })
})
