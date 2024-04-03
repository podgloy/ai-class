import Replicate from "replicate";

const replicate = new Replicate({
  auth: process.env.REPLICATE_API_TOKEN,
});



export function POST (req) {
    
    const { name, age, topic } = await req.json();

    const input = {
        top_k: 50,
        top_p: 0.9,
        prompt: `Write a bedtime story about ${topic} for my ${age} year-old daugther named ${name}"`,
        temperature: 0.6,
        max_new_tokens: 1024,
        prompt_template: "<s>[INST] {prompt} [/INST] ",
        presence_penalty: 0,
        frequency_penalty: 0
      };
      
      for await (const event of replicate.stream("mistralai/mixtral-8x7b-instruct-v0.1", { input })) {
        process.stdout.write(event.toString());
      };