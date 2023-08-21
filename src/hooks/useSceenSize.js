//React Hook to detect changes in screen sizes of our app

import { useEffect, useState } from 'react'

const useSceenSize = () => {
    const [screenSizes, setscreenSizes] = useState({
        width: window.innerWidth,
        height: window.innerHeight
    })

    useEffect(() => {
     const handleResize = () => {
        setscreenSizes({
            width: window.innerWidth,
            height: window.innerHeight
        })
     }
     window.addEventListener("resize", handleResize);

     return ()=> {
        window.removeEventListener("resize", handleResize)
     }
    }, [])
    
  return screenSizes
}

export default useSceenSize