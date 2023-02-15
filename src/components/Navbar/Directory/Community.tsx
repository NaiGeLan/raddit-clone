import { communityState } from "@/src/atoms/communityAtom";
import { auth } from "@/src/firebase/clientApp";
import { Flex, MenuItem, Icon, Box, Text } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { GrAdd } from "react-icons/gr";
import { FaReddit } from "react-icons/fa";
import { useRecoilState, useRecoilValue } from "recoil";
import CreateCommunityModal from "../../Modal/CreateCommunity/CreateCommunityModal";
import MenuListItem from "./MenuListItem";
import  {get} from '@/src/util/request'
import { directoryMenuState } from "@/src/atoms/directoryMenuAtom";
const Community = () => {
  const [open, setOpen] = useState(false)
  const [user] = useAuthState(auth);
  const [directoryMenu,setDirectoryMenu] = useRecoilState(directoryMenuState)
  // useEffect(() =>{
  //   async function getAll(){
  //     console.log(user?.uid);
  //     const Id = user?.uid
  //     const res = await get(`community/getAll/${Id}`)
  //     console.log(res);
  //     // setDirectoryMenu((oldVal) => [
  //     //   ...oldVal,
        
  //     // ])
  //   }
  //   try {
  //     getAll()
  //   }catch(error){
  //     console.log(error);
      
  //   } 
  // },[])
  const mySnippets = useRecoilValue(communityState).mySnippets
  return (
    <>
      <CreateCommunityModal userId={user?.uid!} open={open} handleClose={() => setOpen(false)}></CreateCommunityModal>
      <Box mt={3} mb={4}>
        <>
          <Text pl={3} mb={1} fontSize={"7pt"} fontWeight={"500"} color="gray.500">
          MODERATING
          </Text>
          {
            mySnippets.find((item) => item.isModerator) && (
              mySnippets.filter((item) => item.isModerator)
              .map((snippet) => {
                <MenuListItem 
                  key={snippet.communityId}
                  displayText={`r/${snippet.communityId}`}
                  link={`/r/${snippet.communityId}`}
                  icon={FaReddit}
                  iconColor="brand.100"
                />
              })
            )
          }
        </>
      </Box>
      <MenuItem 
        width={"100%"}
        _hover={{
          outline: '1px solid',
          outlineColor: 'gray.100',
        }}
        fontSize="10pt"
        onClick={() => setOpen(true)}
      >
        <Icon as={GrAdd} fontSize="20" mr="2"></Icon>
        <Flex>Create Community</Flex>
      </MenuItem>
    </>
  )
}

export default Community
