import type { NextPage } from 'next'
import { Page } from "../components/Page"

const WhatIs: NextPage = () => {
  return (
    <Page>
      <div className="box">
        {/* heading */}
        <h1 className='page-title'>
          What is the Mood Tracker?
        </h1>
        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Fugiat repudiandae, error perspiciatis possimus eaque corporis! Illum porro quasi eius. Sequi ex alias voluptate, voluptas magnam odio nesciunt recusandae molestiae provident?</p>
      </div>
    </Page>
  )
}

export default WhatIs
