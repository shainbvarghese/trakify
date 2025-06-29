# 🧊 Glassmorphism Guide

This guide provides all the available glassmorphism classes and components for your Trackify application.

## 🌙 Theme Toggle Button

### Using the Reusable Component

```jsx
import ThemeToggleButton from '../components/ThemeToggleButton';

// Basic usage (matches your sample)
<ThemeToggleButton />

// With text label
<ThemeToggleButton showText={true} />

// Different variants
<ThemeToggleButton variant="outlined" />
<ThemeToggleButton variant="filled" />
<ThemeToggleButton variant="glass" />

// Different sizes
<ThemeToggleButton size="sm" />
<ThemeToggleButton size="lg" />

// Custom styling
<ThemeToggleButton className="my-4" />
```

### Manual Implementation (Your Sample Code)

```jsx
import { useTheme } from '../contexts/ThemeContext';

const MyComponent = () => {
  const { isDark, toggleTheme } = useTheme();

  return (
    <button
      onClick={toggleTheme}
      className="px-3 py-2 rounded-xl bg-black/20 dark:bg-white/10 text-sm text-white dark:text-gray-200"
    >
      Toggle Theme
    </button>
  );
};
```

### Theme Toggle Variants

| Variant | Description | Use Case |
|---------|-------------|----------|
| `default` | Semi-transparent background | Navbar, Sidebar |
| `outlined` | Transparent with border | Cards, Modals |
| `filled` | Solid background | Primary actions |
| `glass` | Glassmorphism effect | Floating elements |

### Available Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `variant` | string | `'default'` | Button style variant |
| `showText` | boolean | `false` | Show text label |
| `size` | string | `'md'` | Button size (sm, md, lg) |
| `className` | string | `''` | Additional CSS classes |

## 📦 GlassCard Component

A reusable component for consistent glassmorphism styling:

```jsx
import GlassCard from '../components/GlassCard';

// Basic usage
<GlassCard>
  <h2>Your Content</h2>
  <p>This is a glassmorphism card</p>
</GlassCard>

// With custom props
<GlassCard 
  variant="colored" 
  padding="p-6" 
  rounded="rounded-xl" 
  shadow="shadow-lg"
  className="my-4"
>
  <h2>Custom Glass Card</h2>
</GlassCard>
```

### GlassCard Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `variant` | string | `'default'` | Style variant |
| `padding` | string | `'p-4'` | Padding classes |
| `rounded` | string | `'rounded-2xl'` | Border radius |
| `shadow` | string | `'shadow-md'` | Shadow classes |
| `className` | string | `''` | Additional CSS classes |

### Available Variants

- `default` - Standard glassmorphism
- `light` - Lighter transparency
- `heavy` - Heavy transparency
- `colored` - Blue tinted
- `success` - Green tinted
- `warning` - Yellow tinted
- `error` - Red tinted

## 🎨 Utility Classes

### Base Glassmorphism Classes

```jsx
// Your provided sample class
<div className="bg-white/30 dark:bg-[#1f1f1f]/30 backdrop-blur-md rounded-2xl shadow-md p-4">
  Content
</div>

// Pre-built utility classes
<div className="glass-card">Default glass card</div>
<div className="glass-card-light">Light glass card</div>
<div className="glass-card-heavy">Heavy glass card</div>
```

### Colored Variants

```jsx
<div className="glass-blue">Blue tinted glass</div>
<div className="glass-green">Green tinted glass</div>
<div className="glass-purple">Purple tinted glass</div>
<div className="glass-orange">Orange tinted glass</div>
```

### Opacity Levels

```jsx
<div className="glass-10 backdrop-blur-md">10% opacity</div>
<div className="glass-20 backdrop-blur-md">20% opacity</div>
<div className="glass-30 backdrop-blur-md">30% opacity</div>
<div className="glass-40 backdrop-blur-md">40% opacity</div>
<div className="glass-50 backdrop-blur-md">50% opacity</div>
<div className="glass-60 backdrop-blur-md">60% opacity</div>
<div className="glass-70 backdrop-blur-md">70% opacity</div>
<div className="glass-80 backdrop-blur-md">80% opacity</div>
<div className="glass-90 backdrop-blur-md">90% opacity</div>
```

### Blur Intensities

```jsx
<div className="glass-30 glass-blur-sm">Small blur</div>
<div className="glass-30 glass-blur-md">Medium blur</div>
<div className="glass-30 glass-blur-lg">Large blur</div>
<div className="glass-30 glass-blur-xl">Extra large blur</div>
```

### Interactive Classes

```jsx
<div className="glass-card glass-hover">Hover effect</div>
<div className="glass-card glass-focus">Focus effect</div>
```

## 📱 Example Implementations

### Dashboard Card with Theme Toggle
```jsx
<GlassCard variant="default" className="mb-6">
  <div className="flex items-center justify-between">
    <div>
      <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100">
        Total Balance
      </h3>
      <p className="text-2xl font-bold text-blue-600 dark:text-blue-400">
        $12,345.67
      </p>
    </div>
    <div className="flex items-center gap-3">
      <div className="p-3 bg-blue-100 dark:bg-blue-900/30 rounded-full">
        <FiDollarSign className="h-6 w-6 text-blue-600 dark:text-blue-400" />
      </div>
      <ThemeToggleButton size="sm" />
    </div>
  </div>
</GlassCard>
```

### Form Container
```jsx
<GlassCard variant="light" padding="p-8" className="max-w-md mx-auto">
  <div className="flex items-center justify-between mb-6">
    <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100">
      Add Transaction
    </h2>
    <ThemeToggleButton variant="outlined" size="sm" />
  </h2>
  <form className="space-y-4">
    {/* Form fields */}
  </form>
</GlassCard>
```

### Notification Toast
```jsx
<div className="glass-green rounded-lg p-4 shadow-lg">
  <div className="flex items-center justify-between">
    <div className="flex items-center">
      <FiCheckCircle className="h-5 w-5 text-green-600 dark:text-green-400 mr-3" />
      <span className="text-green-800 dark:text-green-200">
        Transaction saved successfully!
      </span>
    </div>
    <ThemeToggleButton variant="glass" size="sm" />
  </div>
</div>
```

### Modal Overlay
```jsx
<div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50">
  <div className="glass-card max-w-md mx-auto mt-20">
    <div className="flex items-center justify-between mb-4">
      <h3 className="text-lg font-semibold">Modal Title</h3>
      <ThemeToggleButton size="sm" />
    </div>
    <p>Modal content goes here...</p>
  </div>
</div>
```

## 🎯 Best Practices

### 1. Consistent Spacing
```jsx
// Good
<GlassCard className="mb-4">
  <div className="p-4">Content</div>
</GlassCard>

// Better - Use component padding
<GlassCard padding="p-6">
  <div>Content</div>
</GlassCard>
```

### 2. Proper Contrast
```jsx
// Good - High contrast text
<div className="glass-card">
  <h2 className="text-gray-900 dark:text-gray-100">Title</h2>
  <p className="text-gray-700 dark:text-gray-300">Content</p>
</div>
```

### 3. Responsive Design
```jsx
<GlassCard className="w-full md:w-1/2 lg:w-1/3">
  <div className="text-responsive">Responsive text</div>
</GlassCard>
```

### 4. Accessibility
```jsx
<GlassCard className="focus-ring">
  <button className="focus:outline-none focus:ring-2 focus:ring-blue-500">
    Accessible button
  </button>
</GlassCard>
```

### 5. Theme Toggle Placement
```jsx
// Good - In navbar or sidebar header
<nav className="flex items-center justify-between">
  <Logo />
  <ThemeToggleButton />
</nav>

// Good - In settings or preferences
<div className="flex items-center justify-between p-4">
  <span>Theme</span>
  <ThemeToggleButton showText={true} />
</div>
```

## 🔧 Customization

### Creating Custom Variants
```jsx
// In your component
const customGlassClasses = "bg-gradient-to-r from-purple-500/30 to-pink-500/30 backdrop-blur-md border border-purple-200/30 dark:border-purple-700/30";

<div className={`${customGlassClasses} rounded-2xl shadow-md p-4`}>
  Custom gradient glass
</div>
```

### Extending GlassCard
```jsx
// Create a specialized component
const StatsCard = ({ title, value, icon, ...props }) => (
  <GlassCard variant="colored" {...props}>
    <div className="flex items-center justify-between">
      <div>
        <h3 className="text-sm font-medium text-gray-600 dark:text-gray-400">
          {title}
        </h3>
        <p className="text-2xl font-bold text-gray-900 dark:text-gray-100">
          {value}
        </p>
      </div>
      <div className="p-3 bg-blue-100 dark:bg-blue-900/30 rounded-full">
        {icon}
      </div>
    </div>
  </GlassCard>
);
```

## 🎨 Theme Integration

All glassmorphism classes automatically adapt to light/dark themes:

```jsx
// Automatically switches based on theme
<div className="glass-card">
  <h2 className="text-gray-900 dark:text-gray-100">Title</h2>
  <p className="text-gray-700 dark:text-gray-300">Content</p>
</div>
```

## 📱 Mobile Considerations

```jsx
// Responsive glassmorphism
<GlassCard className="p-4 md:p-6 lg:p-8">
  <div className="text-sm md:text-base lg:text-lg">
    Responsive content
  </div>
</GlassCard>
```

## 🚀 Performance Tips

1. **Use `backdrop-blur-md`** for optimal performance
2. **Avoid excessive blur** on mobile devices
3. **Combine with `will-change`** for animations
4. **Use `transform-gpu`** for hardware acceleration

```jsx
<div className="glass-card transform-gpu will-change-transform">
  Animated content
</div>
```

---

This guide covers all the glassmorphism utilities and theme toggle components available in your Trackify application. Use these classes and components to create beautiful, modern UI elements with consistent styling across your application! 