/*************** REPLACE THE VALUES BELOW ***************/
// string to search for, replace spaces with +
const searchString = "setExpandEntityReferences";
    
// programming language
const codeLanguage = "java";

// page of results
const pageNumber = 2;

// results per page, max=100
const perPage = 100;

// minimum number of stars on repo
const minStars = 100;

// minimum number of forks from repo
const minForks = 100;

/*************** REPLACE THE VALUES ABOVE ***************/

module.exports = {
    searchString: searchString,
    codeLanguage: codeLanguage,
    pageNumber: pageNumber,
    perPage: perPage,
    minStars: minStars,
    minForks: minForks,
}