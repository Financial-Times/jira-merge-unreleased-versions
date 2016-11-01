#!/usr/bin/env node

const mergeUnreleased = require('./');
const logPromise = require('@quarterto/log-promise');
const path = require('path');

const packagePath = path.resolve('package.json');
const {name} = require(packagePath);

logPromise(
	({unreleased, latestUnreleased}) => {
		if(unreleased.length === 1) {
			return `merging 1 version into ${latestUnreleased.name} and setting it as released`;
		} else if(unreleased.length) {
			return `merging ${unreleased.length} versions into ${latestUnreleased.name} and setting it as released`;
		}

		return `setting ${latestUnreleased.name} as released`;
	},
	e => e.stack
)(mergeUnreleased({
	packageName: name,
	hostname: process.env.JIRA_HOST,
	project: process.env.JIRA_PROJECT,
	user: process.env.JIRA_USERNAME,
	pass: process.env.JIRA_PASSWORD,
}));
