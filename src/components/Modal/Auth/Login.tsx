import { authModalState } from "@/src/atoms/authModalAtom"
import { Input, Button, Flex, Text } from "@chakra-ui/react"
import React, { FormEvent, useState } from "react"
import { useSetRecoilState } from "recoil"
import { useSignInWithEmailAndPassword } from 'react-firebase-hooks/auth';
import { auth } from "@/src/firebase/clientApp";
import { FIREBASE_ERRORS } from "@/src/firebase/error";
import { ModalView } from '@/src/atoms/authModalAtom';

type LoginProps = {
  toggleView: (view: ModalView) => void;
};

const Login: React.FC<LoginProps> = ({ toggleView }) => {
  const setAuthModalState = useSetRecoilState(authModalState)
  // 登录Hook
  const [
    signInWithEmailAndPassword,
    user,
    loading,
    error,
  ] = useSignInWithEmailAndPassword(auth);
  // 登录表单
  const [loginForm,setLoginForm] = useState({
    email:"",
    password:"",
  })
  /**
   * 填写表单回调
   * @param event 
   */
  const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setLoginForm((prev) => ({
      ...prev,
      [event.target.name]: event.target.value
    }))
  }
  /**
   * 提交表单
   * @param event 
   */
  const onSubmit = (event:FormEvent<HTMLFormElement>) => {
    event.preventDefault(); // 阻止提交表单默认刷新页面
    signInWithEmailAndPassword(loginForm.email, loginForm.password)
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
        {( // 错误提醒
          (error) && (
            <Text textAlign="center" color="red" fontSize="10pt">
              {FIREBASE_ERRORS[error?.message as keyof typeof FIREBASE_ERRORS]}
            </Text>
          )
        )}
      <Button mt={3} mb={3} type="submit" width="100%" isLoading={loading}>Login in</Button>
      <Flex justifyContent="center" mb={2}>
        <Text fontSize="9pt" mr={1}>
          Forgot your password?
        </Text>
        <Text
          fontSize="9pt"
          color="blue.500"
          cursor="pointer"
          fontWeight={700} 
          onClick={() => toggleView("resetPassword")}
        >
          Reset
        </Text>
      </Flex>
      <Flex fontSize="9pt" justifyContent="center">
        <Text mr={1}>New here?</Text>
        <Text 
          mr={1} 
          color="blue.500" 
          fontWeight={700} 
          cursor="pointer" 
          onClick={() => toggleView("signup")}
          >
          Sign Up
          </Text>
      </Flex>
    </form>
  )
}

export default Login 


