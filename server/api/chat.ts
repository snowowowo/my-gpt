export default defineEventHandler(async (event) => {
  const body = await readBody(event);
  const modelId = body.modelId;
  const messages = body.messages;

  const config = useRuntimeConfig(event);
  const key = config.tutujinKey;

  const myHeaders = new Headers();
  myHeaders.append("Accept", "application/json");
  myHeaders.append("Authorization", `Bearer ${key}`);
  // myHeaders.append("User-Agent", "Apifox/1.0.0 (https://apifox.com)");
  myHeaders.append("Content-Type", "application/json");

  const raw = JSON.stringify({
    model: modelId,
    messages: messages,
  });

  const requestOptions: RequestInit = {
    method: "POST",
    headers: myHeaders,
    body: raw,
    redirect: "follow",
  };

  try {
    const response = await fetch("https://api.tutujin.com/v1/chat/completions", requestOptions);
    const result = await response.json();
    return {
      data: result,
    };
  } catch (error) {
    throw createError({
      statusCode: 400,
      statusMessage: JSON.stringify(error),
    });
  }
});
