
interface PageLayoutProps{
    icon: React.ReactElement;
    title: string;
    table: React.ReactElement
}

export const PageLayout: React.FC<PageLayoutProps> = ({ icon, title, table }) => {
    return(
        <div flex-column> 
            <div flex-row>
                <span className="h-5 text-gray-500 w-5">
                    {icon}
                </span>
                <span className="flex-grow font-medium text-xs text-gray-500">
                    {title}
                </span>
            </div>
            <span> {table} </span>
         </div>
    );
};