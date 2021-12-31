import userEvent from '@testing-library/user-event';
import App from '../App';
import { render, screen } from '../test-utils/testing-library-utils';

test.only('order phases for happy path', async () => {
  // render app
  render(<App />);
  // add ice cream scoops and toppings
  const inputScoop = await screen.findByRole('spinbutton', { name: 'Vanilla' });
  const cbTopping = await screen.findByRole('checkbox', { name: 'Cherries' });
  const labelGrandTotal = await screen.findByRole('heading', {
    name: /grand total: \$/i,
  });
  userEvent.clear(inputScoop);
  userEvent.type(inputScoop, '2');
  expect(labelGrandTotal).toHaveTextContent('4.00');
  userEvent.click(cbTopping);
  expect(labelGrandTotal).toHaveTextContent('5.50');

  // find and click order button
  const buttonOrder = await screen.findByRole('button', {
    name: /order sundae/i,
  });
  userEvent.click(buttonOrder);

  // check summary information based on order
  const labelScoopsSummary = screen.getByRole('heading', {
    name: /Scoops:/i,
  });
  const labelToppingsSummary = screen.getByRole('heading', {
    name: /toppings:/i,
  });
  const labelTotalSummary = screen.getByRole('heading', {
    name: /total/i,
  });

  expect(labelScoopsSummary).toHaveTextContent('4.00');
  expect(labelToppingsSummary).toHaveTextContent('1.50');
  expect(labelTotalSummary).toHaveTextContent('5.50');

  // accept terms and condistions and click button to confirm order
  const cbTermAndConditions = screen.getByRole('checkbox', {
    name: /i agree to/i,
  });
  const buttonConfirmOrder = screen.getByRole('button', {
    name: 'Confirm order',
  });

  expect(cbTermAndConditions).not.toBeChecked();
  expect(buttonConfirmOrder).toBeDisabled();

  userEvent.click(cbTermAndConditions);
  expect(buttonConfirmOrder).toBeEnabled();
  userEvent.click(buttonConfirmOrder);

  // confirm order number on confirmation page
  //   const textLoading = screen.getByText('Loading', { exact: false });

  const textOrderNumer = await screen.findByText('Your order', {
    exact: false,
  });

  expect(textOrderNumer).toHaveTextContent('123456');
  // click "new order" button on confirmation page
  const buttonCreateNew = screen.getByRole('button', {
    name: 'Create new order',
  });
  userEvent.click(buttonCreateNew);
  // check that scoops and toppings subtotals have been reset
  const labelGrandTotalAgain = await screen.findByRole('heading', {
    name: /grand total: \$/i,
  });
  const toppingsSubtotal = screen.getByText('Toppings total: $', {
    exact: false,
  });
  const scoopsSubtotal = screen.getByText('Scoops total: $', {
    exact: false,
  });

  expect(toppingsSubtotal).toHaveTextContent('0.00');
  expect(scoopsSubtotal).toHaveTextContent('0.00');
  expect(labelGrandTotalAgain).toHaveTextContent('0.00');
});
