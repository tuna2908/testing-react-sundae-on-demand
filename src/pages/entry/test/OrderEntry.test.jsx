// import { render, screen, waitFor } from '@testing-library/react';
import {
  render,
  screen,
  waitFor,
} from '../../../test-utils/testing-library-utils';

import { rest } from 'msw';
import { OrderDetailsProvider } from '../../../contexts/OrderDetails.jsx';
import { server } from '../../../mocks/server.js';
import { OrderEntry } from '../OrderEntry.jsx';

test('error response from server', async () => {
  server.resetHandlers(
    rest.get('http://localhost:3030/scoops', (req, res, ctx) =>
      res(ctx.status(500))
    ),
    rest.get('http://localhost:3030/toppings', (req, res, ctx) =>
      res(ctx.status(500))
    )
  );

  render(<OrderEntry />, { wrapper: OrderDetailsProvider });

  await waitFor(async () => {
    //get all alert (2) because you have 2 server calls
    //{name} cause err
    const alertFrmServer = await screen.findAllByRole('alert');
    //check alert lenth
    await expect(alertFrmServer).toHaveLength(2);
  });
});
