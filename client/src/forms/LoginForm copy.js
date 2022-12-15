import React, { useState } from 'react';
//import { v4 as uuid } from 'uuid';
import { Form, Label, Input, Button, Row, Col } from "reactstrap";
import { authenticateUser } from '../helpers/api';

const LoginForm = ({ setData }) => {
    const initialState = {
        username: '',
        password: ''
    }
    const [formData, setFormData] = useState(initialState);

    const handleChange = (e) => {
        const { name, value } = e.target
        setFormData(fData => ({
            ...fData,
            [name]: value
        }))
    }

    function setDataForParent(e) {
        e.preventDefault();
        console.log(e);
        setData(formData);
        authenticateUser(formData);
    }

    return (
        <Form onSubmit={setDataForParent}>
            <Row className="row-cols-lg-auto g-3 align-items-center">
                <Col>
                    <Label
                        className="visually-hidden"
                        for="username"
                    >
                        Username
                    </Label>
                    <Input
                        id="username"
                        name="username"
                        placeholder="username"
                        type="text"
                        onChange={handleChange}
                    />
                </Col>
                <Col>
                    <Label
                        className="visually-hidden"
                        for="password"
                    >
                        Password
                    </Label>
                    <Input
                        id="password"
                        name="password"
                        placeholder="password"
                        type="password"
                        onChange={handleChange}
                    />
                </Col>
                <Col>
                    <Button>
                        Login
                    </Button>
                </Col>
            </Row>
        </Form>
    )
}

export default LoginForm;