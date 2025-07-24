import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";

interface GroupsSearchProps {
  searchTerm: string;
  onSearchChange: (value: string) => void;
  totalGroups: number;
}

export const GroupsSearch = ({ searchTerm, onSearchChange, totalGroups }: GroupsSearchProps) => {
  return (
    <Card className="mb-6 bg-white dark:bg-e3-dark-card border-2 border-gray-200 dark:border-gray-600 shadow-sm">
      <CardContent className="p-4">
        <div className="flex items-center space-x-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-e3-gray dark:text-gray-400 h-4 w-4" />
            <Input
              type="text"
              placeholder="Buscar grupos por nome..."
              value={searchTerm}
              onChange={(e) => onSearchChange(e.target.value)}
              className="pl-10 border-gray-300 dark:border-gray-600 bg-white dark:bg-e3-dark-card text-e3-dark dark:text-white placeholder:text-e3-gray dark:placeholder:text-gray-400 focus:border-e3-orange focus:ring-e3-orange font-inter"
            />
          </div>
          <div className="text-sm text-e3-dark dark:text-white font-inter">
            <span className="font-medium">{totalGroups}</span> grupos encontrados
          </div>
        </div>
      </CardContent>
    </Card>
  );
};