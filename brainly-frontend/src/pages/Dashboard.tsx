import { useState } from "react"
import { Button } from "../component/Button"
import { Card } from "../component/Card"
import { CreateContentModal } from "../component/CreateContentModal"
import { PlusIcon } from "../component/Icon/PlusIcon"
import { ShareIcon } from "../component/Icon/shareIcon"
import { Sidebar } from "../component/Sidebar"
import { useContent } from "../hooks/useContent"
import { BACKEND_URL } from "../config"
import axios from "axios"

interface ContentItem {
    _id: string;
    type: string;
    link: string;
    title: string;
}

export  function Dashboard() {
    const [openModal, setOpenModal] = useState(false)
    const { contents, refresh } = useContent()
    const token = localStorage.getItem("token")
    const username = localStorage.getItem("username") || "User";
    const [filter, setFilter] = useState<string>('all');

    function signOut() {
        localStorage.removeItem("token");
        localStorage.removeItem("username");
        window.location.href = "/";
    }

    const filteredContents = filter === 'all' ? contents : contents.filter((item: ContentItem) => item.type === filter);

    return (
        <div className="flex min-h-screen bg-gray-100">
            <Sidebar onFilterChange={setFilter}/>
            <div className="flex-1 p-4">
                <header className="flex justify-between items-center mb-8">
                    <div>
                        <h1 className="text-2xl font-bold text-purple-700">Dashboard</h1>
                        <p className="text-gray-500">Welcome, {username}!</p>
                    </div>
                    <div className="flex justify-end mb-6">
                    <div className="flex gap-2">
                        <Button 
                            variant="primary" 
                            text="Add Content" 
                            size="sm" 
                            startIcon={<PlusIcon/>} 
                            onClick={() => setOpenModal(true)}
                        />
                        <Button 
                            variant="secondary" 
                            text="Share Brain" 
                            size="sm" 
                            startIcon={<ShareIcon/>}
                            onClick={async ()=>{
                                const response = await axios.post(BACKEND_URL+"/api/v1/brain/share",{
                                    share:true
                                },{
                                    headers:{
                                        "Authorization":`Bearer ${token}`
                                    }
                                })
                                const shareURL = 'http://localhost:5173/share/'+response.data.hash
                                window.prompt("Share this URL:", shareURL)
                            }}
                        />
                        <button onClick={signOut} className="px-4 py-2 bg-red-500 text-white rounded-lg shadow hover:bg-red-600 transition">Sign Out</button>
                    </div>
                </div>
                
                </header>
                <CreateContentModal 
                    open={openModal} 
                    onClose={() => setOpenModal(false)}
                    refreshContent={refresh}
                />
                
                <div className="flex gap-4 flex-wrap">
                    {filteredContents.map(({_id, type, link, title}) => (
                        <Card
                            key={_id}
                            id={_id}
                            type={type}
                            link={link}
                            title={title}
                            refresh={refresh}
                        />
                    ))}
                </div>
            </div>
        </div>
    )
}


