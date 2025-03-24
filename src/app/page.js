import { LoginForm } from './components/LoginForm';

export default function Home() {
  return (
    <div className="h-dvh flex flex-col items-center justify-center">
      <div className="hero-content text-center">
        <h1 className="text-5xl font-bold">Fetch</h1>
      </div>
      <div>
        <p></p>
      </div>
      <LoginForm />
    </div>
  );
}
