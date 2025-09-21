type LandingPageProps = {
  onChange: () => void;
};

export default function LandingPage({ onChange }: LandingPageProps) {
  return (
    <div>
      <div className="landingPage">
        <img className="logo" src="./public/MonaSolutions.jpeg" />
        <h1>Welcome to Mona Solutions</h1>
        <p>⚡The solutions to your problems, fast and simple!</p>
        <button onClick={onChange}>Join Us</button>
      </div>
    </div>
  );
}
