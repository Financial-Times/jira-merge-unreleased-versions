# jira-merge-unreleased-versions

Merge unreleased JIRA versions since the last released version into the latest version.

e.g. if you have a bunch of versions in your JIRA that look like:

| Version    | Released     |
|------------|--------------|
| project-v4 | `Unreleased` |
| project-v3 | `Unreleased` |
| project-v2 | `Unreleased` |
| project-v1 | `Released`   |

and you run `jira-merge-unreleased-versions`, you'll end up with:

| Version    | Released     |
|------------|--------------|
| project-v4 | `Released`   |
| project-v1 | `Released`   |

with all the tickets from v2 and v3 moved into v4.

## Usage

```
npm install --save jira-merge-unreleased-versions
```

You'll need a `package.json`, whose `name` will be used as the prefix to find your JIRA versions, and self-explanatory environment variables `JIRA_HOST`, `JIRA_PROJECT`, `JIRA_USERNAME` and `JIRA_PASSWORD`.

## Why

We've got [automatic versioning](http://blog.153.io/2016/07/25/heroku-version-infer/) for our apps, and when a new staging version is released (which corresponds 1:1 with a pull request being merged) we add that version number to the fixVersion field in JIRA for any tickets we find in the branch name. We manually promote staging versions to production, so we invariably end up skipping a few versions each time. That's fine in itself, but it makes it difficult to find out what's in each production version.

So now, when we promote to production, we merge all the unreleased versions on JIRA into the latest version. That's the version that's on production, and it contains the tickets fixed in the staging versions that went into it. Win.

## Licence

ISC. &copy; Financial Times
