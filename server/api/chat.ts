export default defineEventHandler(async (event) => {
  const body = await readBody(event);
  // console.log("%c [ body ]-3", "font-size:13px; background:pink; color:#bf2c9f;", body);
  const modelId = body.model;
  const messages = body.messages;
  // console.log('%c [ messages ]-6', 'font-size:13px; background:pink; color:#bf2c9f;', messages)

  // const isDeepSeek = modelId.includes("deepseek");

  // const config = useRuntimeConfig(event);
  // const key = config.tutujinKey;
  const key = process.env.TUTUJIN_KEY;
  const baseUrl = "https://api.tutujin.com";

  const myHeaders = new Headers();
  myHeaders.append("Accept", "application/json");
  myHeaders.append("Authorization", `Bearer ${key}`);
  myHeaders.append("Content-Type", "application/json");

  const bodyData = JSON.stringify({
    model: modelId,
    messages: messages,
    // stream: false,
    stream: true,
  });

  const requestOptions: RequestInit = {
    method: "POST",
    headers: myHeaders,
    body: bodyData,
    redirect: "follow",
  };

  try {
    const res = await fetch(`${baseUrl}/v1/chat/completions`, requestOptions);
    return res;
  } catch (error: any) {
    throw createError({
      status: 400,
      message: "An error occurred",
    });
  }
});
