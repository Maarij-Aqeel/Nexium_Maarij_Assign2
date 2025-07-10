import { Suspense } from "react";
import SummaryClient from "./SummaryClient";

export default function SummarizePage() {
  return (
    <Suspense fallback={<div className="p-10 text-center text-gray-500">Loading...</div>}>
      <SummaryClient />
    </Suspense>
  );
}
