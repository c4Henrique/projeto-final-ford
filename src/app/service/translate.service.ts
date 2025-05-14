import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

export type Language = 'pt' | 'en' | 'es' | 'fr' | 'zh' | 'ar';

interface Translations {
  [key: string]: {
    [key: string]: string;
  };
}

@Injectable({
  providedIn: 'root'
})
export class TranslateService {
  private currentLang = new BehaviorSubject<Language>('pt');
  
  private translations: Translations = {
    'login.title': {
      'pt': 'Bem-vindo',
      'en': 'Welcome',
      'es': 'Bienvenido',
      'fr': 'Bienvenue',
      'zh': '欢迎',
      'ar': 'مرحباً'
    },
    'login.email': {
      'pt': 'E-mail',
      'en': 'Email',
      'es': 'Correo electrónico',
      'fr': 'E-mail',
      'zh': '电子邮件',
      'ar': 'البريد الإلكتروني'
    },
    'login.password': {
      'pt': 'Senha',
      'en': 'Password',
      'es': 'Contraseña',
      'fr': 'Mot de passe',
      'zh': '密码',
      'ar': 'كلمة المرور'
    },
    'login.button': {
      'pt': 'Entrar',
      'en': 'Sign In',
      'es': 'Iniciar sesión',
      'fr': 'Se connecter',
      'zh': '登录',
      'ar': 'تسجيل الدخول'
    },
    'login.remember': {
      'pt': 'Lembrar-me',
      'en': 'Remember me',
      'es': 'Recordarme',
      'fr': 'Se souvenir de moi',
      'zh': '记住我',
      'ar': 'تذكرني'
    },
    'welcome.title': {
      'pt': 'Bem-vindo ao Futuro da Mobilidade',
      'en': 'Welcome to the Future of Mobility',
      'es': 'Bienvenido al Futuro de la Movilidad',
      'fr': 'Bienvenue dans le Futur de la Mobilité',
      'zh': '欢迎来到移动出行的未来',
      'ar': 'مرحباً بكم في مستقبل التنقل'
    },
    'welcome.description': {
      'pt': 'Explore o universo Ford através de nossa plataforma inovadora de gestão e monitoramento. Aqui você encontrará:',
      'en': 'Explore the Ford universe through our innovative management and monitoring platform. Here you will find:',
      'es': 'Explora el universo Ford a través de nuestra innovadora plataforma de gestión y monitoreo. Aquí encontrarás:',
      'fr': 'Explorez l\'univers Ford à travers notre plateforme innovante de gestion et de surveillance. Vous trouverez ici:',
      'zh': '通过我们创新的管理和监控平台探索福特世界。在这里您将找到：',
      'ar': 'اكتشف عالم فورد من خلال منصتنا المبتكرة للإدارة والمراقبة. ستجد هنا:'
    },
    'welcome.feature.realtime': {
      'pt': 'Informações em tempo real dos veículos',
      'en': 'Real-time vehicle information',
      'es': 'Información de vehículos en tiempo real',
      'fr': 'Informations des véhicules en temps réel',
      'zh': '实时车辆信息',
      'ar': 'معلومات المركبات في الوقت الفعلي'
    },
    'welcome.feature.analytics': {
      'pt': 'Análises detalhadas de desempenho',
      'en': 'Detailed performance analytics',
      'es': 'Análisis detallado del rendimiento',
      'fr': 'Analyses détaillées des performances',
      'zh': '详细的性能分析',
      'ar': 'تحليلات الأداء المفصلة'
    },
    'welcome.feature.maintenance': {
      'pt': 'Status de manutenção e atualizações',
      'en': 'Maintenance status and updates',
      'es': 'Estado de mantenimiento y actualizaciones',
      'fr': 'État de maintenance et mises à jour',
      'zh': '维护状态和更新',
      'ar': 'حالة الصيانة والتحديثات'
    },
    'welcome.feature.location': {
      'pt': 'Localização e rastreamento',
      'en': 'Location and tracking',
      'es': 'Localización y seguimiento',
      'fr': 'Localisation et suivi',
      'zh': '位置和跟踪',
      'ar': 'الموقع والتتبع'
    },
    'welcome.highlight': {
      'pt': 'Sua jornada para uma experiência automotiva mais inteligente começa aqui.',
      'en': 'Your journey to a smarter automotive experience starts here.',
      'es': 'Tu viaje hacia una experiencia automotriz más inteligente comienza aquí.',
      'fr': 'Votre voyage vers une expérience automobile plus intelligente commence ici.',
      'zh': '您的智能汽车体验之旅从这里开始。',
      'ar': 'تبدأ رحلتك نحو تجربة سيارات أكثر ذكاءً من هنا.'
    },
    'welcome.button': {
      'pt': 'Acessar Dashboard',
      'en': 'Access Dashboard',
      'es': 'Acceder al Panel',
      'fr': 'Accéder au Tableau de Bord',
      'zh': '访问仪表板',
      'ar': 'الوصول إلى لوحة التحكم'
    }
  };

  constructor() {
    // Carrega o idioma salvo ou usa o padrão do navegador
    const savedLang = localStorage.getItem('language') as Language;
    if (savedLang) {
      this.currentLang.next(savedLang);
    } else {
      const browserLang = navigator.language.split('-')[0] as Language;
      this.setLanguage(this.isValidLanguage(browserLang) ? browserLang : 'pt');
    }
  }

  private isValidLanguage(lang: string): lang is Language {
    return ['pt', 'en', 'es', 'fr', 'zh', 'ar'].includes(lang);
  }

  setLanguage(lang: Language) {
    this.currentLang.next(lang);
    localStorage.setItem('language', lang);
    // Se for árabe, ajusta a direção do texto
    document.documentElement.dir = lang === 'ar' ? 'rtl' : 'ltr';
  }

  getCurrentLang() {
    return this.currentLang.asObservable();
  }

  translate(key: string): string {
    return this.translations[key]?.[this.currentLang.value] || key;
  }

  getLanguages() {
    return [
      { code: 'pt', name: 'Português', flag: '🇧🇷' },
      { code: 'en', name: 'English', flag: '🇺🇸' },
      { code: 'es', name: 'Español', flag: '🇪🇸' },
      { code: 'fr', name: 'Français', flag: '🇫🇷' },
      { code: 'zh', name: '中文', flag: '🇨🇳' },
      { code: 'ar', name: 'العربية', flag: '🇸🇦' }
    ];
  }
} 