import type { NextPage } from 'next'
import Link from 'next/link'
import { Page } from "../components/Page"
import { Answers } from "../components/Answers"

const History: NextPage = () => {
  return (
    <Page>
      <div className="box">
        <div className='content text-center'>
          <h2 className='page-title'>History Overview</h2>
          <p className='font-sans'>Your History of Feelings</p>
        </div>
        <div className='grid lg:grid-cols-3 grid-cols-2 gap-4 max-h-80 overflow-auto no-scrollbar snap-y'>
          <div className='snap-end bg-slate-100 w-full px-4 py-2'>
            <p className='mb-1 font-sans'>DD/MM/YYYY</p>
            <p className='mb-1'>😊</p>
          </div>
          <div className='snap-end bg-slate-100 w-full px-4 py-2'>
            <p className='mb-1 font-sans'>DD/MM/YYYY</p>
            <p className='mb-1'>🙂</p>
          </div>
          <div className='snap-end bg-slate-100 w-full px-4 py-2'>
            <p className='mb-1 font-sans'>DD/MM/YYYY</p>
            <p className='mb-1'>🙁</p>
          </div>
          <div className='snap-end bg-slate-100 w-full px-4 py-2'>
            <p className='mb-1 font-sans'>DD/MM/YYYY</p>
            <p className='mb-1'>😊</p>
          </div>
          <div className='snap-end bg-slate-100 w-full px-4 py-2'>
            <p className='mb-1 font-sans'>DD/MM/YYYY</p>
            <p className='mb-1'>🙂</p>
          </div>
          <div className='snap-end bg-slate-100 w-full px-4 py-2'>
            <p className='mb-1 font-sans'>DD/MM/YYYY</p>
            <p className='mb-1'>🙁</p>
          </div>
          <div className='snap-end bg-slate-100 w-full px-4 py-2'>
            <p className='mb-1 font-sans'>DD/MM/YYYY</p>
            <p className='mb-1'>😊</p>
          </div>
          <div className='snap-end bg-slate-100 w-full px-4 py-2'>
            <p className='mb-1 font-sans'>DD/MM/YYYY</p>
            <p className='mb-1'>🙂</p>
          </div>
          <div className='snap-end bg-slate-100 w-full px-4 py-2'>
            <p className='mb-1 font-sans'>DD/MM/YYYY</p>
            <p className='mb-1'>🙁</p>
          </div>
        </div>
      </div>
    </Page >

  )
}

export default History