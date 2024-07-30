import { SectionBody, SectionHeaderTitle, SuperHeader } from "./Head";

function App() {
  return (
    <main className="my-10 mx-auto max-w-[1120px]">
      <SuperHeader />

      <section>
        <SectionHeaderTitle>Installation</SectionHeaderTitle>
        <SectionBody>
          Install worker using your package manager of your choice.
          <pre className="my-3 bg-black/10 px-4 py-2 rounded-md">
            npx worker-lnrd
          </pre>
        </SectionBody>
      </section>

      <br />

      <section>
        <SectionHeaderTitle>Initialize</SectionHeaderTitle>
        <SectionBody>
          Install worker using your package manager of your choice.
          <pre className="my-3 bg-black/10 px-4 py-2 rounded-md">
            npx worker-lnrd
          </pre>
        </SectionBody>
      </section>

      <br />

      <section>
        <SectionHeaderTitle>Usage</SectionHeaderTitle>
        <SectionBody>
          Install worker using your package manager of your choice.
          <pre className="my-3 bg-black/10 px-4 py-2 rounded-md">
            npx worker-lnrd
          </pre>
        </SectionBody>
      </section>

      <br />

      <section>
        <SectionHeaderTitle>More Examples</SectionHeaderTitle>
        <SectionBody>
          Install worker using your package manager of your choice.
          <pre className="my-3 bg-black/10 px-4 py-2 rounded-md">
            npx worker-lnrd
          </pre>
        </SectionBody>
      </section>

      <footer>
        <br />
        <br />
        <br />
        <p className="my-10 text-center text-gray-500">
          &copy; {new Date().getFullYear()} Leenard Zarate. Check on{" "}
          <a
            href="https://github.com/leenrd/shein-worker-gg"
            target="_blank"
            className="underline text-blue-600"
          >
            github
          </a>{" "}
        </p>
      </footer>
    </main>
  );
}

export default App;
