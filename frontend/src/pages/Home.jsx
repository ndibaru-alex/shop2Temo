import React from 'react'
import CategoryList from  '../components/categoryList'
import BannerProduct from '../components/BannerProduct'
import HorizontalCardProduct from '../components/HorizontalCardProduct'
import VertialCardProduct from '../components/VerticalCardProduct'


const Home = () => {
  return (
    <div className='mt-4'>
     <CategoryList/>
     <BannerProduct/>
    
      <HorizontalCardProduct category={'airpodes'} heading={'Top Airpodes'}/>
     <HorizontalCardProduct category={'camera'} heading={'Best Cameras'}/>
     <HorizontalCardProduct category={'mouse'} heading={'Top Mouse'}/>
     <VertialCardProduct category={'mobiles'} heading={'Latest Phones'}/>
     <VertialCardProduct category={'televisions'} heading={'Flameless TVS'}/>
     
    </div>
  )
}

export default Home
