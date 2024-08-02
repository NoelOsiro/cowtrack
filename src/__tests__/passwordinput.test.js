import { render, screen, fireEvent } from "@testing-library/react";
import PasswordInputField from "@/src/components/FormElements/Inputs/PasswordInput";
import "@testing-library/jest-dom"; // For extended matchers

describe("PasswordInputField Component", () => {
    const setup = (props) => {
        render(<PasswordInputField {...props} />);
    };

    test("renders the password input field with correct attributes", () => {
        setup({
            name: "password",
            placeholder: "Enter your password",
            value: "",
            onChange: jest.fn(),
            onBlur: jest.fn(),
        });

        const input = screen.getByTestId("password-input-field");
        expect(input).toBeInTheDocument();
        expect(input).toHaveAttribute("type", "password");
        expect(input).toHaveAttribute("placeholder", "Enter your password");
    });

    test("displays error message when touched and error is provided", () => {
        setup({
            name: "password",
            placeholder: "Enter your password",
            value: "",
            onChange: jest.fn(),
            onBlur: jest.fn(),
            error: "Password is required",
            touched: true,
        });

        const errorMessage = screen.getByTestId("password-input-error");
        expect(errorMessage).toBeInTheDocument();
        expect(errorMessage).toHaveTextContent("Password is required");
    });

    test("does not display error message when not touched", () => {
        setup({
            name: "password",
            placeholder: "Enter your password",
            value: "",
            onChange: jest.fn(),
            onBlur: jest.fn(),
            error: "Password is required",
            touched: false,
        });

        const errorMessage = screen.queryByTestId("password-input-error");
        expect(errorMessage).toBeNull();
    });

    test("calls onChange handler when input value changes", () => {
        const handleChange = jest.fn();
        setup({
            name: "password",
            placeholder: "Enter your password",
            value: "",
            onChange: handleChange,
            onBlur: jest.fn(),
        });

        const input = screen.getByTestId("password-input-field");
        fireEvent.change(input, { target: { value: "newPassword" } });

        expect(handleChange).toHaveBeenCalledTimes(1);
    });

    test("calls onBlur handler when input loses focus", () => {
        const handleBlur = jest.fn();
        setup({
            name: "password",
            placeholder: "Enter your password",
            value: "",
            onChange: jest.fn(),
            onBlur: handleBlur,
        });

        const input = screen.getByTestId("password-input-field");
        fireEvent.blur(input);

        expect(handleBlur).toHaveBeenCalledTimes(1);
    });
});
