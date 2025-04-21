export const theme = {
  colors: {
    primary: '#FF6B6B',    // Vibrant Red
    secondary: '#4ECDC4',  // Turquoise
    background: '#1A1A1A', // Dark
    surface: '#2D2D2D',    // Slightly lighter dark
    text: '#FFFFFF',       // White
    textSecondary: '#B3B3B3', // Light gray
    accent: '#FFE66D',     // Yellow
    success: '#2ECC71',    // Green
    error: '#E74C3C',      // Red
    warning: '#F1C40F',    // Yellow
  },
  spacing: {
    xs: 4,
    sm: 8,
    md: 16,
    lg: 24,
    xl: 32,
  },
  borderRadius: {
    sm: 4,
    md: 8,
    lg: 16,
    xl: 24,
  },
  typography: {
    h1: {
      fontSize: 32,
      fontWeight: 'bold',
    },
    h2: {
      fontSize: 24,
      fontWeight: 'bold',
    },
    h3: {
      fontSize: 20,
      fontWeight: 'bold',
    },
    body: {
      fontSize: 16,
    },
    caption: {
      fontSize: 14,
    },
    button: {
      fontSize: 16,
      fontWeight: 'bold',
    },
  },
  shadows: {
    sm: {
      shadowColor: '#000',
      shadowOffset: {
        width: 0,
        height: 2,
      },
      shadowOpacity: 0.25,
      shadowRadius: 3.84,
      elevation: 5,
    },
    md: {
      shadowColor: '#000',
      shadowOffset: {
        width: 0,
        height: 4,
      },
      shadowOpacity: 0.30,
      shadowRadius: 4.65,
      elevation: 8,
    },
  },
} as const;

export type Theme = typeof theme; 