import { useState } from "react"
import { Link,useNavigate } from "react-router-dom"
import { signInFailed,signInSuccess ,signInstart} from "../redux/user/userSlice";
import { useSelector,useDispatch } from "react-redux";
import Auth from "../components/oAuth.jsx";
export const Signin=()=>{
    const [signinData,setInData]=useState({});
   const{loading,error}=useSelector((state)=>state.user);
    const[iferror,setIferror]=useState(false);
    const dispatch=useDispatch();

    const navigate=useNavigate();
    const signinhandle=(e)=>{
        setInData({
            ...signinData,
            [e.target.id]:e.target.value
        })
    }
    const submitInhandle=async(e)=>{
        e.preventDefault();
       dispatch(signInstart());
        const response=await fetch('/api/auth/signin',{
            method:'POST',
            headers:{
                'Content-Type':'application/json'
            },
           body:JSON.stringify(signinData)
        })
        const result= await response.json();

        if(response.ok){
            console.log(result);
            dispatch(signInSuccess(result))
            navigate('/')
            
            }
            if(!response.ok){
                setIferror(true);
              dispatch(signInFailed(result.message))
               console.log(error);
               setTimeout(() => {
                setIferror(false);
               }, 3000);
             
            }
        
    }

    return(
        <div className="max-w-lg my-4  mx-auto px-2">
           <h1 className="text-center font-semibold text-3xl">SignIn</h1>
           <form action="" className="flex flex-col my-5 gap-4" onSubmit={submitInhandle}>
            <input type="email"   
            placeholder="Email"   id="email" className="p-3 border rounded-lg" onChange={signinhandle}/>
            <input type="password"
            placeholder="Password" id="password" className="p-3 border rounded-lg" onChange={signinhandle}/>
            <button className="p-3 border rounded-lg  bg-slate-600 text-white hover:opacity-95 ">SignIn</button>
          <Auth/>
           </form>
           <div className="flex gap-3">
            <p>Don't have an account? </p>
            <Link to="/signup" className="text-blue-600">Sign up</Link>
           </div>
           <div className="p-3 text-red-600">
            {iferror?<p>{error}</p>:null}
           </div>
        </div>
    )
}