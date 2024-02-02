import getCurrentUser from "@/actions/getCurrentUser";
import LoginModal from "./_components/login-modal";
import { Navbar } from "./_components/navbar/navbar"
import RegisterModal from "./_components/registerModal";

const HomeLayout = async ({
  children
}: {
  children: React.ReactNode
}) => {
  const currentUser = await getCurrentUser();
  return (
    <>
      <Navbar currentUser={currentUser}/>
      <LoginModal />
      <RegisterModal />
      <div>
        { children }
      </div>
    </>
  )
}

export default HomeLayout;