import React from 'react'
import Head from 'next/head'
import type { NextPage } from 'next'


interface MyProps {
  children: React.ReactNode;
}

const Page: NextPage<MyProps> = ({ children }: MyProps) => {
  return (
    <div className='min-h-screen max-w-full	font-sans'>
      <Head>
        <title>Mood Tracker</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      {/* content wrappe */}
      <main className='w-full grid h-screen place-items-center px-4 md:px-32'>

        {children}


      </main>

    </div>
  )
}

export { Page };