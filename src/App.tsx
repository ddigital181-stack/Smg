import { useState } from 'react';
import {
  ArrowLeft,
  ArrowRight,
  BatteryCharging,
  Bell,
  Check,
  ChevronDown,
  CircleUserRound,
  Eye,
  EyeOff,
  Gift,
  Headphones,
  House,
  LockKeyhole,
  LogIn,
  LogOut,
  Menu,
  Package,
  ShieldCheck,
  Smartphone,
  Star,
  TrendingUp,
  UserPlus,
  Users,
  WalletCards,
  X,
} from 'lucide-react';

type Screen = 'welcome' | 'login' | 'signup' | 'dashboard';

const phoneCountries = [
  { code: '+225', name: 'Côte d’Ivoire' },
  { code: '+33', name: 'France' },
  { code: '+221', name: 'Sénégal' },
];

function Brand() {
  return (
    <div className="brand" aria-label="SunSeeker">
      <div className="brand-mark"><span /></div>
      <div>
        <strong>SUNSEEKER</strong>
        <small>PLATEFORME INTELLIGENTE</small>
      </div>
    </div>
  );
}

function MobileHeader({ onMenu }: { onMenu: () => void }) {
  return (
    <header className="mobile-header">
      <button className="icon-button" aria-label="Retour"><ArrowLeft size={23} /></button>
      <Brand />
      <button className="icon-button" aria-label="Menu" onClick={onMenu}><Menu size={23} /></button>
    </header>
  );
}

function WelcomeModal({ onClose, onLogin }: { onClose: () => void; onLogin: () => void }) {
  return (
    <div className="modal-layer" role="dialog" aria-modal="true" aria-label="Bienvenue">
      <div className="welcome-modal">
        <button className="modal-close" onClick={onClose} aria-label="Fermer"><X size={22} /></button>
        <h1>Bienvenue sur SunSeeker</h1>
        <p>Bienvenue chez SunSeeker !</p>
        <p>SunSeeker s’engage pour un développement durable à long terme.</p>
        <p>Ce projet a été officiellement lancé le 24 novembre et durera 3 ans.</p>
        <ol>
          <li>Invitez vos amis à rejoindre la plateforme et recevez des récompenses de parrainage.</li>
          <li>Vos gains sont calculés toutes les heures et versés directement sur votre compte.</li>
          <li>Vous recevez des récompenses supplémentaires lorsque votre réseau atteint certains seuils.</li>
        </ol>
        <button className="primary-button wide" onClick={onLogin}>Groupe Telegram <ArrowRight size={19} /></button>
      </div>
    </div>
  );
}

function AuthPhone({ country, setCountry }: { country: number; setCountry: (n: number) => void }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="phone-row">
      <div className="country-wrap">
        <button type="button" className="country-select" onClick={() => setOpen(!open)}>
          <Smartphone size={21} />
          <span>{phoneCountries[country].code}</span>
          <ChevronDown size={16} />
        </button>
        {open && (
          <div className="country-menu">
            {phoneCountries.map((item, index) => (
              <button key={item.code} type="button" onClick={() => { setCountry(index); setOpen(false); }}>
                <span>{item.code}</span><small>{item.name}</small>
              </button>
            ))}
          </div>
        )}
      </div>
      <input aria-label="Numéro de téléphone" inputMode="tel" placeholder="Entrez votre numéro de téléphone" />
    </div>
  );
}

function PasswordField({ label, confirmation = false }: { label: string; confirmation?: boolean }) {
  const [visible, setVisible] = useState(false);
  return (
    <label className="field">
      {confirmation ? <LockKeyhole size={22} /> : <LockKeyhole size={22} />}
      <input type={visible ? 'text' : 'password'} placeholder={label} aria-label={label} />
      <button type="button" onClick={() => setVisible(!visible)} aria-label={visible ? 'Masquer' : 'Afficher'}>
        {visible ? <EyeOff size={21} /> : <Eye size={21} />}
      </button>
    </label>
  );
}

function AuthScreen({ mode, setScreen }: { mode: 'login' | 'signup'; setScreen: (screen: Screen) => void }) {
  const [country, setCountry] = useState(0);
  const isSignup = mode === 'signup';
  const [captcha, setCaptcha] = useState('');
  return (
    <main className="auth-page">
      <MobileHeader onMenu={() => setScreen('welcome')} />
      <section className="auth-shell">
        <div className="auth-visual">
          <div className="orb orb-one" /><div className="orb orb-two" />
          <h1>{isSignup ? <>Créez votre<br />compte</> : <>Bon retour</>}</h1>
          <p>{isSignup ? 'Rejoignez-nous et commencez votre parcours.' : 'Plateforme d’investissement intelligente'}</p>
          <div className="holo-card"><i /><i /><i /></div>
        </div>

        <div className="auth-form">
          <h2>{isSignup ? 'Créer un compte' : 'Se connecter'}</h2>
          <form onSubmit={(event) => { event.preventDefault(); setScreen('dashboard'); }}>
            <AuthPhone country={country} setCountry={setCountry} />
            <small className="field-help">7–11 chiffres</small>
            <PasswordField label={isSignup ? 'Mot de passe' : 'Entrez votre mot de passe'} />
            {isSignup && <PasswordField label="Confirmer le mot de passe" confirmation />}

            {isSignup ? (
              <>
                <label className="field captcha-field">
                  <Package size={22} />
                  <input value={captcha} onChange={(event) => setCaptcha(event.target.value)} placeholder="Entrez le captcha" />
                  <span>QBTX</span>
                </label>
                <label className="captcha-code"><input readOnly value="a96ea772" /><Check size={18} /></label>
                <div className="reward-box"><Gift size={30} /><strong>Inscrivez-vous et obtenez<br />500 FCFA</strong></div>
              </>
            ) : (
              <div className="login-options">
                <label><input type="checkbox" /><span>Se souvenir de moi</span></label>
                <button type="button">Mot de passe oublié ?</button>
              </div>
            )}

            <button className="primary-button submit" type="submit">
              {isSignup ? 'Créer mon compte' : 'Check-in'}
              {isSignup ? <ArrowRight size={20} /> : <ArrowRight size={20} />}
            </button>
          </form>
          <p className="switch-auth">
            {isSignup ? 'Vous avez déjà un compte ?' : 'Vous n’avez pas de compte ?'}{' '}
            <button onClick={() => setScreen(isSignup ? 'login' : 'signup')}>{isSignup ? 'Se connecter' : 'S’inscrire'}</button>
          </p>
          {!isSignup && (
            <div className="benefits">
              <div><ShieldCheck size={28} /><strong>Sécurisé</strong><span>Accès protégé</span></div>
              <div><Star size={28} /><strong>Premium</strong><span>Avantages membres</span></div>
              <div><TrendingUp size={28} /><strong>Rapide</strong><span>Optimisé pour vous</span></div>
            </div>
          )}
        </div>
      </section>
    </main>
  );
}

function Dashboard({ setScreen }: { setScreen: (screen: Screen) => void }) {
  const [tab, setTab] = useState('Accueil');
  return (
    <main className="dashboard">
      <div className="dashboard-hero">
        <div className="hero-image" />
        <div className="hero-logo"><Brand /></div>
      </div>

      <section className="balance-card">
        <div className="balance-top"><span>Valeur totale du compte</span><button aria-label="Afficher le solde"><Eye size={22} /></button></div>
        <strong className="balance">FCFA 500.00</strong>
        <div className="balance-footer"><span>Accès disponible au portefeuille<br /><b>FCFA 500.00</b></span><button><CircleUserRound size={21} /> Profil</button></div>
      </section>

      <section className="quick-actions">
        <button><BatteryCharging size={29} /><strong>Recharger</strong></button>
        <button><WalletCards size={29} /><strong>Retrait</strong></button>
        <button className="orange"><Users size={29} /><strong>Inviter</strong></button>
        <button className="purple"><LogIn size={29} /><strong>Check-in</strong></button>
      </section>

      <section className="member-section">
        <div className="section-title"><h2>Niveau de membre</h2><span>Investissement total</span></div>
        <div className="member-grid">
          <article className="member-card level-card">
            <p>Achats de premier niveau<br /><strong>FCFA 0</strong></p>
            <div className="gauge"><div /></div>
          </article>
          <article className="member-card discovery-card">
            <p>Nouvelle collection</p><h3>Bougez votre monde</h3>
            <button aria-label="Support"><Headphones size={25} /></button>
          </article>
        </div>
      </section>

      <nav className="bottom-nav" aria-label="Navigation principale">
        {[
          { name: 'Accueil', icon: House },
          { name: 'Produit', icon: Package },
          { name: 'Mon', icon: CircleUserRound },
        ].map(({ name, icon: Icon }) => (
          <button key={name} className={tab === name ? 'active' : ''} onClick={() => setTab(name)}>
            <Icon size={24} /><span>{name}</span>
          </button>
        ))}
      </nav>

      <button className="floating-logout" onClick={() => setScreen('login')} aria-label="Se déconnecter"><LogOut size={20} /></button>
    </main>
  );
}

export default function App() {
  const [screen, setScreen] = useState<Screen>('welcome');
  const [menuOpen, setMenuOpen] = useState(false);

  if (screen === 'dashboard') return <Dashboard setScreen={setScreen} />;

  return (
    <>
      {(screen === 'login' || screen === 'signup') && <AuthScreen mode={screen} setScreen={setScreen} />}
      {screen === 'welcome' && (
        <>
          <MobileHeader onMenu={() => setMenuOpen(true)} />
          <div className="welcome-backdrop">
            <div className="welcome-copy"><Brand /><h1>L’avenir vous attend.</h1><p>Une nouvelle expérience numérique intelligente.</p></div>
          </div>
          {menuOpen && (
            <aside className="side-menu">
              <button onClick={() => setMenuOpen(false)} aria-label="Fermer"><X /></button>
              <button onClick={() => setScreen('login')}><LogIn size={19} /> Se connecter</button>
              <button onClick={() => setScreen('signup')}><UserPlus size={19} /> S’inscrire</button>
              <button><Bell size={19} /> Notifications</button>
            </aside>
          )}
          <WelcomeModal onClose={() => setScreen('login')} onLogin={() => setScreen('login')} />
          <nav className="bottom-nav preview-nav">
            <button className="active"><House size={24} /><span>Accueil</span></button>
            <button><Package size={24} /><span>Produit</span></button>
            <button><CircleUserRound size={24} /><span>Mon</span></button>
          </nav>
        </>
      )}
    </>
  );
}
