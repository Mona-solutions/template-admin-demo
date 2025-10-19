interface GrettingUserProps {
  name: string;
}

export default function GrettingUser({ name }: GrettingUserProps) {
  return (
    <section className="px-8 py-8 bg-[rgb(25,52,85)] rounded-lg text-center shadow-xl">
      <h1 className="text-white font-bold text-4xl mb-4">
        ¡Welcome back {name}!
      </h1>
      <p className="text-white text-lg">Here’s a summary of your shipments</p>
    </section>
  );
}
