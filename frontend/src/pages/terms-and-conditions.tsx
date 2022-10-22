import type { NextPage } from 'next'
import { Page } from "../components/Page"

const TermsAndConditions: NextPage = () => {
  return (
    <Page>
      <div className="box">
        {/* heading */}
        <h1 className='page-title'>
          Terms &amp; Conditions
        </h1>
        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Fugiat repudiandae, error perspiciatis possimus eaque corporis! Illum porro quasi eius. Sequi ex alias voluptate, voluptas magnam odio nesciunt recusandae molestiae provident?</p>
      </div>
    </Page>
  )
}

export default TermsAndConditions
