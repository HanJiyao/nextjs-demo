import { Button, Input } from "antd";
import { Search } from "lucide-react";

interface SearchBarProps {
  onSearch?: (value: string, category?: string) => void;
  placeholder?: string;
  className?: string;
}

export default function SearchBar({ onSearch, placeholder, className }: SearchBarProps) {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onSearch?.(e.target.value);
  };

  return (
    <div className={`mx-auto h-10 ${className}`}>
      <Input.Search
        placeholder={placeholder}
        onChange={handleChange}
        className="rounded-lg shadow-sm"
        enterButton={<Button
          icon={<Search className="w-4 h-4 text-gray-500" />}
          style={{
            backgroundColor: "white",
            border: "1px solid #D9D9D9",
            boxShadow: "none"
          }}
        />}
      />
    </div>
  );
}
