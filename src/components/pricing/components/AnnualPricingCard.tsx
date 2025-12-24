import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import paymentService from '@/services/payment';
import { useState } from 'react';

interface AnnualPlanCardProps {
  id: number;
  price: string;
  features: string[];
  onCheckout: (id: number) => void;
  isLoading: boolean;
}

export const AnnualPlanCard = ({
  id,
  price,
  features,
  onCheckout,
  isLoading,
}: AnnualPlanCardProps) => {
  const [loading, setLoading] = useState(false);

  const handleCheckout = async () => {
    try {
      setLoading(true);
      const url = await paymentService.subscribe(id);
      window.location.href = url;
    } catch (error) {
      console.error('Stripe checkout error:', error);
    } finally {
      setLoading(false);
    }
  };
  return (
    <div className="mx-auto mb-16 max-w-3xl">
      <Card className="border-primary/50 from-primary/5 border-2 bg-gradient-to-br to-transparent">
        <CardHeader className="text-center">
          <div className="bg-primary/10 text-primary mx-auto mb-4 inline-flex items-center justify-center gap-2 rounded-full px-4 py-1.5 text-sm font-semibold">
            🎉 2 Months Free
          </div>
          <CardTitle className="font-display text-3xl">Annual Plan</CardTitle>
          <CardDescription>{features[0]}</CardDescription>
        </CardHeader>
        <CardContent className="text-center">
          <div className="mb-6">
            <span className="font-display text-6xl font-bold">${price}</span>
            <span className="text-muted-foreground ml-2">/ year</span>
          </div>
          <p className="text-muted-foreground mb-6">{features[1]}</p>
          <Button
            size="lg"
            className="px-12"
            onClick={() => handleCheckout()}
            disabled={loading}
          >
            {loading ? 'Processing...' : 'Get Annual Access'}
          </Button>
        </CardContent>
      </Card>
    </div>
  );
};
