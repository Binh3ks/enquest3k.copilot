/* eslint-disable no-console */
/* eslint-disable @typescript-eslint/no-var-requires */

const fs = require('fs');
const path = require('path');

const DOC_FILE = path.join(__dirname, '..', 'docs', 'ai_application_context.md');
const FRONTEND_PACKAGE = path.join(__dirname, '..', 'package.json');
const BACKEND_PACKAGE = path.join(__dirname, '..', 'mcp-server', 'package.json');
const DB_SCHEMA = path.join(__dirname, '..', 'mcp-server', 'database', 'init.sql');

const readJsonFile = (filePath) => {
  try {
    return JSON.parse(fs.readFileSync(filePath, 'utf-8'));
  } catch (error) {
    return null;
  }
};

const readTextFile = (filePath) => {
  try {
    return fs.readFileSync(filePath, 'utf-8');
  } catch (error) {
    return null;
  }
};

const generateAiContext = () => {
  const frontendPackage = readJsonFile(FRONTEND_PACKAGE);
  const backendPackage = readJsonFile(BACKEND_PACKAGE);
  const dbSchema = readTextFile(DB_SCHEMA);

  let docContent = readTextFile(DOC_FILE);

  if (!docContent) {
    console.error(`Failed to read template file: ${DOC_FILE}`);
    return;
  }

  console.log('Updating AI context metadata (timestamp, dependencies, schema)...');

  // Replace timestamp (handle both placeholder and existing timestamp)
  const newTimestamp = new Date().toISOString();
  if (docContent.includes('<!-- AUTO_GENERATED_TIMESTAMP -->')) {
    docContent = docContent.replace('<!-- AUTO_GENERATED_TIMESTAMP -->', newTimestamp);
  } else {
    // Replace existing timestamp pattern: _Last Updated: YYYY-MM-DDTHH:MM:SS.sssZ_
    docContent = docContent.replace(/_Last Updated: \d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}\.\d{3}Z_/, `_Last Updated: ${newTimestamp}_`);
  }

  // Replace frontend dependencies (handle both placeholders and existing content)
  if (frontendPackage) {
    const frontendDeps = Object.keys(frontendPackage.dependencies || {}).map(dep => `\`${dep}\``).join(', ');
    const frontendDevDeps = Object.keys(frontendPackage.devDependencies || {}).map(dep => `\`${dep}\``).join(', ');
    const frontendScripts = Object.keys(frontendPackage.scripts || {}).map(script => `\`${script}\``).join(', ');
    
    // Replace placeholders if they exist, otherwise replace the line containing the existing data
    if (docContent.includes('<!-- AUTO_GENERATED_FRONTEND_DEPS -->')) {
      docContent = docContent.replace('<!-- AUTO_GENERATED_FRONTEND_DEPS -->', frontendDeps);
    } else {
      docContent = docContent.replace(/\*\s+\*\*Dependencies:\*\*.*/, `*   **Dependencies:** ${frontendDeps}`);
    }
    
    if (docContent.includes('<!-- AUTO_GENERATED_FRONTEND_DEVDEPS -->')) {
      docContent = docContent.replace('<!-- AUTO_GENERATED_FRONTEND_DEVDEPS -->', frontendDevDeps);
    } else {
      docContent = docContent.replace(/\*\s+\*\*Dev Dependencies:\*\*.*/, `*   **Dev Dependencies:** ${frontendDevDeps}`);
    }
    
    if (docContent.includes('<!-- AUTO_GENERATED_FRONTEND_SCRIPTS -->')) {
      docContent = docContent.replace('<!-- AUTO_GENERATED_FRONTEND_SCRIPTS -->', frontendScripts);
    } else {
      docContent = docContent.replace(/\*\s+\*\*Scripts:\*\*.*/, `*   **Scripts:** ${frontendScripts}`);
    }
  }

  // Replace backend dependencies (handle both placeholders and existing content)
  if (backendPackage) {
    const backendDeps = Object.keys(backendPackage.dependencies || {}).map(dep => `\`${dep}\``).join(', ');
    const backendDevDeps = Object.keys(backendPackage.devDependencies || {}).map(dep => `\`${dep}\``).join(', ');
    const backendScripts = Object.keys(backendPackage.scripts || {}).map(script => `\`${script}\``).join(', ');
    
    if (docContent.includes('<!-- AUTO_GENERATED_BACKEND_DEPS -->')) {
      docContent = docContent.replace('<!-- AUTO_GENERATED_BACKEND_DEPS -->', backendDeps);
    } else {
      docContent = docContent.replace(/\*\s+\*\*Dependencies:\*\*\s+`@google.*/, `*   **Dependencies:** ${backendDeps}`);
    }
    
    if (docContent.includes('<!-- AUTO_GENERATED_BACKEND_DEVDEPS -->')) {
      docContent = docContent.replace('<!-- AUTO_GENERATED_BACKEND_DEVDEPS -->', backendDevDeps);
    } else {
      docContent = docContent.replace(/\*\s+\*\*Dev Dependencies:\*\*\s+`nodemon`/, `*   **Dev Dependencies:** ${backendDevDeps}`);
    }
    
    if (docContent.includes('<!-- AUTO_GENERATED_BACKEND_SCRIPTS -->')) {
      docContent = docContent.replace('<!-- AUTO_GENERATED_BACKEND_SCRIPTS -->', backendScripts);
    } else {
      docContent = docContent.replace(/\*\s+\*\*Scripts:\*\*\s+`start.*/, `*   **Scripts:** ${backendScripts}`);
    }
  }

  // API Endpoints (this section is now static in the Markdown template)
  // Ensure the placeholder is replaced with its static content if it was empty
  if (docContent.includes('<!-- AUTO_GENERATED_API_ENDPOINTS -->')) {
    const staticApiEndpoints = `*   \`ai.js\`:
    *   \`POST /api/chat\` (Proxies Google Gemini AI requests)
*   \`auth.js\`:
    *   \`POST /api/auth/register\` (User registration)
    *   \`POST /api/auth/login\` (User login, returns JWT)
*   \`progress.js\`:
    *   \`GET /api/progress/:weekId\` (Fetch user progress for a week)
    *   \`POST /api/progress\` (Create/update user progress for a station)
`;
    docContent = docContent.replace('<!-- AUTO_GENERATED_API_ENDPOINTS -->', staticApiEndpoints);
  }

  // Replace DB Schema (handle both placeholder and existing content)
  if (dbSchema) {
    const schemaBlock = `\`\`\`sql\n${dbSchema}\n\`\`\``;
    if (docContent.includes('<!-- AUTO_GENERATED_DB_SCHEMA -->')) {
      docContent = docContent.replace('<!-- AUTO_GENERATED_DB_SCHEMA -->', schemaBlock);
    } else {
      // Replace existing SQL code block
      docContent = docContent.replace(/```sql\n-- EngQuest Database[\s\S]*?```/, schemaBlock);
    }
  } else {
    if (docContent.includes('<!-- AUTO_GENERATED_DB_SCHEMA -->')) {
      docContent = docContent.replace('<!-- AUTO_GENERATED_DB_SCHEMA -->', 'No database schema found.\n');
    }
  }
  
  // Development Log is now managed by context-log.mjs script
  // This script only updates auto-generated metadata

  fs.writeFileSync(DOC_FILE, docContent, 'utf-8');
  console.log(`✅ Successfully updated AI context metadata: ${DOC_FILE}`);
  console.log(`📝 Note: Use 'npm run context:log -- "message"' to add log entries`);
};

generateAiContext();
