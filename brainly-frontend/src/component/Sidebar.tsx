import LogoIcon from "./Icon/LogoIcon"
import TwitterIcon from "./Icon/TwitterIcon"
import YoutubeIcon from "./Icon/YoutubeIcon"
import SidebarItem from "./SidebarItem"

export const Sidebar = ({ onFilterChange }: { onFilterChange?: (filter: string) => void }) => {
    return (
    <div className="h-screen bg-white w-72 border-r-2 border-gray-300 pl-6 flex-shrink-0">
        <div className="flex text-2xl pt-4 items-center">
            <div className="pr-2 text-purple-600">
            {<LogoIcon size="md"/>}
            </div>
            Brainly
        </div>
        <div className="pt-4">
            <SidebarItem text="All" icon={<LogoIcon size="md" />} onClick={() => onFilterChange && onFilterChange('all')} />
            <SidebarItem text="Twitter" icon={<TwitterIcon size="md" />} onClick={() => onFilterChange && onFilterChange('twitter')} />
            <SidebarItem text="Youtube" icon={<YoutubeIcon size="md" />} onClick={() => onFilterChange && onFilterChange('youtube')} /> 
        </div>

    </div>
    ) 
}
