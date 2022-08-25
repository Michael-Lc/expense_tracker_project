import { Col, Container, Row } from 'react-bootstrap'

import Details from "./components/Details/Details";
import Main from './components/Main/Main';

function App() {
  return (
    <Container fluid style={{ height: '100vh' }}>
      <Row className='m-0 h-100 justify-content-center align-items-center'>
        <Col sm='4' xl='3'>
          <Details title='income' />
        </Col>
        <Col sm='4' xl='3'>
          <Main />
        </Col>
        <Col sm='4' xl='3'>
          <Details title='expense' />
        </Col>
      </Row>
    </Container>
  );
}

export default App;
