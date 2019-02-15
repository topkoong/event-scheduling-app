import moment from 'moment';
export default [
    {
        id: 0,
        start: new Date(),
        end: new Date(moment().add(1, "days")),
        title: "Some random title"
    },
    {
        id: 1,
        start: new Date(2019, 1, 15),
        end: new Date(2019, 1, 15),
        title: "On-site interview"
    },
    {
        id: 2,
        title: 'Dinner with FullStack cohorts',
        start: new Date(2019, 1, 16, 20, 0, 0, 0),
        end: new Date(2019, 1, 16, 21, 0, 0, 0),
    },
    {
        id: 3,
        title: 'Livestream: Coding and Algorithm Interview Practice',
        start: new Date(2019, 1, 19, 20, 0, 0, 0),
        end: new Date(2019, 1, 20, 21, 0, 0, 0),
    },
    {
        id: 4,
        title: 'Winter Jazzfest',
        start: new Date(2019, 1, 22, 20, 0, 0, 0),
        end: new Date(2019, 1, 22, 21, 0, 0, 0),
    },
    {
        id: 5,
        title: 'NodeConf',
        start: new Date(2019, 1, 25, 11, 0, 0, 0),
        end: new Date(2019, 1, 25, 18, 0, 0, 0),
    },
    {
        id: 6,
        title: 'HackerNest NYC February Tech Social',
        start: new Date(2019, 1, 6, 11, 0, 0, 0),
        end: new Date(2019, 1, 7, 18, 0, 0, 0),
    },
    {
        id: 7,
        title: '[Special MasterClass] Getting Acquainted with GraphQL',
        start: new Date(2019, 1, 3, 14, 0, 0, 0),
        end: new Date(2019, 1, 4, 19, 0, 0, 0),
    },
]