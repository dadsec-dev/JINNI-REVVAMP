import { NextApiRequest, NextApiResponse } from "next";

const api = process.env.REPLICATE_API;

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<any>
) {
  try {
    const { imageUrl, theme, room } = req.body;
    const prompt =
      room === "Gaming Room"
        ? "a video gaming room"
        : `a ${theme.toLowerCase()} ${room.toLowerCase()}`;

    // POST request to Replicate to start the image restoration generation process
    const startResponse = await fetch(
      "https://api.replicate.com/v1/predictions",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Token " + api,
        },
        body: JSON.stringify({
          version:
            "854e8727697a057c525cdb45ab037f64ecca770a1769cc52287c2e56472a247b",
          input: {
            image: imageUrl,
            prompt: prompt,
            scale: 9,
            a_prompt:
              "best quality, photo from Pinterest, interior, cinematic photo, ultra-detailed, ultra-realistic, award-winning, interior design, natural lighting",
            n_prompt:
              "longbody, lowres, bad anatomy, bad hands, missing fingers, extra digit, fewer digits, cropped, worst quality, low quality",
          },
        }),
      }
    );

    const jsonStartResponse = await startResponse.json();

    const endpointUrl = jsonStartResponse.urls.get;
    const originalImage = jsonStartResponse.input.image;

    

    // GET request to get the status of the image restoration process & return the result when it's ready
    let generatedImage: string | null = null;
    while (!generatedImage) {
      // Loop in 1s intervals until the alt text is ready
      const finalResponse = await fetch(endpointUrl, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Token " + api,
        },
      });
      const jsonFinalResponse = await finalResponse.json();

      if (jsonFinalResponse.status === "succeeded") {
        // generatedImage = jsonFinalResponse.output[1] as string;
        generatedImage = jsonFinalResponse.output[1];
      } else if (jsonFinalResponse.status === "failed") {
        break;
      } else {
        await new Promise((resolve) => setTimeout(resolve, 1000));
      }
    }

    if (generatedImage) {
      res.status(200).json({
        original: originalImage,
        generated: generatedImage,
      });
    } else {
      throw new Error("Failed to restore image");
    }
  } catch (error) {
    console.error(error);
    res.status(500).json("Failed to restore image");
  }
}
