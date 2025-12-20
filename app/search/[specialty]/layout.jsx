import Sidebar from "../../../components/_components/Sidebar";

export default function SearchLayout({ children }) {
  return (
    <div className="flex min-h-screen">
      <Sidebar />
      <main className="flex-1 p-6 ">
        {children}
      </main>
    </div>
  );
}
