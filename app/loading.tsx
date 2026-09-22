export default function Loading() {
  return (
    <main className="loading-screen" aria-live="polite" aria-busy="true">
      <p>SAUNA WHISKS</p>
      <div className="loading-line" />
      <span>Loading…</span>
    </main>
  );
}
