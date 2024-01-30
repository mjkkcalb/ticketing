

# 🎟️Ticketing

## 프로젝트 개요

- **프로젝트 명칭**
    - Ticketing - 문화 예약 서비스 앱
    
- **프로젝트 소개**
    - ‘Ticketing’은 서울에서 운영하는 문화 생활들에 대한 예약을 돕는 사이트 입니다.
        
        서울시에서 운영하는 문화 생활 카테고리별 검색이 가능하며, 원하는 티켓에 대한 예약과 결제 확인이 가능한 서비스 입니다.
        
    
- **프로젝트 선정 이유**
    - 문화 생활에 대한 예약 사이트 구현 및 결제, 장바구니 기능을 만들어보고자 구상하게 되었다.
    - 결제 사이트의 경우 실제 결제까지 구현하기에는 다소 시간과 backend 지식이 부족하여 결제 페이지 및 결제 데이터 저장으로만 구상.
    
- **프로젝트 목표**
    1. 공공 데이터 API 를 연결해 서울시 문화 데이터 출력.
    2. 카테고리 별 검색 및 데이터 날짜에 따른 진행 중, 진행 종료 표시 출력.
    3. 장바구니 기능과 결제 창(실제 결제가 아닌 선택 기능만 가능) 기능 구현.
    4. 결제 시 결제 내역과 예약된 티켓 확인 페이지로 데이터 전송.  

- **고려사항**

| 기술 | 내용 |
| --- | --- |
| Frontend | - 언어: JavaScript (React) <br>- 프레임워크: React.js <br>- 모듈화된 CSS인 module.css 사용 <br>- 라우팅 : React Router 사용 |
| Backend | - Node.js, Express, Axios 활용한 서버 개발 <br>- 엔드포인트, GET 및 POST 메소드 이해 |
| Data-Base | - mongoDB 연결을 통한 데이터 저장 <br>- CORS 이슈 해결 및 데이터베이스 통신 원활하게 <br>- Open API 사용법 숙지 및 데이터 가공 후 내보내기 계획 |
  
- **페이지별 핵심기능**

| 페이지 | 기능 |
| --- | --- |
| 로그인 | - 회원가입 <br>- 로그인 확인 <br>- mongoDB 연결 |
| 메인 | - 서울시 공공 문화 데이터 출력 <br>- 카테고리 별 필터 적용 <br>- 현재 날짜 기준 진행예정, 진행중, 진행 종료 확인 <br>- 검색 기능 <br>- 예약 가능, 종료 이벤트 체크 시 해당 리스트 출력 |
| 장바구니 | - 저장된 장바구니 데이터 출력 <br>- 삭제 버튼 <br>- 결제 버튼 클릭 시 결제창 이동 <br>- 결제 시 장바구니 데이터 자동 삭제 |
| 결제페이지 | - mongoDB에 저장된 해당 데이터 출력 <br>- 필수 작성칸(이름, 휴대전화, 이메일) 미입력 시 경고 알림 <br>- 결제 방식 선택 <br>- 결제 버튼 클릭 시 결제 시간 및 결제 방식 저장 |
| 마이페이지 | - 프로필 이미지 선택 및 수정 <br>- 로그아웃 <br>- 결제 내역 확인 <br>- 예약 내역 확인 <br>- 내가 작성한 리뷰 확인(미작업)  |

<br>

## 기술 및 개발 환경

| 기술 | 개발환경 |
| :----: | :----: | 
| FrontEnd | <img src="https://img.shields.io/badge/React-61DAFB?style=flat-square&logo=React&logoColor=black"> <img src="https://img.shields.io/badge/styledcomponents-CC6699?style=flat-square&logo=styledcomponents&logoColor=white"> <img src="https://img.shields.io/badge/axios-7F2B7B?style=flat-square&logo=axios&logoColor=white"/> <img src="https://img.shields.io/badge/JavaScript-F7DF1E.svg?style=flat-square&logo=JavaScript&logoColor=black"> | 
| BackEnd | <img src="https://img.shields.io/badge/REST API-000000?style=flat-square&logo=logoColor=white"> <img src="https://img.shields.io/badge/nodedotjs-green.svg?style=flat-square&logo=nodedotjs&logoColor=black"> <img src="https://img.shields.io/badge/express-red.svg?style=flat-square&logo=express&logoColor=black"> | 
| Design | <img src="https://img.shields.io/badge/Git-F05032?style=flat-square&logo=Git&logoColor=white"> <img src="https://img.shields.io/badge/figma-F24E1E?style=flat-square&logo=figma&logoColor=white">| 
| Tools | <img src="https://img.shields.io/badge/GitHub-181717?style=flat-square&logo=GitHub&logoColor=white"> <img src="https://img.shields.io/badge/Notion-000000.svg?style=flat-square&logo=Notion&logoColor=white"> <img src="https://img.shields.io/badge/Discord-5865F2?style=flat-square&logo=Discord&logoColor=white"> | 

## 주요기능

- 회원가입 및 로그인
- 문화 데이터 카테고리별 검색 및 진행별 상태 확인
- 장바구니 기능 구현
- 결제 시 데이터 저장 및 결제 정보, 예약 티켓 확인
- 리뷰 작성 ( 미작업)

<br>

| 로그인                                                 | 메인                                                             |
| ------------------------------------------------------ | ----------------------------------------------------------------- |
| <img src="https://github.com/mjkkcalb/ticketing/assets/142865257/52dc171d-659b-45b2-a362-804f7ab2e566" width="350"> | <img src="https://github.com/mjkkcalb/ticketing/assets/142865257/f31b6eac-49a2-4efb-8aaf-314882f884e6" width="350"> |
| 장바구니 및 결제                                         | 마이페이지                                                     |
| <img src="https://github.com/mjkkcalb/ticketing/assets/142865257/2a1df194-9916-41bd-b24d-35600a154fe9" width="350"> | <img src="https://github.com/mjkkcalb/ticketing/assets/142865257/c386436f-44ba-44c4-9a05-9a71937da716" width="350"> |

## 문제 및 해결방안

### 문화 API 연결

- **외부 API 변경**
    - 기존 데이터
        - 문화 공공 데이터 광장 - 예술의전당_종합 공연정보(전체 장르)
        - JSON 타입
        
    - 기존 연결 데이터 문제 사항
        - 다양한 출력 값이 많지만 빈칸으로 작성 되어있는 칸이 매우 많음
        - 이미지 url 연결이 되지 않는 문제 발생 (원인 x)
        - 다양한 정보가 아닌 예술의 전당 한정 데이터만 추출되어 정보가 한정적임
        - 업데이트 속도가 느려 이미 종료된 이벤트가 많음
        
        
    
    - 변경 데이터
        - 서울 열린데이터 광장 - 서울시 문화 행사 정보
        - JSON 타입
        
    - 데이터 변경 이유
        - 다양한 출력 값과 추출되는 데이터에서 누락이 적음
        - 이미지 url 출력에 이슈 사항이 없다
        - 카테고리 별 분류가 잘 정리되어 있음
        - 서울시 전체를 기준으로 데이터를 불러오기 때문에 많은 데이터 출력 가능
        - 업데이트 속도가 비교적 빠른편
        

---

- **API 연결**
    - 해당 데이터 페이지에서 인증키 신청
    - 로그인 후 인증키 신청 작성 → 이메일로 신청키 받기
    
![Untitled (10)](https://github.com/mjkkcalb/ticketing/assets/142865257/5dfb9947-2111-44e1-8606-84bd294ba4a2)

<br>


  1. node.js 환경에서 Express를 사용해 백엔드 서버 구축 후 데이터 받아오기

     a. axios를 사용해 서버에 http 요청을 보내고 받아옴 `const axios = require("axios")`
            
     b. 비동기 함수로 클라이언트로부터의 요청(**`req`**)과 서버로의 응답(**`res`**)을 처리. Express의 라우터에서 사용됨
     
     c. 데이터를 받아오기 위해 url 값과 필수 요청 값 작성
         - 인증키는 .env를 사용해 값을 가려줌
         - .env 에 저장한 값을 가져올 때는 `process.env.APPKEY` 형태로 작성한다

     d. cors 에러
            1. `const cors = require("cors");`
            2. `app.options("*", cors());`
            3. front file → package.json → `proxy` 추가

<br>

            
![Untitled (11)](https://github.com/mjkkcalb/ticketing/assets/142865257/4518094e-ab13-49f7-8367-88943c8d4b88)
            
![Untitled (12)](https://github.com/mjkkcalb/ticketing/assets/142865257/5bc3eaad-0353-4ee8-8801-cf3b549cb883)

      
```jsx
                const response = await axios.get(
                  `http://openapi.seoul.go.kr:8088/${process.env.APPKEY}/json/culturalEventInfo/1/500/`,
                  {
                    params: {
                      Type: "json",
                      Service: "culturalEventInfo",
                      StartIndex: 1,
                      EndIndex: 5, //받아올 데이터 
                      searchValue: searchValue,
                    }
 ```
            
<br>

        
 2. 프론트에서 값을 출력
    
    a. **`useState`** 훅을 사용하여 상태 변수들(**`data`**, **`searchTerm`**, **`selectedCategory`**)을 초기화
    
    b. **`useEffect`** 훅을 사용하여 컴포넌트가 마운트될 때 한 번만 실행되는 **`fetchData`** 함수를 호출
    
    c. **`axios.get('/ex/twoculture')`**를 사용하여 서버의 **`/ex/twoculture`** 엔드포인트로 GET 요청을 보냄.
    
    d. **`filteredData.map`** 로 **`filteredData`** 배열의 각 요소를 가져와서 해당 요소를 나타내는 JSX 코드를 생성해 정보를 나타내는 요소를 렌더링

<hr>

### Link 페이지 이동 데이터 전달 오류

- 문제 발생
    - 검색 페이지에서 예약하기 버튼 클릭 시 예약 창으로 넘어가는 데이터가 전달되지 않음.
    - 문제코드
    
    ```
    <Link to={{ pathname: `/reserve/${encodeURIComponent(item.TITLE)}`, 
    					state: { eventData: item } 
    				 }}
             onClick={() => console.log('Link clicked', item.TITLE, item)}>
           <button>예약하기</button>
    </Link>
    
    ```
    

- 문제 원인
    - Link 컴포넌트의 `to` 속성을 이용해 데이터를 전달하는 과정에서 `state` 속성을 `to` 속성 안에 넣으며 데이터가 전달되지 않는 오류 발생
    - 버전이 업그레이드 되며 `to` 속성 안에 `pathname` 입력 시 `state` 가 빈 객체로 전달

- 해결 과정
    1. Link 코드에 대한 이해를 정확히 하고자 리액트 라우터  [공식문서](https://reactrouter.com/en/main/components/link) 참고 및 구글링
    2. `to` 속성과 `state` 속성을 따로 작성하여 속성 중첩 방지
    3. pathname 속성 없애기
    
    ```jsx
    <Link to={`/reserve/${encodeURIComponent(item.TITLE)}`}
              state={{ eventData: item }}
              onClick={() => console.log('Link clicked', item.TITLE, item)}>
           <button>예약하기</button>
    </Link>
    ```
    
<hr>

### 결제 페이지 결제 시간 및 결제 방식 데이터 저장

- 문제 발생
    - 결제 페이지에 있는 결제 버튼 클릭 시 결제 시간 및 결제 방식을 mongoDB에 저장하려 하는데 계속해서 undefined로 데이터가 저장되지 않음
- 문제 원인
    - node.js에서 mongoose의 스키마 정의 값에 받아오는 결제 시간과 결제 방식에 대한 정의가 잘못됨
        - PaymentTime → number / PaymentMethod → object
- 해결 과정
    - 스키마 정의의 값을 수정해 데이터에 맞는 코드로 입력
        - PaymentTime → Date / PaymentMethod → String

<hr>

### 결제 시 장바구니 데이터 자동 삭제

- 문제 발생
    - 결제페이지에서 결제 버튼 클릭 시 장바구니 데이터에 저장된 해당 데이터가 자동 삭제 되어야 하는데 계속해서 `Axios` 에러가 발생
- 문제 원인
    - node.js에서 정의한 save delete 코드를 불러와 사용하는 과정에서 해당 데이터의 id 값이 제대로 정의되지 않아 계속된 에러 발생
- 해결 과정
    - `const *reserveIdToDelete* = *location.state.id*;` 코드를 작성해 서버에 요청을 보내는 과정에 있어 현재 예약 정보의 고유한 식별자를 지정해주어 Axios 에러를 해결
    
    ```
    const reserveIdToDelete = location.state.id;
    
            const deleteResponse = await axios.delete(`/save/delete/${reserveIdToDelete}`);
            if (deleteResponse.status === 200) {
              console.log('예약 정보 삭제 성공');
            } else {
              console.error('예약 정보 삭제 실패');
            }
          
      
          if (response.status === 200) {
            console.log('Reservation successful!');
          }
        } catch (error) {
          console.error('Reservation error:', error);
    ```
    
<hr>

### 예약 날짜에 맞춰 해당 달이 보여짐 (해결 x)

- 문제 발생
    - **`activeStartDate`** 속성을 사용해 데이터에 시작일이 해당되는 달이 가장 먼저 나타나게 작업하려 했으나, 해당 달이 가장 먼저 나타나지만 다음달로 넘어가지 않는 문제가 발생
      
- 문제 원인
    - 
- 해결 과정


<hr>

# 💫프로젝트 보러가기

### Project site: [click🌐](https://port-0-ticketing-5r422alqm2rj1x.sel4.cloudtype.app/)

ID : 111
PW : 111
