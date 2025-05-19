// test/layout/Header.test.jsx
import React from "react";
import { render, screen } from "@testing-library/react";
import Header from "../../src/layout/header/Header";
import { red } from "@mui/material/colors";
import userEvent from "@testing-library/user-event";


describe("Header Component", () => {
  test("renders the site title 'Uniblog'", () => {
    render(<Header />);
    expect(screen.getByText("Uniblog")).toBeInTheDocument();
  });

  test("renders the 'Inicia' button", () => {
    render(<Header />);
    const button = screen.getByRole("button", { name: /inicia/i });
    expect(button).toBeInTheDocument();
    expect(button).toHaveTextContent("Inicia");
  });

  test("button has correct styles", () => {
    render(<Header />);
    const button = screen.getByRole("button", { name: /inicia/i });

    // Verificamos que el botón tiene el estilo correcto
    expect(button).toHaveStyle(`
      background-color: black;
      color: white;
      border-radius: 20px;
    `);
    expect(button).toHaveStyle("font-weight: 700");
  });

  test("AppBar has correct background color", () => {
    render(<Header />);
    const appBar = screen.getByRole("banner"); // AppBar tiene role="banner"

    // Verificamos el color de fondo
    const lightred = red[100];
    expect(appBar).toHaveStyle(`background-color: ${lightred}`);
  });

  test("button hover changes color", async () => {
    render(<Header />);
    const button = screen.getByRole("button", { name: /inicia/i });

    // Simulamos el hover
    await userEvent.hover(button);
    expect(button).toHaveStyle("background-color: rgb(66,66,66)"); // Cambia a rojo al hacer hover
  });
});
