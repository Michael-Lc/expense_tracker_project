import { useEffect, useRef } from 'react';
import { ErrorPanel, PushToTalkButton, PushToTalkButtonContainer } from '@speechly/react-ui';
import { useSpeechContext } from '@speechly/react-client'
import { Col, Container, Row } from 'react-bootstrap'

import Details from "../components/Details/Details";
import Main from '../components/Main/Main';

export default function Home() {
  const { listening } = useSpeechContext()
  const main = useRef(null)

  const executeScroll = () => main.current.scrollIntoView();

  useEffect(() => {
    if(listening) {
      executeScroll()
    }
  }, [listening])

  return (
    <Container className='home' fluid style={{ height: '90vh' }}>
      <Row className='m-0 h-100 justify-content-center align-items-center'>
        <Col sm='4' xl='3' className='my-3'>
          <Details title='income' />
        </Col>
        <Col sm='4' xl='3' className='my-3' ref={main}>
          <Main />
        </Col>
        <Col sm='4' xl='3' className='my-3'>
          <Details title='expense' />
        </Col>
      </Row>
      <PushToTalkButtonContainer>
        <PushToTalkButton />
        {/* <ErrorPanel /> */}
      </PushToTalkButtonContainer>
    </Container>
  );
}
