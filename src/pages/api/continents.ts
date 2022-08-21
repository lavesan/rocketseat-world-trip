import { NextApiRequest, NextApiResponse } from "next";
import data from "../../api-data/data.json";

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  const searchId = req.query.id;

  if (searchId)
    return res
      .status(200)
      .json(data.find((country) => country.id.toString() === searchId));

  res.status(200).json(data);
}
