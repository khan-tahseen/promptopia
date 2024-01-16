'use client';

import Link from 'next/link';
import Image from 'next/image';
import { signIn, signOut, useSession, getProviders } from 'next-auth/react';
import { useEffect, useState } from 'react';

const Nav = () => {
  const isUserLogedIn = true; // Replace with actual check
  const [provider, setProvider] = useState(null);
  const [toggleDropdown, setToggleDropdown] = useState(false);

  useEffect(() => {
    const setProviders = async () => {
      const response = await getProviders();
      setProvider(response);
    };
    setProviders();
  }, []);

  return (
    <nav className="flex-between w-full mb-16 pt-4">
      <Link href="/" className="flex gap-2 flex-center">
        <Image
          src="assets/images/logo.svg"
          alt="Promptopia logo"
          width={40}
          height={40}
          className="object-contain"
        />
        <p className="logo_text">Promptopia</p>
      </Link>

      {/* Desktop Navigation */}
      <div className="sm:flex hidden">
        {isUserLogedIn ? (
          <di className="flex gap-3 md:gap-5">
            <Link href="/create-prompt" className="black_btn">
              Create Post
            </Link>

            <button type="button" className="outline_btn" onClick={signOut}>
              Sign Out
            </button>

            <Link href="/profile">
              <Image
                src="assets/images/logo.svg"
                alt="Profile picture"
                width={40}
                height={40}
                className="rounded-full"
              />
            </Link>
          </di>
        ) : (
          <>
            {provider &&
              Object.values(provider).map((provider) => (
                <button
                  key={provider.name}
                  type="button"
                  className="black_btn"
                  onClick={() => signIn(provider.id, { callbackUrl: '/' })}
                >
                  Sign In
                </button>
              ))}
          </>
        )}
      </div>

      {/* Mobile Navigation */}
      <div className="sm:hidden flex relative">
        {isUserLogedIn ? (
          <div>
            <Image
              src="assets/images/logo.svg"
              alt="profile picture"
              width={40}
              height={40}
              className="rounded-full"
              onClick={() => setToggleDropdown((prew) => !prew)}
            />

            {toggleDropdown && (
              <div className="dropdown">
                <Link
                  href="/profile"
                  className="dropdown_link"
                  onClick={() => setToggleDropdown(false)}
                >
                  My Profile
                </Link>
              </div>
            )}
          </div>
        ) : (
          <>
            {provider &&
              Object.values(provider).map(
                provider >
                (
                  <button
                    key={provider.name}
                    type="button"
                    className="black_btn"
                    onClick={() => signIn(provider.id, { callbackUrl: '/' })}
                  >
                    Sign In
                  </button>
                )
              )}
          </>
        )}
      </div>
    </nav>
  );
};

export default Nav;
