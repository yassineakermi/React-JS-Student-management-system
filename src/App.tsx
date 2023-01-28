import { StudentsList } from "./components/StudentsList";

const App = () => {
  return (
    <main className="flex flex-col items-center bg-primary min-h-screen">
      <div className="container p-4">
        <h1 className="text-3xl font-sans font-semibold">
          Students Management Dashboard
        </h1>

        <StudentsList />
      </div>
    </main>
  );
};

export default App;
