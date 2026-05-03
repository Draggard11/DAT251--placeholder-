import React, { useState } from "react";
import "../components/Login.css"; // eller lag egen css senere
import { register} from "../services/StudentService.tsx";

type Props = {
    onClose: () => void;
};

const SignUpModal: React.FC<Props> = ({ onClose }) => {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [dateOfBirth, setDateOfBirth] = useState("");

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        const newStudent = {
            name,
            email,
            password,
            dateOfBirth,
        };
        console.log("Ny bruker:", newStudent);

        register(newStudent).then(r => console.log("Bruker registrert:", r)).catch(e => console.error("Feil ved registrering:", e));
    };

        return (
        <div className="modal-overlay">
            <div className="signup-modal">
                <button onClick={onClose} className="close-btn">
                    ×
                </button>

                <h2>Sign Up</h2>

                <form className="login-modal" onSubmit={handleSubmit}>
                    <label>Name</label>
                    <input
                        type="text"
                        placeholder="Your name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                    />

                    <label>Email</label>
                    <input
                        type="email"
                        placeholder="Your email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />

                    <label>Date of birth</label>
                    <input
                        type="date"
                        value={dateOfBirth}
                        onChange={(e) => setDateOfBirth(e.target.value)}
                    />

                    <label>Password</label>
                    <input
                        type="password"
                        placeholder="Your password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />

                    <button type="submit" className="signin-btn">
                        Register
                    </button>
                </form>
            </div>
        </div>
    );
};

export default SignUpModal;