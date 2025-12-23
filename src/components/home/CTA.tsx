import Link from "next/link";
import {Button} from "@/components/ui/button";

export const CTA = () => {
    return (
        <section className="container mx-auto px-6 py-16 border-t border-border">
            <div className="text-center max-w-3xl mx-auto bg-gradient-to-r from-card to-card/50 rounded-2xl p-12 border border-border">
                <h3 className="text-3xl md:text-4xl font-display font-bold mb-4">
                    Get Exclusive Access to Expert Predictions Before Everyone Else
                </h3>
                <p className="text-lg text-muted-foreground mb-8">
                    Join thousands of smart bettors who receive premium insights, real-time odds analysis, and expert predictions. Our AI-powered platform helps you make informed decisions and maximize your winning potential
                </p>
                <Link href="/sign-up">
                    <Button size="lg" className="bg-primary hover:bg-primary/90 text-primary-foreground">
                        Sign Up
                    </Button>
                </Link>
            </div>
        </section>
    )
}