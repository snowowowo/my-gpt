export default defineEventHandler(async (event) => {
  const body = await readBody(event);
  // console.log("%c [ body ]-3", "font-size:13px; background:pink; color:#bf2c9f;", body);
  const modelId = body.model;
  const messages = body.messages;

  const config = useRuntimeConfig(event);
  const key = config.tutujinKey;

  const myHeaders = new Headers();
  myHeaders.append("Accept", "application/json");
  myHeaders.append("Authorization", `Bearer ${key}`);
  myHeaders.append("Content-Type", "application/json");

  const raw = JSON.stringify({
    model: modelId,
    messages: messages,
    // stream: false,
    stream: true,
  });

  const requestOptions: RequestInit = {
    method: "POST",
    headers: myHeaders,
    body: raw,
    redirect: "follow",
  };

  try {
    const res = await fetch(
      "https://api.tutujin.com/v1/chat/completions",
      requestOptions
    );
    // await event.respondWith(res);

    console.log(
      "%c [ res ]-33",
      "font-size:13px; background:pink; color:#bf2c9f;",
      res
    );
    return res;

    // no stream
    // const result = await res.json();
    // console.log("%c [ result ]-22", "font-size:13px; background:pink; color:#bf2c9f;", result);
    // return result;
  } catch (error: any) {
    // console.log(
    //   "%c [ error ]-40",
    //   "font-size:13px; background:pink; color:#bf2c9f;",
    //   error
    // );
    throw createError({
      status: 400,
      message: "An error occurred",
    });
  }
});
