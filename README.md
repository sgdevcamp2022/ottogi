# 👩‍💻스마일게이트 윈터 개발 캠프 2기 - Ottogi

<b>Discord Clone을 목표</b>로 개발을 진행한 <b>Team Ottogi</b> 입니다.

<br>

![image](https://user-images.githubusercontent.com/75191916/221622160-dd51b988-17dc-4e1c-af34-ef86743be97f.png)

<br>

| 팀원                                    | 역할      | 설명                    |
| --------------------------------------- | --------- | ----------------------- |
| [김현우](https://github.com/krokerdile) | FRONT-END |                         |
| [허다은](https://github.com/nno3onn)    | FRONT-END |                         |
| [김수찬](https://github.com/Kimsc9976)  | BACK-END  | WebRTC, 시그널링        |
| [박규현](https://github.com/freemoon99) | BACK-END  | 커뮤니티, 상태관리      |
| [백종인](https://github.com/whipbaek)   | BACK-END  | API Gateway, 유저, 채팅 |

<br><br>

# Architecture 🚧

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

# 기술 스택 🎮

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

# 주요 기능 🚀

- <i>회원가입 및 로그인</i>

- <i>회원정보 변경</i>

- <i>친구 추가 및 삭제</i>

- <i>커뮤니티 생성 및 삭제</i>

- <i>커뮤니티 정보 변경</i>

- <i>친구간 1:1 DM 채팅</i>

- <i>커뮤니티내 채널에서 단체 채팅</i>

<br>

# 실행 화면 👨‍💻

영상 링크 : [VIDEO](https://github.com/sgdevcamp2022/ottogi/tree/main/video)

<br>

- ### 회원가입 및 로그인
  - `Google SMTP를 활용한 메일인증을 통하여 회원가입 진행`

![1  회원가입 및 로그인](https://github.com/sgdevcamp2022/ottogi/assets/75191916/71ebb161-cb55-477b-afac-7b81522ad369)


<br>

- ### 프로필 확인 및 변경
  - `프로필 사진, 이름, 비밀번호, 자기소개 변경 가능`

![2  프로필 변경](https://github.com/sgdevcamp2022/ottogi/assets/75191916/b9ee8df3-2f7f-43fd-8a12-d55ef9ab29f3)


<br>

- ### 친구추가 기능 및 1:1 DM
  - `메일을 통한 친구추가 가능`
  - `친구 수락 및 삭제 가능`
  - `친구 온/오프라인 여부 확인 가능`
  - `친구간 1:1 채팅 (DM) 가능`
    
![3  친구 추가 및 채팅](https://github.com/sgdevcamp2022/ottogi/assets/75191916/ec5cb05f-c21b-4d7f-9e46-aa0cddc39bf4)


<br>

- ### 커뮤니티 생성
  - `사진 및 이름 설정하여 커뮤니티 생성 가능`

![4  커뮤니티 생성](https://github.com/sgdevcamp2022/ottogi/assets/75191916/2c76f2fb-a2e7-446c-9552-95b84685b296)


  <br>


- ### 커뮤니티 초대 및 채팅
  - `친구 목록에서 커뮤니티 초대 가능`
  - `채팅 메세지로 오는 초대로 가입 가능`
  - `커뮤니티 가입시 웰컴 메세지 전송`
  - `커뮤니티 멤버간 1:N 채팅 가능`

![5  커뮤니티 초대 및 채팅](https://github.com/sgdevcamp2022/ottogi/assets/75191916/57c2614b-fb6a-4b7c-8375-1bca82d8d77f)


<br>

