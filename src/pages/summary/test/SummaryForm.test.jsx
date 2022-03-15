import {
  render,
  fireEvent,
  screen,
  waitForElementToBeRemoved,
  waitFor,
} from "../../../test-utils/testing-library-utils";
import { SummaryForm, BootstrapSummaryForm } from "../SummaryForm";
import userEvent from "@testing-library/user-event";

const getTestingElements = () => {
  render(<BootstrapSummaryForm />);
  const summitButton = screen.getByRole("button", { name: /confirm order/i });
  const termCheckbox = screen.getByRole("checkbox", {
    name: /terms and conditions/i,
  });
  const termSpan = screen.getByText(/terms and conditions/i);
  return { summitButton, termCheckbox, termSpan };
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

test("USER-EVENT Disable button works!", () => {
  const { summitButton, termCheckbox } = getTestingElements();

  //click checkbox
  userEvent.click(termCheckbox);
  //check if button summit disabled
  expect(summitButton).toBeEnabled();
  //unclick
  userEvent.click(termCheckbox);
  //check button enable
  expect(summitButton).toBeDisabled();
});

test("popover responds to hover", async () => {
  const { termSpan } = getTestingElements();

  const nullPopover = screen.queryByText(
    /no ice cream will actually be delivered/i
  );

  //check pop over not even rendered yet
  expect(nullPopover).not.toBeInTheDocument();

  //hover the term
  userEvent.hover(termSpan);
  //check pop over existence
  const popover = screen.getByText(/no ice cream will actually be delivered/i);
  expect(popover).toBeInTheDocument(); //best practices to leave the code here for the readability

  //unhover
  userEvent.unhover(termSpan);

  //hope that popover disappear
  const nullPopoverAgain = screen.queryByText(
    //check again because component disappeard, and new component need new search
    /no ice cream will actually be delivered/i
  );
  setTimeout(() => {
    //a way to fix async update (DOM update after the tests - may be for css duration, animation, etc.)
    expect(nullPopoverAgain).not.toBeInTheDocument();
  }, 500);

  await waitFor(() => {
    expect(nullPopoverAgain).not.toBeInTheDocument();
  });
});
