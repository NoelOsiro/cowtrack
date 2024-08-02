// Loader.test.js
import { render, screen } from "@testing-library/react";
import Loader from "@/src/components/common/Loader"; // Adjust the import path as needed
import "@testing-library/jest-dom"; // For extended matchers

describe("Loader Component", () => {
    test("renders the loader spinner", () => {
      render(<Loader />);
      
      // Check for the presence of the spinner using its class
      const spinner = screen.getByTestId("spinner"); // Adding a data-testid for easier querying
      expect(spinner).toBeInTheDocument();
    });
  
    test("spinner has correct styles for spinning", () => {
      render(<Loader />);
      
      // Check for spinner class that indicates spinning animation
      const spinner = screen.getByTestId("spinner");
      expect(spinner).toHaveClass("animate-spin");
      expect(spinner).toHaveClass("border-t-transparent");
    });
  
    test("loader is centered on the screen", () => {
      render(<Loader />);
      
      const loaderContainer = screen.getByTestId("loader-container"); // Adjust based on test ID
      expect(loaderContainer).toHaveClass("flex");
      expect(loaderContainer).toHaveClass("items-center");
      expect(loaderContainer).toHaveClass("justify-center");
      expect(loaderContainer).toHaveClass("h-screen");
    });
  
    test("loader has correct background color", () => {
      render(<Loader />);
      
      const loaderContainer = screen.getByTestId("loader-container");
      expect(loaderContainer).toHaveClass("bg-white");
      
      // To test dark mode, you may need to simulate dark mode or use a specific test environment
      // For example, if you are using a CSS-in-JS solution, you might need to handle dark mode differently
      // expect(loaderContainer).toHaveClass("dark:bg-black");
    });
  });
