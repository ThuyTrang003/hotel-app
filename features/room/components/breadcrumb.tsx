export default function Breadcrumb() {
    return (
      <div className="text-sm text-gray-500 mb-6 mt-16 bg-[#F5F3F0] px-24 py-10">
        <h1 className="text-4xl font-bold text-gray-700 mb-2">Rooms</h1>
        <div className="flex items-center space-x-2">
          <span>Home</span>
          <span className="text-gray-400">/</span> {/* Separator */}
          <span>Rooms</span>
        </div>
      </div>
    );
  }
  