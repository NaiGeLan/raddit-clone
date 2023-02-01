import { Flex, Image, Button } from '@chakra-ui/react';
import React from 'react';
import { useSetRecoilState } from 'recoil';
import AuthModal from '../../Modal/Auth/AuthModal';
import { authModalState } from '@/src/atoms/authModalAtom';

const AuthButton: React.FC = () => {
  const setAuthModalState = useSetRecoilState(authModalState);

  return (
    <>
      <AuthModal></AuthModal>
      <Button
        onClick={() => setAuthModalState({ open: true, view: 'login' })}
        variant='outline'
        height='28px'
        width={{ base: '70px', md: '100px' }}
        display={{ base: 'none', sm: 'flex' }}
        mr={2}
      >
        Login
      </Button>
      <Button
        onClick={() => setAuthModalState({ open: true, view: 'signup' })}
        height='28px'
        width={{ base: '70px', md: '100px' }}
        display={{ base: 'none', sm: 'flex' }}
        mr={2}
      >
        Sign up
      </Button>
    </>
  );
};

export default AuthButton;
