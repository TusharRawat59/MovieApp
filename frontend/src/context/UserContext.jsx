import React, { createContext , useState , useEffect} from 'react'
export const userDataContext = createContext()
import axios from "axios"

function UserContext({ children }) {
    const serverUrl = "https://movieapp-oaip.onrender.com"
    const [userData, setuserData] = useState(null)



    const handleCurrentUser = async () => {
        try {
            const result = await axios.get(`${serverUrl}/api/user/current`, { withCredentials: true })
            setuserData(result.data)
            console.log(result.data)
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        handleCurrentUser()
    }, [])

    

    const value = {
        serverUrl,userData, setuserData,
    }
    return (
        <div>
            <userDataContext.Provider value={value}>
                {children}
            </userDataContext.Provider>

        </div>
    )
}

export default UserContext
