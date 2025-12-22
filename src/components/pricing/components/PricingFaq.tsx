const faqs = [
    {
        question: "How do your predictions work?",
        answer: "Our AI analyzes thousands of data points including player stats, team performance, historical matchups, and real-time conditions to generate accurate predictions with confidence ratings.",
    },
    {
        question: "Can I cancel my subscription anytime?",
        answer: "Yes, you can cancel your subscription at any time from your account settings. Your access will continue until the end of your current billing period.",
    },
    {
        question: "What sports do you cover?",
        answer: "We currently cover NBA, NFL, MLB, NHL, Soccer, and UFC. We're constantly expanding our coverage based on user demand and data availability.",
    },
    {
        question: "How is the free trial different from a paid subscription?",
        answer: "The 3-day free trial gives you full access to all features included in the Starter plan. If you don't cancel before the trial ends, you'll be automatically charged for the subscription.",
    },
    {
        question: "Do you offer refunds?",
        answer: "Refunds are not provided once a subscription begins, unless otherwise stated by EdgeBet staff. We recommend using the free trial to ensure our service meets your needs.",
    },
];

export const PricingFAQ = () => {
    return (
        <div className="mt-24 max-w-3xl mx-auto">
            <h2 className="text-3xl font-display font-bold text-center mb-12">
                Frequently Asked Questions
            </h2>
            <div className="space-y-6">
                {faqs.map((faq, idx) => (
                    <div key={idx} className="border border-border rounded-lg p-6">
                        <h3 className="text-lg font-semibold mb-2">{faq.question}</h3>
                        <p className="text-muted-foreground">{faq.answer}</p>
                    </div>
                ))}
            </div>
        </div>
    );
};