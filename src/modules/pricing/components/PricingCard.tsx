import { Button } from "@/shared/components/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/shared/components/card";
import { paymentService } from "../services";
import { Check } from "lucide-react";
import { useState } from "react";

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
  const [loading, setLoading] = useState(false);

  const handleCheckout = async () => {
    try {
      setLoading(true);
      const url = await paymentService.subscribe(id);
      window.location.href = url;
    } catch (error) {
      console.error("Stripe checkout error:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card
      className={`relative flex flex-col ${
        popular
          ? "border-primary shadow-primary/20 scale-105 shadow-lg"
          : "border-border"
      }`}
    >
      {popular && (
        <div className="absolute -top-3 left-1/2 -translate-x-1/2">
          <span className="bg-primary text-primary-foreground rounded-full px-3 py-1 text-xs font-semibold">
            Most Popular
          </span>
        </div>
      )}

      <CardHeader className="pb-4 text-center">
        <div className="text-primary mb-2 text-xs font-semibold tracking-wider uppercase">
          {highlight}
        </div>
        <CardTitle className="font-display text-2xl">{name}</CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>

      <CardContent className="flex-1">
        <div className="mb-6 text-center">
          <span className="font-display text-5xl font-bold">${price}</span>
          <span className="text-muted-foreground ml-2">/ {period}</span>
        </div>
        <ul className="space-y-3">
          {features.map((feature, idx) => (
            <li key={idx} className="flex items-center gap-3">
              <Check className="text-primary h-5 w-5 flex-shrink-0" />
              <span className="text-muted-foreground text-sm">{feature}</span>
            </li>
          ))}
        </ul>
      </CardContent>

      <CardFooter>
        <Button
          className="w-full"
          variant={popular ? "default" : "outline"}
          onClick={() => handleCheckout()}
          disabled={loading}
        >
          {loading
            ? "Redirecting..."
            : name === "Starter"
              ? "Start Free Trial"
              : "Get Started"}
        </Button>
      </CardFooter>
    </Card>
  );
};
