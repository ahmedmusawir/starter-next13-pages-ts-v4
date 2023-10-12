import datasource from "@/data-layer";
import type { NextApiRequest, NextApiResponse } from "next";

type Data = {
  query: { [key: string]: string | string[] | undefined };
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  // Return the query parameters for debugging purposes
  // res.status(200).json({ query: req.query });

  const query = req.query;
  console.log("query in api post-search:", query);
  const posts = await datasource.searchPosts(query);
  // const posts = await datasource.searchPosts({ isFeatured: true });
  // const jobs = await datasource.searchJobs({jobTypes: ["contract"], remoteOk: true});
  res.status(200).json(posts);
}
