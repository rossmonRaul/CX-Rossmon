﻿import React, { useState } from "react";
import { Form, Card, Button } from "react-bootstrap";
import validator from "validator";

// creating functional component ans getting props from app.js and destucturing them
const StepOne = ({ nextStep, handleFormData, values }) => {
    //creating error state for validation
    const [error, setError] = useState(false);

    // after form submit validating the form data using validator
    const submitFormData = (e) => {
        e.preventDefault();

        // checking if value of first name and last name is empty show error else take to step 2
        if (
            validator.isEmpty(values.firstName) ||
            validator.isEmpty(values.lastName)
        ) {
            setError(true);
        } else {
            nextStep();
        }
    };

    return (
        <div>
            <Card style={{ marginTop: 100 }}>
                <Card.Body>
                    <Form onSubmit={submitFormData}>
                        <Form.Group className="mb-3">
                            <Form.Label>First Name</Form.Label>
                            <Form.Control
                                style={{ border: error ? "2px solid red" : "" }}
                                name="firstName"
                                defaultValue={values.firstName}
                                type="text"
                                placeholder="First Name"
                                onChange={handleFormData("firstName")}
                            />
                            {error ? (
                                <Form.Text style={{ color: "red" }}>
                                    This is a required field
                                </Form.Text>
                            ) : (
                                ""
                            )}
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>Last Name</Form.Label>
                            <Form.Control
                                style={{ border: error ? "2px solid red" : "" }}
                                name="lastName"
                                defaultValue={values.lastName}
                                type="text"
                                placeholder="Last Name"
                                onChange={handleFormData("lastName")}
                            />
                            {error ? (
                                <Form.Text style={{ color: "red" }}>
                                    This is a required field
                                </Form.Text>
                            ) : (
                                ""
                            )}
                        </Form.Group>
                        <Button variant="primary" type="submit">
                            Continue
                        </Button>
                    </Form>
                </Card.Body>
            </Card>
        </div>
    );
};

export default StepOne;
