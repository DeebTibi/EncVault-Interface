import { Inter } from "next/font/google";
import NextLink from "next/link";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({ children }) {
  return (
    <div style={{ width: "100%", height: "100vh", display: "flex" }}>
      <div style={{ height: "100%", flexGrow: 1 }}>{children}</div>
    </div>
  );
}

function SideButton({ route, name }) {
  return (
    <NextLink
      href={route}
      style={{
        width: "90%",
        height: 50,
        borderRadius: 10,
        backgroundColor: "rgba(50, 50, 50, 1)",
        display: "flex",
        justifyContent: "flex-start",
        alignItems: "center",
        padding: 10,
      }}
    >
      <h1
        style={{
          fontWeight: 600,
          color: "rgba(255, 255, 255, 0.7)",
          fontSize: 20,
        }}
      >
        {name}
      </h1>
    </NextLink>
  );
}
