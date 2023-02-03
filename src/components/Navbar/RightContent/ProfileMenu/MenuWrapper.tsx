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

import NoUserList from './NoUserList';
import UserList from './UserList';
type UserMenuProps = {
  user?: User | null;
};

const UserMenu: React.FC<UserMenuProps> = ({ user }) => {
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
      >
        <Flex align='center'>
          {user ? (
            <>
              <Icon fontSize={24} mr={1} color='gray.300' as={FaRedditSquare} />
              <Box
                display={{ base: 'none', lg: 'flex' }}
                flexDirection='column'
                fontSize='8pt'
                alignItems='flex-start'
                mr={8}
              >
                <Text fontWeight={700}>
                  {user?.displayName || user?.email?.split('@')[0]}
                </Text>
                <Flex alignItems='center'>
                  <Icon as={IoSparkles} color='brand.100' mr={1} />
                  <Text color='gray.400'>1 karma</Text>
                </Flex>
              </Box>
            </>
          ) : (
            <Icon as={VscAccount} mr={1} fontSize='24' color='gray.400'></Icon>
          )}
          <ChevronDownIcon color="gray.600" />
        </Flex>
      </MenuButton>
      <MenuList>
        {user ? (
          <UserList/>
        ) : (
          <NoUserList setModalState={setAuthModalState}/>
        )}
      </MenuList>
    </Menu>
  );
};

export default UserMenu;
