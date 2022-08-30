import React from 'react'

const isIncome = Math.round(Math.random())

export default function InfoCard() {
  return (
    <div className='text-center p-2'>
      Try Saying: <br />
      Add {isIncome ? 'Income ' : 'Expense '}  
      for {isIncome ? '$100 ' : '$50 '} 
      in Category {isIncome ? 'Business ' : 'House '}  
      for {isIncome ? 'Monday ' : 'Tuesday '} 
    </div>
  )
}
