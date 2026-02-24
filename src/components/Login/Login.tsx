import {useState} from "react";
import {useDispatch} from "react-redux";
import {useNavigate} from "react-router-dom";
import {login} from "../../redux/actions/user.ts";

function Login() {

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [infoText, setInfoText] = useState('');
    const [hasAnimation, setHasAnimation] = useState(false);

    const navigate = useNavigate();
    const dispatch = useDispatch();

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if(!username || !password) {
            setInfoText('Please fill in all fields.');
            return;
        }

        dispatch(login({ usernameOrEmail: username, password }));

        const token = localStorage.getItem('token');
        if (token) {
            setInfoText('');
            setUsername('');
            setPassword('');
            navigate('/');
        } else {
            setInfoText('Invalid username/email or password.');
        }

    }

    const handleShowPassword = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        setShowPassword(!showPassword);
    }

    const handleLoginButton = () => {
        setHasAnimation(true);

        setTimeout(() => {
            navigate('/register');
        }, 900)
    }

    return (
        <section className={`wrapper wrapper--login ${hasAnimation ? 'has-animation' : ''}`}>
            <div className="info info--login">
                <h1 className="info__title">Welcome back!</h1>
                <p className="info__text">
                    We're happy to have you with us back again! If you need anything, we're here to help
                </p>
            </div>

            <div className="animation animation--login" />

            <div className="form form--login">
                <h1 className="form__title" id="login-heading">Login</h1>

                <form
                    className="form__body"
                    aria-labelledby="login-heading"
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
                        <label htmlFor="username" className="form__label">Username or Email</label>
                        <button type="button" className="form__input-icon">
                            <i className="icon-user" />
                        </button>
                    </div>

                    <div className="form__field">
                        <input
                            type={showPassword ? "text" : "password"}
                            className={`form__input ${password.length > 0 ? 'form__input--has-value' : ''}`}
                            name="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            autoComplete="current-password"
                            required
                            aria-required="true"
                            aria-describedby={infoText ? "login-info" : undefined}
                        />
                        <label htmlFor="password" className="form__label">Password</label>
                        <button
                            type="button"
                            className="form__input-icon"
                            onClick={handleShowPassword}
                        >
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
                            * {infoText}
                        </p>
                    )}

                    <button className="form__button">Login</button>
                </form>

                <button
                    type="button"
                    className="form__login-button"
                    onClick={handleLoginButton}
                    aria-label="Go to registration page"
                >
                    Don't have an account?
                    <span>Sign up</span>
                </button>
            </div>
        </section>
    )
}

export default Login;
