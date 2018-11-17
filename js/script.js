// Treehouse FSJS Techdegree Unit 2 Project
// List Filter and Pagination
   
// Study guide for this project - https://drive.google.com/file/d/1OD1diUsTMdpfMDv677TfL1xO2CEkykSz/view?usp=sharing


/*** 
   Add your global variables that store the DOM elements you will 
   need to reference and/or manipulate. 
   
   But be mindful of which variables should be global and which 
   should be locally scoped to one of the two main functions you're 
   going to create. A good general rule of thumb is if the variable 
   will only be used inside of a function, then it can be locally 
   scoped to that function.
***/
// List of students
const students = document.querySelector("ul.student-list");



// Shows (up to) ten items on the given pages from the given list, hiding all other items in the list 
function showPage(list, pageNumber) {
   // Calculate index of first item to display
   const firstItemIndex = (pageNumber - 1) * 10;

   // Calculate index of last item to display (unless list ends before this index is reached)
   const lastItemIndex = firstItemIndex + 9

   // Hide all items before first item index and after last item index (if reached) and
   // show the items between the indexes (indices)
   for (let i = 0; i < list.children.length; i++) {
      if (i < firstItemIndex || i > lastItemIndex) {
         list.children[i].style.display = "none";  // Hide element
      } else {
         list.children[i].style.display = "block"; // Show element
      }
   }
}

// Append pagination links for items in given list
function appendPageLinks(list) {
   // Get page div
   const pageDiv = document.querySelector("div.page");

   // Get current pagination div, if one is present
   const currentPagination = document.querySelector("div.pagination");

   // If a pagination div is already present, remove it from page div
   if (currentPagination !== null) {
      pageDiv.removeChild(currentPagination);
   }

   // Calculate number of pages to generate links for
   const numberOfPages = Math.ceil(list.children.length / 10)

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

      // If this is the first page, set it active to begin with
      // and show it first
      if (i === 1) {
         a.classList.add("active");
         showPage(list, 1);
      }

      // Set text content to be page number
      a.innerText = i;

      // Add event listener to anchor to set only the
      // page linked to be active
      a.addEventListener("click", e => {
         // Prevent anchor from trying to navigate to a new URL
         e.preventDefault();

         // Unset active class on previously active anchor
         const previousActiveAnchor = document.querySelector("a.active");
         previousActiveAnchor.classList.remove("active");

         // Add active class on anchor that was clicked
         e.target.classList.add("active");

         // Show students on page that anchor links to
         showPage(list, i);
      });

      // Append anchor to list item
      li.appendChild(a);

      // Append list item to ul
      ul.appendChild(li);
   }

   // Append ul to pagination div
   paginationDiv.appendChild(ul);

   // Append pagination to page div
   pageDiv.appendChild(paginationDiv);
}



