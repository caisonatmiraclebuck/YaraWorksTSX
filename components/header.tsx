import type { NextPage } from 'next'
import Head from 'next/head'
import Link from 'next/link'
import { Brand, Navbar } from './styled'

const Header: NextPage = () => {
  return (
        <>
            <Head>
                <title>Yara Works</title>
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <Navbar>
                <Link href="/">
                    <Brand >Yara Works</Brand>
                </Link>
            </Navbar >
        </>
  )
}

export default Header
