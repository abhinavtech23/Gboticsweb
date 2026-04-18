"use client";

import { useState, useEffect, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { CheckCircle2, XCircle, Loader2, ArrowRight } from "lucide-react";

function VerifyContent() {
  const searchParams = useSearchParams();
  const token = searchParams.get("token");
  const [status, setStatus] = useState<"loading" | "success" | "error">("loading");
  const [message, setMessage] = useState("");

  useEffect(() => {
    if (!token) {
      setStatus("error");
      setMessage("No verification token provided.");
      return;
    }

    const verify = async () => {
      try {
        const res = await fetch(`/api/auth/verify?token=${token}`);
        const data = await res.json();

        if (res.ok) {
          setStatus("success");
          setMessage(data.message);
        } else {
          setStatus("error");
          setMessage(data.error || "Verification failed");
        }
      } catch {
        setStatus("error");
        setMessage("Something went wrong. Please try again.");
      }
    };

    verify();
  }, [token]);

  return (
    <div className="min-h-screen flex items-center justify-center px-4 pt-24 pb-16 relative">
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-96 h-96 bg-[#00f0ff]/5 rounded-full blur-[120px] pointer-events-none" />

      <div className="w-full max-w-md relative z-10">
        <div className="bg-[#0d1117]/80 backdrop-blur-xl border border-white/[0.08] rounded-2xl p-8 shadow-[0_0_60px_rgba(0,0,0,0.5)] text-center">
          {status === "loading" && (
            <>
              <div className="w-20 h-20 rounded-full bg-[#00f0ff]/10 border border-[#00f0ff]/20 flex items-center justify-center mx-auto mb-6">
                <Loader2 size={40} className="text-[#00f0ff] animate-spin" />
              </div>
              <h1 className="text-2xl font-bold mb-3">Verifying Email...</h1>
              <p className="text-white/50">Please wait while we verify your email address.</p>
            </>
          )}

          {status === "success" && (
            <>
              <div className="w-20 h-20 rounded-full bg-green-500/10 border border-green-500/20 flex items-center justify-center mx-auto mb-6">
                <CheckCircle2 size={40} className="text-green-400" />
              </div>
              <h1 className="text-2xl font-bold mb-3">Email Verified!</h1>
              <p className="text-white/50 mb-8">{message}</p>
              <Link
                href="/login"
                className="inline-flex items-center gap-2 bg-gradient-to-r from-[#00f0ff] to-blue-500 text-black font-bold px-8 py-3.5 rounded-xl hover:shadow-[0_0_30px_rgba(0,240,255,0.3)] transition-all duration-300"
              >
                Sign In Now
                <ArrowRight size={18} />
              </Link>
            </>
          )}

          {status === "error" && (
            <>
              <div className="w-20 h-20 rounded-full bg-red-500/10 border border-red-500/20 flex items-center justify-center mx-auto mb-6">
                <XCircle size={40} className="text-red-400" />
              </div>
              <h1 className="text-2xl font-bold mb-3">Verification Failed</h1>
              <p className="text-white/50 mb-8">{message}</p>
              <Link
                href="/register"
                className="inline-flex items-center gap-2 text-[#00f0ff] font-medium hover:text-white transition-colors"
              >
                Try Again
                <ArrowRight size={16} />
              </Link>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

export default function VerifyPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 size={40} className="text-[#00f0ff] animate-spin" />
      </div>
    }>
      <VerifyContent />
    </Suspense>
  );
}
