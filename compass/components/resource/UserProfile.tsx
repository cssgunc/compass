export const UserProfile = () => {
    return (
        <div className="flex flex-col items-start space-y-2">
        <div className="flex flex-col">
          <span className="text-sm font-semibold text-gray-800">Compass Center</span>
          <span className="text-xs text-gray-500">cssgunc@gmail.com</span>
        </div>
        <button className="text-red-600 font-semibold text-xs hover:underline mt-1">Sign out</button>
      </div>
    )
}