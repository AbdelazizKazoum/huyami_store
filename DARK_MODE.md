# Dark/Light Mode Implementation

This document explains the dark and light mode implementation for the Huyami Store application.

## Features

✅ **System Theme Detection** - Automatically detects user's system preference  
✅ **Manual Toggle** - Users can manually switch between themes  
✅ **Persistent Storage** - Theme preference is saved in localStorage  
✅ **Smooth Transitions** - All elements transition smoothly between themes  
✅ **Hydration Safe** - Prevents flash of wrong theme on page load  
✅ **Responsive Design** - Theme toggle available on both desktop and mobile

## Architecture

### 1. CSS Custom Properties (`/src/app/globals.css`)

The theme system uses CSS custom properties that change based on the `.dark` class:

```css
:root {
  /* Light mode colors */
  --color-bg-primary: 255 255 255;
  --color-text-primary: 17 24 39;
  /* ... other light colors */
}

.dark {
  /* Dark mode colors */
  --color-bg-primary: 17 24 39;
  --color-text-primary: 249 250 251;
  /* ... other dark colors */
}
```

### 2. Theme Provider (`/src/components/ThemeProvider.tsx`)

Manages theme state and provides theme context:

- **State Management**: Uses React Context API
- **Persistence**: Saves theme preference to localStorage
- **System Detection**: Listens to `prefers-color-scheme` media query
- **Hydration Safety**: Prevents flash of wrong theme

### 3. Theme Toggle (`/src/components/ui/ThemeToggle.tsx`)

Interactive button component for switching themes:

- **Icons**: Sun icon for light mode, Moon icon for dark mode
- **Accessibility**: Proper ARIA labels and titles
- **Animation**: Smooth hover and scale effects
- **Responsive**: Different sizes for desktop and mobile

## Implementation Details

### Color Mapping

| Element              | Light Mode | Dark Mode  |
| -------------------- | ---------- | ---------- |
| Primary Background   | `white`    | `gray-900` |
| Secondary Background | `stone-50` | `gray-800` |
| Tertiary Background  | `gray-50`  | `gray-700` |
| Primary Text         | `gray-900` | `gray-50`  |
| Secondary Text       | `gray-600` | `gray-300` |
| Muted Text           | `gray-500` | `gray-400` |
| Borders              | `gray-200` | `gray-600` |

### Theme Classes

All components use semantic theme classes:

```css
.bg-theme-primary    /* Primary background */
/* Primary background */
.bg-theme-secondary  /* Secondary background */
.bg-theme-tertiary   /* Tertiary background */
.text-theme-primary  /* Primary text */
.text-theme-secondary /* Secondary text */
.text-theme-muted    /* Muted text */
.border-theme-light; /* Light borders */
```

### Layout Integration

The theme is applied at the root level in `/src/app/[locale]/layout.tsx`:

```tsx
<html suppressHydrationWarning>
  <body>
    <ThemeProvider>{/* App content */}</ThemeProvider>
  </body>
</html>
```

### Component Usage

#### Header

- Theme toggle button in desktop and mobile navigation
- Background uses theme-aware transparency
- All navigation elements use theme colors

#### Footer

- Updated to use theme colors instead of hardcoded grays
- Proper contrast in both light and dark modes

#### UI Components

All UI components support dark mode automatically:

- **Button**: Theme-aware background and text colors
- **Input**: Dark mode compatible backgrounds and borders
- **Card**: Automatic background and border theming
- **Badge**: Maintains contrast in both themes

## Usage Examples

### Basic Theme Toggle

```tsx
import { ThemeToggle } from "@/components/ui";

<ThemeToggle />;
```

### Using Theme in Components

```tsx
import { useTheme } from "@/components/ThemeProvider";

function MyComponent() {
  const { theme, toggleTheme } = useTheme();

  return (
    <div className="bg-theme-primary text-theme-primary">
      Current theme: {theme}
      <button onClick={toggleTheme}>Toggle Theme</button>
    </div>
  );
}
```

### Theme-Aware Styling

```tsx
// Use theme classes for automatic dark mode support
<div className="bg-theme-primary border-theme-light">
  <h1 className="text-theme-primary">Title</h1>
  <p className="text-theme-secondary">Description</p>
</div>
```

## Browser Support

- **Modern Browsers**: Full support with smooth transitions
- **Legacy Browsers**: Graceful fallback to light mode
- **System Integration**: Respects `prefers-color-scheme` media query

## Performance

- **CSS Variables**: Efficient theme switching without JavaScript
- **No Flash**: Prevents FOUC (Flash of Unstyled Content)
- **Minimal Bundle**: Lightweight implementation
- **Server-Side Safe**: No hydration mismatches

## Accessibility

- **High Contrast**: Maintains WCAG AA contrast ratios
- **Focus Indicators**: Visible in both themes
- **Screen Readers**: Proper ARIA labels on toggle button
- **Keyboard Navigation**: Full keyboard accessibility

## Testing

To test the dark mode implementation:

1. **Manual Toggle**: Click the theme toggle button
2. **System Preference**: Change your OS theme settings
3. **Persistence**: Refresh the page to verify saved preference
4. **Mobile**: Test on responsive breakpoints

## Future Enhancements

Potential improvements for the theme system:

- **Auto Mode**: Automatic switching based on time of day
- **Custom Themes**: Additional color themes beyond light/dark
- **Theme Animations**: More elaborate transition animations
- **Theme Scheduler**: Time-based theme switching
