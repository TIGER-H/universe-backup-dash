// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next';
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const params = req.query;
  if (typeof params.artist !== "string") {
    res.status(400);
    return;
  }
  try {
    const data = await fetch(`https://raw.githubusercontent.com/TIGER-H/universe-bak/backup-meta-patches/artist-board/${params.artist}.json`);
    const dataJSON = await data.json();

    res.status(200).json(dataJSON);

  } catch (e) {
    res.status(500);
  }
}
