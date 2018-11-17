/******************************************
Treehouse Techdegree:
FSJS project 2 - List Filter and Pagination
******************************************/
   
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



/*** 
   Create the `appendPageLinks function` to generate, append, and add 
   functionality to the pagination buttons.
***/




