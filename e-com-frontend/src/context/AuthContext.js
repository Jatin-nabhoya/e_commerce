import { createContext, useEffect , useState } from 'react'
import jwt_decode from "jwt-decode";
import { useNavigate } from 'react-router-dom'
import axios from "axios";

const AuthContext = createContext()

export default AuthContext;

export const AuthProvider = ({children}) =>{

    // localStorage.getItem('authTokens') ? JSON.parse(localStorage.getItem('authTokens')) : null
    let [user, setUser] = useState(()=> localStorage.getItem('authTokens') ? jwt_decode(localStorage.getItem('authTokens')) : null)
    let [authToken , setAuthToken] = useState(()=> localStorage.getItem('authTokens') ? JSON.parse(localStorage.getItem('authTokens')) : null)
    // let [wishList, setWishList] = useState(null)

    let navigate = useNavigate();
    let [loading, setLoading] = useState(true);

    let loginUser = async (e) => {
        // e.preventDefault()
        console.log('form submited');
        console.log(e);
        let response = await fetch('http://127.0.0.1:8000/api/token/', {
            method: 'POST',
            headers: {
                'content-type': 'application/json'
            },
            body:e
        })
        let data = await response.json()
        console.log(data)
        if(response.status === 200) {
            setAuthToken(data)
            setUser(jwt_decode(data.access))
            localStorage.setItem('authTokens', JSON.stringify(data))
            navigate('/myaccount')
        }else{
            alert("something went wrong!!")
        }
    }

    let RegisterUser = async (e) => {
        console.log(e);
        let response = await fetch("http://127.0.0.1:8000/api/register/",{
            method: "POST",
            headers: {
                'content-type': 'application/json'
            },
            body:e
        })
    // reset();
    console.log(response)
        let data = await response.json()
        if(response.status === 201) {
            navigate('/login')
        }else{
            alert(data.username[0])
        }
    }


    let logoutUser = () => {
        setAuthToken(null)
            setUser(null)
            localStorage.removeItem('authTokens')
            navigate('/login')
    }

    let upadateToken = async () => {
        console.log("upadate Token called!!!")
        let response = await fetch('http://127.0.0.1:8000/api/token/refresh/', {
            method: 'POST',
            headers: {
                'content-type': 'application/json'
            },
            body:JSON.stringify({'refresh': authToken?.refresh})
        })
        let data = await response.json()
        console.log(data)
        if(response.status === 200) {
            setAuthToken(data)
            setUser(jwt_decode(data.access))
            localStorage.setItem('authTokens', JSON.stringify(data))
            // navigate('/myaccount')
        }else{
            logoutUser()
        } 
    }

    
    let contextData = { 
        user: user,
        authToken: authToken,
        loginUser: loginUser,
        logoutUser: logoutUser,
        RegisterUser: RegisterUser,
        // WishList : getwishlist,
        // wishList : wishList,
    }


    useEffect(()=>{
        let minutes= 1000 * 60 * 20
        let interval = setInterval(()=>{
            if(authToken){
                upadateToken()
            }
        }, minutes)
        return ()=> clearInterval(interval)

    }, [authToken,loading])
    
    return (
        <AuthContext.Provider value={contextData}>
            {children}
        </AuthContext.Provider>
    )
}


