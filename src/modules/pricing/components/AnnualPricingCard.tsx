import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/shared/components/card';
import { Button } from '@/shared/components/button';
import { paymentService } from '../services';
import { useState } from 'react';
import { getPromotekitReferral } from '@/shared/utils';

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
      const referral = getPromotekitReferral();
      const url = await paymentService.subscribe(id, referral);
      window.location.href = url;
    } catch (error) {
      console.error('Stripe checkout error:', error);
    } finally {
      setLoading(false);
    }
  };
  return (
    <div className="mx-auto mb-16 max-w-3xl">
      <Card className="border-2 border-primary/50 bg-gradient-to-br from-primary/5 to-transparent">
        <CardHeader className="text-center">
          <div className="mx-auto mb-4 inline-flex items-center justify-center gap-2 rounded-full bg-primary/10 px-4 py-1.5 text-sm font-semibold text-primary">
            🎉 2 Months Free
          </div>
          <CardTitle className="font-display text-3xl">Annual Plan</CardTitle>
          <CardDescription>{features[0]}</CardDescription>
        </CardHeader>
        <CardContent className="text-center">
          <div className="mb-6">
            <span className="font-display text-6xl font-bold">${price}</span>
            <span className="ml-2 text-muted-foreground">/ year</span>
          </div>
          <p className="mb-6 text-muted-foreground">{features[1]}</p>
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
