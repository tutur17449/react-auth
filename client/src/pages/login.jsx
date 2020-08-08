import React from 'react'
import Navbar from '../components/navbar/index'
import Footer from '../components/footer/index'
import {
    Container, Col, Form,
    FormGroup, Label, Input,
    Button,
} from 'reactstrap';
import {login} from '../actions/auth.actions'
import { toast } from 'react-toastify'
import useAuth from '../global/useAuth'
import  { Redirect } from 'react-router-dom'

toast.configure()

export default function Login() {

    const [email, setEmail] = React.useState('')
    const [password, setPassword] = React.useState('')
    const {auth, setAuth, setToken} = useAuth()

    const onSubmit = async (e) => {
        e.preventDefault()
        const signInData = {
            email: email,
            password: password
        }

        try {
            const response = await login(signInData)
            setAuth({
                isAuth: true,
                user: {
                    email: response.data.email,
                    pseudo: response.data.pseudo
                },
                role: "user"
            })
        } catch (e) {
            toast.error(e.message)
        }
    }

    if(auth.isAuth){
        return(<Redirect to='/'  />)
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