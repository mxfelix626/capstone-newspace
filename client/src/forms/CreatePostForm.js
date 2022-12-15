
import React, {useState} from 'react';
//import { v4 as uuid } from 'uuid';
import { Form, FormGroup, Input, Button} from "reactstrap";
import {CreatePost} from '../helpers/api';

const CreatePostForm = ({setData, setErr}) => {
    const initialState = {
        image_url: '',
        body: '',
        posted_by: ''
    }
    const [formData, setFormData] = useState(initialState);

    const handleChange = (event) => {
        const { name, value } = event.target
        setFormData(fData => ({
            ...fData,
            [name]: value
        }))
    }

    const handleSubmit = async (event)=> {
        try {
            event.preventDefault();
            // setFormData(fData => ({
            //     ...fData,
            // }))
            console.log({ formData });
            setData(formData);
            await CreatePost(formData);
            setFormData(initialState);
            
        } catch (e) {
            setFormData(initialState);
            console.log(e);
        }
       
    }

    return (
        <Form onSubmit={handleSubmit}>
            <FormGroup>
                <Input
                    id="body"
                    name="body"
                    placeholder="Tell me something fabulous"
                    type="textarea"
                    onChange={handleChange}
                />
            </FormGroup>
            <FormGroup>
                <Input
                    id="image_url"
                    name="image_url"
                    placeholder="photo url"
                    type="url"
                    onChange={handleChange}
                />
            </FormGroup>
            <Button>Create new post</Button>  
            
     </Form>
    )
}

export default CreatePostForm;