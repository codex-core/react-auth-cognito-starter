export interface User{
    id: string,
    name: string,
    email: string,
    given_name: string,
    family_name: string,
    groups?: string[],
  }