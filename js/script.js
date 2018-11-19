/*//////////////////////////////////////////
   Treehouse FSJS Techdegree Unit 2 Project
   List Filter and Pagination
//////////////////////////////////////////*/

// Student list element
let studentsUl = document.querySelector("ul.student-list");

// Array of all students
const allStudents = [ ...studentsUl.children ];

/*
   Shows (up to) the given number of items per page on the given page from the given list,
   hiding all other items in the list 
*/
const showPage = (list, pageNumber, itemsPerPage) => {
   // Calculate index of first item to display
   const firstItemIndex = (pageNumber - 1) * itemsPerPage;

   // Calculate index of last item to display (unless list ends before this index is reached)
   const lastItemIndex = firstItemIndex + itemsPerPage - 1

   /*
      Hide all items before first item index and after last item index (if reached) and
      show the items between the indexes (indices)
   */
   for (let i = 0; i < list.length; i++) {
      if (i < firstItemIndex || i > lastItemIndex) {
         list[i].style.display = "none";  // Hide element
      } else {
         list[i].style.display = "";      // Show element
      }
   }
}

/*
   Append pagination links for items in given list,
   displaying the given number of items per page
*/
const appendPageLinks = (list, itemsPerPage) => {
   // Get page div
   const pageDiv = document.querySelector("div.page");

   // Get current pagination div, if one is present
   const currentPagination = document.querySelector("div.pagination");

   // If a pagination div is already present, remove it from page div
   if (currentPagination !== null) {
      pageDiv.removeChild(currentPagination);
   }

   // Calculate number of pages to generate links for
   const numberOfPages = Math.ceil(list.length / itemsPerPage);

   // Create pagination div, giving it the pagination class
   const paginationDiv = document.createElement("div");
   paginationDiv.classList.add("pagination");

   // Create unordered list for pagination links
   const ul = document.createElement("ul");

   // Add buttons for each page
   for (let i = 1; i <= numberOfPages; i++) {
      // Create list item
      const li = document.createElement("li");

      // Create anchor for page
      const a = document.createElement("a");

      /*
         If this is the first page, set it active to begin with
         and show it first
      */
      if (i === 1) {
         a.classList.add("active");
         showPage(list, 1, itemsPerPage);
      }

      // Set text content to be page number
      a.innerText = i;

      /*
         Add event listener to anchor to set only the
         page linked to be active
      */
      a.addEventListener("click", e => {
         // Prevent anchor from trying to navigate to a new URL
         e.preventDefault();

         // Unset active class on previously active anchor
         const previousActiveAnchor = document.querySelector("a.active");
         previousActiveAnchor.classList.remove("active");

         // Add active class on anchor that was clicked
         e.target.classList.add("active");

         // Show students on page that anchor links to
         showPage(list, i, itemsPerPage);
      });

      // Append anchor to list item
      li.appendChild(a);

      // Append list item to ul
      ul.appendChild(li);
   }

   // Append ul to pagination div
   paginationDiv.appendChild(ul);

   // Get items per page div, if present (won't be on initial page load)
   const itemsPerPageDiv = document.querySelector("div.items-per-page");

   // If it is present,
   if (itemsPerPageDiv !== null) {
      // Insert pagination before items per page div
      pageDiv.insertBefore(paginationDiv, itemsPerPageDiv)
   } else {
      // Otherwise, append pagination to page div
      pageDiv.appendChild(paginationDiv);
   }
}

// Append search functionality
const appendSearch = listElement => {
   // Create search div, giving it the student-search class
   const searchDiv = document.createElement("div");
   searchDiv.classList.add("student-search");

   // Create input element, with placeholder text
   const input = document.createElement("input");
   input.placeholder = "Search for students...";

   // Create search button, with search text
   const button = document.createElement("button");
   button.innerText = "Search";

   // Create sorting div, with search-sorting class
   const sortDiv = document.createElement("div");
   sortDiv.classList.add("search-sorting");

   // Create sort label for sort-by select element
   const sortByLabel = document.createElement("label");
   sortByLabel.htmlFor = "sort-by";
   sortByLabel.innerText = "Optionally sort by:";

   // Create sorting select, with sort-by ID
   const sortBySelect = document.createElement("select");
   sortBySelect.id = "sort-by";

   // Options for select
   const sortByOptions = [
      {
         // Label to display
         label: "Don't Sort",

         // Internal value to check against
         value: "nosort",
      },
      {
         label: "Name (ascending)",
         value: "name",
      },
      {
         label: "Name (descending)",
         value: "namedesc"
      },
      {
         label: "Date Joined (ascending)",
         value: "joindate",
      },
      {
         label: "Date Joined (descending)",
         value: "joindatedesc",
      },
   ];

   // Append each option to select
   sortByOptions.forEach(option => {
      // Create option element
      let optionElement = document.createElement("option")

      // Set text and value properties
      optionElement.innerText = option.label;
      optionElement.value = option.value;

      // Append option to select
      sortBySelect.appendChild(optionElement);
   });

   // Define search handler
   const searchHandler = () => {
      // Get the "no results" list item, if present
      let noResultsListItem = document.querySelector("li.noresults");

      // If it is present, remove it
      if (noResultsListItem !== null) {
         listElement.removeChild(noResultsListItem);
      }

      let results = [];

      // Iterate through entire list of students
      for (let i = 0; i < allStudents.length; i++) {
         /*
            Remove all students from list element,
            aside from those already removed from
            previous searches
         */
         if (listElement.contains(allStudents[i])) {
            listElement.removeChild(allStudents[i]);
         }

         // Get details div of student
         const details = allStudents[i].children[0];

         // Get name and email address of student
         const name = details.children[1].textContent;
         const email = details.children[2].textContent;

         // If...
         if (
            name.includes(input.value.toLowerCase()) ||  // The name field contains the search term, or...
            email.includes(input.value.toLowerCase())    // The email field contains the search term...
         ) {
            // Then add that student to the list of results
            results.push(allStudents[i]);     
         }
      }

      // If there are no results...
      if (results.length === 0) {
         // Get current pagination, if present
         const pagination = document.querySelector("div.pagination");

         // Remove it if it exists
         if (pagination !== null)
            pagination.remove();

         // Create new list item, giving it the noresults class
         const noResults = document.createElement("li");
         noResults.classList.add("noresults");

         // Create paragraph element
         const p = document.createElement("p");

         // Set "no results found" text, specifying the search term
         p.innerText = `No results found for search term "${input.value}".`;

         // Append paragraph to list item
         noResults.appendChild(p);

         // Append list item to list
         listElement.appendChild(noResults);
      } else { // Otherwise...
         /*
            Define spaceship operator (<=>) 
            Compares two objects, returning -1, 0, or 1
            based on if first item is less than, equal to, or greater than
            the second item, respectively.
         */
         const spaceship = (a, b) => {
            // Return -1 if a < b
            if (a < b) {
               return -1;
            } else if (a > b) {
               return 1;
            } else {
               return 0;
            }
         }

         // Sort by name function
         const sortByName = (a, b) => {
            // Get names of elements to compare
            const nameA = a.firstElementChild.children[1].textContent;
            const nameB = b.firstElementChild.children[1].textContent;

            // Apply spaceship operator to determine element order
            return spaceship(nameA, nameB);
         };

         // Sort by date joined function
         const sortByJoinDate = (a, b) => {
            // Get date text of elements to compare
            const dateTextA = a.lastElementChild.firstElementChild.textContent;
            const dateTextB = b.lastElementChild.firstElementChild.textContent;

            // Construct new date for former element
            const dateA = new Date(
               dateTextA.substring(dateTextA.indexOf(" ") + 1)
            );

            // Construct new date for latter element
            const dateB = new Date(
               dateTextB.substring(dateTextB.indexOf(" ") + 1)
            );

            // Apply spaceship operator to determine element order
            return spaceship(dateA, dateB);
         };

         // Based on the value of the sorting select, do one of the following:
         switch (sortBySelect.value) {
            // Sort by name, ascending order
            case "name":
               // Sort results by name
               results = results.sort(sortByName);
               break;

            // Sort by name, descending order
            case "namedesc":
               // Sort results by name, then reverse order in array
               results = results.sort(sortByName).reverse();
               break;

            // Sort by date joined, ascending order
            case "joindate":
               // Sort results by join date
               results = results.sort(sortByJoinDate);
               break;
            
            // Sort by date joined, descending order
            case "joindatedesc":
               // Sort results by join date, then reverse order in array
               results = results.sort(sortByJoinDate).reverse();
               break;

            // Otherwise, no sorting is done.
         }

         // Append each result to the list element
         results.forEach(result => listElement.appendChild(result));

         // Get number of items to display per page
         const itemsPerPage = document.querySelector("select#ipp").value;

         /*
            Update the pagination links for the new results,
            displaying the given number of items per page
         */
         appendPageLinks(listElement.children, itemsPerPage);
      }
   };

   // Apply search handler when button is clicked
   button.addEventListener("click", searchHandler);
   
   // Also apply search handler when input field changes
   input.addEventListener("keyup", searchHandler);

   // Also apply search handler when sorting select field changes
   sortBySelect.addEventListener("change", searchHandler);

   // Append input and button to search div
   searchDiv.appendChild(input);
   searchDiv.appendChild(button);

   // Append sorting label and select to sort div
   sortDiv.appendChild(sortByLabel);
   sortDiv.appendChild(sortBySelect);

   // Append sort div to search div
   searchDiv.appendChild(sortDiv);

   // Get page header div
   const pageHeader = document.querySelector("div.page-header");

   // Append search div to page header
   pageHeader.appendChild(searchDiv);
}

// Add pagination links, items per page functionality, and search functionality for students on page load
const onPageLoad = () => {
   // Append page links for all students, 10 items per page by default
   appendPageLinks(allStudents, 10);

   // Create items per page div, with the items-per-page class
   const itemsPerPageDiv = document.createElement("div");
   itemsPerPageDiv.classList.add("items-per-page");

   // Create items per page label for ipp select element
   const ippLabel = document.createElement("label");
   ippLabel.htmlFor = "ipp";
   ippLabel.innerText = "Items per page:";

   // Create items per page select element with ipp ID
   const ippSelect = document.createElement("select");
   ippSelect.id = "ipp";

   // Items per page option data
   const ippOptionData = [
      10,
      20,
      25,
      40,
      50,
   ];

   // Create option element for each option value
   ippOptionData.forEach(optionValue => {
      const option = document.createElement("option");

      option.value = optionValue;
      option.innerText = optionValue.toString();

      ippSelect.appendChild(option);
   });

   // Append items per page label and select to respective div
   itemsPerPageDiv.appendChild(ippLabel);
   itemsPerPageDiv.appendChild(ippSelect);

   // Get page div
   const pageDiv = document.querySelector("div.page");

   // Append items per page div to page div
   pageDiv.appendChild(itemsPerPageDiv);

   // When the items per page value changes, update pagination accordingly
   ippSelect.addEventListener("change", () => appendPageLinks(studentsUl.children, parseInt(ippSelect.value)));

   // Append search functionality
   appendSearch(studentsUl);
}

// Run onPageLoad function when page loads
window.onload = onPageLoad;
