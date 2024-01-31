import { Navbar } from "./_components/navbar/navbar"
import RegisterModal from "./_components/registerModal";

const HomeLayout = ({
  children
}: {
  children: React.ReactNode
}) => {
  return (
    <>
      <Navbar />
      <RegisterModal />
      <div>
        { children }
      </div>
    </>
  )
}

export default HomeLayout;