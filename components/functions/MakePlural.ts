export function makePlural(string: string, length: number): string {
   if (length > 1) {
     return string + "s";
   } else {
     return string;
   }
 }
 