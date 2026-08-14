import fs from 'node:fs/promises';
import path from 'node:path';
import {loadFreshModule} from '@docusaurus/utils';

const THEME_ID_PATTERN = /^theme-[a-z0-9]+(?:-[a-z0-9]+)*$/;
const COMPONENT_ID_PATTERN = /^component-[a-z0-9]+(?:-[a-z0-9]+)*$/;
const THEME_COMPONENT_KEYS = ['header', 'navbar', 'main', 'footer'];

async function pathExists(filePath) {
  try {
    await fs.access(filePath);
    return true;
  } catch {
    return false;
  }
}

async function listVariantDirectories(rootDirectory, prefix) {
  if (!(await pathExists(rootDirectory))) {
    return [];
  }

  const entries = await fs.readdir(rootDirectory, {withFileTypes: true});
  return entries
    .filter((entry) => entry.isDirectory() && entry.name.startsWith(prefix))
    .map((entry) => path.join(rootDirectory, entry.name))
    .sort((left, right) => left.localeCompare(right));
}

async function importManifest(manifestPath) {
  return loadFreshModule(manifestPath);
}

function validateManifest({manifest, directory, expectedType}) {
  const directoryName = path.basename(directory);
  const expectedPattern =
    expectedType === 'theme' ? THEME_ID_PATTERN : COMPONENT_ID_PATTERN;

  if (!manifest || typeof manifest !== 'object') {
    throw new Error(
      `[theme-atsea] ${directoryName}/manifest.js 必须默认导出一个对象。`,
    );
  }

  if (manifest.type !== expectedType) {
    throw new Error(
      `[theme-atsea] ${directoryName} 的 type 必须是 "${expectedType}"。`,
    );
  }

  if (typeof manifest.id !== 'string' || !expectedPattern.test(manifest.id)) {
    throw new Error(
      `[theme-atsea] ${directoryName} 的 id 格式不正确。` +
        ` 应使用 ${expectedType}-xxx 的小写短横线格式。`,
    );
  }

  if (manifest.id !== directoryName) {
    throw new Error(
      `[theme-atsea] 目录名 "${directoryName}" 必须与 manifest id ` +
        `"${manifest.id}" 完全一致。`,
    );
  }

  if (typeof manifest.name !== 'string' || manifest.name.trim() === '') {
    throw new Error(`[theme-atsea] ${directoryName} 必须填写非空 name。`);
  }

  if (
    !manifest.files ||
    typeof manifest.files !== 'object' ||
    Array.isArray(manifest.files)
  ) {
    throw new Error(`[theme-atsea] ${directoryName} 必须在 files 中声明入口。`);
  }
}

function normalizeFileList(value, fieldName) {
  if (value === undefined) {
    return [];
  }

  const list = Array.isArray(value) ? value : [value];
  if (list.some((item) => typeof item !== 'string' || item.trim() === '')) {
    throw new Error(`[theme-atsea] ${fieldName} 必须是文件路径或路径数组。`);
  }
  return list;
}

async function resolveDeclaredFile(directory, declaredPath, fieldName) {
  if (typeof declaredPath !== 'string' || declaredPath.trim() === '') {
    throw new Error(`[theme-atsea] ${fieldName} 必须填写文件路径。`);
  }

  const resolvedPath = path.resolve(directory, declaredPath);
  const relativePath = path.relative(directory, resolvedPath);
  if (relativePath.startsWith('..') || path.isAbsolute(relativePath)) {
    throw new Error(`[theme-atsea] ${fieldName} 不能引用当前目录之外的文件。`);
  }

  if (!(await pathExists(resolvedPath))) {
    throw new Error(
      `[theme-atsea] ${fieldName} 引用的文件不存在：${declaredPath}`,
    );
  }

  const stat = await fs.stat(resolvedPath);
  if (!stat.isFile()) {
    throw new Error(
      `[theme-atsea] ${fieldName} 必须引用文件：${declaredPath}`,
    );
  }

  return resolvedPath;
}

async function resolveDeclaredFiles(manifest, directory, expectedType) {
  const files = {styles: [], clientModules: []};

  if (expectedType === 'theme') {
    await Promise.all(
      THEME_COMPONENT_KEYS.map(async (key) => {
        const declaredPath = manifest.files[key];
        if (declaredPath !== undefined) {
          files[key] = await resolveDeclaredFile(
            directory,
            declaredPath,
            `${manifest.id}.files.${key}`,
          );
        }
      }),
    );
  } else {
    files.entry = await resolveDeclaredFile(
      directory,
      manifest.files.component,
      `${manifest.id}.files.component`,
    );
  }

  const styles = normalizeFileList(
    manifest.files.styles,
    `${manifest.id}.files.styles`,
  );
  files.styles = await Promise.all(
    styles.map((filePath, index) =>
      resolveDeclaredFile(
        directory,
        filePath,
        `${manifest.id}.files.styles[${index}]`,
      ),
    ),
  );

  const clientModules = normalizeFileList(
    manifest.files.clientModules,
    `${manifest.id}.files.clientModules`,
  );
  files.clientModules = await Promise.all(
    clientModules.map((filePath, index) =>
      resolveDeclaredFile(
        directory,
        filePath,
        `${manifest.id}.files.clientModules[${index}]`,
      ),
    ),
  );

  return files;
}

async function loadTheme(directory) {
  const manifestPath = path.join(directory, 'manifest.js');
  if (!(await pathExists(manifestPath))) {
    throw new Error(`[theme-atsea] ${directory} 缺少固定文件 manifest.js。`);
  }

  const manifest = await importManifest(manifestPath);
  validateManifest({manifest, directory, expectedType: 'theme'});
  const files = await resolveDeclaredFiles(manifest, directory, 'theme');

  if (
    !THEME_COMPONENT_KEYS.some((key) => files[key]) &&
    files.styles.length === 0 &&
    files.clientModules.length === 0
  ) {
    throw new Error(
      `[theme-atsea] ${manifest.id} 至少需要声明一个主题入口、样式或客户端模块。`,
    );
  }

  return {...manifest, directory, files};
}

async function loadComponent(directory) {
  const manifestPath = path.join(directory, 'manifest.js');
  if (!(await pathExists(manifestPath))) {
    throw new Error(`[theme-atsea] ${directory} 缺少固定文件 manifest.js。`);
  }

  const manifest = await importManifest(manifestPath);
  validateManifest({manifest, directory, expectedType: 'component'});
  const files = await resolveDeclaredFiles(manifest, directory, 'component');

  const position = manifest.position ?? 'after';
  if (!['before', 'after'].includes(position)) {
    throw new Error(
      `[theme-atsea] ${manifest.id} 的 position 只能是 before 或 after。`,
    );
  }

  const order = manifest.order ?? 100;
  if (!Number.isFinite(order)) {
    throw new Error(`[theme-atsea] ${manifest.id} 的 order 必须是数字。`);
  }

  return {...manifest, position, order, directory, files};
}

function assertUniqueIds(items) {
  const seen = new Set();

  for (const item of items) {
    if (seen.has(item.id)) {
      throw new Error(`[theme-atsea] 发现重复 id：${item.id}`);
    }
    seen.add(item.id);
  }
}

export async function discoverThemeAtsea(pluginDirectory) {
  const themeDirectories = await listVariantDirectories(
    path.join(pluginDirectory, 'themes'),
    'theme-',
  );
  const componentDirectories = await listVariantDirectories(
    path.join(pluginDirectory, 'components'),
    'component-',
  );

  const themes = await Promise.all(themeDirectories.map(loadTheme));
  const components = await Promise.all(componentDirectories.map(loadComponent));
  assertUniqueIds([...themes, ...components]);

  return {themes, components};
}
