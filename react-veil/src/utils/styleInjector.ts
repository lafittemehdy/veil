const injectedStyles = new Set<string>();

export function injectStyles(cssContent: string, styleId: string): void {
  if (typeof document === 'undefined' || injectedStyles.has(styleId)) {
    // Don't run in SSR or if styles already injected
    return;
  }

  const styleElement = document.createElement('style');
  styleElement.id = styleId;
  styleElement.textContent = cssContent;
  document.head.appendChild(styleElement);
  injectedStyles.add(styleId);
}