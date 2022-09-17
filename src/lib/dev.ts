export async function obsidianConsoleApi() {
  if (process.env.NODE_ENV === 'development') {
    const apis = await import('obsidian');
    for (const key in apis) {
      //@ts-ignore
      window[key] = apis[key];
    }
    console.log('Loaded obsidian APIs into window for developer convenience');
  }
}
