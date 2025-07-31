export const formatDate = (dateString: string | null) => {
  if (!dateString) return "Data não disponível";
  
  try {
    const date = new Date(dateString);
    if (isNaN(date.getTime())) {
      return dateString;
    }
    return date.toLocaleDateString('pt-BR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  } catch {
    return dateString || "Data não disponível";
  }
};

export const isMessageFromToday = (dateString: string | null) => {
  if (!dateString) return false;
  
  try {
    const messageDate = new Date(dateString);
    const today = new Date();
    
    return messageDate.toDateString() === today.toDateString();
  } catch {
    return false;
  }
};

export const getStatusType = (status: string | null, resumo: string | null) => {
  if (!status && !resumo) return 'sem-mensagens';
  
  const statusLower = (status || '').toLowerCase();
  const resumoLower = (resumo || '').toLowerCase();
  
  // Verificar se é "sem mensagens" explicitamente
  if (statusLower.includes('sem mensagens') || statusLower.includes('sem mensagem') ||
      resumoLower.includes('sem mensagens') || resumoLower.includes('sem mensagem')) {
    return 'sem-mensagens';
  }
  
  // Verificar se é crítico
  if (statusLower.includes('crítico') || statusLower.includes('critico') || 
      resumoLower.includes('crítico') || resumoLower.includes('critico')) {
    return 'critico';
  }
  
  // Verificar se é alerta
  if (statusLower.includes('alerta') || statusLower.includes('warning') ||
      resumoLower.includes('alerta') || resumoLower.includes('warning')) {
    return 'alerta';
  }
  
  // Verificar se é estável
  if (statusLower.includes('estável') || statusLower.includes('estavel') || 
      statusLower.includes('ativo') || statusLower.includes('ok') ||
      resumoLower.includes('estável') || resumoLower.includes('estavel') ||
      resumoLower.includes('ativo') || resumoLower.includes('ok')) {
    return 'estavel';
  }
  
  return 'sem-categoria';
};

export const clearStatusWhenNoMessages = async (groupId: number) => {
  const { supabase } = await import('@/integrations/supabase/client');
  
  try {
    const { error } = await supabase
      .from('Lista_de_Grupos')
      .update({ 
        status: null,
        resumo: 'Sem mensagens no grupo'
      })
      .eq('id', groupId);

    if (error) {
      console.error('Erro ao limpar status:', error);
      throw error;
    }
    
    console.log(`Status removido para o grupo ${groupId} (sem mensagens)`);
    return true;
  } catch (error) {
    console.error('Erro ao atualizar status do grupo:', error);
    return false;
  }
};