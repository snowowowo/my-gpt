// 处理多个数据段连在一起的数据
// export const handleChunkText = (chunkText: string) => {
//   // console.log('%c [ data ]-9', 'font-size:13px; background:pink; color:#bf2c9f;', data)
//   if (!chunkText) return;
//   // 根据换行符分割数据段
//   const dataSegments = chunkText.split("\n");
//   const textContents = dataSegments.map((segment) => {
//     // 对每个数据段提取文本内容
//     if (!segment.includes('"content":"')) return;
//     const parts = segment.split('"content":"');
//     // console.log('%c [ parts ]-13', 'font-size:13px; background:pink; color:#bf2c9f;', parts)
//     if (!parts[0] || !parts) return;
//     const textPart = parts[1];
//     const endIndex = textPart.indexOf('"}');
//     return textPart.substring(0, endIndex);
//   });

//   // 把特殊字符转义回来
//   textContents.forEach((text, index) => {
//     textContents[index] = text
//       ?.replace(/\\n/g, "\n")
//       .replace(/\\t/g, "\t")
//       .replace(/\\r/g, "\r")
//       .replace(/\\"/g, '"')
//       .replace(/\\u003c/g, "<")
//       .replace(/\\u003e/g, ">");
//   });
//   return textContents.join("");
// };

interface ParsedData {
  text: string;
  done: boolean;
}

interface ParsedData {
  text: string;
  done: boolean;
}

export function getContent(str: string): ParsedData {
  const jsonRegex = /data: ({.+})/g;
  const doneRegex = /\[DONE\]/;

  let text = "";
  let done = false;

  const matches = str.matchAll(jsonRegex);
  for (const match of matches) {
    const jsonData = match[1];
    const parsedData = JSON.parse(jsonData);
    const choices = parsedData.choices || [];
    text += choices.map((choice: any) => choice.delta.content).join("");
  }

  if (doneRegex.test(str)) {
    done = true;
  }

  // 如果 text 包含特殊字符，则进行转义处理
  if (containsSpecialChars(text)) {
    text = escapeSpecialChars(text);
  }

  return { text, done };
}

// 检查 text 是否包含特殊字符
function containsSpecialChars(text: string): boolean {
  return /[\n\r\t\v\f\b]/.test(text);
}

// 转义 text 中的特殊字符
function escapeSpecialChars(text: string): string {
  const specialChars: {
    [key: string]: string;
  } = {
    "\n": "\n", // 换行符
    "\r": "\r", // 回车符
    "\t": "\t", // 制表符
    "\v": "\v", // 垂直制表符
    "\f": "\f", // 换页符
    "\b": "\b", // 退格符
    // 还可以添加其他特殊字符的转义映射
  };

  // 将 text 中的特殊字符进行转义
  for (const char in specialChars) {
    if (specialChars.hasOwnProperty(char)) {
      text = text.split(char).join(specialChars[char]);
    }
  }

  return text;
}

export function getModelNameByModelId(modelId: string) {
  const modelMap = new Map<string, string>([
    // ["deepseek-chat", "DeepSeek Chat (推荐)"],
    // ["deepseek-coder", "DeepSeek Coder (推荐)"],
    ["gpt-3.5-turbo", "GPT-3.5 Turbo"],
    ["gpt-3.5-turbo-1106", "GPT-3.5 Turbo 1106"],
    ["gpt-4", "GPT-4"],
    ["gpt-4-all", "GPT-4 All"],
    ["gemini-pro", "Gemini Pro"],
  ]);

  return modelMap.get(modelId) || "Unknown Model";
}
