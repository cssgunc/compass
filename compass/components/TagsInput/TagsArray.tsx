import { Tag } from "./Tag"

export const TagsArray = ({ tags, handleDelete, active = false }) => {
  
    return(
        <div className="flex ml-2 flex-wrap gap-2 items-center">
        {
          Array.from(tags).map((tag) => {
            return (
              <Tag handleDelete={handleDelete} active={active}>{tag}</Tag>
            )
          })
        }
      </div>
    )
}