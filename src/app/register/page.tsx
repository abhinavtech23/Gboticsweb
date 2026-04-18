"use client";

import { useState } from "react";
import Link from "next/link";
import { UserPlus, Mail, Lock, Eye, EyeOff, User, ArrowRight, Loader2, CheckCircle2 } from "lucide-react";

export default function RegisterPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    if (password !== confirmPassword) {
      setError("Passwords do not match");
      setLoading(false);
      return;
    }

    if (password.length < 8) {
      setError("Password must be at least 8 characters");
      setLoading(false);
      return;
    }

    try {
      const res = await fetch("/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password, name }),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.error || "Registration failed");
        return;
      }

      setSuccess(true);
    } catch {
      setError("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  if (success) {
    return (
      <div className="min-h-screen flex items-center justify-center px-4 pt-24 pb-16 relative">
        <div className="absolute top-1/3 left-1/3 w-80 h-80 bg-green-500/5 rounded-full blur-[120px] pointer-events-none" />
        
        <div className="w-full max-w-md relative z-10">
          <div className="bg-[#0d1117]/80 backdrop-blur-xl border border-white/[0.08] rounded-2xl p-8 shadow-[0_0_60px_rgba(0,0,0,0.5)] text-center">
            <div className="w-20 h-20 rounded-full bg-green-500/10 border border-green-500/20 flex items-center justify-center mx-auto mb-6">
              <CheckCircle2 size={40} className="text-green-400" />
            </div>
            <h1 className="text-2xl font-bold mb-3">Check Your Email</h1>
            <p className="text-white/50 leading-relaxed mb-8">
              We&apos;ve sent a verification link to <span className="text-[#00f0ff] font-medium">{email}</span>.
              Please click the link to verify your account.
            </p>
            <div className="bg-white/[0.03] border border-white/[0.06] rounded-xl p-4 mb-6">
              <p className="text-white/40 text-sm">
                Didn&apos;t receive the email? Check your spam folder or make sure your email address is correct.
              </p>
            </div>
            <Link
              href="/login"
              className="inline-flex items-center gap-2 text-[#00f0ff] font-medium hover:text-white transition-colors"
            >
              Go to Login
              <ArrowRight size={16} />
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center px-4 pt-24 pb-16 relative">
      <div className="absolute top-1/4 right-1/4 w-72 h-72 bg-[#00f0ff]/5 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-1/3 left-1/3 w-96 h-96 bg-purple-600/5 rounded-full blur-[120px] pointer-events-none" />

      <div className="w-full max-w-md relative z-10">
        {/* Logo */}
        <div className="flex items-center justify-center gap-3 mb-10">
          <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-[#00f0ff] to-blue-600 flex items-center justify-center">
            <span className="font-black text-white text-xl">G</span>
          </div>
          <span className="font-bold text-2xl tracking-widest">GBOTICS</span>
        </div>

        <div className="bg-[#0d1117]/80 backdrop-blur-xl border border-white/[0.08] rounded-2xl p-8 shadow-[0_0_60px_rgba(0,0,0,0.5)]">
          <div className="flex justify-center mb-6">
            <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-purple-500/20 to-[#00f0ff]/20 border border-purple-500/20 flex items-center justify-center">
              <UserPlus size={28} className="text-purple-400" />
            </div>
          </div>

          <h1 className="text-2xl font-bold text-center mb-2">Create Account</h1>
          <p className="text-white/50 text-center text-sm mb-8">
            Join the future of robotics & AI
          </p>

          {error && (
            <div className="bg-red-500/10 border border-red-500/20 rounded-xl px-4 py-3 mb-6">
              <p className="text-red-400 text-sm text-center">{error}</p>
            </div>
          )}

          <form onSubmit={handleRegister} className="space-y-4">
            <div>
              <label className="block text-white/60 text-sm font-medium mb-2">Full Name</label>
              <div className="relative">
                <User size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-white/30" />
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="John Doe"
                  className="w-full bg-white/[0.04] border border-white/10 rounded-xl pl-12 pr-4 py-3.5 text-white placeholder:text-white/25 focus:outline-none focus:border-[#00f0ff]/50 focus:bg-white/[0.06] transition-all duration-300"
                />
              </div>
            </div>

            <div>
              <label className="block text-white/60 text-sm font-medium mb-2">Email</label>
              <div className="relative">
                <Mail size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-white/30" />
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@example.com"
                  className="w-full bg-white/[0.04] border border-white/10 rounded-xl pl-12 pr-4 py-3.5 text-white placeholder:text-white/25 focus:outline-none focus:border-[#00f0ff]/50 focus:bg-white/[0.06] transition-all duration-300"
                />
              </div>
            </div>

            <div>
              <label className="block text-white/60 text-sm font-medium mb-2">Password</label>
              <div className="relative">
                <Lock size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-white/30" />
                <input
                  type={showPassword ? "text" : "password"}
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Min. 8 characters"
                  className="w-full bg-white/[0.04] border border-white/10 rounded-xl pl-12 pr-12 py-3.5 text-white placeholder:text-white/25 focus:outline-none focus:border-[#00f0ff]/50 focus:bg-white/[0.06] transition-all duration-300"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-white/30 hover:text-white/60 transition-colors"
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </div>

            <div>
              <label className="block text-white/60 text-sm font-medium mb-2">Confirm Password</label>
              <div className="relative">
                <Lock size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-white/30" />
                <input
                  type="password"
                  required
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  placeholder="Re-enter password"
                  className="w-full bg-white/[0.04] border border-white/10 rounded-xl pl-12 pr-4 py-3.5 text-white placeholder:text-white/25 focus:outline-none focus:border-[#00f0ff]/50 focus:bg-white/[0.06] transition-all duration-300"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-gradient-to-r from-[#00f0ff] to-blue-500 text-black font-bold py-3.5 rounded-xl hover:shadow-[0_0_30px_rgba(0,240,255,0.3)] disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 flex items-center justify-center gap-2 group mt-2"
            >
              {loading ? (
                <>
                  <Loader2 size={18} className="animate-spin" />
                  Creating account...
                </>
              ) : (
                <>
                  Create Account
                  <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
                </>
              )}
            </button>
          </form>

          <div className="mt-8 pt-6 border-t border-white/[0.06]">
            <p className="text-center text-white/40 text-sm">
              Already have an account?{" "}
              <Link href="/login" className="text-[#00f0ff] hover:text-white transition-colors font-medium">
                Sign in
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
