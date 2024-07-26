const EMAIL = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,10}$/;

const PHONE = /^(?!(\d)\1{9})\d{10}$/;
/* 
`^`: Start of the string.
`(?!(\d)\1{9})`: Negative lookahead assertion that ensures there are no 10 identical digits.
                It checks if there is not (\d) followed by itself (\1) repeated 9 times ({9}).
                This ensures that all digits are not the same.
`\d{10}`: Matches exactly 10 digits.
`$`: End of the string.
*/

const PASSWORD = /^(?=.*\d)(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z]).{8,}$/;
/* 
`(?=.*\d)`: atleast 1 digit
`(?=.*[!@#$%^&*])`: atleast 1 special character
`(?=.*[a-z])`: atleast 1 lowercase
`(?=.*[A-Z])`: atleast 1 uppercase
`.{8,}`: min 8 characters total
*/


const ALPHABETICAL_STRING = /^[a-zA-Z\s]+$/;


export { EMAIL, PHONE, ALPHABETICAL_STRING, PASSWORD };