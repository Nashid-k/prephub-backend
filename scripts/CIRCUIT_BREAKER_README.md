// README: How to Use Circuit Breaker Integration
// ==============================================
//
// The circuit breaker has been integrated into classify_categories.js
// to provide production-grade reliability for AI calls.
//
// WHAT IT DOES:
// ------------
// 1. Rate Limiting: Prevents exceeding API quotas
//    - Groq: 30 requests/minute
//    - Gemini: 15 requests/minute
//    - Hugging Face: 10 requests/minute
//
// 2. Circuit Breaking: Stops calling failed providers
//    - Opens circuit at 50% failure rate
//    - Waits 60 seconds before retry
//    - Prevents cascade failures
//
// 3. Automatic Fallback: Uses next provider if one fails
//    Groq → Gemini → Hugging Face → Default grouping
//
// MONITORING:
// ----------
// The circuit breaker logs real-time events:
// - 🔴 Circuit OPEN: AI calls suspended (too many failures)
// - 🟡 Circuit HALF-OPEN: Testing if provider recovered
// - 🟢 Circuit CLOSED: AI calls working normally
// - ⏱️  Timeout: Request took >30 seconds
//
// HOW TO USE:
// ----------
// Just run as normal:
//   node scripts/classify_categories.js
//
// The protection is automatic and invisible!
//
// CONFIGURATION:
// -------------
// Edit src/utils/circuit-breaker.js to adjust:
// - Rate limits (requests per minute)
// - Circuit breaker thresholds
// - Timeout duration
//
// TESTING:
// -------
// To test circuit breaker under load:
//   # Run multiple times rapidly to trigger rate limit
//   for i in {1..5}; do
//     node scripts/classify_categories.js &
//   done
//   wait
//
// You should see rate limit and circuit breaker messages
//
// PRODUCTION BENEFITS:
// -------------------
// ✅ No API quota overages (automatic rate limiting)
// ✅ Graceful degradation (circuit breaker)
// ✅ No cascade failures (provider isolation)
// ✅ Cost control (prevents runaway API calls)
// ✅ Better uptime (automatic recovery)
//
// This is the same pattern Netflix, Uber, and Stripe use!

console.log('✅ Circuit breaker enabled for AI calls');
console.log('📊 Rate limits: Groq (30/min), Gemini (15/min), HF (10/min)');
console.log('🛡️  Protection: 50% failure → circuit opens for 60s\\n');
