"use client";



export default function Header() {
  return (
    <header className="bg-white shadow px-8 py-5 flex justify-between items-center rounded-xl">
      <div>
        <h2 className="text-3xl font-bold text-gray-600">
          Dashboard
        </h2>

        <p className="text-gray-500">
          Welcome back Admin 👋
        </p>
      </div>

      <div className="flex items-center gap-6">
        <div className="relative">
        

          <input
            placeholder="Search..."
            className="border rounded-lg text-gray-600 pl-10 pr-4 py-2 outline-none"
          />
        </div>


        <img
          src="https://i.pravatar.cc/50"
          className="w-11 h-11 rounded-full"
        />
      </div>
    </header>
  );
}