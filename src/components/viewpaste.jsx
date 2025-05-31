import { Divide } from 'lucide-react'
import React from 'react'
import { useParams } from 'react-router-dom'
import { useDispatch, useSelector } from "react-redux"


const viewpaste = () => {


  const { id } = useParams();
  const pastes = useSelector((state) => state.pastes.paste);
  const pasteToEdit = pastes.find(p => p.id === id);
  
  return (
    <>
    <div>
      <div className='font-medium font-mono text-[25px] my-[15px] mx-[20px] bg-purple-100'>
        Title:
        <div className='font-[6px] font-sans text-[25px] mx-[10px] text-purple-800'>
          {pasteToEdit.title}
        </div>
      </div>
      <div className='font-medium font-mono text-[25px] my-[15px] mx-[20px] bg-purple-100'>
        Content:
        <div className='font-[6px] font-sans text-[25px] mx-[10px] text-purple-800'>
          {pasteToEdit.content}
        </div>
      </div>
    </div>
    </>
    
  )
}

export default viewpaste