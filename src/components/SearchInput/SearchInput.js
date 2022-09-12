import { SearchOutlined } from '@ant-design/icons'
import React from 'react'

const SearchInput = () => {
  return (
    <form className="flex items-center max-w-full">   
    <label for="simple-search" class="sr-only">Search</label>
    <div className="relative w-[20rem]">
        <div className="flex absolute inset-y-0 left-0 items-center pl-3 pointer-events-none">
            <SearchOutlined style={{color: "black", fontSize:"1.25rem"}}/>
        </div>
        <input type="text" id="simple-search" className="bg-gray-50 outline-0 text-gray-900 text-sm rounded-3xl block w-full pl-10 p-2  dark:border-gray-600 placeholder-gray-800 " placeholder="What do you want to listen to?" required/>
    </div>
   
</form>
  )
}

export default SearchInput