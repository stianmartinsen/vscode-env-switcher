import * as vscode from "vscode";
import * as fs from "fs";
import * as path from "path";

interface EnvironmentSection {
  name: string;
  startLine: number;
  endLine: number;
  lines: string[];
}

export function activate(context: vscode.ExtensionContext) {
  // Register commands
  let switchToStaging = vscode.commands.registerCommand(
    "envSwitcher.switchToStaging",
    () => {
      switchEnvironment("staging");
    }
  );

  let switchToProduction = vscode.commands.registerCommand(
    "envSwitcher.switchToProduction",
    () => {
      switchEnvironment("production");
    }
  );

  context.subscriptions.push(switchToStaging, switchToProduction);
}

async function switchEnvironment(targetEnv: "staging" | "production") {
  const document = vscode.window.activeTextEditor?.document;

  if (!document) {
    return;
  }

  try {
    const content = document.getText();

    let hasChanges = false;

    let isCommenting = false;
    let isUncommenting = false;

    let modifiedContent = "";

    for (const line of content.split("\n")) {
      let newLine = line;

      if (
        line.startsWith("#") &&
        (line.toLowerCase().includes(" production") ||
          line.toLowerCase().includes(" staging"))
      ) {
        if (
          (line.toLowerCase().includes(" production") &&
            targetEnv === "production") ||
          (line.toLowerCase().includes(" staging") && targetEnv === "staging")
        ) {
          isUncommenting = true;
        } else if (
          (line.toLowerCase().includes(" production") &&
            targetEnv === "staging") ||
          (line.toLowerCase().includes(" staging") &&
            targetEnv === "production")
        ) {
          isCommenting = true;
        }
      } else if (line === "") {
        isCommenting = false;
        isUncommenting = false;
      } else if (isCommenting && line.startsWith("#") === false) {
        newLine = "#" + line;
      } else if (isUncommenting && line.startsWith("#") === true) {
        newLine = line.replace(/^#\s*/, "");
      }

      modifiedContent += newLine + "\n";
    }

    modifiedContent = modifiedContent.trim();

    hasChanges = modifiedContent !== content;

    if (hasChanges) {
      // Apply changes to the document
      const edit = new vscode.WorkspaceEdit();
      const fullRange = new vscode.Range(0, 0, document.lineCount, 0);
      edit.replace(document.uri, fullRange, modifiedContent);

      await vscode.workspace.applyEdit(edit);

      vscode.window.showInformationMessage(
        `Successfully switched to ${targetEnv} environment!`
      );
    } else {
      vscode.window.showWarningMessage(
        `No switchable ${targetEnv} configuration found, lol!!!`
      );
    }
  } catch (error) {
    vscode.window.showErrorMessage(`Error switching environment: ${error}`);
  }
}

export function deactivate() {}
