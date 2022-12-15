import React, {useState} from 'react';
//import { v4 as uuid } from 'uuid';
import { Form, FormGroup, Label, Input, Button, Row, Col } from "reactstrap";
import {UpdateUser} from '../helpers/api';

const EditProfileForm = ({setData, user}) => {
    const initialState = {
        firstName: '',
        lastName: '',
        email: ''
    }
    const [formData, setFormData] = useState(initialState);

    const handleChange = (e) => {
        const { name, value } = e.target
        setFormData(fData => ({
            ...fData,
            [name]: value
        }))
    }

    const handleSubmit = async(e) => {
        e.preventDefault();
        console.log(e);
        setData(formData);
        await UpdateUser(formData);
    }

    return (
        <Form onSubmit={handleSubmit}>
            <Row className="row-cols-lg-auto g-3 align-items-center">
                <Col sm={{
                    offset: 2,
                    size: 5
                }}
                >Edit: 
                <h2>{user}</h2>
                </Col>
                {/* <Col sm={5}>
                    <FormGroup>
                        <Label
                            //className="visually-hidden"
                            for="password">
                            Password
                        </Label>
                        <Input
                            id="password"
                            name="password"
                            placeholder="password"
                            type="password"
                            onChange={handleChange}
                        />
                    </FormGroup>
                </Col> */}
            </Row>
            <Row className="row-cols-lg-auto g-3 align-items-center">
                <Col sm={{
                    offset: 2,
                    size: 5
                }}
                >
                    <FormGroup>
                        <Label
                            //className="visually-hidden"
                            for="firstName">
                            First Name
                        </Label>
                        <Input
                            id="firstName"
                            name="firstName"
                            placeholder="First Name"
                            type="text"
                            onChange={handleChange}
                        />
                    </FormGroup>
                </Col>
                <Col sm={5}>
                    <FormGroup>
                        <Label
                            //className="visually-hidden"
                            for="lastName">
                            Last Name
                        </Label>
                        <Input
                            id="lastName"
                            name="lastName"
                            placeholder="Last Name"
                            type="text"
                            onChange={handleChange}
                        />
                    </FormGroup>
                </Col>
            </Row>
            <Row className="row-cols-lg-auto g-3 align-items-center">
                <Col sm={{
                    offset: 2,
                    size: 5
                }}
                >
                    <FormGroup>
                        <Label
                            //className="visually-hidden"
                            for="email">
                            Email Address
                        </Label>
                        <Input
                            id="email"
                            name="email"
                            placeholder="Email Address"
                            type="email"
                            onChange={handleChange}
                        />
                    </FormGroup>
                </Col>
                <Col sm={5}>
                    <Button sm={{
                        offset: 0,
                        size: 5
                    }}>
                        Update
                    </Button>
                </Col>         
            </Row> 
        </Form>
    )
}

export default EditProfileForm;