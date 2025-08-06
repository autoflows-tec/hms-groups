import { Search, Filter, TrendingUp, AlertTriangle, XCircle, List } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

type StatusFilter = 'todos' | 'estavel' | 'alerta' | 'critico' | 'sem-mensagens';

interface GroupsSearchProps {
  searchTerm: string;
  statusFilter: StatusFilter;
  onSearchChange: (value: string) => void;
  onStatusFilterChange: (value: StatusFilter) => void;
  totalGroups: number;
}

const getStatusIcon = (status: StatusFilter) => {
  switch (status) {
    case 'estavel':
      return <TrendingUp className="h-4 w-4 text-green-600 dark:text-green-400" />;
    case 'alerta':
      return <AlertTriangle className="h-4 w-4 text-yellow-600 dark:text-yellow-400" />;
    case 'critico':
      return <XCircle className="h-4 w-4 text-red-600 dark:text-red-400" />;
    case 'sem-mensagens':
      return <List className="h-4 w-4 text-gray-500 dark:text-gray-400" />;
    default:
      return <Filter className="h-4 w-4 text-e3-gray dark:text-gray-400" />;
  }
};

const getStatusLabel = (status: StatusFilter) => {
  switch (status) {
    case 'estavel':
      return 'Estáveis';
    case 'alerta':
      return 'Em Alerta';
    case 'critico':
      return 'Críticos';
    case 'sem-mensagens':
      return 'Sem Mensagens';
    default:
      return 'Todos os Status';
  }
};

export const GroupsSearch = ({ searchTerm, statusFilter, onSearchChange, onStatusFilterChange, totalGroups }: GroupsSearchProps) => {
  return (
    <Card className="mb-6 bg-white dark:bg-e3-dark-card border-2 border-gray-200 dark:border-gray-600 shadow-sm">
      <CardContent className="p-4">
        <div className="flex flex-col lg:flex-row gap-4">
          {/* Busca por nome */}
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-e3-gray dark:text-gray-400 h-4 w-4" />
            <Input
              type="text"
              placeholder="Buscar grupos por nome..."
              value={searchTerm}
              onChange={(e) => onSearchChange(e.target.value)}
              className="pl-10 border-gray-300 dark:border-gray-600 bg-white dark:bg-e3-dark-card text-e3-dark dark:text-white placeholder:text-e3-gray dark:placeholder:text-gray-400 focus:border-e3-primary focus:ring-e3-primary font-inter"
            />
          </div>

          {/* Filtro por status */}
          <div className="lg:w-48">
            <Select value={statusFilter} onValueChange={onStatusFilterChange}>
              <SelectTrigger className="border-gray-300 dark:border-gray-600 bg-white dark:bg-e3-dark-card text-e3-dark dark:text-white focus:border-e3-primary focus:ring-e3-primary font-inter">
                <div className="flex items-center gap-2">
                  {getStatusIcon(statusFilter)}
                  <SelectValue />
                </div>
              </SelectTrigger>
              <SelectContent className="bg-white dark:bg-e3-dark-card border-gray-300 dark:border-gray-600">
                <SelectItem value="todos" className="text-e3-dark dark:text-white font-inter">
                  <div className="flex items-center gap-2">
                    <Filter className="h-4 w-4 text-e3-gray dark:text-gray-400" />
                    {getStatusLabel('todos')}
                  </div>
                </SelectItem>
                <SelectItem value="estavel" className="text-e3-dark dark:text-white font-inter">
                  <div className="flex items-center gap-2">
                    <TrendingUp className="h-4 w-4 text-green-600 dark:text-green-400" />
                    {getStatusLabel('estavel')}
                  </div>
                </SelectItem>
                <SelectItem value="alerta" className="text-e3-dark dark:text-white font-inter">
                  <div className="flex items-center gap-2">
                    <AlertTriangle className="h-4 w-4 text-yellow-600 dark:text-yellow-400" />
                    {getStatusLabel('alerta')}
                  </div>
                </SelectItem>
                <SelectItem value="critico" className="text-e3-dark dark:text-white font-inter">
                  <div className="flex items-center gap-2">
                    <XCircle className="h-4 w-4 text-red-600 dark:text-red-400" />
                    {getStatusLabel('critico')}
                  </div>
                </SelectItem>
                <SelectItem value="sem-mensagens" className="text-e3-dark dark:text-white font-inter">
                  <div className="flex items-center gap-2">
                    <List className="h-4 w-4 text-gray-500 dark:text-gray-400" />
                    {getStatusLabel('sem-mensagens')}
                  </div>
                </SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Contador de resultados */}
          <div className="flex items-center text-sm text-e3-dark dark:text-white font-inter lg:min-w-fit">
            <span className="font-medium">{totalGroups}</span> grupos encontrados
          </div>
        </div>
      </CardContent>
    </Card>
  );
};