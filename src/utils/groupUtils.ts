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