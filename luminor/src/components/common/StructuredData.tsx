import { serializeStructuredData } from "@/data/structuredData";

export default function StructuredData({ id, data }: { id: string; data: Record<string, unknown> }) {
    return <script id={id} type="application/ld+json" dangerouslySetInnerHTML={{ __html: serializeStructuredData(data) }} />;
}
