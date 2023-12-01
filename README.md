# telegraf-chat-gpt

![image](https://github.com/j3y3h0/telegraf-chat-gpt/assets/18677603/4948f621-fd0b-4ae2-9e1b-f1cff74a01c7)

- OpenAI API와 Telegraf 라이브러리를 사용하여  
  텔레그램 봇에 ChatGPT를 연동하는 템플릿입니다.

## 설정

1. 터미널에서 아래의 명령어를 입력하여 `package.json`에 명시된 라이브러리를 설치합니다.

```bash
npm install
```

2. .env 파일을 생성하고, OpenAI API 키와 텔레그램 봇 토큰을 설정합니다.

```
API*KEY=여기에*오픈AI*API*키를*입력하세요
BOT_TOKEN=여기에*텔레그램*봇*토큰을\_입력하세요
```

3. 실행
   터미널에서 아래의 명령어를 실행하여 텔레그램 봇을 실행합니다.

```bash
npm run dev
```
