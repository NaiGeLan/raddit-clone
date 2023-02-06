import { Box, Button, Checkbox, Divider, Flex, Text, Icon, Input, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, Stack } from "@chakra-ui/react"
import React, { useState } from "react"
import { BsFillPersonFill, BsFillEyeFill } from "react-icons/bs"
import { HiLockClosed } from "react-icons/hi";
import { useSetRecoilState } from "recoil"
import { communityState } from "@/src/atoms/communityAtom"
import router from "next/router"
import { defHttp } from '@/src/service/http'

type CreateCommunityModalType = {
  open: boolean
  handleClose: () => void
  userId: string;
}

const CreateCommunityModal:React.FC<CreateCommunityModalType> = ({open, handleClose, userId}) => {
  const [name, setName] = useState("");
  const [charsRemaining, setCharsRemaining] = useState(21);
  const [privacyType, setprivacyType] = useState("public");
  const [nameError, setNameError] = useState("");
  const [loading, setLoading] = useState(false);
  const setSnippetState = useSetRecoilState(communityState);
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.value.length > 21) return;
    setName(event.target.value);
    setCharsRemaining(21 - event.target.value.length);
  };
  const onprivacyTypeChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const {
      target: { name },
    } = event;
    if (name === privacyType) return;
    setprivacyType(name);
  };
  const handleCreateCommunity = async () => {
    if (nameError) setNameError("");
    const format = /[ `!@#$%^&*()+\-=\[\]{};':"\\|,.<>\/?~]/;

    if (format.test(name) || name.length < 3) {
      return setNameError(
        "Community names must be between 3–21 characters, and can only contain letters, numbers, or underscores."
      );
    }

    setLoading(true);
    try {
      // const data = {
      //   communityName: name
      // }
      const res = await defHttp.get({ url:`community/get/${name}`});
      if(!res.data) {
        setLoading(false)
          return setNameError(
            `Sorry, /r${name} is taken. Try another.`
          );
          
      }
      console.log(res)
      // Create community document and communitySnippet subcollection document on user
      const data = {
        name,
        userId,
        privacyType
      }
      const comunity = await defHttp.post({url:'community/create', params: data});
      if(comunity.code !== 200){
        setLoading(false)
        //   setNameError('')
        //   handleClose();
      }
      console.log(comunity);
        setNameError('')
        handleClose();
    } catch (error: any) {
      console.log("error", error);
      setNameError(error.message);
    }
    // setSnippetState((prev) => ({
    //   ...prev,
    //   mySnippets: [],
    // }));
    
    // router.push(`r/${name}`);
    // setLoading(false);
  };
  return (
    <>
      <Modal isOpen={open} onClose={handleClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader 
            display={"flex"}
            flexDirection="column"
            fontSize={"15"}
            padding="3"
          >
            Create a Community
          </ModalHeader>
          
        <Box pl={"3"} pr={"3"}>
          <Divider></Divider>
          <ModalCloseButton />
          <ModalBody display="flex" flexDirection="column" padding="10px 0px">
          <Text fontWeight={600} fontSize={15}>
            Name
          </Text>
          <Text fontSize={11} color="gray.500">
            Community names including capitalization cannot be changed
          </Text>
          <Text
            color="gray.400"
            position="relative"
            top="28px"
            left="10px"
            width="20px"
          >
            
          </Text>
          <Input
            position="relative"
            name="name"
            value={name}
            onChange={handleChange}
            pl="22px"
            type={""}
            size="sm"
          />
          <Text
            fontSize="9pt"
            color={charsRemaining === 0 ? "red" : "gray.500"}
            pt={2}
          >
            {charsRemaining} Characters remaining
          </Text>
          <Text fontSize="9pt" color="red" pt={1}>
            {nameError}
          </Text>
          <Box mt={4} mb={4}>
            <Text fontWeight={600} fontSize={15}>
              Community Type
            </Text>
            <Stack spacing={2} pt={1}>
              <Checkbox
                colorScheme="blue"
                name="public"
                isChecked={privacyType === "public"}
                onChange={onprivacyTypeChange}
              >
                <Flex alignItems="center">
                  <Icon as={BsFillPersonFill} mr={2} color="gray.500" />
                  <Text fontSize="10pt" mr={1}>
                    Public
                  </Text>
                  <Text fontSize="8pt" color="gray.500" pt={1}>
                    Anyone can view, post, and comment to this community
                  </Text>
                </Flex>
              </Checkbox>
              <Checkbox
                colorScheme="blue"
                name="restricted"
                isChecked={privacyType === "restricted"}
                onChange={onprivacyTypeChange}
              >
                <Flex alignItems="center">
                  <Icon as={BsFillEyeFill} color="gray.500" mr={2} />
                  <Text fontSize="10pt" mr={1}>
                    Restricted
                  </Text>
                  <Text fontSize="8pt" color="gray.500" pt={1}>
                    Anyone can view this community, but only approved users can
                    post
                  </Text>
                </Flex>
              </Checkbox>
              <Checkbox
                colorScheme="blue"
                name="private"
                isChecked={privacyType === "private"}
                onChange={onprivacyTypeChange}
              >
                <Flex alignItems="center">
                  <Icon as={HiLockClosed} color="gray.500" mr={2} />
                  <Text fontSize="10pt" mr={1}>
                    Private
                  </Text>
                  <Text fontSize="8pt" color="gray.500" pt={1}>
                    Only approved users can view and submit to this community
                  </Text>
                </Flex>
              </Checkbox>
            </Stack>
          </Box>
        </ModalBody>
        </Box>
          <ModalFooter>
        <Button variant="outline" colorScheme='blue' mr={3} onClick={handleClose}>
              Cancel
        </Button>
        <Button variant='solid' isLoading={loading} onClick={handleCreateCommunity}>Create Community</Button>
        </ModalFooter>
        </ModalContent>
        
      </Modal>
    </>
  )
}

export default CreateCommunityModal
