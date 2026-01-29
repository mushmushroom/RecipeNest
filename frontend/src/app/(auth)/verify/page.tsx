import VerifyContainer from "@/components/auth/VerifyContainer";
import { Suspense } from "react";


export default function VerifyPage() {
  return (
      <Suspense fallback={<div>Loading...</div>}>
        <VerifyContainer />
      </Suspense>
    );
}
