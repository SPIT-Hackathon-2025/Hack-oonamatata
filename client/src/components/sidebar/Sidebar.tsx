import React, { useState } from 'react';
import SidebarButton from "@/components/sidebar/sidebar-views/SidebarButton";
import { useAppContext } from "@/context/AppContext";
import { useSocket } from "@/context/SocketContext";
import { useViews } from "@/context/ViewContext";
import useResponsive from "@/hooks/useResponsive";
import useWindowDimensions from "@/hooks/useWindowDimensions";
import { ACTIVITY_STATE } from "@/types/app";
import { SocketEvent } from "@/types/socket";
import { VIEWS } from "@/types/view";
import { Tooltip } from 'react-tooltip';
import cn from "classnames";

const Sidebar = () => {
    const {
        activeView,
        isSidebarOpen,
        viewComponents,
        viewIcons,
        setIsSidebarOpen,
    } = useViews();
    const { minHeightReached } = useResponsive();
    const { activityState, setActivityState } = useAppContext();
    const { socket } = useSocket();
    const { isMobile } = useWindowDimensions();
    const [showTooltip, setShowTooltip] = useState(true);

    const changeState = () => {
        setShowTooltip(false);
        if (activityState === ACTIVITY_STATE.CODING) {
            setActivityState(ACTIVITY_STATE.DRAWING);
            socket.emit(SocketEvent.REQUEST_DRAWING);
        } else {
            setActivityState(ACTIVITY_STATE.CODING);
        }

        if (isMobile) {
            setIsSidebarOpen(false);
        }
    };

    return (
        <aside className="flex w-full md:h-full md:max-h-full md:min-h-full md:w-auto">
            {/* Sidebar Navigation */}
            <div
                className={cn(
                    "fixed bottom-0 left-0 z-50 flex h-[60px] w-full gap-2 self-end overflow-hidden bg-gray-900 shadow-lg transition-all duration-200 ease-in-out",
                    "md:static md:h-full md:w-[64px] md:min-w-[64px] md:flex-col md:gap-3 md:border-r md:border-gray-800 md:bg-gray-900 md:p-3 md:pt-4",
                    {
                        "hidden": minHeightReached,
                        "border-t border-gray-800": !isMobile,
                    }
                )}
            >
                <div className="flex w-full items-center justify-around md:flex-col md:items-center md:gap-4">
                    {/* Brand Icon - Only visible on desktop */}
                    <div className="hidden md:flex md:h-8 md:w-8 md:items-center md:justify-center md:rounded-lg md:bg-blue-500 md:text-white md:mb-6">
                        CS
                    </div>

                    {/* Navigation Buttons */}
                    <SidebarButton
                        viewName={VIEWS.FILES}
                        icon={viewIcons[VIEWS.FILES]}
                        className="group relative flex h-10 w-10 items-center justify-center rounded-lg hover:bg-gray-800 transition-colors duration-200"
                    />
                    <SidebarButton
                        viewName={VIEWS.RUN}
                        icon={viewIcons[VIEWS.RUN]}
                        className="group relative flex h-10 w-10 items-center justify-center rounded-lg hover:bg-gray-800 transition-colors duration-200"
                    />
                    <SidebarButton
                        viewName={VIEWS.CLIENTS}
                        icon={viewIcons[VIEWS.CLIENTS]}
                        className="group relative flex h-10 w-10 items-center justify-center rounded-lg hover:bg-gray-800 transition-colors duration-200"
                    />
                    <SidebarButton
                        viewName={VIEWS.SETTINGS}
                        icon={viewIcons[VIEWS.SETTINGS]}
                        className="group relative flex h-10 w-10 items-center justify-center rounded-lg hover:bg-gray-800 transition-colors duration-200"
                    />
                </div>
            </div>

            {/* Sidebar Content Panel */}
            <div
                className={cn(
                    "absolute left-0 top-0 z-20 w-full flex-col bg-gray-900 transition-all duration-200 ease-in-out",
                    "md:static md:min-w-[300px] md:border-r md:border-gray-800",
                    {
                        "translate-x-0 opacity-100": isSidebarOpen,
                        "translate-x-full opacity-0 md:translate-x-0 md:opacity-100": !isSidebarOpen
                    }
                )}
                style={isSidebarOpen ? {} : { display: "none" }}
            >
                <div className="flex h-full flex-col">
                    {/* View Title */}
                    <div className="flex h-[60px] items-center border-b border-gray-800 px-4">
                        <h2 className="text-lg font-semibold text-gray-200">
                            {activeView.charAt(0).toUpperCase() + activeView.slice(1)}
                        </h2>
                    </div>

                    {/* View Content */}
                    <div className="flex-1 overflow-y-auto">
                        {viewComponents[activeView]}
                    </div>
                </div>
            </div>

            {/* Tooltips */}
            {showTooltip && (
                <Tooltip
                    id="sidebar-tooltip"
                    className="z-[1000] !bg-gray-800 !text-white !px-3 !py-2 !rounded-lg !shadow-lg"
                />
            )}
        </aside>
    );
};

export default Sidebar;