import { spawn } from 'child_process';

import { IRunner } from './IRunner';

/**
 * Interprets `task` as a command to run and `expected` as some text
 * to look for in the output.
 */
export class CommandRunner implements IRunner {
  private task: string;
  private stdout: string;
  private stderr: string;
  private expected: string | null;

  constructor(task: string, expected: string | undefined) {
    this.task = task;
    this.stdout = '';
    this.stderr = '';
    this.expected = expected || null;
  }

  async run(): Promise<boolean> {
    const binary = this.task.split(' ')[0];
    const rest = this.task.split(' ').slice(1);
    const pid = spawn(binary, rest);
    pid.stdout.on('data', data => this.stdout += data.toString());
    pid.stderr.on('data', data => this.stderr += data.toString());

    const exitCode = await new Promise<number>(resolve => {
      pid.on('close', resolve);
    });

    return this.expected
      ? this.stdout.includes(this.expected) || this.stderr.includes(this.expected)
      : exitCode === 0;
  }
}
