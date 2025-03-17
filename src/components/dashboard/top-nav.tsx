import { Button } from "@/components/ui/button";

export function TopNav() {
  return (
    <header className="flex items-center justify-between h-16 px-6 bg-white border-b border-gray-200">
      <div className="flex items-center">
        <h1 className="text-xl font-semibold text-gray-800">P3AI Dashboard</h1>
      </div>

      <div className="flex items-center space-x-4">
        <Button variant="outline" size="default">
          0x123...abc
        </Button>

        {/* <Button variant="outline" size="sm">
          Disconnect
        </Button> */}
      </div>
    </header>
  );
}
