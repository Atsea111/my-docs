import fs from 'node:fs/promises';
import path from 'node:path';

function formatAvailable(items) {
  return items.length > 0
    ? items.map((item) => item.id).join(', ')
    : '（暂无）';
}

function normalizeConfig(config) {
  if (!config || typeof config !== 'object') {
    throw new Error('[theme-atsea] theme-atsea.config.js 必须默认导出对象。');
  }

  const themeId = config.page?.theme ?? false;
  if (themeId !== false && typeof themeId !== 'string') {
    throw new Error('[theme-atsea] page.theme 只能填写 theme-* id 或 false。');
  }

  const componentStates = config.components ?? {};
  if (
    !componentStates ||
    typeof componentStates !== 'object' ||
    Array.isArray(componentStates)
  ) {
    throw new Error('[theme-atsea] components 必须是对象。');
  }

  return {themeId, componentStates};
}

export function createRegistry(discovered, config) {
  const {themeId, componentStates} = normalizeConfig(config);
  const themesById = new Map(discovered.themes.map((theme) => [theme.id, theme]));
  const componentsById = new Map(
    discovered.components.map((component) => [component.id, component]),
  );

  const selectedTheme = themeId === false ? null : themesById.get(themeId);
  if (themeId !== false && !selectedTheme) {
    throw new Error(
      `[theme-atsea] 未找到主题 id：${themeId}。可用主题：` +
        formatAvailable(discovered.themes),
    );
  }

  const enabledComponents = [];
  for (const [componentId, enabled] of Object.entries(componentStates)) {
    if (typeof enabled !== 'boolean') {
      throw new Error(
        `[theme-atsea] 组件 ${componentId} 的值只能是 true 或 false。`,
      );
    }

    const component = componentsById.get(componentId);
    if (!component) {
      throw new Error(
        `[theme-atsea] 未找到组件 id：${componentId}。可用组件：` +
          formatAvailable(discovered.components),
      );
    }

    if (enabled) {
      enabledComponents.push(component);
    }
  }

  enabledComponents.sort(
    (left, right) => left.order - right.order || left.id.localeCompare(right.id),
  );

  const clientModules = [
    ...(selectedTheme?.files.styles ?? []),
    ...(selectedTheme?.files.clientModules ?? []),
    ...enabledComponents.flatMap((component) => component.files.styles),
    ...enabledComponents.flatMap(
      (component) => component.files.clientModules,
    ),
  ].filter(Boolean);

  return {selectedTheme, enabledComponents, clientModules};
}

function importRequest(filePath) {
  return JSON.stringify(filePath.replaceAll(path.sep, '/'));
}

async function writeProxy(themeDirectory, componentName, sourceFile) {
  const componentDirectory = path.join(themeDirectory, componentName);
  await fs.mkdir(componentDirectory, {recursive: true});
  await fs.writeFile(
    path.join(componentDirectory, 'index.js'),
    `export {default} from ${importRequest(sourceFile)};\n`,
  );
}

async function writeMainWrapper(themeDirectory, mainFile) {
  const componentDirectory = path.join(themeDirectory, 'Layout');
  await fs.mkdir(componentDirectory, {recursive: true});
  const source = `import React from 'react';
import OriginalLayout from '@docusaurus/theme-classic/lib/theme/Layout';
import ThemeMain from ${importRequest(mainFile)};

export default function ThemeAtseaLayout(props) {
  return (
    <OriginalLayout {...props}>
      <ThemeMain layoutProps={props}>{props.children}</ThemeMain>
    </OriginalLayout>
  );
}
`;
  await fs.writeFile(path.join(componentDirectory, 'index.js'), source);
}

async function writeRootWrapper(
  themeDirectory,
  headerFile,
  enabledComponents,
) {
  const componentDirectory = path.join(themeDirectory, 'Root');
  await fs.mkdir(componentDirectory, {recursive: true});

  const imports = ["import React from 'react';", "import OriginalRoot from '@theme-init/Root';"];
  if (headerFile) {
    imports.push(`import ThemeHeader from ${importRequest(headerFile)};`);
  }

  enabledComponents.forEach((component, index) => {
    imports.push(
      `import EnabledComponent${index} from ${importRequest(component.files.entry)};`,
    );
  });

  const before = enabledComponents
    .map((component, index) => ({component, index}))
    .filter(({component}) => component.position === 'before')
    .map(
      ({component, index}) =>
        `        <EnabledComponent${index} key=${JSON.stringify(component.id)} />`,
    );
  const after = enabledComponents
    .map((component, index) => ({component, index}))
    .filter(({component}) => component.position === 'after')
    .map(
      ({component, index}) =>
        `        <EnabledComponent${index} key=${JSON.stringify(component.id)} />`,
    );

  const source = `${imports.join('\n')}

export default function ThemeAtseaRoot({children}) {
  return (
    <OriginalRoot>
      <>
${headerFile ? '        <ThemeHeader />\n' : ''}${before.length ? `${before.join('\n')}\n` : ''}        {children}
${after.length ? `${after.join('\n')}\n` : ''}      </>
    </OriginalRoot>
  );
}
`;

  await fs.writeFile(path.join(componentDirectory, 'index.js'), source);
}

export async function generateThemeRuntime({generatedFilesDir, registry}) {
  const runtimeDirectory = path.join(generatedFilesDir, 'theme-atsea');
  const themeDirectory = path.join(runtimeDirectory, 'theme');
  await fs.rm(runtimeDirectory, {recursive: true, force: true});
  await fs.mkdir(themeDirectory, {recursive: true});

  const files = registry.selectedTheme?.files ?? {};
  if (files.navbar) {
    await writeProxy(themeDirectory, 'Navbar', files.navbar);
  }
  if (files.footer) {
    await writeProxy(themeDirectory, 'Footer', files.footer);
  }
  if (files.main) {
    await writeMainWrapper(themeDirectory, files.main);
  }
  if (files.header || registry.enabledComponents.length > 0) {
    await writeRootWrapper(
      themeDirectory,
      files.header,
      registry.enabledComponents,
    );
  }

  return themeDirectory;
}
