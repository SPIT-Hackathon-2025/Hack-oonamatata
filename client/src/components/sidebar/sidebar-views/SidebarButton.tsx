import { useViews } from "@/context/ViewContext"
import { VIEWS } from "@/types/view"
import { Tooltip } from 'react-tooltip'
import { useState , useEffect } from 'react'
import { tooltipStyles , buttonStyles } from "../tooltipStyles"
import useWindowDimensions from "@/hooks/useWindowDimensions"


interface ViewButtonProps {
    viewName: VIEWS
    icon: JSX.Element
}


const ViewButton = ({ viewName, icon }: ViewButtonProps) => {
    const { activeView, setActiveView, isSidebarOpen, setIsSidebarOpen } =
        useViews()
    const { width } = useWindowDimensions()
    const [showTooltip, setShowTooltip] = useState(true)

    useEffect(() => {
        setShowTooltip(width > 1024)
    }, [width])

    const handleViewClick = (viewName: VIEWS) => {
        if (viewName === activeView) {
            setIsSidebarOpen(!isSidebarOpen)
        } else {
            setIsSidebarOpen(true)
            setActiveView(viewName)
        }
    }


    return (
        <div className="relative flex items-center flex-col">
        <button
            onClick={() => handleViewClick(viewName)}
            onMouseEnter={() => setShowTooltip(true)} // Show tooltip again on hover
            className={`${buttonStyles.base} ${buttonStyles.hover}`}
            {...(showTooltip && {
                'data-tooltip-id': `tooltip-${viewName}`,
                'data-tooltip-content': viewName
            })}
        >
            <div className="flex items-center justify-center">
                {icon}
            </div>
        </button>
        {/* render the tooltip */}
        {showTooltip && (
                <Tooltip 
                    id={`tooltip-${viewName}`}
                    place="right"
                    offset={25}
                    className="!z-50"
                    style={tooltipStyles}
                    noArrow={false}
                    positionStrategy="fixed"
                    float={true}
                />
            )}
        </div>
    )
}

export default ViewButton
