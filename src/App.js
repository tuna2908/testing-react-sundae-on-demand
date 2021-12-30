import './App.css';
import { BootstrapSummaryForm, SummaryForm } from './pages/summary/SummaryForm';
import { Container } from 'react-bootstrap';
import { OrderEntry } from './pages/entry/OrderEntry';
import { OrderDetailsProvider } from './contexts/OrderDetails';
import { useEffect, useMemo, useState } from 'react';

const TestUseState = () => {
  const [loading, setLoading] = useState(false);

  const handleScroll = () => {
    if (loading == true && window.scrollY == 0) {
      console.log('FALSE');
      setLoading(false);
    } else if (window.scrollY > 0 && !loading) {
      console.log('TRUE');
      setLoading(true);
    }
  };

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);

    return () => window.removeEventListener('scroll', handleScroll);
  }, [loading]);

  // useEffect(() => {
  //   // const handleScroll = () => {
  //   //   console.log({ loading, scrollY: window.scrollY });
  //   //   if (loading == true && window.scrollY == 0) {
  //   //     console.log('FALSE');
  //   //     setLoading(false);
  //   //   } else if (window.scrollY > 100 && !loading) {
  //   //     console.log('TRUE');
  //   //     setLoading(true);
  //   //   }
  //   // };
  //   // window.addEventListener('scroll', handleScroll);

  //   const inter = setInterval(() => {
  //     console.log(loading);
  //   }, 1000);
  //   const timeout = setTimeout(() => {
  //     setLoading(true);
  //   }, 1000);

  //   return () => {
  //     clearInterval(inter);
  //     clearTimeout(timeout);
  //   };
  // }, []);

  // const memoLoading = useMemo(loading, [loading]);

  console.log('LOADINGGGGGGGGG', loading);

  return (
    <div style={{ width: '100%', height: 10000 }}>
      TEST RENDER {loading ? 'TRUE' : 'FALSE'}
    </div>
  );
};
function App() {
  return (
    <Container>
      <OrderDetailsProvider>
        {/* summary page and entry page need provider*/}
        {/* <OrderEntry /> */}
        <TestUseState />
      </OrderDetailsProvider>
      {/* confirmation page does not*/}
    </Container>
  );
}

export default App;
