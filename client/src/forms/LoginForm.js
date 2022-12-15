
import React, { useState } from 'react';
import { Form, Label, Input, Button, Row, Col } from "reactstrap";
import { authenticateUser } from '../helpers/api';

const LoginForm = ({ setData, setErr, setUser }) => {
    const initialState = {
        username: '',
        password: ''
    }
    const [formData, setFormData] = useState(initialState);

    const handleChange = (event) => {
        const { name, value } = event.target
        setFormData(fData => ({
            ...fData,
            [name]: value
        }))
    }

    const handleSubmit = async (event) => {
        try {
            event.preventDefault();
            const token = await authenticateUser(formData);
            setData(formData);
            localStorage.setItem('username', formData.username);
            localStorage.setItem('token', token.token);
            
            setUser(localStorage.getItem('username'));
            setErr('');
            
        } catch (e) {
            console.log({ formData});
            setFormData(initialState);
            console.log({ formData });
            setErr(e);
        }

    }

    return (
        <Form onSubmit={handleSubmit}>
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