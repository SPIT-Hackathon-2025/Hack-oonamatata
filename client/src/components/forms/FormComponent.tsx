import { useAppContext } from "@/context/AppContext";
import { useSocket } from "@/context/SocketContext";
import { SocketEvent } from "@/types/socket";
import { USER_STATUS } from "@/types/user";
import { ChangeEvent, FormEvent, useEffect, useRef } from "react";
import { toast } from "react-hot-toast";
import { useLocation, useNavigate } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";
import { FaDoorOpen, FaUser, FaKey, FaBolt } from "react-icons/fa";

const FormComponent = () => {
    const location = useLocation();
    const { currentUser, setCurrentUser, status, setStatus } = useAppContext();
    const { socket } = useSocket();
    const usernameRef = useRef<HTMLInputElement | null>(null);
    const navigate = useNavigate();

    const createNewRoomId = () => {
        setCurrentUser({ ...currentUser, roomId: uuidv4() });
        toast.success("Created a new Room Id");
        usernameRef.current?.focus();
    };

    const handleInputChanges = (e: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setCurrentUser({ ...currentUser, [name]: value });
    };

    const validateForm = () => {
        if (currentUser.username.trim().length < 3) {
            toast.error("Username must be at least 3 characters long");
            return false;
        }
        if (currentUser.roomId.trim().length < 5) {
            toast.error("Room ID must be at least 5 characters long");
            return false;
        }
        return true;
    };

    const joinRoom = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (status === USER_STATUS.ATTEMPTING_JOIN) return;
        if (!validateForm()) return;
        toast.loading("Joining room...");
        setStatus(USER_STATUS.ATTEMPTING_JOIN);
        socket.emit(SocketEvent.JOIN_REQUEST, currentUser);
    };

    useEffect(() => {
        if (!currentUser.roomId && location.state?.roomId) {
            setCurrentUser({ ...currentUser, roomId: location.state.roomId });
            toast.success("Enter your username");
        }
    }, [currentUser, location.state?.roomId, setCurrentUser]);

    useEffect(() => {
        if (status === USER_STATUS.DISCONNECTED && !socket.connected) {
            socket.connect();
            return;
        }
        
        const isRedirect = sessionStorage.getItem("redirect");

        if (status === USER_STATUS.JOINED && !isRedirect) {
            sessionStorage.setItem("redirect", "true");
            navigate(`/editor/${currentUser.roomId}`, { state: { username: currentUser.username } });
        } else if (status === USER_STATUS.JOINED && isRedirect) {
            sessionStorage.removeItem("redirect");
            setStatus(USER_STATUS.DISCONNECTED);
            socket.disconnect();
            socket.connect();
        }
    }, [currentUser, navigate, setStatus, socket, status]);

    return (
        <div className="flex w-full max-w-[500px] flex-col items-center justify-center gap-4 p-4 sm:w-[500px] sm:p-8 bg-gray-800 text-white rounded-lg shadow-md border border-blue-500">
            <h2 className="text-xl font-bold text-blue-400 flex items-center gap-2">
                <FaDoorOpen /> Join a Room
            </h2>
            <form onSubmit={joinRoom} className="flex w-full flex-col gap-4">
                <div className="relative">
                    <FaKey className="absolute left-3 top-1/2 transform -translate-y-1/2 text-blue-400" />
                    <input
                        type="text"
                        name="roomId"
                        placeholder="Room ID"
                        className="w-full rounded-md border border-gray-600 bg-gray-700 px-10 py-3 text-white focus:ring-2 focus:ring-blue-400"
                        onChange={handleInputChanges}
                        value={currentUser.roomId}
                    />
                </div>
                <div className="relative">
                    <FaUser className="absolute left-3 top-1/2 transform -translate-y-1/2 text-blue-400" />
                    <input
                        type="text"
                        name="username"
                        placeholder="Username"
                        className="w-full rounded-md border border-gray-600 bg-gray-700 px-10 py-3 text-white focus:ring-2 focus:ring-blue-400"
                        onChange={handleInputChanges}
                        value={currentUser.username}
                        ref={usernameRef}
                    />
                </div>
                <button
                    type="submit"
                    className="mt-2 w-full rounded-md bg-blue-500 px-8 py-3 text-lg font-semibold text-white hover:bg-blue-600"
                >
                    <FaDoorOpen className="inline-block mr-2" /> Join Room
                </button>
            </form>
            <button
                className="mt-4 text-blue-400 hover:underline flex items-center gap-2"
                onClick={createNewRoomId}
            >
                <FaBolt /> Generate Unique Room ID
            </button>
        </div>
    );
};

export default FormComponent;
