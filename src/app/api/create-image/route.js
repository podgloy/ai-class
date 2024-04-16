// /app/api/create-story/route.js
import Replicate from "replicate";

const replicate = new Replicate({
  auth: process.env.REPLICATE_API_TOKEN,
});

export async function POST(req) {

  const { name, career, place } = await req.json();

  const output = await replicate.run(
    "playgroundai/playground-v2-1024px-aesthetic:42fe626e41cc811eaf02c94b892774839268ce1994ea778eba97103fe1ef51b8",
    {
      input: {
        width: 1024,
        height: 1024,
        prompt: `A human name ${name} in ${place} being ${career}`,
        scheduler: "K_EULER_ANCESTRAL",
        guidance_scale: 3,
        apply_watermark: false,
        negative_prompt: "",
        num_inference_steps: 50
      }
    }
  );
  console.log(output);
    


  return Response.json({
    status: "ok",
    answer: "output[0]"
  });


}