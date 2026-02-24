import {useState} from "react";
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from "react-router-dom";
import type {IUser} from "../../types.ts";
import {generateToken} from "../../utils/tokenGenerator.ts";
import {register} from "../../redux/actions/user.ts";

function Register() {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [infoText, setInfoText] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [hasAnimation, setHasAnimation] = useState(false);

    const navigate = useNavigate();

    const dispatch = useDispatch();
    const users = useSelector((state: any) => state.user.users);

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if(!username || !email || !password) {
            setInfoText('Please fill in all fields.');
            return;
        }

        const userExists = users?.some((user: IUser) => user.email === email || user.username === username);

        if(userExists) {
            setInfoText('User with this email or username already exists');
            return;
        }

        const token = generateToken(username, password);

        dispatch(register({username, email, token}));

        setUsername('');
        setEmail('');
        setPassword('');

        navigate('/login');

    }

    const handleShowPassword = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        setShowPassword(!showPassword);
    }

    const handleRegisterButton = () => {
        setHasAnimation(true);

        setTimeout(() => {
            navigate('/login');
        }, 900)
    }

    return (
        <section className={`wrapper wrapper--register ${hasAnimation ? 'has-animation' : ''}`}>
            <div className="info info--register">
                <h1 className="info__title">Welcome</h1>
                <p className="info__text">
                    We're delighted to have you here. If you need any assistance, feel free to reach out
                </p>
            </div>

            <div className="animation animation--register" />

            <div className="form form--register">
                <h1 className="form__title" id="register-heading">Register</h1>

                <form
                    className="form__body"
                    aria-labelledby="register-heading"
                    onSubmit={handleSubmit}
                    noValidate
                >

                    <div className="form__field">
                        <input
                            id="username"
                            type="text"
                            className={`form__input ${username.length > 0 ? 'form__input--has-value' : ''}`}
                            name="username"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            autoComplete="username"
                            required
                            aria-required="true"
                            aria-describedby={infoText ? "login-info" : undefined}
                        />
                        <label htmlFor="username" className="form__label">Username</label>
                        <button type="button" className="form__input-icon">
                            <i className="icon-user" />
                        </button>
                    </div>

                    <div className="form__field">
                        <input
                            id="email"
                            type="email"
                            className={`form__input ${email.length > 0 ? 'form__input--has-value' : ''}`}
                            name="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            autoComplete="email"
                            required
                            aria-required="true"
                            aria-describedby={infoText ? "register-info" : undefined}
                        />
                        <label htmlFor="username" className="form__label">Email</label>
                        <button type="button" className="form__input-icon">
                            <i className="icon-envelope" />
                        </button>
                    </div>

                    <div className="form__field">
                        <input
                            id="password"
                            type={showPassword ? "text" : "password"}
                            className={`form__input ${password.length > 0 ? 'form__input--has-value' : ''}`}
                            name="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            autoComplete="password"
                            required
                            aria-required="true"
                            aria-describedby={infoText ? "register-info" : undefined}
                        />
                        <label htmlFor="username" className="form__label">Password</label>
                        <button type="button" className="form__input-icon" onClick={handleShowPassword}>
                            <i className={`${showPassword ? 'icon-lock' : 'icon-unlock' }`} />
                        </button>
                    </div>

                    {infoText && (
                        <p
                            id="login-info"
                            role="alert"
                            aria-live="assertive"
                            className="form__info-text"
                        >
                            {infoText}
                        </p>
                    )}

                    <button className="form__button">Register</button>
                </form>

                <button
                    type="button"
                    className="form__login-button"
                    onClick={handleRegisterButton}
                    aria-label="Go to login page"
                >
                    Already have an account?
                    <span>Login</span>
                </button>
            </div>
        </section>
    )
}

export default Register;
