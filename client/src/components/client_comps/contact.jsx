import { useState } from 'react';
import { Container, Row, Col, Image, Form, Button } from 'react-bootstrap';
import './contact.scss';
import ba from '../../images/hanhala_schweiz.png'

const AboutUs = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [message, setMessage] = useState('');

    const handleSubmit = (event) => {
        event.preventDefault();
        window.location.href = `mailto:jaron.111@hotmail.com?subject=Contact%20Form%20Submission%20from%20${name}%20(${email})&body=${message}`;
    };

    return (
        <Container className="about-us p-3">
            <Row>
                <Col md={6}>
                    <h2>About Us</h2>
                    <p>
                        Die Hanhala Schweiz ist ein Arm des Bne Akiwa Schweiz und besteht aus einer kleinen Gruppe von freiwilligen, hochmotivierten jungen Leuten.
                    </p>
                    <br />
                    <p>
                        Aufgabe und Ziel der Hanhala des Bne Akiwa Schweiz ist es, den Mitgliedern des Bne Akiwa Schweiz reibungslose Machanot (Jugendlager) zu organisieren. Dazu gehört die richtige Auswahl des Zevets (Staff) und das Ausfündigmachen von möglichst idealen Häusern.
                    </p>
                    <br />
                    <p>
                        Schreib uns wenn du Fragen hast oder mithelfen willst. Wir profitierten als Jugendliche, jetzt ist es Zeit zurückzugeben!
                    </p>
                </Col>
                <Col md={6}>
                    <Image
                        src={ba}
                        alt="About Us"
                        fluid
                    />
                </Col>
            </Row>
            <Row className="mt-5 p-2">
                <Col md={6}>
                    <h3>Contact Us</h3>
                    <Form onSubmit={handleSubmit}>
                        <Form.Group className='mt-2' controlId="formName">
                            <Form.Label>Name</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Enter your name"
                                value={name}
                                onChange={(event) => setName(event.target.value)}
                            />
                        </Form.Group>
                        <Form.Group className='mt-2' controlId="formEmail">
                            <Form.Label>Email address</Form.Label>
                            <Form.Control
                                type="email"
                                placeholder="Enter your email"
                                value={email}
                                onChange={(event) => setEmail(event.target.value)}
                            />
                        </Form.Group>
                        <Form.Group className='mt-2' controlId="formMessage">
                            <Form.Label>Message</Form.Label>
                            <Form.Control
                                as="textarea"
                                rows={3}
                                value={message}
                                onChange={(event) => setMessage(event.target.value)}
                            />
                        </Form.Group>
                        <Button className='mt-2' variant="primary" type="submit">
                            Submit
                        </Button>
                    </Form>
                </Col>

            </Row>
        </Container>
    );
};

export default AboutUs;