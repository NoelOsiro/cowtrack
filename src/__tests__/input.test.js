import { render, screen, fireEvent } from "@testing-library/react";
import InputField from "@/src/components/FormElements/Inputs/Input"; // Adjust the import path as needed
import "@testing-library/jest-dom"; // For extended matchers

describe("InputField Component", () => {
    test("renders the input field with placeholder text", () => {
        render(
            <InputField
                type="text"
                name="email"
                placeholder="Enter your email"
                value=""
                onChange={() => {}}
                onBlur={() => {}}
            />
        );

        const inputElement = screen.getByPlaceholderText("Enter your email");
        expect(inputElement).toBeInTheDocument();
    });

    test("calls onChange handler when input value changes", () => {
        const handleChange = jest.fn();
        render(
            <InputField
                type="text"
                name="email"
                placeholder="Enter your email"
                value=""
                onChange={handleChange}
                onBlur={() => {}}
            />
        );

        const inputElement = screen.getByPlaceholderText("Enter your email");
        fireEvent.change(inputElement, { target: { value: "new value" } });
        expect(handleChange).toHaveBeenCalled();
    });

    test("calls onBlur handler when input loses focus", () => {
        const handleBlur = jest.fn();
        render(
            <InputField
                type="text"
                name="email"
                placeholder="Enter your email"
                value=""
                onChange={() => {}}
                onBlur={handleBlur}
            />
        );

        const inputElement = screen.getByPlaceholderText("Enter your email");
        fireEvent.blur(inputElement);
        expect(handleBlur).toHaveBeenCalled();
    });

    test("renders an error message when error and touched are provided", () => {
        render(
            <InputField
                type="text"
                name="email"
                placeholder="Enter your email"
                value=""
                onChange={() => {}}
                onBlur={() => {}}
                error="Error message"
                touched={true}
            />
        );

        const errorMessage = screen.getByText("Error message");
        expect(errorMessage).toBeInTheDocument();
    });

    test("does not render error message when not touched or no error", () => {
        render(
            <InputField
                type="text"
                name="email"
                placeholder="Enter your email"
                value=""
                onChange={() => {}}
                onBlur={() => {}}
                error=""
                touched={false}
            />
        );

        const errorMessage = screen.queryByText("Error message");
        expect(errorMessage).toBeNull();
    });

    test("applies error styling when error and touched are provided", () => {
        render(
            <InputField
                type="text"
                name="email"
                placeholder="Enter your email"
                value=""
                onChange={() => {}}
                onBlur={() => {}}
                error="Error message"
                touched={true}
            />
        );

        const inputElement = screen.getByPlaceholderText("Enter your email");
        expect(inputElement).toHaveClass("border-red-500");
    });

    test("does not apply error styling when there is no error", () => {
        render(
            <InputField
                type="text"
                name="email"
                placeholder="Enter your email"
                value=""
                onChange={() => {}}
                onBlur={() => {}}
                error=""
                touched={false}
            />
        );

        const inputElement = screen.getByPlaceholderText("Enter your email");
        expect(inputElement).toHaveClass("border-stroke");
    });

    test("renders label with correct text", () => {
        render(
            <InputField
                type="text"
                name="email"
                placeholder="Enter your email"
                value=""
                onChange={() => {}}
                onBlur={() => {}}
            />
        );

        const labelElement = screen.getByTestId("input-label");
        expect(labelElement).toHaveTextContent("Email");
    });
});
