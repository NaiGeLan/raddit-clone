import { ChevronDownIcon } from '@chakra-ui/icons';
import {
  Menu,
  MenuButton,
  Button,
  MenuList,
  MenuItem,
  Icon,
  Flex,
  Box,
  Text,
} from '@chakra-ui/react';
import { signOut, User } from 'firebase/auth';
import React from 'react';

import { FaRedditSquare } from 'react-icons/fa';
import { VscAccount } from 'react-icons/vsc';
import { IoSparkles } from 'react-icons/io5';
import { CgProfile } from 'react-icons/cg';
import { MdOutlineLogin } from 'react-icons/md';
import { auth } from '@/src/firebase/clientApp';
// import AuthModal from '../../Modal/Auth/AuthModal';
import { authModalState } from '@/src/atoms/authModalAtom';
import { useSetRecoilState } from 'recoil';
import { TiHome } from 'react-icons/ti'
import Community from './Community';


type UserMenuProps = {
  user?: User | null;
};

const Directory: React.FC<UserMenuProps> = ({ user }) => {
  const setAuthModalState = useSetRecoilState(authModalState);
  return (
    <Menu>
      <MenuButton
        cursor={'pointer'}
        padding='0px 6px'
        borderRadius={'4'}
        _hover={{
          outline: '1px solid',
          outlineColor: 'gray.200',
        }}
        mr="2"
        ml={{base:0, md: 2}}
      >
        <Flex align='center' justify={"center"}>
          <Flex align={"center"}>
            <Icon fontSize={"24"} as={ TiHome } mr={{base:1, md: 2}}></Icon>
            <Flex display={{base:"none", lg:"flex"}}>
              <Text fontWeight={"600"}>Home</Text>
            </Flex>
          </Flex>
          <ChevronDownIcon color="gray.600" />
        </Flex>
      </MenuButton>
      <MenuList>
        <Community></Community>
      </MenuList>
    </Menu>
  );
};

export default Directory;
