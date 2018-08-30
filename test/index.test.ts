import { expect, test } from '@oclif/test';

import cmd = require('../src');

describe('twink', () => {
  test
  .stdout()
  .do(() => cmd.run(['true']))
  .it('runs echo', ctx => {
    expect(ctx.stdout).to.eql('');
  });
});
