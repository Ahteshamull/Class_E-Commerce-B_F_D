import React from 'react'
import Container from '../layout/Container'
import Shirt from '../Component/Shirt'


const Category = () => {
  return (
    <section className='mt-[50px]'>
      <Container>
        <div className='mb-5'>
          <h2 className='lg:text-2xl text-xl font-bold font-roboto text-primary'>Category</h2>
          <Shirt/>
       </div >
      </Container>
    </section>
  )
}

export default Category