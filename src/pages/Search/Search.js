import React from 'react'
import GenreCard from '../../components/GenreCard/GenreCard'
import searchCategories from "../../helpers/searchLists"

const Search = () => {
  
  return (
    <div className="mt-2 px-6 pt-6">
        <div className="pt-8 pb-4">
          <h2 className="text-white text-2xl"> Browse All</h2> 
        </div>
        <div className=" pb-14 pt-2 justify-center grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 xl:gap-x-8 gap-y-8">
         {searchCategories.map(({id, category, color, searchImage})=> {
          return <GenreCard key={id} category={category} color={color} searchImage={searchImage} />
         })}
          
        </div>
        </div>
  )
}

export default Search