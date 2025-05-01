import { useState } from 'react';
import { useNavigate } from 'react-router';
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

                alert('Registrazione completata!');
                setTimeout(() => navigate('/'), 1000);
            } catch (error) {
                alert('Errore durante la registrazione: ' + error.message);
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
        <div className="container min-h-screen bg-base-200 pt-20">
            <div className="hero-content flex-col lg:flex-row-reverse flex justify-evenly">
                <div className="text-center lg:text-left">
                    <h1 className="text-5xl font-bold">Registrati ora!</h1>
                    <p className="py-6">Unisciti alla nostra community.</p>
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

                        {/* First Name Field */}
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Nome</span>
                            </label>
                            <input
                                type="text"
                                id="firstName"
                                placeholder="Inserisci il tuo nome"
                                className={`input input-bordered ${isInvalid('firstName') ? 'input-error' : ''}`}
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

                        {/* Last Name Field */}
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Cognome</span>
                            </label>
                            <input
                                type="text"
                                id="lastName"
                                placeholder="Inserisci il tuo cognome"
                                className={`input input-bordered ${isInvalid('lastName') ? 'input-error' : ''}`}
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

                        {/* Username Field */}
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Username</span>
                            </label>
                            <input
                                type="text"
                                id="username"
                                placeholder="Scegli un username"
                                className={`input input-bordered ${isInvalid('username') ? 'input-error' : ''}`}
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

                        {/* Password Field */}
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Password</span>
                            </label>
                            <input
                                type="password"
                                id="password"
                                placeholder="Inserisci una password"
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
                        </div>

                        <div className="form-control mt-6">
                            <button type="submit" className="btn btn-primary">Registrati</button>
                        </div>
                        
                        <div className="text-center mt-4">
                            <span className="text-sm">Hai già un account? </span>
                            <a href="/login" className="link link-primary text-sm">Accedi qui</a>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}