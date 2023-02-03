import { Flex, Image } from '@chakra-ui/react';
import React from 'react';
import SearchInput from './SearchInput';
import RightContent from './RightContent/RightContent';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from '@/src/firebase/clientApp';
import Directory from './Directory/Directory';

/**
 * 导航栏
 * @returns
 */
const Navbar = () => {
  // 调用Auth 获取当前用户
  const [user, loading, error] = useAuthState(auth);
  return (
    <>
      <Flex bg='white' height='44px' padding='6px 12px' align='center'>
        <Flex align='center'>
          <Image src='images/redditFace.svg' height='30px'></Image>
          <Image
            src='images/redditText.svg'
            height='46px'
            display={{ base: 'none', md: 'unset' }}
          ></Image>
          { user && <Directory />}
        </Flex>
        {/* 搜索框 */}
        <SearchInput></SearchInput>
        {/* 右边区域 */}
        <RightContent user={user}></RightContent>
      </Flex>
    </>
  );
};

export default Navbar;
