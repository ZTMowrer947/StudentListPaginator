# StudentListPaginator

## Description of Project
This project is about using unobtrusive JavaScript to add pagination to long lists of students of varying sizes.

### Criteria of Project
#### Expectations I have met
- Project only uses vanilla JavaScript: No external libraries, code snippets, or plugins.
- All JavaScript code is placed into a file that is linked into the HTML page: No inline JavaScript is used.
- Unobtrusive JavaScript is used to append pagination markup: HTML files are not touched.
- Pagination links are created for up to 10 items. (45 students = 5 links, 71 students = 8 links)
- The first 10 students are loaded on page load. Every pagination link displays the correct range of students.
- The first pagination link shows students 1 to 10, the second 11 to 20, the third 21 to 30, and so on.
- Comments are used to explain functions.

#### Expectations I have exceeded (as listed on the Techdegree Project Rubric)
- Unobtrusive JavaScript is used to append a search bar. Again, HTML files are not touched.
- Pagination links are created for every 10 search results. (10 or fewer results = 1 link, 23 results = 3 links)
- When no results are returned, a message appears stating that no results were found.

#### My own ideas
- Search results can optionally be sorted by name or join date, in either ascending or descending order.
- The items displayed per page can be altered. (10 is the default for the sake of meeting base requirements)
