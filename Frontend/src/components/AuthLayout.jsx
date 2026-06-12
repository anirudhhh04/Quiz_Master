function AuthLayout({ children }) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-600 to-slate-900 flex items-center justify-center p-4">

      <div className="w-full max-w-md bg-white rounded-2xl shadow-2xl p-8">

        {children}

      </div>

    </div>
  );
}

export default AuthLayout;