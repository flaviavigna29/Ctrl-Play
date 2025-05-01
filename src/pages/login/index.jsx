import { useState } from 'react';
import { useNavigate } from 'react-router';
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
        <div className="container mx-auto px-4 py-8 pt-40">
            <div className="hero-content flex-col lg:flex-row-reverse flex justify-evenly">
                <div className="text-center lg:text-left">
                    <h1 className="text-5xl font-bold">Accedi ora!</h1>
                    <p className="py-6">Accedi al tuo account per godere di tutti i nostri servizi esclusivi.</p>
                </div>
                <div className="card flex-shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
                    <form className="card-body" onSubmit={onSubmit} noValidate>
                        {/* Email Field */}
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Email</span>
                            </label>
                            <input
                                type="email"
                                id="email"
                                placeholder="email@esempio.com"
                                className={`input input-bordered ${isInvalid('email') ? 'input-error' : ''}`}
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

                        {/* Password Field */}
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Password</span>
                            </label>
                            <input
                                type="password"
                                id="password"
                                placeholder="Inserisci la tua password"
                                className={`input input-bordered ${isInvalid('password') ? 'input-error' : ''}`}
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
                            <label className="label">
                                <a href="#" className="label-text-alt link link-hover">Password dimenticata?</a>
                            </label>
                        </div>

                        <div className="form-control mt-6">
                            <button type="submit" className="btn btn-primary">Accedi</button>
                        </div>

                        <div className="text-center mt-4">
                            <span className="text-sm">Non hai un account? </span>
                            <a href="/register" className="link link-primary text-sm">Registrati qui</a>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}