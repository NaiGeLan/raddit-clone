import { authModalState } from "@/src/atoms/authModalAtom";
import { Flex } from "@chakra-ui/react";
import React from "react";
import { useRecoilValue } from "recoil";
import { ModalView } from "@/src/atoms/authModalAtom";
import Login from "./Login";
import SignUp from "./SignUp";
type AuthInputsProps = {
  toggleView: (view: ModalView) => void;
};
const AuthInputs: React.FC<AuthInputsProps> = ({ toggleView }) => {
  const modalState = useRecoilValue(authModalState)
  
  return (
    <>
      <Flex 
        direction="column"
        align="center"
        width="100%"
        mt={4}
      >
        {modalState.view === 'login' && <Login toggleView={toggleView}></Login>}
        {modalState.view === 'signup' && <SignUp toggleView={toggleView}></SignUp>}
      </Flex>
    </>
  )
}

export default AuthInputs
