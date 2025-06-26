import { useRef, useState } from "react"
import { Button } from "./Button"
import { CrossIcon } from "./Icon/CrossIcon"
import { Input } from "./Input"
import { BACKEND_URL } from "../config"
import axios from "axios"

export function CreateContentModal({open, onClose, refreshContent}:{
    open:boolean,
    onClose:()=>void,
    refreshContent:()=>void
}){
    enum contentType{
        Youtube = "youtube",
        Twitter = "twitter"   
    }
    const [ type,setType ] = useState(contentType.Youtube)
    const titleRef = useRef<HTMLInputElement>(null)
    const linkRef = useRef<HTMLInputElement>(null)

    async function addContent(){
        const title = titleRef.current?.value?.trim();
        const link = linkRef.current?.value?.trim();
        const token = localStorage.getItem("token");

        if (!title || !link) {
            alert("Please fill in both title and link.");
            return;
        }
        if (!token) {
            alert("You are not authenticated.");
            return;
        }

        try{
            await axios.post(BACKEND_URL+"/api/v1/content",{
                title,
                link,
                type
            },{
                headers:{
                    "Authorization" : `Bearer ${token}`
                }
            });
            alert("Content added successfully!");
            onClose();
            refreshContent();
        }catch(error){
            console.log("error : ", error);
            alert("Failed to add content.");
        }
    }
    return ( 
        <>
            {open && (
                <div className="w-screen h-screen bg-gray-900 fixed top-0 left-0 opacity-97 z-50 flex items-center justify-center">
                    <div className="bg-white flex flex-col w-72 h-96 text-black z-100 p-4 rounded-lg">
                        <div className="flex justify-end">
                            <button onClick={onClose} className="hover:opacity-70 cursor-pointer">
                                <CrossIcon/>
                            </button>
                        </div>
                        <div className="flex-1 flex flex-col justify-center">
                            <Input reference={titleRef} placeholder="title"/>
                            <Input reference={linkRef} placeholder="link"/>
                        </div>
                        <div >
                            Type:
                            <div className="flex gap-5 pb-4 ml-6">
                            <Button text="Youtube" variant = {type === contentType.Youtube ? "primary" : "secondary"} size="md" onClick={()=>{
                                setType(contentType.Youtube)
                            }}  />
                            <Button text="Twitter" variant = {type===contentType.Twitter ? "primary" : "secondary"} size="md" onClick={()=>{
                                setType(contentType.Twitter)
                            }} />
                            </div>
                        </div>
                        <div className="flex justify-center">
                            <Button variant="primary" text="Submit" size="md" onClick={addContent}/>
                        </div>
                    </div>
                </div>
            )}
        </>
    )
}

