import React from "react";
import { render, fireEvent, screen } from "@testing-library/react";

import InputSearch from "./InputSearch";

describe("InputSearch", () => {
  test("renders the correct label text", () => {
    const labelText = "Search";
    render(<InputSearch labelText={labelText} />);

    const inputElement = screen.getByLabelText(labelText);

    expect(inputElement).toBeInTheDocument();
  });

  test("calls onTextChange function when input text changes", () => {
    const onTextChange = jest.fn();
    render(
      <InputSearch placeholderText="Search" onTextChange={onTextChange} />
    );

    const inputElement = screen.getByPlaceholderText("Search");

    fireEvent.change(inputElement, { target: { value: "Test" } });
    expect(onTextChange).toHaveBeenCalled();
  });

  test("calls onFocusChange function when input is focused", () => {
    const onFocusChange = jest.fn();
    render(
      <InputSearch placeholderText="Search" onFocusChange={onFocusChange} />
    );

    const inputElement = screen.getByPlaceholderText("Search");

    fireEvent.focus(inputElement);
    expect(onFocusChange).toHaveBeenCalledWith(true);
  });

  test("calls onFocusChange function when input is blurred", () => {
    const onFocusChange = jest.fn();
    render(
      <InputSearch placeholderText="Search" onFocusChange={onFocusChange} />
    );

    const inputElement = screen.getByPlaceholderText("Search");

    fireEvent.focus(inputElement);
    fireEvent.blur(inputElement);
    expect(onFocusChange).toHaveBeenCalledWith(false);
  });
});
