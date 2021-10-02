import { NextApiRequest, NextApiResponse } from "next";
import { Stuff } from "../../interfaces";

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  const cursor = parseInt(req.query.cursor as string) || 0;
  const pageSize = 5;

  const data: Stuff[] = Array.from({ length: pageSize }, (_, index) => {
    const id = index + cursor;
    return {
      id,
      name: `Stuff ${id + 1}`,
      imageUrl: `https://picsum.photos/id/${id}/300/300`,
    };
  });

  const nextId = cursor < 100 ? data[data.length - 1].id + 1 : null;
  const previousId = cursor > 0 ? data[0].id - pageSize : null;

  setTimeout(() => {
    res.json({ data, nextId, previousId });
  }, 1000);
}
