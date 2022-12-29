import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, Card, Col, Container, ListGroup, Row } from 'react-bootstrap'
import { GiMoneyStack, GiPayMoney, GiReceiveMoney } from "react-icons/gi";

export default function Export() {
  const navigate = useNavigate()
  const [active, setActive] = useState({
    All: false,
    Income: false,
    Expense: false,
  })
  const [canExport, setCanExport] = useState(false)

  function handleSetActive(type) {
    const newState = {}
    Object.keys(active).forEach(k => newState[k] = false)
    newState[type] = true
    setActive({ ...newState })
    setCanExport(true)
  }

  return (
    <Container className='home' fluid style={{ height: '100vh' }}>
      <Row className='m-0 h-75 justify-content-center align-items-center'>
        <Col sm='4' xl='3' className='my-3'>
          {/* <Details title='income' /> */}
        </Col>
        <Col sm='4' xl='3' className='my-3'>
          <Card className="root">
            <Card.Header>
              <Row className='m-0'>
                <Col xs='9'>
                  <h4>Export</h4>
                  {/* <h5 className='fw-normal'>Powered by Speechly</h5> */}
                </Col>
              </Row>
            </Card.Header>
            <Card.Body>
              <h5 className='fw-normal'>Select Export Category</h5>
              <ListGroup>
                <ListGroup.Item action onClick={() => handleSetActive('All')} active={active['All']} className='py-3 my-2 fs-4'>
                  <GiMoneyStack className='fs-4' /> All
                </ListGroup.Item>
                <ListGroup.Item action onClick={() => handleSetActive('Income')} active={active['Income']} className='py-3 my-2 fs-4'>
                  <GiReceiveMoney className='fs-4' /> Income
                </ListGroup.Item>
                <ListGroup.Item action onClick={() => handleSetActive('Expense')} active={active['Expense']} className='py-3 my-2 fs-4'>
                  <GiPayMoney className='fs-4' /> Expense
                </ListGroup.Item>
              </ListGroup>

              <Button variant='success' className='w-100 my-2' disabled={!canExport}>
                Export
              </Button>
              <Button variant='light' className='w-100 border border-secondary' onClick={() => navigate('/')}>
                Cancel
              </Button>
            </Card.Body>
          </Card>
        </Col>
        <Col sm='4' xl='3' className='my-3'>
          {/* <Details title='expense' /> */}
        </Col>
      </Row>
    </Container>
  );
}
