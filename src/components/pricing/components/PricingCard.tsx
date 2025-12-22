import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Check } from "lucide-react";

interface PricingCardProps {
    id: number;
    name: string;
    price: string;
    period: string;
    description: string;
    highlight: string;
    features: string[];
    popular: boolean;
    onCheckout: (id: number) => void;
    isLoading: boolean;
}

export const PricingCard = ({
                                id,
                                name,
                                price,
                                period,
                                description,
                                highlight,
                                features,
                                popular,
                                onCheckout,
                                isLoading,
                            }: PricingCardProps) => {
    return (
        <Card
            className={`relative flex flex-col ${
                popular
                    ? "border-primary shadow-lg shadow-primary/20 scale-105"
                    : "border-border"
            }`}
        >
            {popular && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2">
          <span className="bg-primary text-primary-foreground text-xs font-semibold px-3 py-1 rounded-full">
            Most Popular
          </span>
                </div>
            )}

            <CardHeader className="text-center pb-4">
                <div className="text-xs font-semibold text-primary uppercase tracking-wider mb-2">
                    {highlight}
                </div>
                <CardTitle className="text-2xl font-display">{name}</CardTitle>
                <CardDescription>{description}</CardDescription>
            </CardHeader>

            <CardContent className="flex-1">
                <div className="text-center mb-6">
                    <span className="text-5xl font-display font-bold">${price}</span>
                    <span className="text-muted-foreground ml-2">/ {period}</span>
                </div>
                <ul className="space-y-3">
                    {features.map((feature, idx) => (
                        <li key={idx} className="flex items-center gap-3">
                            <Check className="h-5 w-5 text-primary flex-shrink-0" />
                            <span className="text-sm text-muted-foreground">{feature}</span>
                        </li>
                    ))}
                </ul>
            </CardContent>

            <CardFooter>
                <Button
                    className="w-full"
                    variant={popular ? "default" : "outline"}
                    onClick={() => onCheckout(id)}
                    disabled={isLoading}
                >
                    {isLoading ? (
                        'Redirecting...'
                    ) : (
                        name === "Starter" ? "Start Free Trial" : "Get Started"
                    )}
                </Button>
            </CardFooter>
        </Card>
    );
};