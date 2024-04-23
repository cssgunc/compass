import { FunctionComponent, ReactNode } from "react";
import React, { useState } from "react";
import { ChevronDoubleLeftIcon } from "@heroicons/react/24/solid";
import {
  StarIcon as SolidStarIcon,
  EnvelopeIcon,
  UserIcon,
} from "@heroicons/react/24/solid";
import {
  ArrowsPointingOutIcon,
  ArrowsPointingInIcon,
  StarIcon as OutlineStarIcon,
  ListBulletIcon,
} from "@heroicons/react/24/outline";
import TagsInput from "../TagsInput/Index";

type DrawerProps = {
  title: string;
  children: ReactNode;
  onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void;
  type?: "button" | "submit" | "reset"; // specify possible values for type
  disabled?: boolean;
  editableContent?: any;
  onSave?: (content: any) => void;
  rowContent?: any;
  onRowUpdate?: (content: any) => void;
};

interface EditContent {
  content: string;
  isEditing: boolean;
}

const Drawer: FunctionComponent<DrawerProps> = ({
  title,
  children,
  onSave,
  editableContent,
  rowContent,
  onRowUpdate,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isFull, setIsFull] = useState(false);
  const [isFavorite, setIsFavorite] = useState(false);
  const [tempRowContent, setTempRowContent] = useState(rowContent);

  const handleTempRowContentChange = (e) => {
    const { name, value } = e.target;
    console.log(name);
    console.log(value);
    setTempRowContent((prevContent) => ({
      ...prevContent,
      [name]: value,
    }));
  };

  const handleEnterPress = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      // Update the rowContent with the temporaryRowContent
      if (onRowUpdate) {
        onRowUpdate(tempRowContent);
      }
    }
  };

  const toggleDrawer = () => {
    setIsOpen(!isOpen);
    if (isFull) {
      setIsFull(!isFull);
    }
  };

  const toggleDrawerFullScreen = () => setIsFull(!isFull);

  const toggleFavorite = () => setIsFavorite(!isFavorite);

  const drawerClassName = `fixed top-0 right-0 w-1/2 h-full bg-white transform ease-in-out duration-300 z-20 ${
    isOpen ? "translate-x-0 shadow-xl" : "translate-x-full"
  } ${isFull ? "w-full" : "w-1/2"}`;

  const iconComponent = isFull ? (
    <ArrowsPointingInIcon className="h-5 w-5" />
  ) : (
    <ArrowsPointingOutIcon className="h-5 w-5" />
  );

  const favoriteIcon = isFavorite ? (
    <SolidStarIcon className="h-5 w-5" />
  ) : (
    <OutlineStarIcon className="h-5 w-5" />
  );

  const [presetOptions, setPresetOptions] = useState([
    "administrator",
    "volunteer",
    "employee",
  ]);
  const [rolePresetOptions, setRolePresetOptions] = useState([
    "domestic",
    "community",
    "economic",
  ]);
  const [tagColors, setTagColors] = useState(new Map());

  const getTagColor = (tag: string) => {
    if (!tagColors.has(tag)) {
      const colors = [
        "bg-cyan-100",
        "bg-blue-100",
        "bg-green-100",
        "bg-yellow-100",
        "bg-purple-100",
      ];
      const randomColor = colors[Math.floor(Math.random() * colors.length)];
      setTagColors(new Map(tagColors).set(tag, randomColor));
    }
    return tagColors.get(tag);
  };

  return (
    <div>
      <button
        className={
          "ml-2 text-xs uppercase opacity-0 group-hover:opacity-100 text-gray-500 font-medium border border-gray-200 bg-white shadow hover:bg-gray-50 p-2 rounded-md"
        }
        onClick={toggleDrawer}
      >
        Open
      </button>
      <div className={drawerClassName}></div>
      <div className={drawerClassName}>
        <div className="flex items-center justify-between p-4">
          <div className="flex flex-row items-center justify-between space-x-2">
            <span className="h-5 text-purple-200 w-5">
              <UserIcon />
            </span>
            <h2 className="text-lg text-gray-800 font-semibold">
              {rowContent.username}
            </h2>
          </div>
          <div>
            <button
              onClick={toggleFavorite}
              className="py-2 text-gray-500 hover:text-gray-800 mr-2"
            >
              {favoriteIcon}
            </button>
            <button
              onClick={toggleDrawerFullScreen}
              className="py-2 text-gray-500 hover:text-gray-800 mr-2"
            >
              {iconComponent}
            </button>
            <button
              onClick={toggleDrawer}
              className="py-2 text-gray-500 hover:text-gray-800"
            >
              <ChevronDoubleLeftIcon className="h-5 w-5" />
            </button>
          </div>
        </div>
        <div className="p-4">
          <table className="p-4">
            <tbody className="items-center">
              <tr className="w-full text-xs items-center flex flex-row justify-between">
                <div className="flex flex-row space-x-2 text-gray-500 items-center">
                  <td>
                    <UserIcon className="h-4 w-4" />
                  </td>
                  <td className="w-32">Username</td>
                </div>
                <td className="w-3/4 w-3/4 p-2 pl-0">
                  <input
                    type="text"
                    name="username"
                    value={tempRowContent.username}
                    onChange={handleTempRowContentChange}
                    onKeyDown={handleEnterPress}
                    className="ml-2 w-full p-1 focus:outline-gray-200  hover:bg-gray-50"
                  />
                </td>
              </tr>
              <tr className="w-full text-xs items-center flex flex-row justify-between">
                <div className="flex flex-row space-x-2 text-gray-500 items-center">
                  <td>
                    <ListBulletIcon className="h-4 w-4" />
                  </td>
                  <td className="w-32">Role</td>
                </div>
                <td className="w-3/4 hover:bg-gray-50">
                  <TagsInput
                    presetValue={tempRowContent.role}
                    presetOptions={presetOptions}
                    setPresetOptions={setPresetOptions}
                    getTagColor={getTagColor}
                    setTagColors={setTagColors}
                  />
                </td>
              </tr>
              <tr className="w-full text-xs items-center flex flex-row justify-between">
                <div className="flex flex-row space-x-2 text-gray-500 items-center">
                  <td>
                    <EnvelopeIcon className="h-4 w-4" />
                  </td>
                  <td className="w-32">Email</td>
                </div>
                <td className="w-3/4 p-2 pl-0">
                  <input
                    type="text"
                    name="email"
                    value={tempRowContent.email}
                    onChange={handleTempRowContentChange}
                    onKeyDown={handleEnterPress}
                    className="ml-2 w-80 p-1 font-normal hover:text-gray-400 focus:outline-gray-200  hover:bg-gray-50 underline text-gray-500"
                  />
                </td>
              </tr>
              <tr className="w-full text-xs items-center flex flex-row justify-between">
                <div className="flex flex-row space-x-2 text-gray-500 items-center">
                  <td>
                    <ListBulletIcon className="h-4 w-4" />
                  </td>
                  <td className="w-32">Type of Program</td>
                </div>
                <td className="w-3/4 hover:bg-gray-50">
                  {/* {rowContent.program} */}
                  <TagsInput
                    presetValue={tempRowContent.program}
                    presetOptions={rolePresetOptions}
                    setPresetOptions={setRolePresetOptions}
                    getTagColor={getTagColor}
                    setTagColors={setTagColors}
                  />
                </td>
              </tr>
            </tbody>
          </table>
          <br />
        </div>
      </div>
    </div>
  );
};

export default Drawer;
