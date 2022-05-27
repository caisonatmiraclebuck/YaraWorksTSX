import Header from './header'

type LayoutProps = {
    children: React.ReactNode; // 👈️ type children
  };

  //Setting up the layout
const Layout = ({ children }: LayoutProps) => {
  return (
        <>
            <Header />
            <main>{children}</main>
        </>
  )
}

export default Layout
