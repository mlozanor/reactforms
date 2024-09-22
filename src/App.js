import './App.css';
import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';

function App() {
  const [formValues, setFormValues] = useState({ email: "", password: "", favClass: "1" });
  const [emailValid, setEmailValid] = useState(true); // Estado para la validación del correo
  const [passwordValid, setPasswordValid] = useState(true); // Estado para la validación de la contraseña
  const [submitClicked, setSubmitClicked] = useState(false); // Controla si se ha hecho click en submit

  // Validación de correo (simple regex para formato de email)
  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  // Validación de contraseña (mínimo 9 caracteres)
  const validatePassword = (password) => {
    return password.length >= 9;
  };

  const handleEmailChange = (e) => {
    const newEmail = e.target.value;
    setFormValues({ ...formValues, email: newEmail });
    setEmailValid(validateEmail(newEmail)); // Valida el email en cada cambio
  };

  const handlePasswordChange = (e) => {
    const newPassword = e.target.value;
    setFormValues({ ...formValues, password: newPassword });
    setPasswordValid(validatePassword(newPassword)); // Valida la contraseña en cada cambio
  };

  const handleSelectChange = (e) => {
    setFormValues({ ...formValues, favClass: e.target.value });
  };

  const clickSubmit = (e) => {
    e.preventDefault(); // Evita la recarga de la página por defecto del formulario
    setSubmitClicked(true); // Marca que se hizo click en submit
    const isEmailValid = validateEmail(formValues.email);
    setEmailValid(isEmailValid);

    if (isEmailValid && passwordValid) {
      alert(JSON.stringify(formValues));
    }
  };

  return (
    <div>
      <h1>Ejemplo de formularios!</h1>

      <Form onSubmit={clickSubmit}>
        <Form.Group className="mb-6" controlId="formBasicEmail">
          <Form.Label>Email address</Form.Label>
          <Form.Control
            type="email"
            placeholder="Enter email"
            onChange={handleEmailChange}
            value={formValues.email}
            isInvalid={!emailValid} // Valida en tiempo real si el email es inválido
          />
          { !emailValid && (
            <Form.Text className="text-danger">Your email should follow an established format.</Form.Text>
          )}
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="Password"
            onChange={handlePasswordChange}
            value={formValues.password}
            isInvalid={!passwordValid} // Valida en tiempo real la contraseña
          />
          { !passwordValid && (
            <Form.Text className="text-danger">
              Your password should have numbers and letters and should be at least 9 characters long.
            </Form.Text>
          )}
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicCheckbox">
          <Form.Label>Favorite Class</Form.Label>
          <Form.Select onChange={handleSelectChange} value={formValues.favClass}>
            <option value="1">ISIS3710</option>
            <option value="2">Programación con tecnologías web</option>
          </Form.Select>
        </Form.Group>

        <Button variant="primary" type="submit">
          Submit
        </Button>
      </Form>
    </div>
  );
}

export default App;
