import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

interface AnnualPlanCardProps {
    id: number;
    price: string;
    features: string[];
    onCheckout: (id: number) => void;
    isLoading: boolean;
}

export const AnnualPlanCard = ({ id, price, features, onCheckout, isLoading }: AnnualPlanCardProps) => {
    return (
        <div className="max-w-3xl mx-auto mb-16">
            <Card className="border-2 border-primary/50 bg-gradient-to-br from-primary/5 to-transparent">
                <CardHeader className="text-center">
                    <div className="inline-flex items-center justify-center gap-2 bg-primary/10 text-primary text-sm font-semibold px-4 py-1.5 rounded-full mb-4 mx-auto">
                        🎉 2 Months Free
                    </div>
                    <CardTitle className="text-3xl font-display">Annual Plan</CardTitle>
                    <CardDescription>
                        {features[0]}
                    </CardDescription>
                </CardHeader>
                <CardContent className="text-center">
                    <div className="mb-6">
                        <span className="text-6xl font-display font-bold">${price}</span>
                        <span className="text-muted-foreground ml-2">/ year</span>
                    </div>
                    <p className="text-muted-foreground mb-6">
                        {features[1]}
                    </p>
                    <Button
                        size="lg"
                        className="px-12"
                        onClick={() => onCheckout(id)}
                        disabled={isLoading}
                    >
                        {isLoading ? 'Processing...' : 'Get Annual Access'}
                    </Button>
                </CardContent>
            </Card>
        </div>
    );
};