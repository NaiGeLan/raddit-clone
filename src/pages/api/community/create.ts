import { NextApiRequest, NextApiResponse } from "next";
import { prisma } from '@/src/db'
import { CODE } from '@/src/util/codeutil'
import Result from '@/src/util/resUtil'

async function create(
  req: NextApiRequest,
  res: NextApiResponse,
) {

  const {name, userId, privacyType}  = req.body;
  
  try {
    const community = await prisma.community.create({
      data: {
        communityName: String(name),
        creatorId: userId,
        privacyType,
        numberOfMembers: 1,
        imageURL: ''
      }
    })
    console.log(community,'%%%%');
    if(community) {
      return res.status(200).json(Result.success(200,community,'already created'));
    }
  }catch (error) {
    console.log(error,'****')
    return res.status(200).json(Result.fail(CODE.BUSINESS_ERROR,error));
  }
  
}


export default create
