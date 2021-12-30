import { render, screen } from '../../../test-utils/testing-library-utils';
import userEvent from '@testing-library/user-event';
import { OrderDetailsProvider } from '../../../contexts/OrderDetails';
import { Options } from '../Options';
import { OrderEntry } from '../OrderEntry';

//try to test smallest unit of component possible!
test('update scoop subtotal when scoop changed!', async () => {
  //add wrapper option to render function - wrapper can be ReduxProvider, Router, etc.
  render(<Options optionType={'scoops'} />);

  //test subtotal starts out value at $0.00
  const scoopsSubtotal = screen.getByText('Scoops total: $', { exact: false }); //partial match for reuseable purpose
  expect(scoopsSubtotal).toHaveTextContent('0.00'); //contain anywhere

  //update vanilla scoops to 1 and check the subtotal
  const vanillaInput = await screen.findByRole('spinbutton', {
    name: 'Vanilla',
  });

  userEvent.clear(vanillaInput);
  userEvent.type(vanillaInput, '1'); //input type must be string
  expect(scoopsSubtotal).toHaveTextContent('2.00'); //contain anywhere

  //update vanilla scoops to 2 and check the subtotal

  const chocolateInput = await screen.findByRole('spinbutton', {
    name: 'Chocolate',
  });
  userEvent.clear(chocolateInput);
  userEvent.type(chocolateInput, '2');
  expect(scoopsSubtotal).toHaveTextContent('6.00');
});

test('update topping subtotal when topping changed!', async () => {
  //add wrapper option to render function - wrapper can be ReduxProvider, Router, etc.
  render(<Options optionType={'toppings'} />);

  //test default subtotal starts out value at $0.00
  const toppingsSubtotal = screen.getByText('Toppings total: $', {
    exact: false,
  });
  expect(toppingsSubtotal).toHaveTextContent('0.00'); //contain anywhere

  //update vanilla scoops to 1 and check the subtotal
  const cherriesCB = await screen.findByRole('checkbox', {
    name: 'Cherries',
  });

  userEvent.click(cherriesCB);
  expect(toppingsSubtotal).toHaveTextContent('1.50');

  //update vanilla scoops to 2 and check the subtotal

  const mamCB = await screen.findByRole('checkbox', {
    name: 'M&Ms',
  });
  userEvent.click(mamCB);
  expect(toppingsSubtotal).toHaveTextContent('3.00');

  userEvent.click(cherriesCB);
  expect(toppingsSubtotal).toHaveTextContent('1.50');

  userEvent.click(mamCB);
  expect(toppingsSubtotal).toHaveTextContent('0.00');
});

describe('grand total', () => {
  test(' grand total starts at $0.00', async () => {
    render(<OrderEntry />); //test error: test finished but async render still occurs 'cause api call to server
    /**
     * @solution1
     * skip auto clean up and clean up by manual=> not recommend
     * @solution2
     * mock useEffect => so that useEffect never happens in the test => code more intertwine with the tests => not recommended
     * @solution3
     * add await at the end => not recommended
     * @solution4
     * move the test to tests that have await state changes => OK
     */
    const labelGrandTotal = screen.getByRole('heading', {
      name: /grand total: \$/i,
    });
    expect(labelGrandTotal).toHaveTextContent('0.00');
  });

  test(' grand total updates properly if scoop is added first', async () => {
    render(<OrderEntry />);

    const inputScoop = await screen.findByRole('spinbutton', {
      name: 'Vanilla',
    });
    const cbTopping = await screen.findByRole('checkbox', {
      name: 'Cherries',
    });
    const labelGrandTotal = screen.getByRole('heading', {
      name: /grand total: \$/i,
    });

    userEvent.clear(inputScoop);
    userEvent.type(inputScoop, '1');
    expect(labelGrandTotal).toHaveTextContent('2.00');

    userEvent.click(cbTopping);
    expect(labelGrandTotal).toHaveTextContent('3.50');
  });

  test(' grand total updates properly if toppping is added first', async () => {
    render(<OrderEntry />);

    const inputScoop = await screen.findByRole('spinbutton', {
      name: 'Chocolate',
    });

    const cbTopping = await screen.findByRole('checkbox', {
      name: 'M&Ms',
    });
    const labelGrandTotal = screen.getByRole('heading', {
      name: /grand total: \$/i,
    });

    userEvent.click(cbTopping);
    expect(labelGrandTotal).toHaveTextContent('1.50');

    userEvent.clear(inputScoop);
    userEvent.type(inputScoop, '1');
    expect(labelGrandTotal).toHaveTextContent('3.50');
  });

  test(' grand total updates properly if item is removed', async () => {
    render(<OrderEntry />);

    const inputScoop = await screen.findByRole('spinbutton', {
      name: 'Chocolate',
    });
    const cbTopping = await screen.findByRole('checkbox', {
      name: 'M&Ms',
    });
    const labelGrandTotal = screen.getByRole('heading', {
      name: /grand total: \$/i,
    });

    userEvent.click(cbTopping);
    expect(labelGrandTotal).toHaveTextContent('1.50');

    userEvent.clear(inputScoop);
    userEvent.type(inputScoop, '1');
    expect(labelGrandTotal).toHaveTextContent('3.50');

    userEvent.clear(inputScoop);
    userEvent.type(inputScoop, '0');
    expect(labelGrandTotal).toHaveTextContent('1.50');

    userEvent.click(cbTopping);
    expect(labelGrandTotal).toHaveTextContent('0.00');
  });
});
