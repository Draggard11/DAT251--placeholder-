import react, { useState } from 'react';
import { createStudent, getStudentById, updateStudent } from '../../services/StudentService';
import type { Student } from '../../services/StudentService';

// give a view for the user for login and register
export default function LoginBox() {
  return (
    <div>
      {/* TODO: Implement your UI to present a login box with text fields */}
      {/* and buttons. The student can use this box to create their account. */}
      <h1>Welcome! Please create an account.</h1>
      <StudentForm />
    </div>
  );
}

function StudentForm() {
  // TODO: Use TypeScript types for the form data (using useState)
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  return (
    <form>
      {/* TODO: Add text input fields for name, email, and password. */}
      <label>
        Name:
        <input type="text" value={name} onChange={(e) => setName(e.target.value)} />
      </label>
      <br />
      <label>
        Email:
        <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
      </label>
      <br />
      <label>
        Password:
        <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
      </label>
      <br />
      {/* TODO: Add a submit button with text "Login". */}
      <button type="submit">Submit</button>
    </form>
  );
}



