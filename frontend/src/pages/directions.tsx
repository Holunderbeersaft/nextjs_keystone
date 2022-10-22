import type { NextPage } from 'next'
import Link from 'next/link'
import { Page } from "../components/Page"
import { Answers } from "../components/Answers"

const Directions: NextPage = () => {
  return (
    <Page>
      <div className="box">
        <div className='content text-center'>
          <h3 className='uppercase tracking-wider mb-2'>Instructions</h3>
          <h1 className="page-title">It&apos;s easy</h1>
          <p className='font-sans'>How are you feeling today?</p>
          <Answers btnClasses={'pointer-events-none'} />
          <div className='button mx-auto w-44 mt-8'>
            <Link href="/question">
              <a className='button-text no-underline w-full h-full flex justify-center items-center'>Start</a>
            </Link>
          </div>
        </div>
      </div>
    </Page >

  )
}

export default Directions