import MarkdownComponent, { Components } from "react-markdown";

export function Markdown({ message }: { message: string }) {
  return (
    <p className="leading-relaxed text-sm p-1">
      <MarkdownComponent components={components}>{message}</MarkdownComponent>
    </p>
  );
}

const components: Partial<Components> = {
  pre: Pre,
};

function Pre({ children }: any) {
  return (
    <div className="border-current bg-zinc-900 rounded-sm p-2 mt-2 mb-2">
      <pre>{children}</pre>
    </div>
  );
}
