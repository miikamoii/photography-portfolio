export default function AboutPage() {
  return (
    <main className="min-h-screen px-6 py-12 max-w-3xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">About Me</h1>

      <section className="mb-8">
        <p className="text-lg text-gray-600 dark:text-gray-400">
          Welcome to my portfolio. I am a developer and photographer passionate
          about creating beautiful, fast, and functional web experiences. I
          enjoy blending creativity with technology to deliver unique digital
          solutions.
        </p>
      </section>

      <section className="mb-10">
        <h2 className="text-2xl font-semibold mb-4">How I Build Things</h2>
        <p className="text-gray-600 dark:text-gray-400 mb-4">
          When developing components, I prefer thoughtful, custom solutions that
          best fit the project rather than relying solely on external packages.
          For example, I initially tried using a slider package for the
          Before/After image comparison component, but it did not behave exactly
          as I needed. To solve this, I built the component primarily using
          React and carefully managed the slider position with custom event
          handlers.
        </p>
        <p className="text-gray-600 dark:text-gray-400">
          This approach allowed me to have full control over the user
          experience, including smooth dragging, responsive design, and
          maintaining aspect ratios. It was a great example of balancing
          ready-made tools with custom logic to achieve the best result.
        </p>
      </section>

      <section>
        <h2 className="text-2xl font-semibold mb-4">My Approach and Skills</h2>
        <p className="text-gray-600 dark:text-gray-400 mb-4">
          I value clean, maintainable code and strive to create interfaces that
          feel intuitive and polished. Animation and subtle transitions are key
          parts of my work to provide a smooth user experience.
        </p>
        <p className="text-gray-600 dark:text-gray-400">
          Technologies I work with include React, Next.js, TypeScript, Tailwind
          CSS, and Framer Motion, among others. Photography inspires my design
          sensibility and a very high attention to detail.
        </p>
      </section>
    </main>
  );
}
