import { Circle, TrendingUp, AlertTriangle, XCircle } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

interface StatusSummary {
  estavel: number;
  alerta: number;
  critico: number;
}

interface GroupsStatusSummaryProps {
  statusSummary: StatusSummary;
}

export const GroupsStatusSummary = ({ statusSummary }: GroupsStatusSummaryProps) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
      {/* Estável */}
      <Card className="bg-white dark:bg-e3-dark-card border-2 border-green-200 dark:border-green-700 shadow-sm">
        <CardContent className="p-4">
          <div className="flex items-center space-x-3">
            <div className="bg-green-100 dark:bg-green-900/30 p-2 rounded-md">
              <TrendingUp className="h-5 w-5 text-green-600 dark:text-green-400" />
            </div>
            <div>
              <p className="text-sm font-inter text-e3-gray dark:text-gray-300">Grupos Estáveis</p>
              <p className="text-2xl font-poppins font-semibold text-green-600 dark:text-green-400">
                {statusSummary.estavel}
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Alerta */}
      <Card className="bg-white dark:bg-e3-dark-card border-2 border-yellow-200 dark:border-yellow-700 shadow-sm">
        <CardContent className="p-4">
          <div className="flex items-center space-x-3">
            <div className="bg-yellow-100 dark:bg-yellow-900/30 p-2 rounded-md">
              <AlertTriangle className="h-5 w-5 text-yellow-600 dark:text-yellow-400" />
            </div>
            <div>
              <p className="text-sm font-inter text-e3-gray dark:text-gray-300">Grupos em Alerta</p>
              <p className="text-2xl font-poppins font-semibold text-yellow-600 dark:text-yellow-400">
                {statusSummary.alerta}
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Crítico */}
      <Card className="bg-white dark:bg-e3-dark-card border-2 border-red-200 dark:border-red-700 shadow-sm">
        <CardContent className="p-4">
          <div className="flex items-center space-x-3">
            <div className="bg-red-100 dark:bg-red-900/30 p-2 rounded-md">
              <XCircle className="h-5 w-5 text-red-600 dark:text-red-400" />
            </div>
            <div>
              <p className="text-sm font-inter text-e3-gray dark:text-gray-300">Grupos Críticos</p>
              <p className="text-2xl font-poppins font-semibold text-red-600 dark:text-red-400">
                {statusSummary.critico}
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};