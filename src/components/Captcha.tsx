import React, { useState, useEffect } from 'react';
import { RefreshCw } from 'lucide-react';

interface CaptchaProps {
  onValidationChange: (isValid: boolean) => void;
  disabled?: boolean;
}

const Captcha: React.FC<CaptchaProps> = ({ onValidationChange, disabled = false }) => {
  const [captchaText, setCaptchaText] = useState('');
  const [userInput, setUserInput] = useState('');
  const [isValid, setIsValid] = useState(false);

  // Generar texto aleatorio para el CAPTCHA
  const generateCaptcha = () => {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let result = '';
    const length = Math.floor(Math.random() * 2) + 5; // 5 o 6 caracteres
    
    for (let i = 0; i < length; i++) {
      result += characters.charAt(Math.floor(Math.random() * characters.length));
    }
    
    setCaptchaText(result);
    setUserInput('');
    setIsValid(false);
    onValidationChange(false);
  };

  // Generar CAPTCHA inicial
  useEffect(() => {
    generateCaptcha();
  }, []);

  // Validar entrada del usuario
  useEffect(() => {
    const valid = userInput.toLowerCase() === captchaText.toLowerCase() && userInput.length > 0;
    setIsValid(valid);
    onValidationChange(valid);
  }, [userInput, captchaText, onValidationChange]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUserInput(e.target.value);
  };

  const handleRefresh = () => {
    generateCaptcha();
  };

  return (
    <div className="space-y-3">
      <label className="block text-sm font-medium" style={{ color: 'var(--text)', opacity: 0.8 }}>
        Verificación de seguridad *
      </label>
      
      <div className="flex items-center gap-3">
        {/* Display del CAPTCHA */}
        <div 
          className="flex-1 p-3 border-2 rounded-lg text-center font-mono text-lg font-bold tracking-wider select-none"
          style={{ 
            borderColor: isValid ? '#10b981' : 'var(--border)',
            color: 'var(--text-dark)',
            background: isValid 
              ? 'linear-gradient(135deg, #f0fdf4, #dcfce7)' 
              : 'linear-gradient(135deg, rgba(255, 255, 255, 0.1), rgba(255, 255, 255, 0.05))',
            boxShadow: isValid 
              ? '0 0 0 3px rgba(16, 185, 129, 0.1)' 
              : '0 2px 4px rgba(0, 0, 0, 0.1)',
            backdropFilter: 'blur(10px)'
          }}
        >
          {captchaText}
        </div>
        
        {/* Botón de refrescar */}
        <button
          type="button"
          onClick={handleRefresh}
          disabled={disabled}
          className="p-2 rounded-lg transition-all duration-200 hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed"
          style={{ 
            backgroundColor: 'var(--accent-600)',
            color: 'white'
          }}
          onMouseEnter={(e) => {
            if (!disabled) {
              (e.target as HTMLElement).style.backgroundColor = 'var(--accent-hover)';
            }
          }}
          onMouseLeave={(e) => {
            if (!disabled) {
              (e.target as HTMLElement).style.backgroundColor = 'var(--accent-600)';
            }
          }}
        >
          <RefreshCw size={18} />
        </button>
      </div>
      
      {/* Input del usuario */}
      <input
        type="text"
        value={userInput}
        onChange={handleInputChange}
        disabled={disabled}
        placeholder="Ingresa el código de arriba"
        className="w-full px-3 py-2.5 border rounded-lg focus:ring-2 focus:border-transparent transition-all duration-300 text-sm"
        style={{ 
          borderColor: isValid ? '#10b981' : 'var(--border)', 
          backgroundColor: 'var(--bg)', 
          color: 'var(--text)',
          outline: 'none',
          boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)'
        }}
        onFocus={(e) => {
          e.target.style.borderColor = 'var(--accent-600)';
          e.target.style.boxShadow = '0 0 0 3px rgba(59, 130, 246, 0.1)';
        }}
        onBlur={(e) => {
          e.target.style.borderColor = isValid ? '#10b981' : 'var(--border)';
          e.target.style.boxShadow = '0 1px 3px rgba(0, 0, 0, 0.1)';
        }}
      />
      
      {/* Mensaje de estado */}
      {userInput.length > 0 && (
        <div className="flex items-center gap-2 text-sm">
          {isValid ? (
            <>
              <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></div>
              <span className="text-green-600 dark:text-green-400 font-medium">✓ Código correcto</span>
            </>
          ) : (
            <>
              <div className="w-2 h-2 rounded-full bg-red-500"></div>
              <span className="text-red-600 dark:text-red-400 font-medium">✗ Código incorrecto</span>
            </>
          )}
        </div>
      )}
    </div>
  );
};

export default Captcha;
