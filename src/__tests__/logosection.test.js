import { render, screen } from "@testing-library/react";
import LogoSection from "@/src/components/common/LogoSection"; // Adjust the import path as needed
import "@testing-library/jest-dom"; // For extended matchers

describe("LogoSection Component", () => {
  test("renders the logo images with correct src and alt attributes", () => {
    render(<LogoSection />);
    
    // Check for the presence of the images
    const logoImageDark = screen.getByAltText("Logo", { selector: "img.hidden.dark\\:block" });
    const logoImageLight = screen.getByAltText("Logo", { selector: "img.dark\\:hidden" });

    expect(logoImageDark).toBeInTheDocument();
    expect(logoImageLight).toBeInTheDocument();

    // Verify the `alt` attribute of the images
    expect(logoImageDark).toHaveAttribute("alt", "Logo");
    expect(logoImageLight).toHaveAttribute("alt", "Logo");
  });

  test("renders the correct text content", () => {
    render(<LogoSection />);

    // Check for the presence of the text
    const textElement = screen.getByText("Ranch Management System");
    expect(textElement).toBeInTheDocument();
  });

  test("renders the logo link with correct href attribute", () => {
    render(<LogoSection />);

    // Check for the presence of the link and its attributes
    const linkElement = screen.getByRole("link", { name: /logo/i });
    expect(linkElement).toHaveAttribute("href", "/");
  });
});
