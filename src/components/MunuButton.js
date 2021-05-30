import React from 'react'

function MunuButton({active  , name}) {
    return (
        <button className={`bg-white border  font-base text-l mt-2 float-right  p-2 w-56 mr-4 rounded-full focus:outline-none  ${active ? `text-blue-500 border-purple-300`:`border-purple-600 text-blue-700 shadow-lg `} `}>
            {name}
        </button>
    )
}

export default MunuButton
