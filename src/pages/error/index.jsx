export default function ErrorPage() {
    return (
        <div className="container min-h-screen pt-20 bg-base-200">
            <div className="hero-content text-center">
                <div className="max-w-md">
                    <h1 className="text-5xl font-bold">404</h1>
                    <p className="py-6">Ops... Pagina non trovata!</p>
                    <a href="/" className="btn btn-primary">Torna alla Home</a>
                </div>
            </div>
        </div>
    );
}