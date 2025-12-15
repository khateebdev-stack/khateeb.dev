import { Suspense } from "react";
import { ContactSection } from "@/components/home/ContactSection";

export default function ContactPage() {
    return (
        <div className="pt-20 pb-16">
            <Suspense fallback={<div className="container py-20 text-center">Loading form...</div>}>
                <ContactSection />
            </Suspense>
        </div>
    );
}
