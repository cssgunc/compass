import { FunctionComponent, useState } from "react";
import NewDrawer from "./NewDrawer";
import Resource from "@/utils/models/Resource";
import {
    ChevronDoubleLeftIcon,
    StarIcon as SolidStarIcon,
    UserIcon,
} from "@heroicons/react/24/solid";
import {
    ArrowsPointingOutIcon,
    ArrowsPointingInIcon,
    StarIcon as OutlineStarIcon,
    ListBulletIcon,
} from "@heroicons/react/24/outline";
import TagsInput from "../TagsInput/Index";
import useTagsHandler from "../TagsInput/TagsHandler";

type NewResourceDrawerProps = {
    rowContent: Resource;
    updateData: (input: any) => void
};

const NewResourceDrawer: FunctionComponent<NewResourceDrawerProps> = ({ rowContent, updateData }) => {
    const [input, setInput] = useState({
        name: rowContent.name,
        link: rowContent.link,
        summary: rowContent.summary
    })

    const tagProps = useTagsHandler([
        "domestic",
        "economic",
        "community",
    ]);
    
    const handleChange = (field: string, change: string) => {
        setInput(prev => ({ ...prev, [field]: change}))
    }

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        updateData(input);
    }

    const fields = [
        {
            icon: <UserIcon className="h-4 w-4" />,
            name: <>Name</>,
            input: (
                <input 
                    onChange={e => handleChange('name', e.target.value)}
                    value={input.name}
                />
            )
        },
        {
            icon: <ListBulletIcon className="h-4 w-4" />,
            name: <>Link</>,
            input: (
                <input 
                    onChange={e => handleChange('link', e.target.value)}
                    value={input.link}
                />
            )
        },
        {
            icon: <ListBulletIcon className="h-4 w-4" />,
            name: <>Program</>,
            input: <TagsInput presetValue={rowContent.program} {...tagProps} />
        },
        {
            icon: <ListBulletIcon className="h-4 w-4" />,
            name: <>Summary</>,
            input: (
                <input 
                    onChange={e => handleChange('summary', e.target.value)}
                    value={input.summary}
                />
            )
        }
    ]

    return <NewDrawer header={rowContent.name} fields={fields} onSubmit={handleSubmit}/>
}

export default NewResourceDrawer;