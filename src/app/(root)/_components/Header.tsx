import { currentUser } from "@clerk/nextjs/server";
import { ConvexHttpClient } from "convex/browser";
import { api } from "../../../../convex/_generated/api";
import Link from "next/link";
import { Blocks, Code2, Sparkles } from "lucide-react";
import { SignedIn } from "@clerk/nextjs";
import ThemeSelector from "./ThemeSelector";
import LanguageSelector from "./LanguageSelector";
import RunButton from "./RunButton";
import HeaderProfileBtn from "./HeaderProfileBtn";

/**
 * Header component for the MindLink interactive code editor.
 * 
 * - Displays the application logo and title.
 * - Provides theme and language selection.
 * - Displays user profile options when signed in.
 * 
 * Fetches user data using Convex API and Clerk authentication.
 */
async function Header() {
  const convex = new ConvexHttpClient(process.env.NEXT_PUBLIC_CONVEX_URL!);
  const user = await currentUser();

  const convexUser = await convex.query(api.users.getUser, {
    userId: user?.id || "",
  });

  return (
    <div className="relative z-10">
      <div
        className="flex items-center lg:justify-between justify-center 
        bg-[#0a0f0a]/80 backdrop-blur-xl p-6 mb-4 rounded-lg"
      >
        <div className="hidden lg:flex items-center gap-8">
          <Link href="/" className="flex items-center gap-3 group relative">
            <div
              className="absolute -inset-2 bg-gradient-to-r from-green-500/20 to-green-700/20 rounded-lg opacity-0 
                group-hover:opacity-100 transition-all duration-500 blur-xl"
            />

            <div className="flex flex-col">
              <span className="block text-lg font-semibold bg-gradient-to-r from-green-400 via-green-300 to-green-600 text-transparent bg-clip-text">
                MindLink
              </span>
              {/* <span className="block text-xs text-green-400/60 font-medium">
                Interactive Code Editor
              </span> */}
            </div>
          </Link>
        </div>

        <div className="flex items-center gap-4">
          <div className="flex items-center gap-3">
            <ThemeSelector />
            <LanguageSelector hasAccess={true} />
          </div>

          <SignedIn>
            {/* <RunButton /> */}
          </SignedIn>

          <div className="pl-3">
            <HeaderProfileBtn />
          </div>
        </div>
      </div>
    </div>
  );
}
export default Header;
