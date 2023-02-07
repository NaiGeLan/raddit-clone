import {  Prisma } from "@prisma/client";
import { NextApiRequest, NextApiResponse } from "next";
import { prisma } from '@/src/db'
import { CODE } from '@/src/util/codeutil'
import Result from '@/src/util/resUtil'

async function get(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  debugger
  console.log(req.query)
  const name  = req.query.name;
  console.log(name);
  
  const community = await prisma.community.findFirst({
    where: {
      communityName: String(name)
    }
  })
  console.log(community);
  if(community) {
    return res.status(200).json(Result.success(200,false,'already exists'));
  }
  return res.status(200).json(Result.success(200,true,'success'));

}


export default get
