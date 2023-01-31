import { Flex, Image } from "@chakra-ui/react"
import React from "react"
import SearchInput from "./SearchInput"
import RightContent from "./RightContent/RightContent"
const Navbar = () => {
  return (
    <>
      <Flex bg="white" height="44px" padding="6px 12px" align="center">
        <Flex align="center">
          <Image src="images/redditFace.svg" height="30px"></Image>
          <Image src="images/redditText.svg" height="46px" display={{base:"none",md:"unset"}}></Image>
        </Flex>
        <SearchInput></SearchInput>
        <RightContent></RightContent>
      </Flex>
    </>
  )
}

export default Navbar
