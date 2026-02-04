import { Badge } from '@/components/ui/badge';

export const ConfidenceBadge = ({
  confidence,
}: {
  confidence: 'high' | 'medium' | 'lock';
}) => {
  const styles = {
    lock: 'bg-gradient-to-r from-amber-500/20 to-orange-500/20 text-amber-400 border-amber-500/30',
    high: 'bg-gradient-to-r from-emerald-500/20 to-green-500/20 text-emerald-400 border-emerald-500/30',
    medium: 'bg-gradient-to-r from-blue-500/20 to-cyan-500/20 text-blue-400 border-blue-500/30',
  };

  const labels = {
    lock: '🔒 LOCK',
    high: '⭐ HIGH',
    medium: '📊 MEDIUM',
  };

  return (
    <Badge className={`${styles[confidence]} border`}>
      {labels[confidence]}
    </Badge>
  );
};
