import { Languages } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';

export function LanguageSelector() {
  const { language, setLanguage, t } = useLanguage();

  return (
    <div className="relative inline-block">
      <button
        onClick={() => setLanguage(language === 'es' ? 'en' : 'es')}
        className="flex items-center gap-2 px-3 py-2 rounded-lg bg-white border border-gray-200 hover:bg-gray-50 transition-colors text-sm font-medium text-gray-700"
        title={t.common.selectLanguage}
      >
        <Languages className="w-4 h-4" />
        <span className="uppercase">{language}</span>
      </button>
    </div>
  );
}
