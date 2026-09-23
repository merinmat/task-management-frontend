export default function Header({ title }) {
  return (
    <header className="border-b border-slate-200 bg-white">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
        <h1 className="text-xl font-bold text-slate-900">{title}</h1>

        <span className="text-sm text-slate-500">Task Manager</span>
      </div>
    </header>
  );
}
