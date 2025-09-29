# UI Components Documentation

This folder contains reusable UI components for the Huyami Store application.

## Components

### Button

A versatile button component with multiple variants and sizes.

**Props:**

- `variant`: 'primary' | 'secondary' | 'outline' | 'ghost'
- `size`: 'sm' | 'md' | 'lg' | 'xl'
- `fullWidth`: boolean - makes button full width
- `isLoading`: boolean - shows loading state

**Example:**

```tsx
<Button variant="primary" size="lg" fullWidth>
  اشتر الآن
</Button>
```

### Input

A styled input component with icon support and various variants.

**Props:**

- `variant`: 'default' | 'rounded' | 'search'
- `label`: string - input label
- `error`: string - error message
- `helperText`: string - helper text
- `leftIcon`: React.ReactNode - icon on the left
- `rightIcon`: React.ReactNode - icon on the right

**Example:**

```tsx
<Input
  variant="search"
  placeholder="Search..."
  leftIcon={<Search size={20} />}
/>
```

### IconButton

A button component specifically for icons with badge support.

**Props:**

- `icon`: React.ReactNode - the icon to display
- `badge`: string | number - badge text/number
- `variant`: 'default' | 'ghost' | 'outline'
- `size`: 'sm' | 'md' | 'lg'

**Example:**

```tsx
<IconButton
  icon={<ShoppingCart size={24} />}
  badge={5}
  onClick={handleCartClick}
/>
```

### Badge

A small badge component for labels and notifications.

**Props:**

- `variant`: 'primary' | 'secondary' | 'success' | 'warning' | 'error' | 'new' | 'discount'
- `size`: 'sm' | 'md' | 'lg'
- `position`: 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right' | 'static'

**Example:**

```tsx
<Badge variant="new" position="top-left">
  جديد
</Badge>
```

### Card

A flexible card container component.

**Props:**

- `variant`: 'default' | 'elevated' | 'outlined' | 'flat'
- `padding`: 'none' | 'sm' | 'md' | 'lg'
- `hover`: boolean - adds hover effects

**Example:**

```tsx
<Card variant="elevated" padding="lg" hover>
  <h3>Card Title</h3>
  <p>Card content</p>
</Card>
```

### Dropdown

A dropdown menu component.

**Props:**

- `trigger`: React.ReactNode - element that triggers dropdown
- `items`: DropdownItem[] - array of menu items
- `position`: 'left' | 'right' | 'center'

**Example:**

```tsx
<Dropdown
  trigger={<Button>Menu</Button>}
  items={[{ id: "1", label: "Option 1", value: "1", onClick: handleClick }]}
  position="right"
/>
```

### QuantitySelector

A component for selecting quantities with increment/decrement buttons.

**Props:**

- `value`: number - current value
- `onChange`: (value: number) => void - change handler
- `min`: number - minimum value (default: 1)
- `max`: number - maximum value (default: 99)
- `size`: 'sm' | 'md' | 'lg'

**Example:**

```tsx
<QuantitySelector
  value={quantity}
  onChange={setQuantity}
  min={1}
  max={10}
  size="md"
/>
```

## Theme Integration

All components use the theme colors defined in `globals.css`:

- Primary colors (green theme)
- Secondary colors (amber theme)
- Theme-aware backgrounds and text colors

## Usage

Import components individually or all at once:

```tsx
import { Button, Input, Card } from "@/components/ui";
// or
import Button from "@/components/ui/Button";
```
