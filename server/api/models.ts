export default defineEventHandler(async (event) => {
  // const key = process.env.TUTUJIN_KEY;

  const config = useRuntimeConfig(event);
  const key = config.tutujinKey;

  const myHeaders = new Headers();
  myHeaders.append("Authorization", `Bearer ${key}`);
//   myHeaders.append("User-Agent", "Apifox/1.0.0 (https://apifox.com)");

  const requestOptions: RequestInit = {
    method: "GET",
    headers: myHeaders,
    redirect: "follow",
  };

  try {
    const response = await fetch("https://api.tutujin.com/v1/models", requestOptions);
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
