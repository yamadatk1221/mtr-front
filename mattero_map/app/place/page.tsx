import { Suspense } from "react";
import PlaceClient from "./PlaceClient";

export default function Page() {
  return (
    <Suspense fallback={<div style={{ padding: 12 }}>Loading...</div>}>
      <PlaceClient />
    </Suspense>
  );
}
