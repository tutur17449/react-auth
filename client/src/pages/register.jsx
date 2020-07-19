import React from 'react'
import Navbar from '../components/navbar/index'
import Footer from '../components/footer/index'
import {
    Container, Col, Form,
    FormGroup, Label, Input,
    Button,
} from 'reactstrap'
import {register} from '../services/auth.service'
import { toast } from 'react-toastify'

toast.configure()

export default function Register() {

    const [pseudo, setPseudo] = React.useState('')
    const [email, setEmail] = React.useState('')
    const [password, setPassword] = React.useState('')

    const onSubmit = async (e) => {
        e.preventDefault()
        const signUpData = {
            pseudo: pseudo,
            email: email,
            password: password
        }

        try {
            const response = await register(signUpData)
            toast.success('Sign up OK')
            setTimeout(() => {
                window.location.href = '/login'
            }, 1000)
        } catch (e) {
            toast.error(e.message)
        }
    }

    return (
        <React.Fragment>
            <Navbar />
            <Container className="mt-5 mb-5">
                <h2>Sign up</h2>
                <Form onSubmit={onSubmit}>
                    <Col>
                        <FormGroup>
                            <Label>Pseudo</Label>
                            <Input
                                type="text"
                                name="pseudo"
                                id="examplePseudo"
                                placeholder="my pseudo"
                                value={pseudo}
                                onChange={(e) => setPseudo(e.target.value)}
                            />
                        </FormGroup>
                    </Col>
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