import * as url from 'url';

import { Command, flags } from '@oclif/command';

import { CommandRunner } from './runners/CommandRunner';
import { HttpRunner } from './runners/HttpRunner';
import { IRunner } from './runners/IRunner';

class Twink extends Command {
  static description = 'Run a task and expect some appropriate output';

  static flags = {
    version: flags.version({ char: 'v' }),
    help: flags.help({ char: 'h' }),
    expectation: flags.string({ char: 'e' }),
  };

  static args = [
    {
      name: 'task',
      description: 'A command, URL, or other runnable task',
      required: true,
    }
  ];

  static strict = false;

  async run() {
    const { args, flags } = this.parse(Twink);

    const isHttp = !!url.parse(args.task).hostname;

    const runner: IRunner = isHttp
      ? new HttpRunner(args.task, flags.expectation)
      : new CommandRunner(args.task, flags.expectation);
    const output = await runner.run();

    if (!output) {
      this.exit(1);
    }
  }
}

export = Twink;
