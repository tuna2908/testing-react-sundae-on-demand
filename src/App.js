import logo from './logo.svg';
import './App.css';
import { BootstrapSummaryForm, SummaryForm } from './pages/summary/SummaryForm';
import { Container } from 'react-bootstrap';
import { OrderEntry } from './pages/entry/OrderEntry';
import { OrderDetailsProvider } from './contexts/OrderDetails';
function App() {
  return (
    <Container>
      <OrderDetailsProvider>
        <OrderEntry />
      </OrderDetailsProvider>
    </Container>
  );
}

export default App;
