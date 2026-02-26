import { FAQS } from '../constants';

export const PricingFAQ = () => {
  return (
    <div className="mt-24 max-w-3xl mx-auto">
      <h2 className="text-3xl font-display font-bold text-center mb-12">
        Frequently Asked Questions
      </h2>
      <div className="space-y-6">
        {FAQS.map((faq, idx) => (
          <div key={idx} className="border border-border rounded-lg p-6">
            <h3 className="text-lg font-semibold mb-2">{faq.question}</h3>
            <p className="text-muted-foreground">{faq.answer}</p>
          </div>
        ))}
      </div>
    </div>
  );
};
