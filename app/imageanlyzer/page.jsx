import Header from '../components/Header'
import Gallary from '../components/Gallary'

import Main from '../components/image-anlyzer/Main'


const page = () => {
  
  return (
    <div className='bg-surface-secondary px-0 md:px-20  min-h-screen '>
        <Header heading={" Image Analyzer"}  paragraph={" Upload any visual to extract deep metadata, object detection, and color profiles."}/>
        <Main/>
        <Gallary/>
    </div>
  )
}

export default page