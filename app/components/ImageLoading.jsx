import React from 'react'

const ImageLoading = ({styling}) => {
  return (
    <div className={`${styling}  animate-pulse transition-all ease-in-out duration-700 bg-gray-400/10 border-2  border-gray-500/10 relative overflow-hidden`}></div>
  )
}

export default ImageLoading