import React from 'react'

const Answers = ({ wrapperClasses, btnClasses }: any) => {
  return (
    <div className={`${wrapperClasses} flex justify-between lg:px-4 px-1 flex-wrap max-w-2xl mx-auto`} >
      <button className={`${btnClasses} answer`}>😊</button>
      <button className={`${btnClasses} answer`}>🙂</button>
      <button className={`${btnClasses} answer`}>😐</button>
      <button className={`${btnClasses} answer`}>🙁</button>
      <button className={`${btnClasses} answer`}>😩</button>
    </div>
  )
}

export { Answers }