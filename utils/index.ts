// 处理多个数据段连在一起的数据
export const handleChunkText = (chunkText: string) => {
  // console.log('%c [ data ]-9', 'font-size:13px; background:pink; color:#bf2c9f;', data)
  if (!chunkText) return;
  // 根据换行符分割数据段
  const dataSegments = chunkText.split("\n");
  const textContents = dataSegments.map((segment) => {
    // 对每个数据段提取文本内容
    if (!segment.includes('"content":"')) return;
    const parts = segment.split('"content":"');
    // console.log('%c [ parts ]-13', 'font-size:13px; background:pink; color:#bf2c9f;', parts)
    if (!parts[0] || !parts) return;
    const textPart = parts[1];
    const endIndex = textPart.indexOf('"}');
    return textPart.substring(0, endIndex);
  });

  return textContents.join("");
};
