const input = document.querySelector('input')
const mainDiv = document.querySelector('.search')
const listDiv = document.querySelector('.search-list')
const anotherDiv = document.querySelectorAll(".list > div");


function handleChange(){
    // 값이 바뀌는 순간 검색항목 전부 삭제
    while(listDiv.hasChildNodes())
    listDiv.removeChild(listDiv.firstChild)
    

    //div안에있는 텍스트 검사
    for(let i = 0; i < anotherDiv.length; i++){
        if(anotherDiv[i].textContent.includes(input.value) && input.value !== ""){
            //검색값이 빈값이 아니고 텍스트가 텍스트 값에 포함한다면
            // clone 변수에 그 노드 받아서 업로드해줌
            const clone = anotherDiv[i].cloneNode(true)
            listDiv.appendChild(clone);

            
        }

    }
}

function init(){
    input.addEventListener('change',handleChange)
}
init()