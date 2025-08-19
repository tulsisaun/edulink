import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Home,
  Search,
  PlusCircle,
  MessageSquare,
  User,
  Wallet,
  Filter,
  Send,
} from "lucide-react";

// ✅ Simple Tailwind Button
const Btn = ({ children, className = "", ...props }) => (
  <button
    className={`px-4 py-2 rounded-lg font-medium shadow ${className}`}
    {...props}
  >
    {children}
  </button>
);

// ✅ Simple Card wrapper
const Card = ({ children, className = "" }) => (
  <div className={`bg-white rounded-2xl shadow p-4 ${className}`}>{children}</div>
);

// ✅ Simple Input
const Input = ({ className = "", ...props }) => (
  <input
    className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring ${className}`}
    {...props}
  />
);

// ✅ Simple Avatar
const Avatar = ({ name }) => {
  const initials = name ? name.charAt(0).toUpperCase() : "U";
  return (
    <div className="w-10 h-10 rounded-full bg-blue-500 text-white flex items-center justify-center font-bold">
      {initials}
    </div>
  );
};

export default function EduLinkApp() {
  const [screen, setScreen] = useState("splash");
  const [userName, setUserName] = useState("");
  const [postText, setPostText] = useState("");

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col">
      {/* Splash Screen */}
      <AnimatePresence>
        {screen === "splash" && (
          <motion.div
            key="splash"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="flex flex-col items-center justify-center h-screen bg-gradient-to-br from-blue-400 to-purple-500 text-white"
          >
            <h1 className="text-4xl font-bold">EduLink</h1>
            <p className="mt-2 text-lg">Collaborate. Learn. Grow.</p>
            <Btn className="bg-white text-blue-600 mt-6" onClick={() => setScreen("login")}>
              Get Started
            </Btn>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Login Screen */}
      <AnimatePresence>
        {screen === "login" && (
          <motion.div
            key="login"
            initial={{ x: 300, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: -300, opacity: 0 }}
            className="flex flex-col items-center justify-center h-screen px-6"
          >
            <h2 className="text-2xl font-bold mb-4">Login / Signup</h2>
            <Input
              placeholder="Enter your name"
              value={userName}
              onChange={(e) => setUserName(e.target.value)}
            />
            <Btn className="bg-blue-500 text-white mt-4 w-full" onClick={() => setScreen("home")}>
              Continue
            </Btn>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main App */}
      <AnimatePresence>
        {["home", "search", "upload", "chat", "profile", "wallet"].includes(screen) && (
          <motion.div
            key={screen}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="flex flex-col h-screen"
          >
            {/* Top Bar */}
            <div className="bg-white shadow flex justify-between items-center px-4 py-3">
              <h2 className="text-lg font-bold capitalize">{screen}</h2>
              {screen === "home" && (
                <button onClick={() => setScreen("wallet")}>
                  <Wallet className="w-6 h-6" />
                </button>
              )}
              {screen === "search" && (
                <button>
                  <Filter className="w-6 h-6" />
                </button>
              )}
            </div>

            {/* Screen Content */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4">
              {screen === "home" && (
                <>
                  <Card>
                    <h3 className="text-lg font-bold">Welcome {userName} 👋</h3>
                    <p className="text-sm text-gray-600">
                      Explore trending study services and requests.
                    </p>
                  </Card>

                  <Card>
                    <h4 className="font-semibold mb-2">Create Post</h4>
                    <textarea
                      className="w-full border rounded-lg p-2"
                      placeholder="What's on your mind?"
                      value={postText}
                      onChange={(e) => setPostText(e.target.value)}
                    />
                    <Btn
                      className="bg-blue-500 text-white mt-2"
                      onClick={() => {
                        if (postText.trim()) {
                          alert("Posted: " + postText);
                          setPostText("");
                        }
                      }}
                    >
                      Post
                    </Btn>
                  </Card>
                </>
              )}

              {screen === "search" && (
                <Card>
                  <h3 className="font-bold">Search Services</h3>
                  <Input placeholder="Search..." />
                </Card>
              )}

              {screen === "upload" && (
                <Card>
                  <h3 className="font-bold mb-2">Upload Request/Offer</h3>
                  <Input placeholder="Title" />
                  <textarea
                    className="w-full border rounded-lg p-2 mt-2"
                    placeholder="Description"
                  />
                  <Btn className="bg-blue-500 text-white mt-3">Submit</Btn>
                </Card>
              )}

              {screen === "chat" && (
                <Card>
                  <h3 className="font-bold mb-2">Chat</h3>
                  <p className="text-sm text-gray-600">Messaging feature coming soon...</p>
                </Card>
              )}

              {screen === "profile" && (
                <Card>
                  <div className="flex items-center space-x-3">
                    <Avatar name={userName} />
                    <div>
                      <h3 className="font-bold">{userName || "User"}</h3>
                      <p className="text-sm text-gray-600">Student • Collaborator</p>
                    </div>
                  </div>
                </Card>
              )}

              {screen === "wallet" && (
                <Card>
                  <h3 className="font-bold mb-2">Wallet Balance</h3>
                  <p className="text-xl font-bold">₹1200</p>
                  <Btn className="bg-green-500 text-white mt-2">Add Money</Btn>
                </Card>
              )}
            </div>

            {/* Bottom Navigation */}
            <div className="bg-white border-t flex justify-around py-2">
              <button onClick={() => setScreen("home")}>
                <Home className="w-6 h-6" />
              </button>
              <button onClick={() => setScreen("search")}>
                <Search className="w-6 h-6" />
              </button>
              <button onClick={() => setScreen("upload")}>
                <PlusCircle className="w-6 h-6" />
              </button>
              <button onClick={() => setScreen("chat")}>
                <MessageSquare className="w-6 h-6" />
              </button>
              <button onClick={() => setScreen("profile")}>
                <User className="w-6 h-6" />
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
