interface IPerson {
  name: string;
  age: number;
  set birthdate(date: string | Date);
  setHomeAddress(address: string): void;
  setHomeAddress(address: string, city: string): void;
}

class BasePerson {
  protected someId = "base";

  constructor(public readonly name: string) {
    console.log(`BasePerson constructor with id: ${this.someId}`);
  }

  public setHomeAddress(address: string): void {
    console.log(`Setting home address to ${address}`);
  }
}

class Person extends BasePerson implements IPerson {
  someId = "derived"; // makes the property public
  private birthdateAsDate: Date;
  private readonly nationalInsuranceNumber =
    Person.generateNationalInsuranceNumber();

  constructor(name: string, birthdate: string | Date) {
    super(name);
    console.log(`Person constructor with id: ${this.someId}`);
    this.birthdateAsDate = new Date(birthdate);
    console.log(`Hello ${this.name}!`);
  }

  // implicit public
  get age(): number {
    return Date.now() - this.birthdateAsDate.getTime();
  }

  public set birthdate(birthdate: string | Date) {
    this.birthdateAsDate = new Date(birthdate);
  }

  public setHomeAddress(address: string): void;
  public setHomeAddress(address: string, city: string): this; // Return value this refers dynamically to the current class type
  public setHomeAddress(address: string, city?: string): this {
    if (city) {
      console.log(`Setting home address to ${address}, ${city}`);
    } else {
      super.setHomeAddress(address);
    }
    return this;
  }

  private static generateNationalInsuranceNumber(): string {
    const parts = [
      Math.floor(Math.random() * 100),
      Math.floor(Math.random() * 1000000),
      String.fromCharCode(Math.floor(Math.random() * 26) + 65),
      Math.floor(Math.random() * 100),
    ];
    return parts.join(" ");
  }

  static {
    console.log("Person static block");
  }
}

const p: BasePerson = new Person("John", "1990-01-01");
p.setHomeAddress("123 Fake Street");
(p as Person).setHomeAddress("123 Fake Street", "London");
console.log(p.name);

// allowed via bracket notation (only use for unittests, etc.): (soft-private)
console.log(p["someId"]);
// for "hard-private", use JavaScript feature of private members (#someId)

// special this behavior
function printPerson(this: BasePerson, prefix: string) {
  console.log(`${prefix} ${this.name}`);
}
printPerson.call(p, "Hello");
