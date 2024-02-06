import getCurrentUser from "@/actions/getCurrentUser";
import LoginModal from "./_components/login-modal";
import { Navbar } from "./_components/navbar/navbar"
import RegisterModal from "./_components/registerModal";
import RentModal from "./_components/rentModal/rent-modal";

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
      <RentModal />
      <div className="pt-24">
        { children }
      </div>
    </>
  )
}

export default HomeLayout;