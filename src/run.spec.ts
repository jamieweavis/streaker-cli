import assert from 'node:assert/strict';
import { describe, it } from 'node:test';

import {
  ContributionGraphParseError,
  GitHubRequestError,
  InvalidUsernameError,
} from 'contribution';

import { errorMessage } from './run.ts';

describe('errorMessage', () => {
  it('explains that an invalid username is not valid', () => {
    assert.equal(
      errorMessage(new InvalidUsernameError('Invalid username'), 'bad_name!'),
      '"bad_name!" is not a valid GitHub username',
    );
  });

  it('explains that a 404 means the user was not found', () => {
    assert.equal(
      errorMessage(
        new GitHubRequestError('Not Found', { status: 404 }),
        'ghost-user',
      ),
      'GitHub user "ghost-user" not found',
    );
  });

  it('falls back to a generic message for other request failures', () => {
    assert.equal(
      errorMessage(
        new GitHubRequestError('Server Error', { status: 500 }),
        'jamieweavis',
      ),
      'Failed to fetch contribution stats',
    );
    assert.equal(
      errorMessage(new GitHubRequestError('Network error'), 'jamieweavis'),
      'Failed to fetch contribution stats',
    );
  });

  it('falls back to a generic message for any other error', () => {
    assert.equal(
      errorMessage(new ContributionGraphParseError('Bad HTML'), 'jamieweavis'),
      'Failed to fetch contribution stats',
    );
    assert.equal(
      errorMessage(new Error('Unexpected'), 'jamieweavis'),
      'Failed to fetch contribution stats',
    );
  });
});
