import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { PropTypes } from 'prop-types';
import useToast from "../hooks/toast";
import LoadingSpinner from "./LoadingSpinner";


const BlogForm = ({ editing }) => {
    const navigate = useNavigate();

    const { id } = useParams();
    const {  addToast } = useToast();
    const [title, setTitle] = useState('');
    const [originalTitle, setOriginalTitle] = useState('');
    const [body, setBody] = useState('');
    const [originalbody, setOriginalBody] = useState('');
    const [publish, setPublish] = useState(false);
    const [originalPublish, setOriginalPublish] = useState(false);
    const [titleError, setTitleError] = useState(false);
    const [bodyError, setBodyError] = useState(false);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');


    useEffect(() => {
        if (editing){
            axios.get(`http://localhost:3001/posts/${id}`).then(res => {
                setTitle(res.data.title);
                setBody(res.data.body);
                setOriginalTitle(res.data.title);
                setTitle(res.data.title);
                setOriginalBody(res.data.body);
                setPublish(res.data.publish);
                setOriginalPublish(res.data.publish);
                setLoading(false);
            }).catch(e => {
                setError('something went wrong in db');
                addToast({
                    type: 'danger',
                    text: 'Something went wrong in db'
                })
                setLoading(false);
            })
        } else {
            setLoading(false);
        }
    }, [id, editing]);

    const isEdited = () =>{
        return title !== originalTitle || body !== originalbody
            || publish !== originalPublish;
    };

    const goBack = () => {
        if (editing){
            navigate(`/blogs/${id}`);
        } else {
            navigate(`/blogs`);
        }
    }
    const validateForm = () => {
        let validated = true;

        if (title === '') {
            setTitleError(true);
            validated = false;
        }
        if (body === '') {
            setBodyError(true);
            validated = false;
        }
        return validated;
    }


    const onSubmit = () => {
        setTitleError(false);
        setBodyError(false);
        if ( validateForm()){
            if(editing){
                axios.patch(`http://localhost:3001/posts/${id}`, {
                    title,
                    body,
                    publish
                }).then(res => {
                    navigate(`/blogs/${id}`)
                }).catch(e =>{
                    addToast({
                        type: 'danger',
                        text: 'WE COILD NOT UPDATE BLOG'
                    })
                })
            }else{
                axios.post('http://localhost:3001/posts', {
                    title,
                    body,
                    publish,
                    createdAt: Date.now()
                }).then(() => {
                    addToast({
                        type:'success',
                        text: 'Successfully Created!'
                    });
                    navigate('/admin')
                }).catch(e =>{
                    addToast({
                        type: 'danger',
                        text: 'WE COILD NOT CREATE BLOG'
                    })

                })
            }
        }
    }

    const onChangePublish = (e) => {
        setPublish(e.target.checked);
    }

    if( loading) {
        return <LoadingSpinner />
    }

    if (error) {
        return ( 
            <div>
                {error}
            </div>
        )
    }
    return (

        <div className="container">
            <h1> {editing ? 'Edit' : 'Create'}  A Blog Post</h1>
            <div className="mb-3">
                <label className="form-label"> Title </label>
                <input
                    className={`form-control ${titleError ? 'border-danger': ''}`}
                    value={title}
                    onChange={(event) => {
                        setTitle(event.target.value);
                    }}
                />
                { titleError &&
                    <div className="text-danger">
                        TITLE is required.
                    </div>}

            </div>
            <div className="mb-3">
                <label className="form-label"> Body </label>
                <textarea
                    className={`form-control ${bodyError ? 'border-danger': ''}`}
                    value={body}
                    onChange={(event) => {
                        setBody(event.target.value);
                    }}
                    rows="10"
                />
                {bodyError &&
                    <div className="text-danger">
                        BODY is required.
                    </div>}

            </div>
            <div className="form-check mb-3">
                <input
                    className="form-check-input" type="checkbox" checked={publish}
                    onChange={onChangePublish}
                />
                <label className="form-check-label">
                    Publish
                </label>
            </div>
            <button
                className="btn btn-primary"
                onClick={onSubmit}
                disabled={editing && !isEdited()}
            >
                {editing ? `Edit` : `Post`}
            </button>
            <button
                className="btn btn-danger ms-2"
                onClick={goBack}
            >
                Cancel
            </button>
        </div>

    )
};

BlogForm.propTypes = {
    editing: PropTypes.bool
}

BlogForm.defaultProps = {
    editing: false
}

export default BlogForm;