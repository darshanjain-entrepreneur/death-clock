import { startTransition, useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { LogOut, Radar, Sparkles } from 'lucide-react';

import AuthShell from './components/AuthShell.jsx';
import CountdownCard from './components/CountdownCard.jsx';
import HabitLab from './components/HabitLab.jsx';
import HistoryRail from './components/HistoryRail.jsx';
import QuizFlow from './components/QuizFlow.jsx';
import ReadingPanel from './components/ReadingPanel.jsx';
import ShareCard from './components/ShareCard.jsx';
import { useAuth } from './context/AuthContext.jsx';
import api from './lib/api.js';
import { allResponsesComplete, emptyHabitState, normalizeResponses } from './lib/quiz.js';

function getApiErrorMessage(error, fallbackMessage) {
  const responseData = error.response?.data;
  const fieldErrors = responseData?.errors?.fieldErrors;
  const firstFieldError = fieldErrors ? Object.values(fieldErrors).flat().find(Boolean) : '';

  return responseData?.message || firstFieldError || fallbackMessage;
}

function BootScreen() {
  return (
    <div className="boot-screen">
      <div className="boot-orbit" />
      <p>Loading your Death Clock...</p>
    </div>
  );
}

export default function App() {
  const { isBooting, logout, setAuth, user } = useAuth();
  const [authMode, setAuthMode] = useState('register');
  const [authError, setAuthError] = useState('');
  const [isAuthBusy, setIsAuthBusy] = useState(false);
  const [latestResult, setLatestResult] = useState(null);
  const [history, setHistory] = useState([]);
  const [responses, setResponses] = useState({});
  const [habitAdjustments, setHabitAdjustments] = useState(emptyHabitState);
  const [isCalculating, setIsCalculating] = useState(false);
  const [apiError, setApiError] = useState('');
  const [isQuizOpen, setIsQuizOpen] = useState(true);

  useEffect(() => {
    if (!user) {
      setLatestResult(null);
      setHistory([]);
      setResponses({});
      setHabitAdjustments(emptyHabitState);
      setIsQuizOpen(true);
      return;
    }

    let ignore = false;

    Promise.all([api.get('/results/latest'), api.get('/results/history')])
      .then(([latestResponse, historyResponse]) => {
        if (ignore) {
          return;
        }

        startTransition(() => {
          const result = latestResponse.data.result;
          const normalizedResponses = normalizeResponses(result?.responses || {});
          setLatestResult(result || null);
          setHistory(historyResponse.data.history || []);
          setResponses(normalizedResponses);
          setHabitAdjustments({ ...emptyHabitState, ...(result?.habitAdjustments || {}) });
          setIsQuizOpen(!result || !allResponsesComplete(normalizedResponses));
        });
      })
      .catch((error) => {
        if (!ignore) {
          setApiError(getApiErrorMessage(error, 'Unable to load your dashboard.'));
        }
      });

    return () => {
      ignore = true;
    };
  }, [user]);

  const handleAuthSubmit = async (payload) => {
    setIsAuthBusy(true);
    setAuthError('');

    try {
      const endpoint = authMode === 'register' ? '/auth/register' : '/auth/login';
      const { data } = await api.post(endpoint, payload);
      setAuth(data);
    } catch (error) {
      setAuthError(getApiErrorMessage(error, 'Authentication failed.'));
    } finally {
      setIsAuthBusy(false);
    }
  };

  const mergeHistory = (result) => {
    setHistory((current) => {
      const next = [
        {
          _id: result._id,
          estimatedLifespan: result.estimatedLifespan,
          remainingYears: result.remainingYears,
          lifeScore: result.lifeScore,
          createdAt: result.createdAt
        },
        ...current.filter((entry) => entry._id !== result._id)
      ];

      return next.slice(0, 12);
    });
  };

  const calculate = async (nextResponses, nextHabits) => {
    setIsCalculating(true);
    setApiError('');

    try {
      const { data } = await api.post('/results/calculate', {
        responses: nextResponses,
        habitAdjustments: nextHabits
      });

      startTransition(() => {
        setLatestResult(data.result);
        setResponses(data.result.responses || nextResponses);
        setHabitAdjustments({ ...emptyHabitState, ...(data.result.habitAdjustments || nextHabits) });
        setIsQuizOpen(false);
        mergeHistory(data.result);
      });
    } catch (error) {
      setApiError(getApiErrorMessage(error, 'Calculation failed. Please try again.'));
    } finally {
      setIsCalculating(false);
    }
  };

  const handleQuizSubmit = async (draft) => {
    setResponses(draft);
    await calculate(draft, habitAdjustments);
  };

  const handleHabitToggle = async (key) => {
    const nextHabits = {
      ...habitAdjustments,
      [key]: !habitAdjustments[key]
    };

    setHabitAdjustments(nextHabits);

    if (allResponsesComplete(responses)) {
      await calculate(responses, nextHabits);
    }
  };

  if (isBooting) {
    return <BootScreen />;
  }

  return (
    <div className="app-shell">
      <div className="ambient ambient-one" />
      <div className="ambient ambient-two" />

      {!user ? (
        <main className="landing-layout">
          <motion.section
            className="hero-copy"
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          >
            <span className="eyebrow">A dark future reading</span>
            <h1>The habits you repeat in private are already negotiating with your future.</h1>
            <p>
              Move through ten uncomfortable signals, rate yourself from 1 to 10, unlock an age-adjusted live countdown, and see how a different version of you changes the reading.
            </p>

            <div className="hero-badges">
              <span>
                <Radar size={16} />
                Live countdown
              </span>
              <span>
                <Sparkles size={16} />
                Instant habit simulation
              </span>
            </div>
          </motion.section>

          <AuthShell error={authError} isBusy={isAuthBusy} mode={authMode} onModeChange={setAuthMode} onSubmit={handleAuthSubmit} />
        </main>
      ) : (
        <main className="dashboard-layout">
          <header className="topbar">
            <div>
              <span className="eyebrow">Death Clock dashboard</span>
              <h1>Welcome back, {user.name.split(' ')[0]}</h1>
            </div>

            <button className="ghost-button" onClick={logout} type="button">
              <LogOut size={16} />
              Log out
            </button>
          </header>

          {apiError ? <p className="feedback error standalone">{apiError}</p> : null}

          {!latestResult || isQuizOpen ? (
            <QuizFlow initialResponses={responses} isBusy={isCalculating} onSubmit={handleQuizSubmit} />
          ) : null}

          {latestResult && !isQuizOpen ? (
            <>
              <section className="dashboard-grid hero-grid">
                <CountdownCard result={latestResult} userName={user.name.split(' ')[0]} />
                <ShareCard result={latestResult} userName={user.name.split(' ')[0]} />
              </section>

              <section className="dashboard-grid utility-grid">
                <HabitLab canInteract={allResponsesComplete(responses)} isBusy={isCalculating} onToggle={handleHabitToggle} selectedHabits={habitAdjustments} />
                <HistoryRail history={history} />
              </section>

              <ReadingPanel result={latestResult} />

              <section className="card-panel edit-panel">
                <div>
                  <span className="eyebrow">Refine the model</span>
                  <h2>Want to answer the ten signals again?</h2>
                </div>
                <button className="primary-button" onClick={() => setIsQuizOpen(true)} type="button">
                  Reopen the 10-question reading
                </button>
              </section>
            </>
          ) : null}
        </main>
      )}
    </div>
  );
}
