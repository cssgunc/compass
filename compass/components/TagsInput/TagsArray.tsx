import { Tag } from "./Tag"

export const TagsArray = ({ tags, active = false }) => {
    return(
        <div className="flex items-center space-x-2">
        {
          tags.map((tag) => {
            return (
              <Tag active={active}>{tag}</Tag>
            )
          })
        }
      </div>
    )
}