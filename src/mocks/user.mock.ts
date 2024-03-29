import { User } from "../model/dtos/dto";
import { generateObjectID } from "../utils/helpers";

export const userMocks: User[] = [
  { _id: generateObjectID(), firstName: "John", lastName: "Doe", email: "john.doe@gmail.com", password: "pass123", isEmailVerified: false },
  { _id: generateObjectID(), firstName: "Jane", lastName: "Smith", email: "jane.smith@gmail.com", password: "pass456", isEmailVerified: false },
  { _id: generateObjectID(), firstName: "Michael", lastName: "Johnson", email: "michael.johnson@gmail.com", password: "pass789", isEmailVerified: false },
  { _id: generateObjectID(), firstName: "Emily", lastName: "Williams", email: "emily.williams@gmail.com", password: "passabc", isEmailVerified: false },
  { _id: generateObjectID(), firstName: "Daniel", lastName: "Brown", email: "daniel.brown@gmail.com", password: "passdef", isEmailVerified: false },
  { _id: generateObjectID(), firstName: "Olivia", lastName: "Jones", email: "olivia.jones@gmail.com", password: "passefg", isEmailVerified: false },
  { _id: generateObjectID(), firstName: "William", lastName: "Taylor", email: "william.taylor@gmail.com", password: "passhij", isEmailVerified: false },
  { _id: generateObjectID(), firstName: "Ava", lastName: "Anderson", email: "ava.anderson@gmail.com", password: "passklm", isEmailVerified: false },
  { _id: generateObjectID(), firstName: "Liam", lastName: "White", email: "liam.white@gmail.com", password: "passnop", isEmailVerified: false },
  { _id: generateObjectID(), firstName: "Sophia", lastName: "Martin", email: "sophia.martin@gmail.com", password: "passqrs", isEmailVerified: false },
  { _id: generateObjectID(), firstName: "Benjamin", lastName: "Hill", email: "benjamin.hill@gmail.com", password: "passtuv", isEmailVerified: false },
  { _id: generateObjectID(), firstName: "Emma", lastName: "Adams", email: "emma.adams@gmail.com", password: "passwxy", isEmailVerified: false },
  { _id: generateObjectID(), firstName: "Mason", lastName: "Clark", email: "mason.clark@gmail.com", password: "passz01", isEmailVerified: false },
  { _id: generateObjectID(), firstName: "Ella", lastName: "Lewis", email: "ella.lewis@gmail.com", password: "pass234", isEmailVerified: false },
  { _id: generateObjectID(), firstName: "Logan", lastName: "Moore", email: "logan.moore@gmail.com", password: "pass567", isEmailVerified: false },
  { _id: generateObjectID(), firstName: "Grace", lastName: "Walker", email: "grace.walker@gmail.com", password: "pass890", isEmailVerified: false },
  { _id: generateObjectID(), firstName: "Jackson", lastName: "Carter", email: "jackson.carter@gmail.com", password: "passabc", isEmailVerified: false },
  { _id: generateObjectID(), firstName: "Avery", lastName: "Hall", email: "avery.hall@gmail.com", password: "passdef", isEmailVerified: false },
  { _id: generateObjectID(), firstName: "Lucas", lastName: "Baker", email: "lucas.baker@gmail.com", password: "passtuv", isEmailVerified: false },
  { _id: generateObjectID(), firstName: "Scarlett", lastName: "Harrison", email: "scarlett.harrison@gmail.com", password: "passxyz", isEmailVerified: false },
];


