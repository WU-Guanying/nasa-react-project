import { useState, useEffect } from "react"
import Footer from "./components/Footer"
import Main from "./components/Main"
import SideBar from "./components/SideBar"

function App() {
  const [data, setData] = useState(null)
  const [loading, setLoading] = useState(false)
  const [showModal, setShowModal] = useState(false)
  const NASA_KEY = import.meta.env.VITE_NASA_API_KEY
  const [localKeyR, setLocalKeyR] = useState(null)
  function handleToggleModal(){
    setShowModal(!showModal)
  }
  async function handleRefresh(){
    const url = "https://api.nasa.gov/planetary/apod" + `?api_key=${NASA_KEY}&count=1`
    if (localStorage.getItem(localKeyR)){
      const apiData = JSON.parse(localStorage.getItem(localKeyR))
      setData(apiData)
      console.log("Fetched from Cache")
      return
      }
    localStorage.clear() //清除无用缓存再从API中取数据，再新建key
    try{
      const res = await fetch(url)
      const apiData = await res.json()
      console.log(apiData[0])
      setData(apiData[0])
      console.log('Fetched from API')
      const keyTemp = `NASA-${data?.date}`
      setLocalKeyR(keyTemp)
      localStorage.setItem(localKeyR, JSON.stringify(apiData))
    } catch (err) {
      console.log(err.message)
    }
  }

  useEffect(() => {
    async function fetchAPIData(){
      const url = "https://api.nasa.gov/planetary/apod" + `?api_key=${NASA_KEY}`
      const today = (new Date()).toDateString()
      const localKey = `NASA-${today}`
      // 从缓存中取图片
      if (localStorage.getItem(localKey)){
        const apiData = JSON.parse(localStorage.getItem(localKey))
        setData(apiData)
        console.log("Fetched from Cache")
        return
      }
      localStorage.clear()
      try{
        const res = await fetch(url)
        const apiData = await res.json()
        localStorage.setItem(localKey, JSON.stringify(apiData))
        setData(apiData)
        console.log('Fetched from API')
        console.log('DATA\n',apiData)
      } catch (err) {
        console.log(err.message)
      }
    }
    fetchAPIData()
    },[])

  return (
    <>
    {data ? (<Main data={data}/>):(
      <div className="loadingState">
          <i className="fa-solid fa-gear"></i>
      </div>
    )}
    {showModal && (<SideBar data={data} handleToggleModal={handleToggleModal}/>)}
    {data && (<Footer data={data} handleToggleModal={handleToggleModal} handleRefresh={handleRefresh}/>)}
    </>
  )
}

export default App

// data?.data 意味着如果 data 存在且不是 null 或 undefined，则访问 data 对象的 data 属性。
// 如果 data 是 null 或 undefined，整个表达式返回 undefined 而不会抛出错误。