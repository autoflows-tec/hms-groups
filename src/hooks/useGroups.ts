import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Database } from "@/integrations/supabase/types";
import { useToast } from "@/hooks/use-toast";

type Group = Database['public']['Tables']['Lista_de_Grupos']['Row'];

export const useGroups = () => {
  const [groups, setGroups] = useState<Group[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { toast } = useToast();

  const fetchGroups = async () => {
    try {
      setLoading(true);
      setError(null);
      
      console.log('🔄 Iniciando busca pelos grupos...');
      
      const { data, error: supabaseError, count } = await supabase
        .from('Lista_de_Grupos')
        .select('*', { count: 'exact' })
        .order('id', { ascending: false });

      console.log('📊 Resposta do Supabase:', { data, error: supabaseError, count });

      if (supabaseError) {
        console.error('❌ Erro do Supabase:', supabaseError);
        throw supabaseError;
      }

      console.log('✅ Dados recebidos:', data?.length || 0, 'grupos');
      setGroups(data || []);
    } catch (err) {
      console.error('💥 Erro ao buscar grupos:', err);
      setError('Não foi possível carregar os grupos. Tente novamente.');
      toast({
        title: "Erro ao carregar dados",
        description: "Não foi possível conectar com o banco de dados.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchGroups();

    // Set up realtime subscription
    const channel = supabase
      .channel('schema-db-changes')
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'Lista_de_Grupos'
        },
        (payload) => {
          console.log('Realtime update:', payload);
          fetchGroups(); // Refetch data when changes occur
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, []);

  const handleRefresh = () => {
    fetchGroups();
    toast({
      title: "Dados atualizados",
      description: "Os dados dos grupos foram atualizados com sucesso.",
    });
  };

  return {
    groups,
    loading,
    error,
    fetchGroups,
    handleRefresh
  };
};