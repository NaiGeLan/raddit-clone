import { Flex, Image } from "@chakra-ui/react"
import React from "react"
import AuthButton from "./AuthButton"

type RightContentProps = {

}

const RightContent: React.FC<RightContentProps> = () => {
  return (
    <>
      <Flex  align="center" justify="center"> 
        <AuthButton></AuthButton>   
      </Flex>
    </>
  )
}

export default RightContent
