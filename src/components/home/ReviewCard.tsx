import { Star } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";

interface ReviewCardProps {
    name: string;
    rating: number;
    review: string;
}

const ReviewCard = ({ name, rating, review }: ReviewCardProps) => {
    return (
        <Card className="p-6 bg-card border-border">
            <div className="flex items-center gap-4 mb-4">
                <Avatar>
                    <AvatarFallback className="bg-primary/20 text-primary">
                        {name.charAt(0).toUpperCase()}
                    </AvatarFallback>
                </Avatar>
                <div className="flex-1">
                    <h4 className="font-semibold text-foreground">{name}</h4>
                    <div className="flex gap-1">
                        {[...Array(rating)].map((_, i) => (
                            <Star key={i} className="w-4 h-4 fill-primary text-primary" />
                        ))}
                    </div>
                </div>
            </div>
            <p className="text-muted-foreground">{review}</p>
        </Card>
    );
};

export default ReviewCard;
