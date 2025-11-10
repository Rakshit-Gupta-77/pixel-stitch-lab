import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Mail, MessageSquare, Phone } from "lucide-react";

const Contact = () => {
  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header />
      
      <main className="flex-1 container mx-auto px-4 py-12">
        <div className="max-w-6xl mx-auto space-y-12">
          {/* Header */}
          <div className="text-center space-y-4">
            <h1 className="text-5xl font-bold">Get in Touch</h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Have questions? We'd love to hear from you. Send us a message and we'll respond as soon as possible.
            </p>
          </div>

          <div className="grid lg:grid-cols-[1fr_400px] gap-12">
            {/* Contact Form */}
            <div className="bg-card rounded-lg border p-8 space-y-6">
              <h2 className="text-2xl font-bold">Send us a Message</h2>

              <form className="space-y-4">
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>First Name</Label>
                    <Input placeholder="John" />
                  </div>
                  <div className="space-y-2">
                    <Label>Last Name</Label>
                    <Input placeholder="Doe" />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label>Email</Label>
                  <Input type="email" placeholder="john.doe@example.com" />
                </div>

                <div className="space-y-2">
                  <Label>Subject</Label>
                  <Input placeholder="How can we help?" />
                </div>

                <div className="space-y-2">
                  <Label>Message</Label>
                  <Textarea
                    placeholder="Tell us more about your inquiry..."
                    className="min-h-[150px]"
                  />
                </div>

                <Button variant="hero" size="lg" className="w-full">
                  Send Message
                </Button>
              </form>
            </div>

            {/* Contact Info & FAQ */}
            <div className="space-y-6">
              {/* Contact Cards */}
              <div className="space-y-4">
                <div className="bg-card rounded-lg border p-6 space-y-3">
                  <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                    <Mail className="h-6 w-6 text-primary" />
                  </div>
                  <h3 className="font-semibold">Email Us</h3>
                  <p className="text-sm text-muted-foreground">support@styleyourway.com</p>
                </div>

                <div className="bg-card rounded-lg border p-6 space-y-3">
                  <div className="w-12 h-12 rounded-full bg-accent/10 flex items-center justify-center">
                    <Phone className="h-6 w-6 text-accent" />
                  </div>
                  <h3 className="font-semibold">Call Us</h3>
                  <p className="text-sm text-muted-foreground">+1 (555) 123-4567</p>
                </div>

                <div className="bg-card rounded-lg border p-6 space-y-3">
                  <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                    <MessageSquare className="h-6 w-6 text-primary" />
                  </div>
                  <h3 className="font-semibold">Live Chat</h3>
                  <Button variant="outline" size="sm" className="w-full">Start Chat</Button>
                </div>
              </div>

              {/* FAQ */}
              <div className="bg-card rounded-lg border p-6">
                <h3 className="font-bold text-lg mb-4">Frequently Asked Questions</h3>
                <Accordion type="single" collapsible className="w-full">
                  <AccordionItem value="item-1">
                    <AccordionTrigger>How long does shipping take?</AccordionTrigger>
                    <AccordionContent>
                      Standard shipping typically takes 5-7 business days. Express shipping is available for 2-3 day delivery.
                    </AccordionContent>
                  </AccordionItem>
                  <AccordionItem value="item-2">
                    <AccordionTrigger>Can I return my custom design?</AccordionTrigger>
                    <AccordionContent>
                      We accept returns within 30 days for manufacturing defects. Custom designs are made to order and cannot be returned unless defective.
                    </AccordionContent>
                  </AccordionItem>
                  <AccordionItem value="item-3">
                    <AccordionTrigger>How does the AI designer work?</AccordionTrigger>
                    <AccordionContent>
                      Simply describe your design idea in text, and our AI will generate multiple design options for you to choose from and customize further.
                    </AccordionContent>
                  </AccordionItem>
                </Accordion>
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Contact;
