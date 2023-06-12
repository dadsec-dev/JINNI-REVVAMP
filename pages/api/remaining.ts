import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    // Your image generation code here

    res.status(200).json({ remainingGenerations: null });
  } catch (error) {
    console.error(error);
    res.status(500).json("Failed to restore image");
  }
}
