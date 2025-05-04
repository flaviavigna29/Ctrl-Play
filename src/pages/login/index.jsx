import { useState } from 'react';
import { Link, useNavigate } from 'react-router';
import supabase from '../../supabase/supabase-client';
import { FormSchema, getErrors, getFieldError } from '../../lib/validationForm';

export default function LoginPage() {
    const [formSubmitted, setFormSubmitted] = useState(false);
    const [formErrors, setFormErrors] = useState({});
    const [touchedFields, setTouchedFields] = useState({});
    const [formState, setFormState] = useState({
        email: '',
        password: ''
    });
    const navigate = useNavigate();

    const onSubmit = async (event) => {
        event.preventDefault();
        setFormSubmitted(true);

        const result = FormSchema.pick({ email: true, password: true }).safeParse(formState);

        if (!result.success) {
            setFormErrors(getErrors(result.error));
        } else {
            try {
                const { error } = await supabase.auth.signInWithPassword({
                    email: formState.email,
                    password: formState.password
                });
                if (error) throw error;

                alert('Login successful!');
                setTimeout(() => navigate('/'), 1000);
            } catch (error) {
                alert('Login error: ' + error.message);
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
                    <h1 className="text-5xl font-bold">Sign in now!</h1>
                    <p className="py-6">Log in to your account to enjoy all our exclusive services.</p>
                </div>
                <div className="card flex-shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
                    <form className="card-body" onSubmit={onSubmit} noValidate>
                        <div className="mb-6">

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

                        <div className="mb-6">
                            <label className="block text-white mb-2">
                                <span className="label-text">Password</span>
                            </label>
                            <input
                                type="password"
                                id="password"
                                placeholder="Enter your password"
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
                            Log in</button>
                        </div>

                        <div className="text-center mt-4">
                            <span className="text-sm">Don't have an account? </span>
                            <Link to="/register"className="link link-primary text-sm">Register here</Link>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}