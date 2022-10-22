import type { NextPage } from 'next'
import Link from 'next/link'
import { Page } from "../components/Page"
import { Answers } from "../components/Answers"

const Question: NextPage = () => {

  return (
    <Page>
      <div className="box">
        <div className='content text-center'>
          <h2 className='page-title'>Mood Today</h2>
          <p className='font-sans'>How are you feeling today?</p>
          <Answers wrapperClasses={"mb-4"} />
        </div>
        <div>
        </div>
      </div>
    </Page >

  )
}

export default Question