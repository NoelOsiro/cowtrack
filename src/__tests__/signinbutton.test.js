import React from "react";
import { render, screen } from "@testing-library/react";
import '@testing-library/jest-dom';
import SubmitButton from "@/src/components/FormElements/Buttons/Submit"; // Adjust the import path as needed

describe("SubmitButton Component", () => {
    test("renders with the correct text", () => {
        const buttonText = "Submit";
        render(<SubmitButton text={buttonText} />);

        // Check if the input element with type 'submit' has the correct value
        const button = screen.getByDisplayValue(buttonText);
        expect(button).toBeInTheDocument();
    });

    test("has the correct classes", () => {
        const buttonText = "Submit";
        render(<SubmitButton text={buttonText} />);

        // Check if the input element has the correct class names
        const button = screen.getByDisplayValue(buttonText);
        expect(button).toHaveClass("w-full cursor-pointer rounded-lg border border-primary bg-primary p-4 text-white transition hover:bg-opacity-90");
    });

    test("is of type submit", () => {
        const buttonText = "Submit";
        render(<SubmitButton text={buttonText} />);

        // Check if the input element is of type 'submit'
        const button = screen.getByDisplayValue(buttonText);
        expect(button).toHaveAttribute("type", "submit");
    });
});
