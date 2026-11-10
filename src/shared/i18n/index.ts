import { ref, computed } from 'vue';

export type Locale = 'es' | 'en';

const LOCALE_STORAGE_KEY = 'tennis_stats_locale';

const detectDefaultLocale = (): Locale => {
  if (typeof window !== 'undefined') {
    const saved = localStorage.getItem(LOCALE_STORAGE_KEY);
    if (saved === 'es' || saved === 'en') return saved;
    const browserLang = navigator.language?.toLowerCase() || '';
    if (browserLang.startsWith('en')) return 'en';
  }
  return 'es';
};

const currentLocale = ref<Locale>(detectDefaultLocale());

export const messages: Record<Locale, Record<string, string>> = {
  es: {
    // Nav
    'nav.analytics': 'Estadísticas de Partidos',
    'nav.tournaments': 'Torneos',
    'nav.kitBag': 'Kit Bag / Equipamiento',
    'nav.scouting': 'Rivales & Scouting',
    'nav.settings': 'Configuración & Health Connect',
    'nav.logout': 'Cerrar Sesión',

    // Headers
    'header.analytics': 'MATCH ANALYTICS',
    'header.tournaments': 'TOURNAMENT HUB',
    'header.kitBag': 'THE KIT BAG',
    'header.scouting': 'SCOUTING REPORT',
    'header.settings': 'CONFIGURACIÓN',

    // Settings
    'settings.title': 'Configuración',
    'settings.subtitle': 'Personaliza tu experiencia de análisis y sincronización.',
    'settings.appearance': 'Apariencia del Tema',
    'settings.lightMode': 'Modo Claro',
    'settings.darkMode': 'Modo Oscuro',
    'settings.language': 'Idioma / Language',
    'settings.spanish': 'Español',
    'settings.english': 'English',
    'settings.healthConnectTitle': 'Health Connect & Wear OS',
    'settings.healthConnectDesc': 'Sincronización activa de frecuencia cardíaca, consumo calórico y pasos durante cada partido registrado con tu reloj inteligente.',
    'settings.statusConnected': 'Conectado / Activo',
    'settings.versionTitle': 'Versión del Dashboard',
    'settings.openNativeSettings': 'Abrir Ajustes Nativos',

    // Match Analytics
    'analytics.pendingBannerTitle': '🎾 ¡Tenés un partido pendiente de completar!',
    'analytics.pendingBannerDesc': 'Registrado recientemente desde tu Wear OS. Asigna el rival real, club y superficie para tus estadísticas.',
    'analytics.completeDetails': 'Completar Detalles',
    'analytics.noMatches': 'No hay partidos registrados aún',
    'analytics.startOnWearOS': 'Comenzar Partido en Wear OS',
    'analytics.recentResults': 'Resultados Recientes',
    'analytics.opponentsChart': 'Resultados por Rival',
    'analytics.trendsChart': 'Tendencia Ganados/Perdidos',
    'analytics.filterAll': 'Todos',
    'analytics.filterWins': 'Victorias',
    'analytics.filterLosses': 'Derrotas',
    'analytics.filterTournament': 'Torneo Oficial',
    'analytics.filterFriendly': 'Amistoso',

    // Modals / Details
    'matchDetail.title': 'Detalles del Partido',
    'matchDetail.subtitle': 'Métricas físicas y datos competitivos',
    'matchDetail.saveSuccess': 'Partido actualizado con éxito',
    'matchDetail.calories': 'Calorías Activas',
    'matchDetail.avgHr': 'FC Promedio',
    'matchDetail.maxHr': 'FC Máxima',
    'matchDetail.duration': 'Duración',
    'matchDetail.distance': 'Distancia / Pasos',
    'matchDetail.setsBreakdown': 'Desglose por Set',
    'matchDetail.rival': 'Nombre del Rival',
    'matchDetail.matchType': 'Clasificación',
    'matchDetail.friendly': 'Partido Amistoso',
    'matchDetail.official': 'Torneo Oficial',
    'matchDetail.tournament': 'Torneo Asociado',
    'matchDetail.location': 'Lugar / Club',
    'matchDetail.useLocation': '📍 Usar ubicación actual',
    'matchDetail.surface': 'Superficie',
    'matchDetail.clay': 'Polvo de ladrillo',
    'matchDetail.hard': 'Cemento / Rápida',
    'matchDetail.grass': 'Césped',
    'matchDetail.save': 'Guardar Detalles',
    'matchDetail.cancel': 'Cancelar',

    // Tournaments
    'tournaments.title': 'Torneos & Competiciones',
    'tournaments.subtitle': 'Administra tus cuadros, sedes y estadísticas oficiales.',
    'tournaments.create': 'Crear Torneo',
    'tournaments.createTitle': 'Crear Nuevo Torneo',
    'tournaments.empty': 'No tienes torneos registrados aún',
    'tournaments.delete': 'Eliminar Torneo',
    'tournaments.deleteConfirm': '¿Estás seguro de que deseas eliminar este torneo? Se desvinculará de los partidos registrados.',
    'tournaments.deleteSuccess': 'Torneo eliminado con éxito',
    'tournaments.createSuccess': 'Torneo creado con éxito',
    'tournaments.matchesTitle': 'Partidos en este Torneo',
    'tournaments.noMatches': 'Aún no hay partidos asignados a este torneo.',

    // Common
    'common.search': 'Buscar...',
    'common.close': 'Cerrar',
    'common.delete': 'Eliminar',
    'common.confirm': 'Confirmar',
  },
  en: {
    // Nav
    'nav.analytics': 'Match Statistics',
    'nav.tournaments': 'Tournaments',
    'nav.kitBag': 'The Kit Bag / Gear',
    'nav.scouting': 'Opponents & Scouting',
    'nav.settings': 'Settings & Health Connect',
    'nav.logout': 'Sign Out',

    // Headers
    'header.analytics': 'MATCH ANALYTICS',
    'header.tournaments': 'TOURNAMENT HUB',
    'header.kitBag': 'THE KIT BAG',
    'header.scouting': 'SCOUTING REPORT',
    'header.settings': 'SETTINGS',

    // Settings
    'settings.title': 'Settings',
    'settings.subtitle': 'Customize your analytics experience and sync settings.',
    'settings.appearance': 'Theme Appearance',
    'settings.lightMode': 'Light Mode',
    'settings.darkMode': 'Dark Mode',
    'settings.language': 'Language / Idioma',
    'settings.spanish': 'Spanish (Español)',
    'settings.english': 'English',
    'settings.healthConnectTitle': 'Health Connect & Wear OS',
    'settings.healthConnectDesc': 'Active synchronization of heart rate, calorie expenditure, and steps during every match recorded from your smartwatch.',
    'settings.statusConnected': 'Connected / Active',
    'settings.versionTitle': 'Dashboard Version',
    'settings.openNativeSettings': 'Open Native Settings',

    // Match Analytics
    'analytics.pendingBannerTitle': '🎾 You have a match pending completion!',
    'analytics.pendingBannerDesc': 'Recently recorded from your Wear OS. Assign the opponent, club, and surface for your stats.',
    'analytics.completeDetails': 'Complete Details',
    'analytics.noMatches': 'No matches recorded yet',
    'analytics.startOnWearOS': 'Start Match on Wear OS',
    'analytics.recentResults': 'Recent Match Results',
    'analytics.opponentsChart': 'Results by Opponent',
    'analytics.trendsChart': 'Won/Lost Trends',
    'analytics.filterAll': 'All',
    'analytics.filterWins': 'Wins',
    'analytics.filterLosses': 'Losses',
    'analytics.filterTournament': 'Tournament',
    'analytics.filterFriendly': 'Friendly',

    // Modals / Details
    'matchDetail.title': 'Match Details',
    'matchDetail.subtitle': 'Physical metrics and competitive data',
    'matchDetail.saveSuccess': 'Match updated successfully',
    'matchDetail.calories': 'Active Calories',
    'matchDetail.avgHr': 'Avg HR',
    'matchDetail.maxHr': 'Max HR',
    'matchDetail.duration': 'Duration',
    'matchDetail.distance': 'Distance / Steps',
    'matchDetail.setsBreakdown': 'Set Breakdown',
    'matchDetail.rival': 'Opponent Name',
    'matchDetail.matchType': 'Classification',
    'matchDetail.friendly': 'Friendly Match',
    'matchDetail.official': 'Official Tournament',
    'matchDetail.tournament': 'Associated Tournament',
    'matchDetail.location': 'Venue / Club',
    'matchDetail.useLocation': '📍 Use current location',
    'matchDetail.surface': 'Surface',
    'matchDetail.clay': 'Clay Court',
    'matchDetail.hard': 'Hard Court',
    'matchDetail.grass': 'Grass Court',
    'matchDetail.save': 'Save Details',
    'matchDetail.cancel': 'Cancel',

    // Tournaments
    'tournaments.title': 'Tournaments & Competitions',
    'tournaments.subtitle': 'Manage your draws, venues, and official stats.',
    'tournaments.create': 'Create Tournament',
    'tournaments.createTitle': 'Create New Tournament',
    'tournaments.empty': 'No tournaments recorded yet',
    'tournaments.delete': 'Delete Tournament',
    'tournaments.deleteConfirm': 'Are you sure you want to delete this tournament? It will be unlinked from registered matches.',
    'tournaments.deleteSuccess': 'Tournament deleted successfully',
    'tournaments.createSuccess': 'Tournament created successfully',
    'tournaments.matchesTitle': 'Matches in this Tournament',
    'tournaments.noMatches': 'No matches assigned to this tournament yet.',

    // Common
    'common.search': 'Search...',
    'common.close': 'Close',
    'common.delete': 'Delete',
    'common.confirm': 'Confirm',
  }
};

export const setLocale = (locale: Locale) => {
  currentLocale.value = locale;
  if (typeof window !== 'undefined') {
    localStorage.setItem(LOCALE_STORAGE_KEY, locale);
  }
};

export const t = (key: string, fallback?: string): string => {
  const dict = messages[currentLocale.value] || messages.es;
  return dict[key] || fallback || key;
};

export function useI18n() {
  return {
    locale: computed(() => currentLocale.value),
    setLocale,
    t,
  };
}
