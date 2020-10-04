const input = document.querySelector('input')
const mainDiv = document.querySelector('.search')
const listDiv = document.querySelector('.search-list')
const anotherDiv = document.querySelectorAll(".list > div");
const totallDiv = document.querySelector('.list')

function handleChange(){
    // 값이 바뀌는 순간 검색항목 전부 삭제
    while(listDiv.hasChildNodes())
    listDiv.removeChild(listDiv.firstChild)
    
    totallDiv.classList.remove('hide')

    //div안에있는 텍스트 검사
    for(let i = 0; i < anotherDiv.length; i++){

        if(anotherDiv[i].textContent.includes(input.value) && input.value !== ""){
            //검색값이 빈값이 아니고 텍스트가 텍스트 값에 포함한다면
            // clone 변수에 그 노드 받아서 업로드해줌
            const clone = anotherDiv[i].cloneNode(true)

            console.log(anotherDiv[i].click)
            //clone 노드는 이벤트가 남아 있지 않다 그래서 이벤트를 추가해준다

            //anoterdiv 스펜 value 값에 url 정보가 담겨 있다
            const url = anotherDiv[i].querySelector('span').value
            clone.addEventListener('click',(e)=>{
                window.open(url)
            })
            listDiv.appendChild(clone);

            //검색한 값만 도출하기 위해 기존에 있던 노드들은 클리어 해줌
            totallDiv.classList.add('hide')
            
        }

    }
}

function init(){
    input.addEventListener('change',handleChange)
}
init()