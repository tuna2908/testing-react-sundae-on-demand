import './App.css';
import { Container } from 'react-bootstrap';
import { OrderEntry } from './pages/entry/OrderEntry';
import { OrderDetailsProvider } from './contexts/OrderDetails';
import { useState } from 'react';
import { APP_PHASE } from './constants';
import { BootstrapSummaryForm, SummaryForm } from './pages/summary/SummaryForm';
import { OrderConfirmationForm } from './pages/confirmation/OrderConfirmationForm';

function App() {
  const [appPhase, setAppPhase] = useState(APP_PHASE.IN_PROCESS);
  const [orderNumber, setOrderNumber] = useState(null);

  console.log({ appPhase });
  return (
    <Container>
      <OrderDetailsProvider>
        {/* summary page and entry page need provider*/}
        {appPhase === APP_PHASE.IN_PROCESS && (
          <OrderEntry setAppPhase={setAppPhase} />
        )}
        {appPhase === APP_PHASE.REVIEW && (
          <BootstrapSummaryForm
            setAppPhase={setAppPhase}
            setOrderNumber={setOrderNumber}
          />
        )}
      </OrderDetailsProvider>
      {/* confirmation page does not*/}
      {appPhase === APP_PHASE.COMPLETE && (
        <OrderConfirmationForm
          setAppPhase={setAppPhase}
          orderNumber={orderNumber}
        />
      )}
    </Container>
  );
}

export default App;
