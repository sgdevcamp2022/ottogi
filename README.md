# 👩‍💻스마일게이트 개발 캠프 2022 - 윈터 개발 캠프 2기 - Ottogi

<b>Discord Clone을 목표</b>로 개발을 진행한 <b>Team Ottogi</b> 입니다.


![image](https://user-images.githubusercontent.com/75191916/221621484-0a2c57bc-f9b0-4942-ab1d-24c026cadde0.png)

<br><br>

# Architecture

![image](https://user-images.githubusercontent.com/75191916/221616378-14f20e88-8619-4e39-b34a-3f4b649eb192.png)


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
- RabbitMQ
- AWS S3
- STOMP, WebSocket
