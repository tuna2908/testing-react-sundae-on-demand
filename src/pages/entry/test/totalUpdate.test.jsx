import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Options } from '../Options';

//try to test smallest unit of component possible!
test('update scoop subtotal when scoop changed!', async () => {
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
