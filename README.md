# ๐ฉโ๐ป์ค๋ง์ผ๊ฒ์ดํธ ์ํฐ ๊ฐ๋ฐ ์บ ํ 2๊ธฐ - Ottogi

<b>Discord Clone์ ๋ชฉํ</b>๋ก ๊ฐ๋ฐ์ ์งํํ <b>Team Ottogi</b> ์๋๋ค.

<br>

![image](https://user-images.githubusercontent.com/75191916/221622160-dd51b988-17dc-4e1c-af34-ef86743be97f.png)

<br>

| ํ์                                    | ์ญํ       | ์ค๋ช                    |
| --------------------------------------- | --------- | ----------------------- |
| [๊นํ์ฐ](https://github.com/krokerdile) | FRONT-END |                         |
| [ํ๋ค์](https://github.com/nno3onn)    | FRONT-END |                         |
| [๊น์์ฐฌ](https://github.com/Kimsc9976)  | BACK-END  | WebRTC, ์๊ทธ๋๋ง        |
| [๋ฐ๊ทํ](https://github.com/freemoon99) | BACK-END  | ์ปค๋ฎค๋ํฐ, ์ํ๊ด๋ฆฌ      |
| [๋ฐฑ์ข์ธ](https://github.com/whipbaek)   | BACK-END  | API Gateway, ์ ์ , ์ฑํ |

<br><br>

# Architecture

![image](https://user-images.githubusercontent.com/75191916/221621967-5e8d7265-d89f-491a-be7f-512fb817cae0.png)

๊ฐ๋ฐ์ MSA ๊ตฌ์กฐ๋ฅผ ๊ธฐ๋ฐ์ผ๋ก ์งํ๋์์ผ๋ฉฐ Spring Cloud์ Eureka๋ฅผ ํ์ฉํ์ฌ ์งํํ์์ต๋๋ค.

### Server List

- <i>Spring Cloud Gateway โ API Gateway ๋ฐ JWT ์ธ์ฆ ์งํ</i>

- <i>์ ์ (์ธ์ฆ) ์๋ฒ โ ์ ์  ๊ด๋ จ ๋ก์ง ๋ฐ ๊ฒ์ฆ ์งํ</i>

- <i>์ฑํ ์๋ฒ โ ํด๋ผ์ด์ธํธ์ WebSocket์ผ๋ก ์ฐ๊ฒฐ ๋ฐ ์ฑํ ๋ฐํ์ ๋ด๋น</i>

- <i>์ปค๋ฎค๋ํฐ ์๋ฒ โ ์ปค๋ฎค๋ํฐ ๋ฐ ์ปค๋ฎค๋ํฐ ํ์์ ์์๋ค์ ๋ํ ๋ก์ง์ ๋ด๋น</i>

- <i>์ํ๊ด๋ฆฌ ์๋ฒ โ ์ ์ ๋ค์ ์ฌ๋ฌ ์ํ๋ฅผ ๊ด๋ฆฌํ๋ ์๋ฒ</i>

- <i>๋ฏธ๋์ด ์๋ฒ ๋ฐ ์๊ทธ๋๋ง ์๋ฒ โ WebRTC์ ํ์ ๊ธฐ๋ฅ์ ํ์ฉํ๊ธฐ ์ํ ์๋ฒ</i>

<br><br>

# ๊ธฐ์  ์คํ

#### FRONT END ๐ฎ

- TypeScript
- React
- Zustand
- React Query
- Story Book

#### BACK END โ๏ธ

- JAVA
- Spring FrameWork (JPA, Security, Cloud ..)
- Java Script
- Node JS

#### ETC ๐ฝ

- MySQL
- Redis
- STOMP, WebSocket
- RabbitMQ
- AWS S3

<bR>

# ๊ธฐ๋ฅ

- <i>ํ์๊ฐ์ ๋ฐ ๋ก๊ทธ์ธ</i>

- <i>ํ์์ ๋ณด ๋ณ๊ฒฝ</i>

- <i>์น๊ตฌ ์ถ๊ฐ ๋ฐ ์ญ์ </i>

- <i>์ปค๋ฎค๋ํฐ ์์ฑ ๋ฐ ์ญ์ </i>

- <i>์ปค๋ฎค๋ํฐ ์ ๋ณด ๋ณ๊ฒฝ</i>

- <i>์น๊ตฌ๊ฐ 1:1 DM ์ฑํ</i>

- <i>์ปค๋ฎค๋ํฐ๋ด ์ฑ๋์์ ๋จ์ฒด ์ฑํ</i>

<br>

# ์์ ๋ฐ ์ผ๋ถ ์คํ ์ฌ์ง

์์ฐ ์์ ๋งํฌ : [VIDEO](https://github.com/sgdevcamp2022/ottogi/tree/main/video)

- ### ๋ก๊ทธ์ธ

![image](https://user-images.githubusercontent.com/75191916/221626092-b9d73427-5cb7-4e8f-b359-2ccb5dbdb181.png)

<br>

- ### ๋ฉ์ธ ํ๋ฉด

![image](https://user-images.githubusercontent.com/75191916/221625710-3fdcb085-470d-427f-93bc-975d60765b4a.png)

<br>

- ### DM

![image](https://user-images.githubusercontent.com/75191916/221625844-0969666a-ca90-473a-84b9-82aa02cfd7c2.png)

<br>

- ### ์ปค๋ฎค๋ํฐ ์ฑํ

![image](https://user-images.githubusercontent.com/75191916/221625954-fd453218-aa1d-4e9e-93ba-3b42822ec65c.png)

<br>
