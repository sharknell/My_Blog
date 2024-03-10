import { Link, useParams } from "react-router-dom";
import axios from "axios";
import { useEffect, useState } from "react";
import LoadingSpinner from "../components/LoadingSpinner";
import { useSelector } from "react-redux";
import useToast from "../hooks/toast";

const ShowPage = () => {
    const {id } = useParams();
    const [post, setPost] = useState(null);
    const [loading, setLoading] = useState(true);
    const [timer, setTimer] = useState(0);
    const isLoggedIn = useSelector(state => state.auth.isLoggedIn);
    const { addToast } = useToast();
    const { error, setError} = useState('');

    const getPost = ( id ) => {
        axios.get(`http://localhost:3001/posts/${id}`).then((res) =>{
            setPost(res.data)
            setLoading(false);
        }).catch(e => {
            setError( 'something went wrong in DB');
            addToast({
                type: 'danger',
                text: 'something went wrong in DB'
            })
            setLoading(false);
        })
    };

    useEffect(() => {
        const interval = setInterval(() =>{
            setTimer(prev => prev +1)
        }, 1000);

        return () => {
            clearInterval(interval);
        }
    },[])


    //의존성 배열
    useEffect(() => {
        getPost(id);
    }, [id])

    const printDate = (timestamp) => {
        return new Date(timestamp).toLocaleDateString();
    }

    if(loading){
        return <LoadingSpinner />
    }
    if(error){
        return ( <div> {error} </div> )
    }

    return(
            <div className="container mt-5">
                <div className="d-flex align-items-center">
                    <h1 className="display-1 flex-grow-1 mb-0">{post.title}</h1>
                    ({timer}초)
                    
                    {isLoggedIn && (<div>
                        <Link className="btn btn-primary" to={`/blogs/${id}/edit`}>
                            EDIT
                        </Link>
                    </div>)}

                </div>
                <small className="text-muted">
                    Created At: {printDate(post.createdAt)}
                </small>
                <hr className="my-4" />
                <p className="lead">{post.body}</p>
            </div>
    )  
}

export default ShowPage;