import path from 'node:path';
import {fileURLToPath} from 'node:url';
import {loadFreshModule} from '@docusaurus/utils';
import {discoverThemeAtsea} from './scanner.js';
import {createRegistry, generateThemeRuntime} from './registry.js';

const pluginDirectory = path.dirname(fileURLToPath(import.meta.url));

export default async function themeAtsea(context, options) {
  const configPath = path.resolve(
    context.siteDir,
    options.config ?? 'themes/theme-atsea.config.js',
  );
  const themeAtseaConfig = await loadFreshModule(configPath);
  const discovered = await discoverThemeAtsea(pluginDirectory);
  const registry = createRegistry(discovered, themeAtseaConfig);
  const generatedThemePath = await generateThemeRuntime({
    generatedFilesDir: context.generatedFilesDir,
    registry,
  });

  return {
    name: 'docusaurus-theme-atsea',

    getThemePath() {
      return generatedThemePath;
    },

    getClientModules() {
      return registry.clientModules;
    },
  };
}
