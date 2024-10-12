"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import { signIn, signOut, useSession, getProviders } from "next-auth/react";
import Link from "next/link";

const Nav = () => {
  const { data: session } = useSession();
  const [providers, setProviders] = useState(null);
  const [toggleDropDown, setToggleDropDown] = useState(false);

  useEffect(() => {
    const fetchProviders = async () => {
      const res = await getProviders();
      setProviders(res);
    };
    fetchProviders();
  }, []);

  return (
    <nav className="fixed top-0 p-5  shadow-black left-0 w-full flex justify-between items-center mb-14 pt-3 px-6 bg-black text-gray-100 z-50">
      {/* Logo and navigation link to home */}
      <Link href="/" className="flex items-center gap-2">
        <Image
          alt="logo"
          width={30}
          height={30}
          className="hidden sm:block rounded-full object-contain"
          src={session?.user?.image || "/assets/images/default-profile.png"}
        />
        <p className="text-lg font-semibold tracking-wide">Promptify</p>
      </Link>

      {/* Desktop navigation */}
      <div className="hidden sm:flex items-center gap-4">
        {session?.user ? (
          <div className="flex items-center gap-4">
            <Link
              href="/create-prompt"
              className="px-4 py-2 rounded-full text-sm font-medium bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 transition-all"
            >
              Create Post
            </Link>
            <button
              type="button"
              onClick={() => signOut()}
              className="px-4 py-2 rounded-full text-sm font-medium bg-gray-800 hover:bg-gray-700 transition-all"
            >
              Sign Out
            </button>
            <Link href="/profile">
              <Image
                alt="profile"
                width={30}
                height={30}
                className="rounded-full object-contain"
                src={
                  session?.user?.image || "/assets/images/default-profile.png"
                }
              />
            </Link>
          </div>
        ) : (
          <>
            {providers &&
              Object.values(providers).map((provider) => (
                <button
                  type="button"
                  key={provider.name}
                  onClick={() => signIn(provider.id)}
                  className="px-4 py-2 rounded-full text-sm font-medium bg-gray-800 hover:bg-gray-700 transition-all"
                >
                  Sign in
                </button>
              ))}
          </>
        )}
      </div>

      {/* Mobile navigation */}
      <div className="sm:hidden flex items-center relative">
        {session?.user ? (
          <div>
            <Image
              onClick={() => setToggleDropDown((prev) => !prev)}
              alt="profile"
              width={30}
              height={30}
              className="rounded-full object-contain cursor-pointer"
              src={session?.user?.image || "/assets/images/default-profile.png"}
            />
            {toggleDropDown && (
              <div className="absolute right-0 mt-3 w-40 bg-gray-800 rounded-lg shadow-lg py-2 text-sm text-gray-300">
                <Link
                  href="/profile"
                  className="block px-4 py-2 hover:bg-gray-700"
                  onClick={() => setToggleDropDown(false)}
                >
                  My profile
                </Link>
                <Link
                  href="/create-prompt"
                  className="block px-4 py-2 hover:bg-gray-700"
                  onClick={() => setToggleDropDown(false)}
                >
                  Create Post
                </Link>
                <button
                  type="button"
                  onClick={() => {
                    setToggleDropDown(false);
                    signOut();
                  }}
                  className="w-full text-left px-4 py-2 hover:bg-gray-700"
                >
                  Sign Out
                </button>
              </div>
            )}
          </div>
        ) : (
          <>
            {providers &&
              Object.values(providers).map((provider) => (
                <button
                  type="button"
                  key={provider.name}
                  onClick={() => signIn(provider.id)}
                  className="px-4 py-2 rounded-full text-sm font-medium bg-gray-800 hover:bg-gray-700 transition-all"
                >
                  Sign in
                </button>
              ))}
          </>
        )}
      </div>
    </nav>
  );
};

export default Nav;
