import { Telegraf } from "telegraf";
import dotenv from "dotenv";
import OpenAIApi from "openai";
import NodeCache from "node-cache";

/** env 사용 */
dotenv.config();
const cache = new NodeCache();

/**
 * 어떤 GPT 모델을 사용할 건지
 * 설정해주면 됩니다.
 * openai 4.20.0 버전
 * 2023.12 기준 사용 가능 모델
 * 'gpt-4-1106-preview'
 * 'gpt-4-vision-preview'
 * 'gpt-4'
 * 'gpt-4-0314'
 * 'gpt-4-0613'
 * 'gpt-4-32k'
 * 'gpt-4-32k-0314'
 * 'gpt-4-32k-0613'
 * 'gpt-3.5-turbo-1106'
 * 'gpt-3.5-turbo'
 * 'gpt-3.5-turbo-16k'
 * 'gpt-3.5-turbo-0301'
 * 'gpt-3.5-turbo-0613'
 * 'gpt-3.5-turbo-16k-0613';
 */
const MODEL = "gpt-3.5-turbo";

/**
 * GPT의 역할을 작성해주면 됩니다.
 * 작성하지 않으면 기본 ChatGPT 역할이 적용됩니다.
 */
const PROMPT = `당신은 [파이썬|자바|Nodejs] 를 사용하여 개발하는 개발자 GPT입니다. 코딩 질문에 답변하고 코드 블록을 사용하여 실제 코드 예제를 제공합니다. 심지어 여러분이 답에 익숙하지 않을 때도, 여러분은 그것을 알아내기 위해 여러분의 극도의 지능을 사용합니다. 모든 것이 좋다면 "Yes Sam"이라고 말하세요.`;

// OpenAI API 키를 설정
const openai = new OpenAIApi({
  apiKey: process.env.API_KEY,
});

// 텔레그램 봇 토큰으로 Telegraf 인스턴스를 생성합니다.
const bot = new Telegraf(process.env.BOT_TOKEN);

bot.command("gpt", async () => {
  try {
    // 현재 GPT가 작성 중인 상태인지 검사
    const isTyping = cache.get("is_typing");
    if (isTyping) {
      return;
    } else {
      cache.set("is_typing", true, 30);
    }

    // 유저 입력 텍스트
    const userMessage = ctx.message.text;

    // Reqeust Body Data
    const contentForGpt = [
      { role: "system", content: PROMPT },
      { role: "user", content: userMessage },
    ];

    // 메시지를 OpenAI API Rrequest 전송
    const response = await openai.chat.completions.create({
      messages: contentForGpt,
      model: MODEL,
      temperature: 1, // 답변의 다양성 조절 0.5 ~ 1.0 적당
      max_tokens: 100, // 답변받을 최대 토큰 수(글자 수)
    });

    // 개발 확인용 로그
    console.log("response: ", response);
    console.log("content: ", response.choices[0].message.content);

    // Open API Response
    const resultMessage = response.choices[0].message.content;

    // 텔레그램 봇으로 reply
    await ctx.reply(resultMessage, {
      reply_to_message_id: ctx.message.message_id,
    });

    // 작성 중 상태 해제
    cache.del("is_typing");
  } catch (error) {
    console.log("Error: ", error);
  }
});

// 봇을 시작합니다.
bot.startPolling();
