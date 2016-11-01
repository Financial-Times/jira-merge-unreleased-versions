const jiraGetVersions = require('@quarterto/jira-get-versions');
const jiraMergeVersions = require('@quarterto/jira-merge-versions');
const jiraReleaseVersion = require('@quarterto/jira-release-version');

module.exports = ({packageName, hostname, project, user, pass}) =>
	jiraGetVersions({hostname, project, user, pass})
	.then(r => r.json())
	.then(versions => {
		versions.reverse(); // latest first
		const projectVersions = versions.filter(({name}) => name.startsWith(packageName));
		let latestReleasedIndex = projectVersions.findIndex(({released}) => released);
		const latestUnreleased = projectVersions[0];

		if(latestReleasedIndex < 0) {
			latestReleasedIndex = projectVersions.length;
		}

		const unreleased = projectVersions.slice(1, latestReleasedIndex);

		return Promise.all(unreleased.map(unreleasedVersion => jiraMergeVersions(
			{from: unreleasedVersion.id, to: latestUnreleased.id},
			{hostname, project, user, pass}
		)).concat(
			jiraReleaseVersion(latestUnreleased.id, {hostname, project, user, pass})
		)).then(() => ({unreleased, latestUnreleased}));
	});
