import React from 'react'
import Navbar from '../components/navbar/index'
import Footer from '../components/footer/index'
import {
    Container, Col, Form,
    FormGroup, Label, Input,
    Button,
} from 'reactstrap';
import {login} from '../services/auth.service'
import { toast } from 'react-toastify'

toast.configure()

export default function Login() {

    const [email, setEmail] = React.useState('')
    const [password, setPassword] = React.useState('')

    const onSubmit = async (e) => {
        e.preventDefault()
        const signInData = {
            email: email,
            password: password
        }

        try {
            const response = await login(signInData)
            toast.success('Sign in OK')
            setTimeout(() => {
                window.location.href = '/'
            }, 1000)
        } catch (e) {
            toast.error(e.message)
        }
    }

    return (
        <React.Fragment>
            <Navbar />
            <Container className="mt-5 mb-5">
                <h2>Sign in</h2>
                <Form onSubmit={onSubmit}>
                    <Col>
                        <FormGroup>
                            <Label>Email</Label>
                            <Input
                                type="email"
                                name="email"
                                id="exampleEmail"
                                placeholder="myemail@email.com"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                        </FormGroup>
                    </Col>
                    <Col>
                        <FormGroup>
                            <Label for="examplePassword">Password</Label>
                            <Input
                                type="password"
                                name="password"
                                id="examplePassword"
                                placeholder="********"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />
                        </FormGroup>
                    </Col>
                    <Button>Submit</Button>
                </Form>
            </Container>
            <Footer />
        </React.Fragment>
    )
}