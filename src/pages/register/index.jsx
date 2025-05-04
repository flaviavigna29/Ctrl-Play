import { useState } from 'react';
import { Link, useNavigate } from 'react-router';
import supabase from '../../supabase/supabase-client';
import { ConfirmSchema, getErrors, getFieldError } from '../../lib/validationForm';

export default function RegisterPage() {
    const [formSubmitted, setFormSubmitted] = useState(false);
    const [formErrors, setFormErrors] = useState({});
    const [touchedFields, setTouchedFields] = useState({});
    const [formState, setFormState] = useState({
        email: '',
        firstName: '',
        lastName: '',
        username: '',
        password: ''
    });
    const navigate = useNavigate();

    const onSubmit = async (event) => {
        event.preventDefault();
        setFormSubmitted(true);
        const { error, data } = ConfirmSchema.safeParse(formState);

        if (error) {
            setFormErrors(getErrors(error));
        } else {
            try {
                const { error } = await supabase.auth.signUp({
                    email: data.email,
                    password: data.password,
                    options: {
                        data: {
                            first_name: data.firstName,
                            last_name: data.lastName,
                            username: data.username
                        }
                    }
                });

                if (error) throw error;

                alert('Registration completed!');
                setTimeout(() => navigate('/'), 1000);
            } catch (error) {
                alert('Error while registering: ' + error.message);
            }
        }
    };

    const onBlur = (field) => () => {
        const message = getFieldError(field, formState[field]);
        setFormErrors(prev => ({ ...prev, [field]: message }));
        setTouchedFields(prev => ({ ...prev, [field]: true }));
    };

    const setField = (field) => (e) => {
        setFormState(prev => ({ ...prev, [field]: e.target.value }));
    };

    const isInvalid = (field) =>
        (formSubmitted || touchedFields[field]) && formErrors[field];

    return (
        <div className="container mx-auto px-4 py-8 pt-5">
            <div className="hero-content flex-col lg:flex-row-reverse flex justify-evenly">
                <div className="text-center lg:text-left">
                    <h1 className="text-5xl font-bold">Register now!</h1>
                    <p className="py-6">Join our community.</p>
                </div>
                <div className="card flex-shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
                    <form className="card-body" onSubmit={onSubmit} noValidate>
                        <div className="mb-2">
                            <label className="block text-white mb-2">
                                <span className="label-text">Email</span>
                            </label>
                            <input
                                type="email"
                                id="email"
                                placeholder="email@example.com"
                                className={`w-full p-3 border border-indigo-400 rounded ${isInvalid('email') ? 'input-error' : ''}`}
                                value={formState.email}
                                onChange={setField('email')}
                                onBlur={onBlur('email')}
                                required
                            />
                            {isInvalid('email') &&
                                <label className="label">
                                    <span className="label-text-alt text-error">{formErrors.email}</span>
                                </label>
                            }
                        </div>

                        <div className="mb-2">
                            <label className="block text-white mb-2">
                                <span className="label-text">Name</span>
                            </label>
                            <input
                                type="text"
                                id="firstName"
                                placeholder="Enter your name"
                                className={`w-full p-3 border border-indigo-400 rounded ${isInvalid('firstName') ? 'input-error' : ''}`}
                                value={formState.firstName}
                                onChange={setField('firstName')}
                                onBlur={onBlur('firstName')}
                                required
                            />
                            {isInvalid('firstName') &&
                                <label className="label">
                                    <span className="label-text-alt text-error">{formErrors.firstName}</span>
                                </label>
                            }
                        </div>

                        <div className="mb-2">
                            <label className="block text-white mb-2">
                                <span className="label-text">Surname</span>
                            </label>
                            <input
                                type="text"
                                id="lastName"
                                placeholder="Enter your surname"
                                className={`w-full p-3 border border-indigo-400 rounded ${isInvalid('lastName') ? 'input-error' : ''}`}
                                value={formState.lastName}
                                onChange={setField('lastName')}
                                onBlur={onBlur('lastName')}
                                required
                            />
                            {isInvalid('lastName') &&
                                <label className="label">
                                    <span className="label-text-alt text-error">{formErrors.lastName}</span>
                                </label>
                            }
                        </div>

                        <div className="mb-2">
                            <label className="block text-white mb-2">
                                <span className="label-text">Username</span>
                            </label>
                            <input
                                type="text"
                                id="username"
                                placeholder="Choose a username"
                                className={`w-full p-3 border border-indigo-400 rounded ${isInvalid('username') ? 'input-error' : ''}`}
                                value={formState.username}
                                onChange={setField('username')}
                                onBlur={onBlur('username')}
                                required
                            />
                            {isInvalid('username') &&
                                <label className="label">
                                    <span className="label-text-alt text-error">{formErrors.username}</span>
                                </label>
                            }
                        </div>

                        <div className="mb-2">
                            <label className="block text-white mb-2">
                                <span className="label-text">Password</span>
                            </label>
                            <input
                                type="password"
                                id="password"
                                placeholder="Enter a password"
                                className={`w-full p-3 border border-indigo-400 rounded ${isInvalid('password') ? 'input-error' : ''}`}
                                value={formState.password}
                                onChange={setField('password')}
                                onBlur={onBlur('password')}
                                required
                            />
                            {isInvalid('password') &&
                                <label className="label">
                                    <span className="label-text-alt text-error">{formErrors.password}</span>
                                </label>
                            }
                        </div>

                        <div className="form-control mt-6">
                            <button type="submit" className="w-full btn btn-primary py-3 rounded font-medium uppercase">
                                Register
                            </button>
                        </div>

                        <div className="text-center mt-4">
                            <span className="text-sm">Already have an account? </span>
                            <Link to="/login" className="link link-primary text-sm">Log in here</Link>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}