import { useEffect, useState } from "react";
import { BACKEND_URL } from "../config";
import axios from "axios";

export function useContent(){
    const [ contents,setContents ] = useState([])
    const token = localStorage.getItem("token")
    function refresh(){
        axios.get(`${BACKEND_URL}/api/v1/content`,{
            headers:{
                "Authorization" : `Bearer ${token}`
            }
        })
        .then((response)=>{
            setContents(response.data.content)
        })
    }
    useEffect(()=>{
        refresh()
        const interval = setTimeout(()=>{
            refresh()
        },1*1000)
        return ()=>{
            clearInterval(interval)
        }
    },[])
    // console.log(contents); // Debug: log contents structure
    return { contents, refresh }
}
