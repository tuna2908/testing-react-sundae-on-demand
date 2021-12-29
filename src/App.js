import './App.css';
import { BootstrapSummaryForm, SummaryForm } from './pages/summary/SummaryForm';
import { Container } from 'react-bootstrap';
import { OrderEntry } from './pages/entry/OrderEntry';
import { OrderDetailsProvider } from './contexts/OrderDetails';
function App() {
  return (
    <Container>
      <OrderDetailsProvider>
        {/* summary page and entry page need provider*/}
        <OrderEntry />
      </OrderDetailsProvider>
      {/* confirmation page does not*/}
    </Container>
  );
}

export default App;
