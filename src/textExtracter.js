const { createWorker } = require("tesseract.js");
const imgPath = "./report.jpeg";
async function extractText() {
  const worker = await createWorker("eng");

  (async () => {
    const {
      data: { text },
    } = await worker.recognize(imgPath);
    console.log(text);
    await worker.terminate();
  })();
}
extractText();
