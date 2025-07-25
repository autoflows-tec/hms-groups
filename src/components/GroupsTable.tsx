import { Circle } from "lucide-react";
import { Database } from "@/integrations/supabase/types";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { formatDate, isMessageFromToday, getStatusType } from "@/utils/groupUtils";
import { EditableSelectCell } from "./EditableSelectCell";
import { useSquads } from "@/hooks/useSquads";
import { useHeads } from "@/hooks/useHeads";
import { useGestores } from "@/hooks/useGestores";

type Group = Database['public']['Tables']['Lista_de_Grupos']['Row'];

interface GroupsTableProps {
  groups: Group[];
  onUpdateGroup: (groupId: number, field: 'squad' | 'head' | 'gestor', value: string | null) => Promise<void>;
}

const getStatusIndicator = (status: string | null, resumo: string | null) => {
  const statusType = getStatusType(status, resumo);
  
  switch (statusType) {
    case 'critico':
      return <Circle className="h-3 w-3 fill-red-500 text-red-500" />;
    case 'alerta':
      return <Circle className="h-3 w-3 fill-yellow-500 text-yellow-500" />;
    case 'estavel':
      return <Circle className="h-3 w-3 fill-green-500 text-green-500" />;
    default:
      return <Circle className="h-3 w-3 fill-gray-400 text-gray-400" />;
  }
};

export const GroupsTable = ({ groups, onUpdateGroup }: GroupsTableProps) => {
  // Carregar dados de configuração
  const { squads, loading: squadsLoading } = useSquads();
  const { heads, loading: headsLoading } = useHeads();
  const { gestores, loading: gestoresLoading } = useGestores();

  const isConfigLoading = squadsLoading || headsLoading || gestoresLoading;
  return (
    <div className="overflow-x-auto">
      <Table>
        <TableHeader>
          <TableRow className="border-gray-200 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-e3-dark-card/50">
            <TableHead className="text-e3-dark dark:text-white font-poppins font-semibold">Nome do Grupo</TableHead>
            <TableHead className="text-e3-dark dark:text-white font-poppins font-semibold">Squad</TableHead>
            <TableHead className="text-e3-dark dark:text-white font-poppins font-semibold">Head</TableHead>
            <TableHead className="text-e3-dark dark:text-white font-poppins font-semibold">Gestor</TableHead>
            <TableHead className="text-e3-dark dark:text-white font-poppins font-semibold">Data de Última Atualização</TableHead>
            <TableHead className="text-e3-dark dark:text-white font-poppins font-semibold">Status do Grupo</TableHead>
            <TableHead className="text-e3-dark dark:text-white font-poppins font-semibold">Situação</TableHead>
            <TableHead className="text-e3-dark dark:text-white font-poppins font-semibold text-center w-16">Status</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {groups.map((group) => {
            const hasMessagesToday = isMessageFromToday(group.ultima_atualizacao);
            const hasAnyMessages = group.status || group.resumo;
            
            return (
              <TableRow key={group.id} className="border-gray-200 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-e3-dark-card/50">
                <TableCell className="text-e3-dark dark:text-white font-inter font-medium">
                  {group.nome_grupo || group.grupo}
                </TableCell>
                <TableCell className="p-2">
                  <EditableSelectCell
                    value={group.squad}
                    options={squads}
                    onUpdate={(value) => onUpdateGroup(group.id, 'squad', value)}
                    placeholder="Selecionar squad..."
                    loading={isConfigLoading}
                  />
                </TableCell>
                <TableCell className="p-2">
                  <EditableSelectCell
                    value={group.head}
                    options={heads}
                    onUpdate={(value) => onUpdateGroup(group.id, 'head', value)}
                    placeholder="Selecionar head..."
                    loading={isConfigLoading}
                  />
                </TableCell>
                <TableCell className="p-2">
                  <EditableSelectCell
                    value={group.gestor}
                    options={gestores}
                    onUpdate={(value) => onUpdateGroup(group.id, 'gestor', value)}
                    placeholder="Selecionar gestor..."
                    loading={isConfigLoading}
                  />
                </TableCell>
                <TableCell className="text-e3-gray dark:text-gray-300 font-inter">
                  {formatDate(group.ultima_atualizacao)}
                </TableCell>
                <TableCell className="text-e3-gray dark:text-gray-300 font-inter">
                  {!hasAnyMessages 
                    ? "Sem mensagens no grupo"
                    : !hasMessagesToday 
                      ? "Não há mensagens hoje no grupo"
                      : (group.status || "Não informado")
                  }
                </TableCell>
                <TableCell className="text-e3-gray dark:text-gray-300 font-inter">
                  <div className="whitespace-normal break-words">
                    {!hasAnyMessages 
                      ? "Sem mensagens no grupo"
                      : !hasMessagesToday 
                        ? "Não há mensagens hoje no grupo"
                        : (group.resumo || "Sem descrição")
                    }
                  </div>
                </TableCell>
                <TableCell className="text-center">
                  {getStatusIndicator(group.status, group.resumo)}
                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </div>
  );
};