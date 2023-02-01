import { Button, Flex, Image } from '@chakra-ui/react';
import React from 'react';

/**
 * 第三方登录
 * @returns
 */
const OAuthButtons = () => {
  return (
    <Flex direction='column'>
      <Button variant='oauth' mb={2}>
        <Image src='/images/googlelogo.png' height='20px' mr={1}></Image>
        Continue with Google
      </Button>

      <Button variant='oauth' mb={2}>
        <Image src='/images/GitHubLogo.png' height='25px' mr={1}></Image>
        Continue with GitHub
      </Button>
    </Flex>
  );
};

export default OAuthButtons;
