import axios from 'axios';

import { IRunner } from './IRunner';

/**
 * Interprets `task` as a url to fetch and `expectation` as a status code to
 * expect or some text to look for in the response.
 */
export class HttpRunner implements IRunner {
  private task: string;
  private expected: string;

  constructor(task: string, expected: string | undefined) {
    this.task = task;
    this.expected = expected || '200';
  }

  async run(): Promise<boolean> {
    const response = await axios.get(this.task, { validateStatus: () => true });
    const body = response.data as string;

    const statusCode = parseInt(this.expected, 10);

    if (isNaN(statusCode)) {
      return Promise.resolve(body.includes(this.expected));
    }
    return Promise.resolve(response!.status === statusCode);
  }
}
