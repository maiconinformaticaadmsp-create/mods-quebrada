export default function AdminLoginPage() {
  return (
    <div className="min-h-screen bg-black text-white">
      <div className="mx-auto flex min-h-screen max-w-md items-center px-6">
        <div className="w-full rounded-3xl border border-white/10 bg-white/5 p-8">
          <h1 className="text-2xl font-semibold">Login do Admin</h1>
          <p className="mt-2 text-sm text-white/60">
            Acesso restrito. Informe usuário e senha.
          </p>
          <form action="/admin/login" method="post" className="mt-6 space-y-4">
            <label className="block text-sm text-white/70">
              Usuário
              <input
                type="text"
                name="username"
                required
                className="mt-2 w-full rounded-2xl border border-white/10 bg-black/40 px-4 py-3 text-white"
              />
            </label>
            <label className="block text-sm text-white/70">
              Senha
              <input
                type="password"
                name="password"
                required
                className="mt-2 w-full rounded-2xl border border-white/10 bg-black/40 px-4 py-3 text-white"
              />
            </label>
            <button
              type="submit"
              className="w-full rounded-full bg-brand px-6 py-3 text-xs uppercase tracking-[0.3em] text-black"
            >
              Entrar
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
