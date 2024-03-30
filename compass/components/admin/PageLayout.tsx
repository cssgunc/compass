
interface PageLayoutProps{
    icon: React.ReactElement;
    title: string;
    table: React.ReactElement
}

export const PageLayout: React.FC<PageLayoutProps> = ({ icon, title, table }) => {
    return (
        <div>
            <div className="flex flex-row items-center pl-20 pt-10"> 
                <span>
                    {icon}
                </span>
                <h1 className="text-2xl font-bold text-gray-900 sm:text-3xl p-5">
                    {title}
                </h1>
            </div>
            <div className="item-center pl-20 pt-10 pr-20">
                {table} </div>
        </div>
    );
};