# Environment Switcher

**Quickly switch between production and staging environments in your `.env` files with just a few keystrokes!**

![Version](https://img.shields.io/badge/version-0.0.1-blue.svg)
![VS Code](https://img.shields.io/badge/VS%20Code-1.96.2+-green.svg)

## Features

- 🚀 **One-Click Environment Switching**: Instantly toggle between production and staging configurations
- ⌨️ **Keyboard Shortcuts**: Quick access with customizable key bindings
- 📝 **Smart Comment Management**: Automatically comments/uncomments environment-specific sections
- 🎯 **Context-Aware**: Works only when editing `.env` files for focused functionality
- 🔧 **Command Palette Integration**: Access commands through VS Code's command palette

## How It Works

The extension works by detecting environment sections in your `.env` files marked with comments like `# production` or `# staging`. It then automatically comments/uncomments the appropriate sections when switching environments.

### Example `.env` file structure:

```env
# Common variables (always active)
DATABASE_URL=postgres://localhost:5432/myapp
API_VERSION=v1

# production
API_URL=https://api.production.com
DEBUG=false
LOG_LEVEL=error

# staging
# API_URL=https://api.staging.com
# DEBUG=true
# LOG_LEVEL=debug
```

After switching to **staging**:

```env
# Common variables (always active)
DATABASE_URL=postgres://localhost:5432/myapp
API_VERSION=v1

# production
# API_URL=https://api.production.com
# DEBUG=false
# LOG_LEVEL=error

# staging
API_URL=https://api.staging.com
DEBUG=true
LOG_LEVEL=debug
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
3. Type "Environment Switcher" or "Env Switcher"
4. Select either:
   - **Switch to Production Environment**
   - **Switch to Staging Environment**

### Keyboard Shortcuts

- **Switch to Staging**: `Ctrl+Shift+E S` (Windows/Linux) or `Cmd+Shift+E S` (Mac)
- **Switch to Production**: `Ctrl+Shift+E P` (Windows/Linux) or `Cmd+Shift+E P` (Mac)

### Context Menu

Right-click in any `.env` file to access the Environment Switcher submenu with both switching options.

## File Format Support

The extension works with:

- `.env` files
- `.env.local` files
- Files with `dotenv` language mode
- Files with `ini` language mode

## Environment Section Format

To use the environment switcher, structure your `.env` file with clear environment markers:

1. **Section Headers**: Use comments like `# production` or `# staging`
2. **Environment Variables**: Place your environment-specific variables below each header
3. **Separation**: Use blank lines to separate different environment sections

```env
# Global/shared variables
SHARED_VAR=value

# production
PROD_API=https://prod.api.com
PROD_DEBUG=false

# staging
STAGING_API=https://staging.api.com
STAGING_DEBUG=true
```

## Commands

| Command                          | Description                      | Keybinding (Win/Linux) | Keybinding (Mac) |
| -------------------------------- | -------------------------------- | ---------------------- | ---------------- |
| `envSwitcher.switchToStaging`    | Switch to staging environment    | `Ctrl+Shift+E S`       | `Cmd+Shift+E S`  |
| `envSwitcher.switchToProduction` | Switch to production environment | `Ctrl+Shift+E P`       | `Cmd+Shift+E P`  |

## Requirements

- VS Code 1.96.2 or higher
- `.env` files with properly formatted environment sections

## Known Issues

- Environment sections must be clearly marked with comments containing "production" or "staging"
- Variables outside of marked sections remain unchanged
- Empty lines are used to separate environment sections

## Contributing

Found a bug or have a feature request? Please open an issue on the [GitHub repository](https://github.com/your-username/env-switcher).

## Release Notes

### 0.0.1

- Initial release
- Basic environment switching functionality
- Command palette integration
- Keyboard shortcuts
- Context menu support

---

**Enjoy seamless environment switching!** 🚀
