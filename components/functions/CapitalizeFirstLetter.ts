export function capitalizeFirstLetter(str: string) {
   if (str === null || str === "") {
     return "";
   }
   let firstLetter = str[0];
   if (firstLetter === firstLetter.toLowerCase()) {
     firstLetter = firstLetter.toUpperCase();
   }
   return firstLetter + str.slice(1);
 }
 