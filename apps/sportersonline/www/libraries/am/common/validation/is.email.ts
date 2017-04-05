/**
 * Determines if the given email string contains a technical valid email address.
 * It excepts unicode characters.
 * @param email
 */
export function isEmail(email: string): boolean {
    const re = /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
    return re.test(email);
}