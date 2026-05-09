
import Hotel from './Hotel'
const SearchHotel=()=>{
   
    let[hotels,setHotels]=useState()
    useEffect(()=>{
        fetch("https:/localhost:8080/hotel//all/showAll")
        .then((res)=>res.json())
        .then((res)=>setHotels(hotels))
        .catch((e)=>console.log(e))
    },[])

    return(<>
    {
      hotels.map((obj)=><Hotel hotel={obj}/>)
    }
    </>)

}