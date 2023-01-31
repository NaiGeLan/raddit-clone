import React, { useEffect } from 'react'
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
  Text
} from '@chakra-ui/react'
import { useRecoilState } from 'recoil'
import { authModalState } from '@/src/atoms/authModalAtom'
import AuthInputs from './AuthInput'
import OAuthButtons from './OAuthButton'
import { useAuthState } from 'react-firebase-hooks/auth'
import { auth } from '@/src/firebase/clientApp'
import ResetPassword from './ResetPassword'
const AuthModal = () => {
  const [modalState, setModalState] = useRecoilState(authModalState)
  const [user, loading, error] = useAuthState(auth)
  const handleClose = () => {
    setModalState((prev) => ({
      ...prev,
      open: false,
    }))
  }
  const toggleView = (view: string) => {
    setModalState({
      ...modalState,
      view: view as typeof modalState.view,
    });
  };
  useEffect(() => {
    if(user){
      handleClose()
      console.log(user)
    }
  },[user])


  return (
    <>
      <Modal isOpen={modalState.open} onClose={handleClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader textAlign="center" >
            {modalState.view === "login" && "Login"}
            {modalState.view === "signup" && "Sign Up"}
            {modalState.view === "resetPassword" && "Reset Password"}
          </ModalHeader>
          <ModalCloseButton />

          <ModalBody  display="flex" flexDirection='column' alignItems='center' justifyContent="center">
            
            <Flex 
              direction="column"
              align="center"
              justify="center"
              width="70%"
            >
              
              {
                modalState.view === "resetPassword" ?
                <ResetPassword  toggleView={toggleView}></ResetPassword> :
                (
                  <>
                    <OAuthButtons></OAuthButtons>
                    <Text color="gray.500" fontWeight={500}>OR</Text>
                    <AuthInputs toggleView={toggleView}></AuthInputs>
                  </>
                )
              }
            </Flex>
          </ModalBody>

          
        </ModalContent>
      </Modal>
    </>
  )
}

export default AuthModal
