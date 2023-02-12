// JS Types
import React from "react";

const str = "sadf";

const sumJS = (arr: number[]) => {
  return arr.reduce((total, number) => total + number);
};

type StrOrNumber = string | number;

let strOrNumber: StrOrNumber = 123;
// let strOrNumber1: StrOrNumber = [] // Error Type 'undefined[]' is not assignable to type 'StrOrNumber'.
let strOrNumber2: StrOrNumber = "";

// Array
const tsArray: number[] = [1, 2, 3];
const tsArrayGeneric: Array<number> = [];
const tsArrayGenericUnion: Array<number | string> = [];

// Tuple (array with fixed length)
const myTuple: [number, string] = [1, "2"];
// myTuple[100] // Error Tuple type '[number, string]' of length '2' has no element at index '100'.
const [tupleNumber, tupleString] = myTuple;
tupleNumber.toFixed(); // number
tupleString.toString(); // string

// react tuple example
// const [state, setState] = useState();

// Object
const myObject: { a: number; b: string } = { a: 1, b: "2" };

type MyObjType = { a: number; b: string };
const myObjectAlias: MyObjType = { a: 1, b: "2" };

// предпочтительная запись типов объектов
interface IMyFirstInterface {
  readonly a: number; // при обовлении значений переменной будет ошибка типов (значение обновиться)
  b: string;

  // OptionAllType, не обязательное поле, каждый раз используя
  // нотацию нужно добавлять условие на проверку наличия свойства
  c?: number[]; // не обязательное -> number[] | undefined
  e: number | undefined; // обязательное -> number | undefined
}

const myObjInterface: IMyFirstInterface = {
  a: 123,
  b: "123",
  // c: [1, 2, 11],
  e: undefined,
};

if (myObjInterface.c) {
  const value = myObjInterface.c;
}

const apiAnswer: IndexInterface = { key: "sdf", key1: "asd" };

interface IndexInterface {
  // Индекс сигнатура
  [n: string]: string; // ключ с типом строка -> зачение с типом строка
}

// FUNCTION
enum Methods {
  add,
  sub,
}

const calculate = (method: Methods, left: number, right: number): number => {
  switch (method) {
    case Methods.add:
      return left + right;
    case Methods.sub:
      return left - right;
  }
};

const sum = calculate(Methods.add, 2, 2);

const arrowFn: TypeFn = () => 2;

type TypeFn = () => number; // Предпочтителен для декларации типов функции

// interface IFnInterface {
//     (a: number): void;
// }

// GENERICS
// Как аргументы в функции
const myArray: Array<number> = [1, 2, 3, 4];
interface MyArray<T> {
  [n: number]: T;
  map<U>(fn: (el: T) => U, index?: number, arr?: MyArray<T>): MyArray<U>;
  reduce<U>(
    fn: (total: null extends typeof initialValue ? T : U, current: T) => U,
    initialValue?: U
  ): null extends typeof initialValue ? T : U;
}

const firstEl = myArray[0];

myArray.map((el) => el + 1);
const newArr = myArray.map((el) => 'el + 1');

function identity<T>(arg: T): T {
  return arg;
}

let identityResult = identity("123");

function getLength<T extends Array<any>>(arr: T): number {
  return arr.length;
}

interface IValueWithType<T> {
  type: string;
  value: T;
}

function withType<U>(arg: U): IValueWithType<U> {
  return {
    type: typeof arg,
    value: arg,
  };
}

const resultNum = withType(1);

// Build-in generics
interface IBuildIn<T> {
  type: string;
  value: T;
  isEmpty: boolean;
}

// Omit - выбрасывает значения из интерфеса
const omittedObject: Omit<IBuildIn<string>, "type" | "value"> = {
  isEmpty: true,
};

// Pick - выбирает конкретное значение из интерфеса
const pickedOObject: Pick<IBuildIn<number>, "isEmpty" | "type"> = {
  isEmpty: false,
  type: "type",
};

// Partial - делает все свойства необязательными
const partial: Partial<IBuildIn<number>> = {
  isEmpty: true,
};

// CLASSes

class Constructor {
  public field: number = 52;

  constructor(arg: number) {
    this.field = arg;
  }

  publicMethod(): number {
    return this.field;
  }

  protected protectedMethod() {
    return this.field + 10;
  }

  private privateMethod(): number {
    return this.field + 20;
  }
}

const instance = new Constructor(12);
instance.publicMethod(); // not protected/private from outside

class Child extends Constructor {
  public childMethod() {
    this.protectedMethod(); // protected field from parent class, private not available
  }

  protectedMethod() {
    // overwrite protected method from parent class, cant set private
    return this.field + 10;
  }
}

// Класс сделанный наполовину (все абстрактные поля обязательны для иплементации)
abstract class AbstractClass {
  public abstract abstractField: number;

  public abstract abstractMethod(): number;

  protected protectedMethod() {}
}

// const instance2 = new AbstractClass() // cant create instance from abstract class

class NewChild extends AbstractClass {
  abstractField: number = 12;

  abstractMethod(): number {
    return 0;
  }
}

interface MyInterface<T> {
  field: number;
  method(): string;
}

class newClass<T> extends Constructor implements MyInterface<T> {
  field: number = 12;
  conf?: T;

  method(): string {
    return "";
  }
}

class MyComponent extends React.Component<
  { prop1: number },
  { state1: string }
> {
  constructor(props: { prop1: number }) {
    super(props);
    this.state = {
      state1: "123",
    };
  }

  render() {
    return <div>{this.props.prop1}</div>;
  }
}

const mistake = [] as Array<number>;
const mistake1: number[] = [];
mistake.push(1);
// mistake.push("1");
mistake1.push(1);
// mistake1.push("1");

let bigObject = {
  commit: {
    id: "12d65c8dd2b2676fa3ac47d955accc085a37a9c1",
    short_id: "12d65c8dd2b",
    title: "JS fix",
    author_name: "Example User",
    author_email: "user@example.com",
    created_at: "2014-02-27T10:27:00+02:00",
  },
  commits: [
    {
      id: "12d65c8dd2b2676fa3ac47d955accc085a37a9c1",
      short_id: "12d65c8dd2b",
      title: "JS fix",
      author_name: "Example User",
      author_email: "user@example.com",
      created_at: "2014-02-27T10:27:00+02:00",
    },
  ],
  diffs: [
    {
      old_path: "files/js/application.js",
      new_path: "files/js/application.js",
      a_mode: null,
      b_mode: "100644",
      new_file: false,
      renamed_file: false,
      deleted_file: false,
    },
  ],
  compare_timeout: false,
  compare_same_ref: false,
};

bigObject.compare_same_ref = true;

type TMyBigObject = typeof bigObject

const typedBigObject: Readonly<TMyBigObject> = bigObject;

// typedBigObject.compare_same_ref = false
typedBigObject.commit.id = '123';

type TObjKeys = keyof TMyBigObject
type TCommitType = TMyBigObject['commit'];

type MyReadonly<T> = {
  // mapped types - типы которые перебирают другие типы
  readonly [N in keyof T]: T[N]
}

type Readonly<T> = {
  readonly [P in keyof T]: T[P];
};

// for (let N of ['asd', 'qwe']) {}
type MyPartial<T> = {
  [N in keyof T]?: T[N];
}

type MyPick<T, K extends keyof T> = {
  [N in K]: T[N];
}

type picked = MyPick<TMyBigObject, 'commit' | 'commits'>;

type MyReadonlyDeep<T> = {
  readonly [N in keyof T]: T[N] extends object ? MyReadonlyDeep<T[N]> : T[N]
}

const typedBigObjectDeep: MyReadonlyDeep<TMyBigObject> = bigObject;

// typedBigObjectDeep.commit.id = false
// typedBigObjectDeep.commits.id = false

type TSomeType = MyReadonlyDeep<TMyBigObject>;

// type inference
type RemoveReadonly<T> = T extends MyReadonlyDeep<infer E> ? E : T;

type TTest = RemoveReadonly<TSomeType>

function greaterThenZero(a: number, b: string): boolean {
  return a > 0;
}

type FnReturnType<T> = T extends ((...args: any[]) => infer R) ? R : never;
type FnParameters<T> = T extends ((...args: infer R) => any) ? R : never;

type TReturnType = FnReturnType<typeof greaterThenZero>;
type TArgsType = FnParameters<typeof greaterThenZero>;