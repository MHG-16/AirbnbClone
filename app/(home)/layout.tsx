import { Navbar } from "./_components/navbar/navbar"

const HomeLayout = ({
  children
}: {
  children: React.ReactNode
}) => {
  return (
    <>
      <Navbar />
      <div>
        { children }
      </div>
    </>
  )
}

export default HomeLayout;