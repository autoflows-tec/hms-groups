import { RefreshCw, Circle, Moon, Sun } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import E3Logo from "./E3Logo";
import { useDarkMode } from "@/hooks/useDarkMode";
import { ConfigurationMenu, ConfigurationType } from "./ConfigurationMenu";
import { ConfigurationDialog } from "./ConfigurationDialog";

interface StatusSummary {
  estavel: number;
  alerta: number;
  critico: number;
}

interface GroupsHeaderProps {
  statusSummary: StatusSummary;
  loading: boolean;
  onRefresh: () => void;
}

export const GroupsHeader = ({ statusSummary, loading, onRefresh }: GroupsHeaderProps) => {
  const { isDarkMode, toggleDarkMode } = useDarkMode();
  const [configDialogOpen, setConfigDialogOpen] = useState(false);
  const [configType, setConfigType] = useState<ConfigurationType | null>(null);

  const handleConfigurationSelect = (type: ConfigurationType) => {
    setConfigType(type);
    setConfigDialogOpen(true);
  };

  return (
    <div className="bg-white dark:bg-e3-dark-bg border-b border-gray-200 dark:border-gray-700 shadow-sm">
      <div className="container mx-auto px-4 py-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <E3Logo className="h-16 w-auto" />
            <div>
              <h1 className="text-3xl font-poppins font-semibold text-e3-dark dark:text-white">
                E3 DIGITAL
              </h1>
              <p className="text-e3-gray dark:text-gray-300 font-inter font-medium">
                Painel de Grupos de Clientes
              </p>
            </div>
          </div>
          
          <div className="flex items-center space-x-6">
            {/* Status Summary */}
            <div className="hidden md:flex items-center space-x-4 text-sm">
              <div className="flex items-center space-x-1">
                <Circle className="h-3 w-3 fill-green-500 text-green-500" />
                <span className="text-e3-dark dark:text-white font-inter">Estável: {statusSummary.estavel}</span>
              </div>
              <div className="flex items-center space-x-1">
                <Circle className="h-3 w-3 fill-yellow-500 text-yellow-500" />
                <span className="text-e3-dark dark:text-white font-inter">Alerta: {statusSummary.alerta}</span>
              </div>
              <div className="flex items-center space-x-1">
                <Circle className="h-3 w-3 fill-red-500 text-red-500" />
                <span className="text-e3-dark dark:text-white font-inter">Crítico: {statusSummary.critico}</span>
              </div>
            </div>
            
            {/* Configuration Menu */}
            <ConfigurationMenu onConfigurationSelect={handleConfigurationSelect} />
            
            {/* Dark Mode Toggle */}
            <Button
              onClick={toggleDarkMode}
              variant="outline"
              size="sm"
              className="border-gray-300 dark:border-gray-600 text-e3-dark dark:text-white hover:bg-gray-100 dark:hover:bg-e3-dark-card"
            >
              {isDarkMode ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
            </Button>
            
            <Button
              onClick={onRefresh}
              className="bg-e3-orange hover:bg-e3-orange/90 text-white border-0 rounded-md shadow-sm font-inter font-medium"
              disabled={loading}
            >
              <RefreshCw className={`h-4 w-4 mr-2 ${loading ? 'animate-spin' : ''}`} />
              Atualizar
            </Button>
          </div>
        </div>
      </div>
      
      <ConfigurationDialog
        open={configDialogOpen}
        onOpenChange={setConfigDialogOpen}
        type={configType}
      />
    </div>
  );
};