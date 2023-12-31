import { useState, useContext, useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { SyncOutlined } from "@ant-design/icons";
import Link from "next/link";
import { Context } from "../context";
import { useRouter } from "next/router";

const ForgotPassword = () => {
    //state
    const [email, setEmail] = useState("");
    //const [success, setSuccess] = useState(true);
    const [loading, setLoading] = useState(false);

    //context
    const { 
        state: { user },
       } = useContext(Context);

    //router
    const router = useRouter();

    //redirect if user is logged in
    useEffect(() => {
        if(user !== null) router.push("/");
    }, [user]);

    const handleSubmit = async (e) =>{
        e.preventDefault();
        try{
            setLoading(true);
            const { data } = await axios.post("/api/forgot-password", { email });
            //setSuccess(true);
            toast("Check your email for the secret link");
            setLoading(false);
        }catch(err){
            setLoading(false);
            toast(err.response.data);
        }
    };

    return (
        <>
        <h1 className="jumbotron text-center bg-primary square">Forgot Password</h1>
        <div className="container col-md-4 offset-md-4 pb-5">
            <form onSubmit={handleSubmit}>
                <input 
                type="email" 
                className="form-control mb-4 p-4" 
                value={email} 
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter Email"
                required
                />
                <br/>
                <button type="submit"  className="btn btn-primary btn-block p-2" disabled={loading || !email}>
                    {loading ? <SyncOutlined spin /> : "Submit"}
                </button>
            </form>
        </div>
        </>
    );
};

export default ForgotPassword;