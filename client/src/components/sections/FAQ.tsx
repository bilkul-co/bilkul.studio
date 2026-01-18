import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const faqs = [
  {
    question: "Do you work with startups or only enterprise?",
    answer: "We primarily partner with scale-ups and enterprises in the UAE, but we select 2-3 high-potential early-stage startups per year for our 'Venture Build' program."
  },
  {
    question: "What is your typical project timeline?",
    answer: "A standard website overhaul takes 4-6 weeks. Custom portals and AI integrations typically range from 8-12 weeks depending on complexity."
  },
  {
    question: "Do you offer post-launch support?",
    answer: "Yes, we offer monthly 'Growth & Maintenance' retainers which include server monitoring, content updates, and continuous optimization."
  },
  {
    question: "How do you handle AI data privacy?",
    answer: "We are strict about data sovereignty. For UAE clients, we can deploy local LLM instances or ensure enterprise-grade encryption with Microsoft Azure UAE North regions."
  }
];

export function FAQ() {
  return (
    <section className="py-24 border-t border-white/5">
      <div className="container mx-auto px-6 max-w-3xl">
        <h2 className="text-3xl font-display font-bold mb-12 text-center">Frequently Asked Questions</h2>
        
        <Accordion type="single" collapsible className="w-full">
          {faqs.map((faq, index) => (
            <AccordionItem key={index} value={`item-${index}`} className="border-white/10">
              <AccordionTrigger className="text-lg hover:text-primary hover:no-underline px-4">
                {faq.question}
              </AccordionTrigger>
              <AccordionContent className="text-muted-foreground px-4 text-base leading-relaxed">
                {faq.answer}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  );
}