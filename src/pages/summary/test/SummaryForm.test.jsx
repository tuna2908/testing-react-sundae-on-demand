import { render, fireEvent, screen } from "@testing-library/react";
import { SummaryForm } from "../SummaryForm";

const getTestingElements = () => {
  render(<SummaryForm />);
  const summitButton = screen.getByRole("button", { name: /confirm order/i });
  const termCheckbox = screen.getByRole("checkbox", {
    name: /terms and conditions/i,
  });
  return { summitButton, termCheckbox };
};

test("Initial state of Checkbox and Button", () => {
  const { summitButton, termCheckbox } = getTestingElements();

  expect(termCheckbox).not.toBeChecked();
  expect(summitButton).toBeDisabled();
});

test("Disable button works!", () => {
  const { summitButton, termCheckbox } = getTestingElements();

  //click checkbox
  fireEvent.click(termCheckbox);
  //check if button summit disabled
  expect(summitButton).toBeEnabled();
  //unclick
  fireEvent.click(termCheckbox);
  //check button enable
  expect(summitButton).toBeDisabled();
});
