import { v4 } from 'uuid';

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

/** Lightweight logger for grouping relevant logs together */
export class Logger {
  private static logs: Record<string, any[]> = {}
  constructor(private name = v4()) {
    Logger.logs[name] = []
  }

  add(...data: any[]) {
    Logger.logs[this.name].push(data)
  }

  execute = () => Logger.execute(this.name)
  reset = () => Logger.reset(this.name) 

  static execute(name: string) {
    console.group(name)
    for (const log of Logger.logs[name]) {
      console.log(...log)
    }
    console.groupEnd()
    this.reset(name)
  }

  static reset(name: string) {
    Logger.logs[name] = []
  }
}