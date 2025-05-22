import { render, screen, fireEvent } from "@testing-library/react";
import Perfil from "../src/pages/perfil/Perfil";

describe("Perfil", () => {
    test("renderiza los campos de nombre, correo y el avatar", () => {
        render(<Perfil />);
        expect(screen.getByLabelText(/nombre/i)).toBeInTheDocument();
        expect(screen.getByLabelText(/correo/i)).toBeInTheDocument();
        expect(screen.getByText(/editar perfil/i)).toBeInTheDocument();
        expect(screen.getByRole("button", { name: /cambiar foto/i })).toBeInTheDocument();
        expect(screen.getByRole("button", { name: /guardar cambios/i })).toBeInTheDocument();
        expect(screen.getByRole("img")).toBeInTheDocument();
    });

    test("permite cambiar el nombre y correo", () => {
        render(<Perfil />);
        const nombreInput = screen.getByLabelText(/nombre/i);
        const correoInput = screen.getByLabelText(/correo/i);

        fireEvent.change(nombreInput, { target: { value: "Nuevo Nombre" } });
        fireEvent.change(correoInput, { target: { value: "nuevo@email.com" } });

        expect(nombreInput.value).toBe("Nuevo Nombre");
        expect(correoInput.value).toBe("nuevo@email.com");
    });

    test("muestra alerta al guardar cambios", () => {
        window.alert = jest.fn();
        render(<Perfil />);
        const guardarBtn = screen.getByRole("button", { name: /guardar cambios/i });
        fireEvent.click(guardarBtn);
        expect(window.alert).toHaveBeenCalledWith("Perfil actualizado");
    });
});