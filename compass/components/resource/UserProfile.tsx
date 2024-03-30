import Icon from "../admin/Icon"

export const UserProfile = () => {

    return (
        <div className="flex flex-row items-start space-x-2">
          <Icon size={30}/>
        <div className="flex flex-col items-start space-y-2">
        <div className="flex flex-col">
          <span className="text-sm font-semibold text-gray-800">Compass Center</span>
          <span className="text-xs text-gray-500">cssgunc@gmail.com</span>
        </div>
        <a href={"/auth/login"} className="text-red-600 font-semibold text-xs hover:underline mt-1">Sign out</a>
      </div>
      </div>
    )
}