import { Redirect } from "expo-router";
import { getIsLoggedIn } from "../lib/storage";
import { useEffect, useState } from "react";

export default function Index() {
  const [isLoggedIn, setIsLoggedIn] = useState<boolean | null>(null);

  useEffect(() => {
    const checkLogin = async () => {
      const loggedIn = await getIsLoggedIn();
      setIsLoggedIn(loggedIn);
    };
    checkLogin();
  }, []);

  if (isLoggedIn === null) {
    return null; // or a loading screen
  }

  return isLoggedIn ? (
    <Redirect href="/(tabs)" />
  ) : (
    <Redirect href="/auth/sign-in" />
  );
}
