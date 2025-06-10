# Environment Switcher

**Quickly switch between multiple environments in your `.env` files with just a few keystrokes!**

![Version](https://img.shields.io/badge/version-0.0.1-blue.svg)
![VS Code](https://img.shields.io/badge/VS%20Code-1.96.2+-green.svg)

## Features

- 🚀 **Dynamic Environment Switching**: Support for unlimited custom environments (staging, production, development, testing, etc.)
- 🎯 **Smart Environment Detection**: Automatically detects all available environments in your file
- ⌨️ **Quick Access**: Single keyboard shortcut to access environment picker
- 📝 **Intelligent Comment Management**: Automatically comments/uncomments environment-specific sections
- 🔄 **Multiple Blocks**: Support for multiple environment blocks with the same name
- 🛑 **Scope Boundaries**: Respects blank lines as environment scope terminators
- 🎯 **Context-Aware**: Works only when editing `.env` files for focused functionality
- 📋 **Interactive Picker**: Visual selection of environments with block and line counts

## How It Works

The extension detects environment sections in your `.env` files marked with comments using the `# env=<name>` syntax. It automatically comments/uncomments the appropriate sections when switching environments, while preserving shared variables and respecting scope boundaries.

### Example `.env` file structure:

```env
# Common variables (always active)
DATABASE_URL=postgres://localhost:5432/myapp
API_VERSION=v1

# env=production
API_URL=https://api.production.com
DEBUG=false
LOG_LEVEL=error

# env=staging
# API_URL=https://api.staging.com
# DEBUG=true
# LOG_LEVEL=debug

# env=development
# API_URL=http://localhost:3000
# DEBUG=true
# LOG_LEVEL=debug
# MOCK_DATA=true

# Sanity env=staging
# SANITY_DATASET=staging
# SANITY_PROJECT_ID=staging123

# Sanity env=production
SANITY_DATASET=production
SANITY_PROJECT_ID=prod456

# Variables below this blank line are never modified
SHARED_CONFIG=always_active
GLOBAL_TIMEOUT=30
```

After switching to **staging**:

```env
# Common variables (always active)
DATABASE_URL=postgres://localhost:5432/myapp
API_VERSION=v1

# env=production
# API_URL=https://api.production.com
# DEBUG=false
# LOG_LEVEL=error

# env=staging
API_URL=https://api.staging.com
DEBUG=true
LOG_LEVEL=debug

# env=development
# API_URL=http://localhost:3000
# DEBUG=true
# LOG_LEVEL=debug
# MOCK_DATA=true

# Sanity env=staging
SANITY_DATASET=staging
SANITY_PROJECT_ID=staging123

# Sanity env=production
# SANITY_DATASET=production
# SANITY_PROJECT_ID=prod456

# Variables below this blank line are never modified
SHARED_CONFIG=always_active
GLOBAL_TIMEOUT=30
```

## Installation

1. Open VS Code
2. Go to Extensions (Ctrl+Shift+X / Cmd+Shift+X)
3. Search for "Environment Switcher"
4. Click Install

## Usage

### Command Palette

1. Open your `.env` file
2. Open Command Palette (`Ctrl+Shift+P` / `Cmd+Shift+P`)
3. Type "Change Environment" or "Env Switcher"
4. Select **Change Environment**
5. Choose your desired environment from the list

### Keyboard Shortcut

- **Change Environment**: `Alt+Ctrl+E` (Windows/Linux) or `Alt+Cmd+E` (Mac)

### Context Menu

Right-click in any `.env` file to access **Change Environment** directly from the context menu.

## File Format Support

The extension works with:

- `.env` files
- `.env.local` files
- Files with `dotenv` language mode
- Files with `ini` language mode

## Environment Section Format

To use the environment switcher, structure your `.env` file with the `# env=<name>` syntax:

### Basic Format

```env
# env=production
PROD_API=https://prod.api.com
PROD_DEBUG=false

# env=staging
STAGING_API=https://staging.api.com
STAGING_DEBUG=true
```

### Advanced Features

#### Multiple Blocks Per Environment

You can have multiple blocks for the same environment:

```env
# API env=production
API_URL=https://api.prod.com
API_KEY=prod123

# Database env=production
DB_HOST=prod.db.com
DB_NAME=prod_db

# API env=staging
# API_URL=https://api.staging.com
# API_KEY=staging123

# Database env=staging
# DB_HOST=staging.db.com
# DB_NAME=staging_db
```

#### Scope Boundaries

Blank lines terminate environment scope - variables after blank lines are never modified:

```env
# env=production
PROD_VAR=value

# env=staging
# STAGING_VAR=value

# These variables are always active (never commented/uncommented)
SHARED_SECRET=always_active
GLOBAL_CONFIG=persistent
```

#### Custom Environment Names

Use any environment names you need:

```env
# env=development
# env=testing
# env=staging
# env=production
# env=local
# env=demo
```

## Commands

| Command                         | Description                        | Keybinding (Win/Linux) | Keybinding (Mac) |
| ------------------------------- | ---------------------------------- | ---------------------- | ---------------- |
| `envSwitcher.changeEnvironment` | Open environment picker and switch | `ALT+Ctrl+E`           | `ALT+Cmd+E`      |

## Environment Picker

When you run the **Change Environment** command, you'll see a picker showing:

- **Environment Name**: The name of each detected environment
- **Block Count**: How many blocks exist for this environment
- **Line Count**: Total lines across all blocks for this environment

Example picker display:

```
production    2 block(s), 8 lines
staging       2 block(s), 6 lines
development   1 block(s), 4 lines
```

## Requirements

- VS Code 1.96.2 or higher
- `.env` files with properly formatted environment sections using `# env=<name>` syntax

## Key Features

### ✅ Smart Parsing

- Detects `# env=<name>` syntax with optional prefixes (e.g., `# API env=production`)
- Supports unlimited custom environment names
- Handles multiple blocks per environment

### ✅ Scope Management

- Blank lines terminate environment scope
- Variables outside environment sections remain untouched
- Preserves shared/global variables

### ✅ Intelligent Switching

- Comments out non-selected environments
- Uncomments selected environment
- Maintains proper formatting and indentation

## Known Issues

- Environment sections must use the `# env=<name>` syntax
- Blank lines are used as scope terminators
- Only one environment can be active at a time

## Contributing

Found a bug or have a feature request? Please open an issue on the [GitHub repository](https://github.com/stianmartinsen/vscode-env-switcher).

## Release Notes

### 0.0.2

- Add icon
- Update readme

### 0.0.1

- Single command interface with environment picker
- Support for unlimited custom environments
- Multiple blocks per environment support
- Blank line scope termination
- Dynamic environment detection
- Interactive environment selection

---

**Enjoy seamless environment switching across all your environments!** 🚀
