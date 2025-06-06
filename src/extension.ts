import * as vscode from "vscode";

interface EnvironmentSection {
  name: string;
  startLine: number;
  endLine: number;
  lines: string[];
}

export function activate(context: vscode.ExtensionContext) {
  // Register the single command for changing environment
  let changeEnvironment = vscode.commands.registerCommand(
    "envSwitcher.changeEnvironment",
    async () => {
      await showEnvironmentPicker();
    }
  );

  context.subscriptions.push(changeEnvironment);
}

async function showEnvironmentPicker() {
  const document = vscode.window.activeTextEditor?.document;

  if (!document) {
    vscode.window.showErrorMessage(
      "No active editor found. Please open an .env file."
    );
    return;
  }

  try {
    const content = document.getText();
    const environments = parseEnvironments(content);

    if (environments.length === 0) {
      vscode.window.showWarningMessage(
        "No environments found. Use '# env=<name>' syntax to define environments."
      );
      return;
    }

    // Get unique environment names
    const uniqueEnvNames = Array.from(
      new Set(environments.map((env) => env.name))
    );

    // Create quick pick items
    const items: vscode.QuickPickItem[] = uniqueEnvNames.map((envName) => {
      const envSections = environments.filter((env) => env.name === envName);
      const totalLines = envSections.reduce(
        (sum, section) => sum + (section.endLine - section.startLine),
        0
      );
      return {
        label: envName,
        description: `${envSections.length} block(s), ${totalLines} lines`,
      };
    });

    // Show the quick pick
    const selectedItem = await vscode.window.showQuickPick(items, {
      placeHolder: "Select an environment to switch to",
      title: "Change Environment",
    });

    if (selectedItem) {
      await switchToEnvironment(selectedItem.label, environments);
    }
  } catch (error) {
    vscode.window.showErrorMessage(`Error reading environments: ${error}`);
  }
}

function parseEnvironments(content: string): EnvironmentSection[] {
  const lines = content.split("\n");
  const environments: EnvironmentSection[] = [];
  let currentEnv: EnvironmentSection | null = null;

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    const envMatch = line.match(/^#\s*.*\senv\s*=\s*(.+)$/i);

    if (envMatch) {
      // Save the previous environment if it exists
      if (currentEnv) {
        currentEnv.endLine = i - 1;
        environments.push(currentEnv);
      }

      // Start a new environment section
      currentEnv = {
        name: envMatch[1].trim(),
        startLine: i,
        endLine: i,
        lines: [],
      };
    } else if (currentEnv) {
      // Check if this is a blank line (scope terminator)
      if (line.trim() === "") {
        // End the current environment section
        currentEnv.endLine = i - 1;
        environments.push(currentEnv);
        currentEnv = null;
      } else {
        // Add line to current environment section
        currentEnv.lines.push(line);

        // Check if this is the end of file
        if (i === lines.length - 1) {
          currentEnv.endLine = i;
          environments.push(currentEnv);
          currentEnv = null;
        }
      }
    }
  }

  return environments;
}

async function switchToEnvironment(
  targetEnv: string,
  environments: EnvironmentSection[]
) {
  const document = vscode.window.activeTextEditor?.document;

  if (!document) {
    return;
  }

  try {
    const content = document.getText();
    const lines = content.split("\n");

    // Process each line
    for (let i = 0; i < lines.length; i++) {
      const line = lines[i];

      // Skip environment header comments
      if (line.match(/^#\s*.*\senv\s*=\s*(.+)$/i)) {
        continue;
      }

      // Find which environment this line belongs to
      const envSection = environments.find(
        (env) => i > env.startLine && i <= env.endLine
      );

      if (envSection) {
        // This line belongs to an environment section
        if (envSection.name === targetEnv) {
          // This is the target environment - uncomment if commented
          if (line.startsWith("#") && !line.match(/^#\s*.*\senv\s*=/i)) {
            lines[i] = line.replace(/^#\s*/, "");
          }
        } else {
          // This is not the target environment - comment if not commented
          if (!line.startsWith("#") && line.trim() !== "") {
            lines[i] = "#" + line;
          }
        }
      }
      // Lines outside environment sections remain unchanged
    }

    const modifiedContent = lines.join("\n");

    if (modifiedContent !== content) {
      // Apply changes to the document
      const edit = new vscode.WorkspaceEdit();
      const fullRange = new vscode.Range(0, 0, document.lineCount, 0);
      edit.replace(document.uri, fullRange, modifiedContent);

      await vscode.workspace.applyEdit(edit);

      vscode.window.showInformationMessage(
        `Successfully switched to ${targetEnv} environment!`
      );
    } else {
      vscode.window.showInformationMessage(
        `Environment ${targetEnv} is already active.`
      );
    }
  } catch (error) {
    vscode.window.showErrorMessage(`Error switching environment: ${error}`);
  }
}

export function deactivate() {}
