import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  return (
    <div className="h-screen bg-secondary">
      <div className="w-1/5 min-h-screen bg-primary">
        <div className="text-secondary p-10">
          <h2 className="text-4xl">API</h2>
          <h5 className="text-2xl">Designer</h5>
          <div className="w-2/5 border-b border-secondary mt-2"></div>
        </div>
      </div>
    </div>
  );
}
