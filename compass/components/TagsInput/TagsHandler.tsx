import { useState } from 'react';

/**
 * Custom hook used to handle the state of tag options and colors
 * @param initialOptions Initial value for preset options
 * @returns An object with three fields intended to be passed into a `TagsInput` component:
 *  - `presetOptions` - the current state of tag options
 *  - `setPresetOptions` - the state setter for presetOptions
 *  - `getTagColor` - function that retrieves the color for the given tag
 */
export default function useTagsHandler(initialOptions: string[]) {
    const [presetOptions, setPresetOptions] = useState(initialOptions);
    const [tagColors, setTagColors] = useState(new Map<string, string>());

    const getTagColor = (tag: string): string => {
        if (!tagColors.has(tag)) {
            const colors = [
                "bg-cyan-100",
                "bg-blue-100",
                "bg-green-100",
                "bg-yellow-100",
                "bg-purple-100",
            ];
            const randomColor =
                colors[Math.floor(Math.random() * colors.length)];
            setTagColors(new Map(tagColors).set(tag, randomColor));
            return randomColor;
        }
        // Since we populate any missing keys, .get will never return undefined,
        // so we are safe to typecast to prevent a type error
        return tagColors.get(tag) as string;
    };

    return { presetOptions, setPresetOptions, getTagColor }
}