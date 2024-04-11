import React, { createContext, useState, useContext, useEffect } from "react";
import * as Font from "expo-font";

const FontContext = createContext();

export const useFonts = () => useContext(FontContext);

export const FontProvider = ({ children }) => {
  const [fontsLoaded, setFontsLoaded] = useState(false);

  const customFonts = {
    // Pretendard
    Pretendard_Thin: require("../assets/fonts/Pretendard-Thin.otf"),
    Pretendard_ExtraLight: require("../assets/fonts/Pretendard-ExtraLight.otf"),
    Pretendard_Light: require("../assets/fonts/Pretendard-Light.otf"),
    Pretendard_Regular: require("../assets/fonts/Pretendard-Regular.otf"),
    Pretendard_Medium: require("../assets/fonts/Pretendard-Medium.otf"),
    Pretendard_SemiBold: require("../assets/fonts/Pretendard-SemiBold.otf"),
    Pretendard_Bold: require("../assets/fonts/Pretendard-Bold.otf"),
    Pretendard_ExtraBold: require("../assets/fonts/Pretendard-ExtraBold.otf"),
    Pretendard_Black: require("../assets/fonts/Pretendard-Black.otf"),
  };

  async function loadFonts() {
    await Font.loadAsync(customFonts);
    setFontsLoaded(true);
  }

  useEffect(() => {
    loadFonts();
  }, []);

  return (
    <FontContext.Provider value={fontsLoaded}>{children}</FontContext.Provider>
  );
};
