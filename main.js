const button =  document.querySelector('.add'); //버튼
const div = document.querySelector('.list'); // div 노드


document.addEventListener('contextmenu', function() {
    event.preventDefault();
  });


const LS = 'ls' //키값
let LISTS = []; //객채 저장소




//localSTorage 데이터베이스 에 json 형태로 저장
function save(){
    localStorage.setItem(LS,JSON.stringify(LISTS));
}

//코드가 실행될때 바로 동작
function load(){

    // localStorage에서 정보를 받아왔는데
    const ld = localStorage.getItem(LS);

    //널값이 아니라면 값이 존재한다면
    if(ld !== null){

        //json 형태의 정보를 객채 변환
        const parsedLd = JSON.parse(ld);

        parsedLd.forEach((element) => {
            // 저장된 노드횟수 만큼 paint해줌
            paint(element.url,element.title)

        });
    }
}


// 실제 화면에 표시 해주는 함수
function paint(url,title,index){

    //obj title url 객채 로 저장
    const obj = {
        title:title,
        url:url
    }

    LISTS.push(obj) //이 값을 저장소에 push 해줌
    save(); // 저장해줌


        //노드 만들기 
        const span = document.createElement('span')
        const ld = document.createElement('div')
        const dButton = document.createElement('button')
        const br = document.createElement('br') 


        //제거 버튼 이름 지정
        dButton.textContent = '제거' 
        

        //span value 값에 url 집어넣고 스타일은 커서가 포인터가 되도록 스펜에 텍스트는 타이틀
        span.value = url
        span.style = 'CURSOR: pointer;'
        span.textContent = title

        //span 클릭됬을때
        span.addEventListener('click',(e)=>{
            e.preventDefault(); //이벤트 막아준다 안써도됨
            window.open(url) //새로운창으로 열어줌
        })

        //우클릭되었을때 제목 수정해주기
        span.addEventListener('mousedown',(e)=>{

            if ((event.button == 2) || (event.which == 3)) { //우클릭 확인 if문

                e.preventDefault();
                                

                //input 태그 만들기
                const input = document.createElement('input') 
                                   
                //value 값은 기본 스펜 텍스트 값
                input.value = span.textContent
                input.placeholder = '수정'
                //스타일 지정
                input.style = ' width: 500px;'


                //input 태그를 업로드해줌
                ld.appendChild(input)    
                //텍스트 자동 선택                
                input.select();


                //input 값이 입력되면 or 바뀌면
                input.addEventListener('change',(e)=>{
                    

                    //LIST 에서 input 정보로 변경
                    LISTS.forEach((element)=>{
                        if(element.title === span.textContent){
                            element.title = input.value
                        }
                    })

                    //LIST 저장
                    save()
    
                    //ui부분도 입력했던값으로 바꿔줌
                    span.textContent = input.value
                    
                    //값이 다 변경됬으니 input 태그 제거
                    input.remove();
                    
                })

            }
        })



        //삭제 버튼이 클릭됬을때
        dButton.addEventListener('click',(e)=>{

            e.preventDefault()


            //삭제
            div.removeChild(e.target.parentNode)

            //LIST 중복되는 정보가있다면 전부 삭제
            const clean = LISTS.filter((LISTS)=>{
                return LISTS.url !== url;
            });

            //LIST 값 바꿔서 save
            LISTS = clean
            save();
            
            
        })


        // div 노드에 자식 노드로 포함 시켜줌 노드 = 태그
        ld.appendChild(br)
        ld.appendChild(dButton)
        ld.appendChild(span)
        div.appendChild(ld)

}


function bookMarkClick(e){

    e.preventDefault();

    //그 페이지에 타이틀과 url 가져와서
    chrome.tabs.executeScript({
        code:'[document.querySelector("title").innerText,window.location.href]'
    },(result)=>{
        
        //타이틀과 url 정보를 받아서 paint함수에 넘겨줌
        const title = result[0][0]
        const url = result[0][1]

        paint(url,title)

    })

}


// function init 함수
function init(){

    
    //정보 불러오기
    load()

    //만약 북마크 버튼을 눌렀을때
    button.addEventListener('click',bookMarkClick)

}init();
