import { objectValidator, validArray, validBoolean, validEnum, validNumber, validString, validTimeString } from './validation';

describe(`validation`, () => {
  enum AnimalType {
    Dog = `Dog`,
    Cat = `Cat`,
  }

  type Animal = {
    type: AnimalType
    name: string
    age: number
    vaccinated: boolean
    nextAppointmentIn: string
    notes: string[]
  }

  const isValid = objectValidator<Animal>(`Animal Validation: animal`, {
    type: validEnum(AnimalType),
    name: validString,
    age: validNumber,
    vaccinated: validBoolean,
    nextAppointmentIn: validTimeString,
    notes: validArray(validString),
  });

  test(`given fully invalid input > when validate > should return valid false and expected errors`, () => {
    expect(isValid({})).toEqual({
      valid: false,
      errors: [
        `Animal Validation: animal.type expected one of [Dog, Cat], got type 'undefined'`,
        `Animal Validation: animal.name expected type 'string', got 'undefined'`,
        `Animal Validation: animal.age expected type 'number', got 'undefined'`,
        `Animal Validation: animal.vaccinated expected type 'boolean', got 'undefined'`,
        `Animal Validation: animal.nextAppointmentIn expected time string matching (\\d+h)?(\\d+m)?(\\d+s)? with at least one component (e.g. 5m30s), got 'undefined'`,
        `Animal Validation: animal.notes expected type 'array', got 'undefined'`,
      ],
    });
  });

  test(`given partially invalid input > when validate > should return valid false and expected errors`, () => {
    expect(isValid({
      type: `Spoodle`,
      name: `Tara`,
      age: `fourteen`,
      vaccinated: true,
      nextAppointmentIn: `123`,
      notes: [123, `Test`, false],
    })).toEqual({
      valid: false,
      errors: [
        `Animal Validation: animal.type expected one of [Dog, Cat], got 'Spoodle'`,
        `Animal Validation: animal.age expected type 'number', got 'string'`,
        `Animal Validation: animal.nextAppointmentIn expected time string matching (\\d+h)?(\\d+m)?(\\d+s)? with at least one component (e.g. 5m30s), got '123'`,
        `Animal Validation: animal.notes[0] expected type 'string', got 'number'`,
        `Animal Validation: animal.notes[2] expected type 'string', got 'boolean'`,
      ],
    });
  });

  test(`given valid input > when validate > should return valid true with no errors`, () => {
    expect(isValid({
      type: AnimalType.Dog,
      name: `Tara`,
      age: 14,
      vaccinated: true,
      nextAppointmentIn: `48h`,
      notes: [],
    })).toEqual({
      valid: true,
    });
  });
});
