function App() {
  return (
    <div className="h-screen w-full flex flex-col gap-5 items-center justify-start mt-20">
      <h1 className="text-4xl text-center mt-10 font-bold">Hello Leenard!</h1>
      <p className="text-center mt-5">
        Edit <code>App.tsx</code> and save to test HMR updates.
      </p>
      <p className="text-center mt-2">
        <a
          className="text-blue-500"
          href="https://vitejs.dev/guide/features.html"
          target="_blank"
          rel="noopener noreferrer"
        >
          Vite Docs
        </a>
        {' | '}
        <a
          className="text-blue-500"
          href="https://reactjs.org/"
          target="_blank"
          rel="noopener noreferrer"
        >
          React Docs
        </a>
        {' | '}
        <a
          className="text-blue-500"
          href="https://github.com/leenrd/starter-cli"
          target="_blank"
          rel="noopener noreferrer"
        >
          Template Source
        </a>
      </p>
    </div>
  );
}

export default App;
