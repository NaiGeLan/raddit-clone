import { CheckIcon, PhoneIcon, SearchIcon } from "@chakra-ui/icons"
import { Flex, Image, Input, InputGroup, InputLeftElement, InputRightElement } from "@chakra-ui/react"
import React from "react"

/**
 * 搜索框
 * @returns 
 */
const SearchInput = () => {
  return (
    <>
      <Flex flexGrow={1} mr={2} align="center">
        <InputGroup>
          <InputLeftElement
            pointerEvents='none'
          >
            <SearchIcon color='gray.300' />
          </InputLeftElement>
          <Input 
            placeholder='Search Reddit' 
            fontSize="10pt" 
            _placeholder={{color: "gray.500"}} 
            _hover={{bg:"white",
              border:"1px soild", 
              borderColor:"blue.500"
            }}
            _focus={{outline: "none", border:"solid 1px", borderColor:"blue.500"}}
            />
        </InputGroup>
      </Flex>
    </>
  )
}

export default SearchInput
