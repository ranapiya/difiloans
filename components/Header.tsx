import React from "react";
import ConnectButton from "./ConnectButton";

const Header = () => {
  return (
    <header className="sticky top-0 z-50 backdrop-blur-md border-b border-white/10 bg-white/5">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-4">
        <h1 className="text-xl font-semibold bg-gradient-to-r from-sky-500 to-teal-400 bg-clip-text text-transparent">
          DIFILOANS
        </h1>
        <ConnectButton />
      </div>
    </header>
  );
};

export default Header;
