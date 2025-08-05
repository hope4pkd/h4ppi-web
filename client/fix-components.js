const fs = require('fs');
const path = require('path');

// Comprehensive component replacement mappings
const replacements = [
  // Button variant fixes
  { from: /variant="primary"/g, to: 'variant="solid"' },
  { from: /variant="accent"/g, to: 'variant="outline"' },
  
  // Import fixes - Remove problematic imports
  { from: /import.*\{[^}]*Card[^}]*\}.*from.*"@chakra-ui\/react"/g, to: (match) => {
    return match.replace(/,?\s*Card\s*,?/g, '').replace(/,\s*,/g, ',').replace(/{\s*,/g, '{').replace(/,\s*}/g, '}');
  }},
  
  // Component replacements
  { from: /<Card([^>]*)>/g, to: '<Box$1 rounded="xl" shadow="md" border="1px solid" borderColor="gray.200">' },
  { from: /<\/Card>/g, to: '</Box>' },
  
  // Remove problematic component imports
  { from: /,?\s*FormControl\s*,?/g, to: '' },
  { from: /,?\s*FormLabel\s*,?/g, to: '' },
  { from: /,?\s*FormHelperText\s*,?/g, to: '' },
  { from: /,?\s*Stepper\s*,?/g, to: '' },
  { from: /,?\s*Step\s*,?/g, to: '' },
  { from: /,?\s*StepIndicator\s*,?/g, to: '' },
  { from: /,?\s*StepStatus\s*,?/g, to: '' },
  { from: /,?\s*StepIcon\s*,?/g, to: '' },
  { from: /,?\s*StepNumber\s*,?/g, to: '' },
  { from: /,?\s*StepTitle\s*,?/g, to: '' },
  { from: /,?\s*StepDescription\s*,?/g, to: '' },
  { from: /,?\s*StepSeparator\s*,?/g, to: '' },
  { from: /,?\s*useSteps\s*,?/g, to: '' },
  { from: /,?\s*Radio\s*,?/g, to: '' },
  { from: /,?\s*RadioGroup\s*,?/g, to: '' },
  { from: /,?\s*Checkbox\s*,?/g, to: '' },
  { from: /,?\s*CheckboxGroup\s*,?/g, to: '' },
  { from: /,?\s*Avatar\s*,?/g, to: '' },
  { from: /,?\s*AvatarGroup\s*,?/g, to: '' },
  { from: /,?\s*Progress\s*,?/g, to: '' },
  { from: /,?\s*Alert\s*,?/g, to: '' },
  { from: /,?\s*AlertIcon\s*,?/g, to: '' },
  { from: /,?\s*List\s*,?/g, to: '' },
  { from: /,?\s*ListItem\s*,?/g, to: '' },
  { from: /,?\s*ListIcon\s*,?/g, to: '' },
  { from: /,?\s*Select\s*,?/g, to: '' },
  { from: /,?\s*InputLeftElement\s*,?/g, to: '' },
  
  // Clean up double commas and empty imports
  { from: /,\s*,/g, to: ',' },
  { from: /{\s*,/g, to: '{' },
  { from: /,\s*}/g, to: '}' },
  { from: /{\s*}/g, to: '{}' },
  
  // Color token fixes
  { from: /color="textPrimary"/g, to: 'color="gray.900"' },
  { from: /color="textSecondary"/g, to: 'color="gray.600"' },
  { from: /_dark=\{\{[^}]*\}\}/g, to: '' },
  
  // Property fixes
  { from: /leftIcon=\{[^}]*\}/g, to: '' },
  { from: /max=\{/g, to: 'maxCount={' },
  { from: /noOfLines=\{/g, to: '// noOfLines={' },
];

// Add import for our UI components at the top
const addImports = `
import { 
  FormControl, 
  FormLabel, 
  FormHelperText,
  Stepper, 
  useSteps,
  Select, 
  Radio, 
  RadioGroup, 
  Checkbox,
  Alert,
  Avatar,
  AvatarGroup,
  Progress,
  List,
  ListItem,
  CardBox
} from "@/components/ui"
`;

function processFile(filePath) {
  if (!fs.existsSync(filePath)) return;
  
  let content = fs.readFileSync(filePath, 'utf8');
  
  // Apply all replacements
  for (const replacement of replacements) {
    if (typeof replacement.to === 'function') {
      content = content.replace(replacement.from, replacement.to);
    } else {
      content = content.replace(replacement.from, replacement.to);
    }
  }
  
  // Add our imports if file uses React components
  if (content.includes('from "@chakra-ui/react"') && !content.includes('from "@/components/ui"')) {
    const importIndex = content.indexOf('import { useState } from "react"');
    if (importIndex !== -1) {
      content = content.slice(0, importIndex) + addImports + '\n' + content.slice(importIndex);
    }
  }
  
  fs.writeFileSync(filePath, content);
  console.log(`Processed: ${filePath}`);
}

// Process all component files
const componentsDir = './src/components';
function processDirectory(dir) {
  const files = fs.readdirSync(dir, { withFileTypes: true });
  
  for (const file of files) {
    const fullPath = path.join(dir, file.name);
    
    if (file.isDirectory()) {
      processDirectory(fullPath);
    } else if (file.name.endsWith('.tsx') && !file.name.includes('ui/')) {
      processFile(fullPath);
    }
  }
}

processDirectory(componentsDir);
console.log('Component migration completed!');