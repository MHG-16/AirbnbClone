"use client";

import { AiOutlineMenu } from "react-icons/ai";
import { useCallback, useState } from "react";
import { signOut } from "next-auth/react";

import Avatar from "@/app/(home)/_components/avatar";
import MenuItem from "./menuItem";
import useRegisterModal from "@/hooks/useRegisterModal";
import useLoginModal from "@/hooks/useLoginModal";
import { SafeUser } from "@/types";


interface UserMenuProps {
    currentUser?: SafeUser;
}

const UserMenu :React.FC<UserMenuProps> = ({
    currentUser
}) => {
  const [ isOpen, setIsOpen ] = useState(false);
  const useRegister = useRegisterModal();
  const useLogin = useLoginModal();

  const toggleOpen = useCallback(() => {
    setIsOpen((value) => !value);
  }, [])
  return (
    <div className="relative">
        <div className='flex flex-row items-center gap-3'>
            <div
                onClick={() => {}}
                className="hidden md:block text-sm font-semibold py-3 px-4 rounded-full hover:bg-neutral-100 transition cursor-pointer"
            >
                Airbnb your home
            </div>
            <div
                onClick={toggleOpen}
                className='p-4 md:py-1 md:px-2 border-[1px] border-neutral-200 flex flex-row items-center gap-3 rounded-full cursor-pointer hover:shadow-md transition'
            >
                <AiOutlineMenu />
                <div className="hidden md:block">
                    <Avatar src={currentUser?.image}/>
                </div>
            </div>
        </div>

        {isOpen && (
            <div className="absolute rounded-xl shadow-md w-[40vw] md:w-3/4 bg-white overflow-hidden right-0 top-12 text-sm z-50">
                <div className="flex flex-col cursor-pointer">
                    {currentUser ? (
                        <>
                            <MenuItem 
                            onClick={() => {}}
                            label="My trips"
                            />
                            <MenuItem
                                onClick={() => {}}
                                label="My favorites"
                            />
                            <MenuItem
                                onClick={() => {}}
                                label="My reservations"
                            />
                            <MenuItem
                                onClick={() => {}}
                                label="My properties"
                            />
                            <MenuItem
                                onClick={() => {}}
                                label="Airbnb my home"
                            />
                            <hr />
                            <MenuItem 
                                onClick={() => signOut()}
                                label="Logout"
                            />
                        </>
                    ) : (
                    <>
                        <MenuItem 
                            onClick={useLogin.onOpen}
                            label="Login"
                        />
                        <MenuItem
                            onClick={useRegister.onOpen}
                            label="Sign up"
                        />
                    </>
                    )
                }
                </div>
            </div>
        )}
    </div>
  )
}

export default UserMenu