// Central export of all 200 problems organized by pattern
import { selectBasics } from './select-basics.js';
import { whereFiltering } from './where-filtering.js';
import { aggregates } from './aggregates.js';
import { groupBy } from './group-by.js';
import { joins } from './joins.js';
import { subqueries } from './subqueries.js';
import { windowFunctions } from './window-functions.js';
import { ctes } from './ctes.js';
import { stringDate } from './string-date.js';
import { caseWhen } from './case-when.js';
import { advanced } from './advanced.js';

export const categories = [
    { name: 'SELECT Basics', icon: '📋', problems: selectBasics },
    { name: 'WHERE + Filtering', icon: '🔍', problems: whereFiltering },
    { name: 'Aggregates', icon: '📊', problems: aggregates },
    { name: 'GROUP BY + HAVING', icon: '📁', problems: groupBy },
    { name: 'JOINs', icon: '🔗', problems: joins },
    { name: 'Subqueries', icon: '🎯', problems: subqueries },
    { name: 'Window Functions', icon: '🪟', problems: windowFunctions },
    { name: 'CTEs', icon: '🏗️', problems: ctes },
    { name: 'String + Date', icon: '📝', problems: stringDate },
    { name: 'CASE WHEN', icon: '🔀', problems: caseWhen },
    { name: 'Advanced', icon: '🏆', problems: advanced },
];

export const allProblems = categories.flatMap(c => c.problems);
