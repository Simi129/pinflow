import CreatePinForm from '../components/dashboard/CreatePinForm';

export default function CreatePinPage() {
  return (
    <>
      <header className="h-16 bg-white border-b border-slate-200 px-8 flex items-center sticky top-0 z-10">
        <h1 className="text-xl font-semibold text-slate-900">Create Pin</h1>
      </header>
      <div className="p-8 max-w-2xl">
        <CreatePinForm />
      </div>
    </>
  );
}