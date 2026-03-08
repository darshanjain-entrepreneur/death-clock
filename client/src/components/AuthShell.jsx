import { motion } from 'framer-motion';

const initialForms = {
  login: {
    email: '',
    password: ''
  },
  register: {
    name: '',
    email: '',
    password: '',
    birthDate: ''
  }
};

export default function AuthShell({ mode, onModeChange, onSubmit, isBusy, error }) {
  const form = initialForms[mode];

  return (
    <motion.div
      className="auth-card card-panel"
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
    >
      <div className="auth-tabs">
        <button className={mode === 'register' ? 'tab active' : 'tab'} onClick={() => onModeChange('register')} type="button">
          Create account
        </button>
        <button className={mode === 'login' ? 'tab active' : 'tab'} onClick={() => onModeChange('login')} type="button">
          Sign in
        </button>
      </div>

      <form
        className="auth-form"
        key={mode}
        onSubmit={(event) => {
          event.preventDefault();
          const payload = Object.fromEntries(new FormData(event.currentTarget).entries());
          onSubmit(payload);
        }}
      >
        {mode === 'register' ? (
          <>
            <label>
              <span>Name</span>
              <input defaultValue={form.name} name="name" placeholder="Ava Stone" required type="text" />
            </label>
            <label>
              <span>Birth date</span>
              <input defaultValue={form.birthDate} max={new Date().toISOString().slice(0, 10)} name="birthDate" required type="date" />
            </label>
          </>
        ) : null}

        <label>
          <span>Email</span>
          <input defaultValue={form.email} name="email" placeholder="you@example.com" required type="email" />
        </label>

        <label>
          <span>Password</span>
          <input defaultValue={form.password} minLength={8} name="password" placeholder="Use 8 or more characters" required type="password" />
        </label>

        {error ? <p className="feedback error">{error}</p> : null}

        <button className="primary-button" disabled={isBusy} type="submit">
          {isBusy ? 'Working...' : mode === 'register' ? 'Unlock my clock' : 'Open dashboard'}
        </button>
      </form>

      <p className="auth-footnote">
        Your birth date stays private and powers the live countdown. Passwords are hashed server-side with bcrypt.
      </p>
    </motion.div>
  );
}
