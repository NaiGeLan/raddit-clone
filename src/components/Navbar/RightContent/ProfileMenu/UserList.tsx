import { auth } from "@/src/firebase/clientApp";
import { MenuItem, Flex, Icon, MenuDivider } from "@chakra-ui/react";
import { signOut } from "firebase/auth";
import { CgProfile } from "react-icons/cg";
import { MdOutlineLogin } from "react-icons/md";
import { useResetRecoilState } from "recoil";

type UserListProps = {};

const UserList: React.FC<UserListProps> = () => {
  // const resetCommunityState = useResetRecoilState(communityState);

  const logout = async () => {
    await signOut(auth);
    // resetCommunityState();
  };

  return (
    <>
      <MenuItem
              fontSize={'10pt'}
              fontWeight={700}
              _hover={{ bg: 'blue.500', color: 'white' }}
            >
              <Flex align={'center'}>
                <Icon as={CgProfile} mr={2} fontSize={20} />
                Profile
              </Flex>
            </MenuItem>
            <MenuItem
              fontSize={'10pt'}
              fontWeight={700}
              _hover={{ bg: 'blue.500', color: 'white' }}
              onClick={() => logout()}
            >
              <Flex align={'center'}>
                <Icon as={MdOutlineLogin} mr={2} fontSize={20} />
                Log Out
              </Flex>
            </MenuItem>
    </>
  );
};
export default UserList;
