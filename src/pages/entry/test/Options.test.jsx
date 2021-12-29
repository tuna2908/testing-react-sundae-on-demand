import { render, screen } from '@testing-library/react';
import { OrderDetailsProvider } from '../../../contexts/OrderDetails';

import { Options } from '../Options';

test('display image for each scroop option from the servier', async () => {
  render(<Options optionType={'scoops'} />, { wrapper: OrderDetailsProvider });

  //find images
  //   const scoopImages = screen.getAllByRole("img", { name: /scoop$/i });     //cannot use in async comp render
  const scoopImages = await screen.findAllByRole('img', { name: /scoop$/i }); //img not image
  expect(scoopImages).toHaveLength(2);
  //check image with correct alt text

  const altText = scoopImages.map((image) => image.alt);
  //aray and object useEqual matcher, whereas int, string use Tobe matcher
  expect(altText).toEqual(['Chocolate scoop', 'Vanilla scoop']);
});

test('display image for each topping option from the servier', async () => {
  render(<Options optionType={'toppings'} />, {
    wrapper: OrderDetailsProvider,
  });

  //find images
  const scoopImages = await screen.findAllByRole('img', { name: /topping$/i }); //img not image
  expect(scoopImages).toHaveLength(3);
  //check image with correct alt text

  const altText = scoopImages.map((image) => image.alt);
  //aray and object useEqual matcher, whereas int, string use Tobe matcher
  expect(altText).toEqual([
    'Cherries topping',
    'M&Ms topping',
    'Hot fudge topping',
  ]);
});
