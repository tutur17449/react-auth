import React from 'react'
import { Button, Container, Row, Col } from "reactstrap"
import GitHubIcon from '@material-ui/icons/GitHub'
import './index.scss'

export default function AppFooter(){

    return(
        <footer className="footer footer-black footer-big">
        <Container>
          <Row>
            <Col className="text-center ml-auto mr-auto" md="3" sm="4" xs="12">
              <h4>My App</h4>
              <div className="social-area">
                <Button className="btn-just-icon btn-round mr-1 btn-github">
                  <a className="btn btn-github" href="https://github.com/tutur17449" target="_blank" rel="noopener noreferrer">
                    <GitHubIcon />
                  </a>
                </Button>
              </div>
            </Col>
            <Col className="ml-auto mr-auto" md="8" sm="8" xs="12">
              <Row>
                <Col md="4" sm="4" xs="6">
                  <div className="links">
                    <ul className="uppercase-links stacked-links">
                      <li>
                        <a href="/">Home</a>
                      </li>
                    </ul>
                  </div>
                </Col>
                <Col md="4" sm="4" xs="6">
                  <div className="links">
                    <ul className="uppercase-links stacked-links">
                      <li>
                        <a href="/public-route">PublicRoute</a>
                      </li>
                    </ul>
                  </div>
                </Col>
                <Col md="4" sm="4" xs="6">
                  <div className="links">
                    <ul className="uppercase-links stacked-links">
                      <li>
                        <a href="/login">Login</a>
                      </li>
                      <li>
                        <a href="/register">Register</a>
                      </li>
                    </ul>
                  </div>
                </Col>
              </Row>
              <hr />
              <div className="copyright">
                <div className="pull-left">
                  © {new Date().getFullYear()} My App - AHL app
                </div>
              </div>
            </Col>
          </Row>
        </Container>
      </footer>
    )
}