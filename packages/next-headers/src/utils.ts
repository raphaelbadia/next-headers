async function streamToString(stream: NodeJS.ReadableStream): Promise<string> {
  const chunks: Array<any> = [];
  for await (let chunk of stream) {
    chunks.push(chunk);
  }
  const buffer = Buffer.concat(chunks);
  return buffer.toString("utf-8");
}
