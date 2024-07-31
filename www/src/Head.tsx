import { Github, User2 } from "lucide-react";
import { ReactNode } from "react";

const SuperHeader = () => {
  return (
    <header className="my-12 flex items-start justify-between">
      <div>
        <h1 className="mb-4 tracking-tight leading-5 text-3xl font-semibold">
          API Worker for Express.js
        </h1>
        <span>
          A robust controller / service infrastructure in api development.
        </span>
      </div>
      <div className="flex items-start justify-between gap-4">
        <span>
          <a href="https://github.com/leenrd/shein-worker-gg" target="_blank">
            <Github className="cursor-pointer" />
          </a>
        </span>
        <span>
          <a href="https://leenard.tech/" target="_blank">
            <User2 className="cursor-pointer" />
          </a>
        </span>
      </div>
    </header>
  );
};

const SectionHeader = ({ children }: { children: ReactNode }) => {
  return <header className="my-12">{children}</header>;
};

const SectionHeaderTitle = ({ children }: { children: ReactNode }) => {
  return (
    <h1 className="mb-4 tracking-tight leading-5 text-xl font-semibold">
      {children}
    </h1>
  );
};

const SectionHeaderLabel = ({ children }: { children: ReactNode }) => {
  return <span>{children}</span>;
};

const SectionBody = ({ children }: { children: ReactNode }) => {
  return <p className="my-7">{children}</p>;
};

export {
  SuperHeader,
  SectionHeader,
  SectionHeaderTitle,
  SectionHeaderLabel,
  SectionBody,
};
