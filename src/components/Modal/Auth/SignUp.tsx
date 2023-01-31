import { authModalState } from "@/src/atoms/authModalAtom"
import { Input, Button, Flex, Text } from "@chakra-ui/react"
import React, { useState } from "react"
import { useSetRecoilState } from "recoil"
import { auth } from "@/src/firebase/clientApp"
import { FIREBASE_ERRORS } from '@/src/firebase/error'
import { useCreateUserWithEmailAndPassword } from 'react-firebase-hooks/auth'
import { ModalView } from "@/src/atoms/authModalAtom"

type SignUpProps = {
  toggleView: (view: ModalView) => void;
};

/**
 * 注册
 * @param param0 
 * @returns 
 */
const SignUp: React.FC<SignUpProps> = ({ toggleView }) => {
  const setAuthModalState = useSetRecoilState(authModalState)
  const [signUpForm,setSignUpForm] = useState({
    email:"",
    password:"",
    repeatPassword:""
  })
  const [error, setError] = useState('')
  const [
    createUserWithEmailAndPassword,
    user,
    loading,
    userError,
  ] = useCreateUserWithEmailAndPassword(auth);
  const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSignUpForm((prev) => ({
      ...prev,
      [event.target.name]: event.target.value
    }))
  }
  const onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    console.log(signUpForm);
    if(signUpForm.password !== signUpForm.repeatPassword){
      setError('Password do not match!')
      return
    }
    createUserWithEmailAndPassword(signUpForm.email, signUpForm.password)
  }
  return (
    <form onSubmit={onSubmit}>
      <Input 
        required
        mb={2} 
        name="email" 
        placeholder="email" 
        type="email" 
        onChange={onChange} 
        fontSize="10pt" 
        bg="gray.50"
        _placeholder={{color:"gray.500"}} 
        _hover={{bg:"white",border:"1px solid blue.500", borderColor:"blue.500"}}
        _focus={{outline:"none",bg:"white",border:"1px solid ", borderColor:"blue.500"}}
        />

      <Input 
        required
        mb={2} 
        name="password" 
        placeholder="password" 
        type="password" 
        onChange={onChange}
        fontSize="10pt" 
        bg="gray.50"
        _placeholder={{color:"gray.500"}} 
        _hover={{bg:"white",border:"1px solid blue.500", borderColor:"blue.500"}}
        _focus={{outline:"none",bg:"white",border:"1px solid ", borderColor:"blue.500"}}
        />

      <Input 
        required
        name="repeatPassword" 
        placeholder="repeat your Password" 
        type="password" 
        onChange={onChange}
        fontSize="10pt" 
        bg="gray.50"
        _placeholder={{color:"gray.500"}} 
        _hover={{bg:"white",border:"1px solid blue.500", borderColor:"blue.500"}}
        _focus={{outline:"none",bg:"white",border:"1px solid ", borderColor:"blue.500"}}
      />
      {(
        (error || userError) && (
          <Text textAlign="center" color="red" fontSize="10pt">
            {error || FIREBASE_ERRORS[userError?.message as keyof typeof FIREBASE_ERRORS]}
          </Text>
        )
      )}
      
      <Button mt={3} mb={3} type="submit" width="100%" isLoading={loading}>Sign Up</Button>
      <Flex fontSize="9pt" justifyContent="center">
        <Text mr={1}>Already a redditor ?</Text>
        <Text 
          mr={1} 
          color="blue.500" 
          fontWeight={700} 
          cursor="pointer" 
          onClick={() => toggleView("login")}
          >
          Login in
          </Text>
      </Flex>
    </form>
  )
}

export default SignUp 

