import { auth } from '@/src/firebase/clientApp';
import { Button, Flex, Image, Text } from '@chakra-ui/react';
import { signIn, useSession } from 'next-auth/react';
import React from 'react';
import { useSignInWithGoogle } from 'react-firebase-hooks/auth';

/**
 * 第三方登录
 * @returns
 */
const OAuthButtons = () => {
  
  const [signInWithGoogle, _, loading, error] = useSignInWithGoogle(auth);
  const { data: session } = useSession()
  return (
    <Flex direction='column'>
      <Button variant='oauth' mb={2} onClick={() => signInWithGoogle()} isLoading={loading}>
        <Image src='/images/googlelogo.png' height='20px' mr={1}></Image>
        Continue with Google
      </Button>

      <Button variant='oauth' mb={2}>
        <Image src='/images/GitHubLogo.png' height='25px' mr={1} onClick={() => signIn()}></Image>
        Continue with GitHub
      </Button>
      {error && (
        <Text textAlign="center" fontSize="10pt" color="red" mt={2}>
          {/* {error} */}
        </Text>
      )}
    </Flex>
  );
};

export default OAuthButtons;
