# 👩‍💻스마일게이트 윈터 개발 캠프 2기 - Ottogi

<b>Discord Clone을 목표</b>로 개발을 진행한 <b>Team Ottogi</b> 입니다.

<br>

![image](https://user-images.githubusercontent.com/75191916/221622160-dd51b988-17dc-4e1c-af34-ef86743be97f.png)

<br>

|팀원|역할|설명|
|------|---|---|
|[김현우](https://github.com/krokerdile)|FRONT-END||
|[허다은](https://github.com/nno3onn)|FRONT-END||
|[김수찬](https://github.com/Kimsc9976)|BACK-END|WebRTC, 시그널링|
|[박규현](https://github.com/freemoon99)|BACK-END|커뮤니티, 상태관리|
|[백종인](https://github.com/whipbaek)|BACK-END|API Gateway, 유저, 채팅|



<br><br>

# Architecture

![image](https://user-images.githubusercontent.com/75191916/221621967-5e8d7265-d89f-491a-be7f-512fb817cae0.png)

개발은 MSA 구조를 기반으로 진행되었으며 Spring Cloud와 Eureka를 활용하여 진행하였습니다.

### Server List
- <i>Spring Cloud Gateway → API Gateway 및 JWT 인증 진행</i>

- <i>유저(인증) 서버 → 유저 관련 로직 및 검증 진행</i>

- <i>채팅 서버 → 클라이언트와 WebSocket으로 연결 및 채팅 발행을 담당</i>

- <i>커뮤니티 서버 → 커뮤니티 및 커뮤니티 하위의 작업들에 대한 로직을 담당</i>

- <i>상태관리 서버 → 유저들의 여러 상태를 관리하는 서버</i>

- <i>미디어 서버 및 시그널링 서버 → WebRTC의 화상 기능을 활용하기 위한 서버</i>

<br><br>


# 기술 스택

#### FRONT END 🔮
- TypeScript 
- React
- Zustand
- React Query
- Story Book

#### BACK END ♟️
- JAVA
- Spring FrameWork (JPA, Security, Cloud ..)
- Java Script
- Node JS

#### ETC 💽
- MySQL
- Redis
- STOMP, WebSocket
- RabbitMQ
- AWS S3

<bR>

# 기능 

- <i>회원가입 및 로그인</i>

- <i>회원정보 변경</i>

- <i>친구 추가 및 삭제</i>

- <i>커뮤니티 생성 및 삭제</i>

- <i>커뮤니티 정보 변경</i>

- <i>친구간 1:1 DM 채팅</i>

- <i>커뮤니티내 채널에서 단체 채팅</i>

<br>


# 영상 및 일부 실행 사진

시연 영상 링크 : [VIDEO](https://github.com/sgdevcamp2022/ottogi/tree/main/video)


- ### 로그인

![image](https://user-images.githubusercontent.com/75191916/221626092-b9d73427-5cb7-4e8f-b359-2ccb5dbdb181.png)

<br>

- ### 메인 화면

![image](https://user-images.githubusercontent.com/75191916/221625710-3fdcb085-470d-427f-93bc-975d60765b4a.png)

<br>

- ### DM

![image](https://user-images.githubusercontent.com/75191916/221625844-0969666a-ca90-473a-84b9-82aa02cfd7c2.png)

<br>

- ### 커뮤니티 채팅

![image](https://user-images.githubusercontent.com/75191916/221625954-fd453218-aa1d-4e9e-93ba-3b42822ec65c.png)

<br>

- ### WebRTC 화상대화

![image](![image](https://user-images.githubusercontent.com/68680106/221720580-23a02dc9-c307-49bc-88f2-98e887684b76.png)
)
