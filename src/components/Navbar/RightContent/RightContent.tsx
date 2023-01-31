import { auth } from "@/src/firebase/clientApp"
import { Flex, Image, Button } from "@chakra-ui/react"
import { signOut, User } from "firebase/auth"
import React from "react"
import AuthButton from "./AuthButton"

type RightContentProps = {
  user?: User | null
}

const RightContent: React.FC<RightContentProps> = ({user}) => {
  return (
    <>
      <Flex  align="center" justify="center"> 
        {user ? (
          <Button onClick={() => signOut(auth)}>Log Out</Button>
          ) : (
            <AuthButton></AuthButton> 
          )}       
      </Flex>
    </>
  )
}

export default RightContent
