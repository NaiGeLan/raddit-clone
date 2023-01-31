import React from 'react'
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Box,
  Button,
  useDisclosure,
  Flex,
} from '@chakra-ui/react'
import { useRecoilState } from 'recoil'
import { authModalState } from '@/src/atoms/authModalAtom'

const AuthModal = () => {
  const [modalState, setModalState] = useRecoilState(authModalState)
  const handleClose = () => {
    setModalState((prev) => ({
      ...prev,
      open: false,
    }))
  }
  const handleOpen = () => {
    setModalState((prev) => ({
      ...prev,
      open: true,
    }))
  }
  const finalRef = React.useRef(null)

  return (
    <>
      <Modal finalFocusRef={finalRef} isOpen={modalState.open} onClose={handleClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>
            {modalState.view === "login" && "Login"}
            {modalState.view === "signup" && "Sign Up"}
            {modalState.view === "resetPassword" && "Reset Password"}
          </ModalHeader>
          <ModalCloseButton />

          <ModalBody display="flex" flexDirection='column' alignItems='center' justifyContent="center">
            Body
            <Flex>
              
            </Flex>
          </ModalBody>

          <ModalFooter>
            <Button colorScheme='blue' mr={3} onClick={handleClose}>
              Close
            </Button>
            <Button variant='ghost'>Secondary Action</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  )
}

export default AuthModal
