import { InteractiveSection } from "@/components/home/InteractiveSection";

export default function ToolsPage() {
    return (
        <div className="pt-10">
            {/* We pass limit={null} to show ALL tools */}
            <InteractiveSection limit={null} />
        </div>
    )
}
