# 커뮤니티 서버
## 역할
|서비스|역할|
|---|---|
|커뮤니티 서버|디스코드 내에서 제공하는 커뮤니티 및 채널에 대한 관리 기능 담당|

## 기술스택
- node.js
- MySQL

## 아키텍처
![아키텍처](https://user-images.githubusercontent.com/102667851/221066554-836406b4-7b22-4eba-a701-4470c4ec428d.png)


## 제공 기능
|기능|설명|
|---|---|
|커뮤니티 관리 기능|- 커뮤니티, 채널에 대한 조회, 생성, 수정, 삭제 기능 제공<br>- 사용자 별 커뮤니티 배치 위치 설정 기능<br>- 채널 순서 위치 변경 기능 제공|
|커뮤니티 초대 기능|- 초대장 생성 및 초대장을 통한 가입 기능 제공|


## 프로젝트 진행 중 이슈
### 상하위 연계성?
![상하위연계성](https://user-images.githubusercontent.com/102667851/221066803-41a1c6f0-077b-4d3f-866a-0beea0d24dd1.png)

그래서 해결 방안

![해결방안](https://user-images.githubusercontent.com/102667851/221066815-81f2f61e-916b-4275-9230-01954acf6486.png)

---

### 초대장 관련

초대장을 어떻게 보내는 것이 좋을지 고민하고, shorturl같은 경우 백엔드에서 처리하는게 좋을까? 라는 고민을 했을때 여러번의 조회 결과를 응답해주어야 한다고 생각함. 비효율적이라고 생각되어 프론트에서 shorturl을 만들어 정보를 제공하면 db에 저장할 수 있음.
-> 이후 초대 링크로 접속한다면 커뮤니티id를 조회하여 해당 커뮤니티의 멤버로 가입이된다

![초대장](https://user-images.githubusercontent.com/102667851/221067222-c001ca2a-4f2b-4fcc-a903-d7b92846ed95.png)

---    

### 이미지 업로드
![이미지 업로드](https://user-images.githubusercontent.com/102667851/221067245-6331eca4-49cc-474a-84d1-79e4df770a44.png)

---

### 상태관리 서버

![상태관리서버의실시간](https://user-images.githubusercontent.com/102667851/221067262-720e8d89-1015-4658-97ad-5050f596d1f9.png)

---

## ERD

![erd](https://user-images.githubusercontent.com/102667851/221067468-1cfd49a4-f8bd-4eba-8925-aa861b2468f2.png)

---
## 관련 자료

- [mvc패턴 예제](https://codingcoding.tistory.com/1308)
- [이미지 업로드](https://tape22.tistory.com/9)
- [db 연계성 부분](https://teambtd.tistory.com/32?category=968835#:~:text=casCade%20%EA%B8%B0%EB%8A%A5%EC%9E%90%EC%B2%B4%EA%B0%80%20foreign,%EC%82%AD%EC%A0%9C%20%ED%95%B4%20%EB%B2%84%EB%A6%AC%EB%8A%94%20%EA%B8%B0%EB%8A%A5%EC%9D%B4%EB%8B%A4.)
- 이외에 다수 자료들 참고함
