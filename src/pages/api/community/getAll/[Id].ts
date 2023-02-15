import {  Prisma } from "@prisma/client";
import { NextApiRequest, NextApiResponse } from "next";
import { prisma } from '@/src/db'
import { CODE } from '@/src/util/codeutil'
import Result from '@/src/util/resUtil'

async function getAll(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  debugger
  console.log(req.query)
  const Id  = req.query.Id;
  console.log(Id,'%%%');
  
  const community = await prisma.community.findMany({
    where: {
      creatorId: String(Id)
    }
  })
  console.log(community);
  if(community) {
    return res.status(200).json(Result.success(200,community,'success'));
  }
  return res.status(200).json(Result.success(200,community,'null'));

}


export default getAll
