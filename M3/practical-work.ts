/**
 * Task 1. Работа с простыми типами
 *
 * Напишите тип функции, конкатенирующей две строки
 * concat('Hello ', 'World') // -> Hello World;
 */

// РЕШЕНИЕ
type TConcatFn = (strLeft: string, strRight: string) => string;

const concat: TConcatFn = function (strLeft, strRight) {
  return strLeft + strRight;
};

// ВОПРОС: Можем ли мы использовать function type в function declaration?
// Вроде этого:
// function concat(strLeft, strRight): TConcatFn {
//     return strLeft + strRight;
// }

const result = concat("Hello ", "World"); // -> Hello World;




/**
 * Task 2. Работа с интерфейсами
 *
 * Напишите интерфейс для описания следующих данных
 * const MyHometask = {
 *     howIDoIt: "I Do It Wel",
 *     simeArray: ["string one", "string two", 42],
 *     withData: [{ howIDoIt: "I Do It Wel", simeArray: ["string one", 23] }],
 * }
 */

// РЕШЕНИЕ
interface IMyHometask {
  howIDoIt: string;
  someArray: Array<string | number>;
  withData: Array<Omit<IMyHometask, "withData">>;
}

const MyHometask: IMyHometask = {
  howIDoIt: "I Do It Wel",
  someArray: ["string one", "string two", 42],
  withData: [{ howIDoIt: "I Do It Wel", someArray: ["string one", 23] }],
};




/**
 * Task 3. Типизация функций, используя Generic
 *
 * В уроке про Generics мы написали интерфейс массива IMyArray
 * interface IMyArray<T> {
 *   [N: number]: T;
 *   reduce(); // добавьте типизацию для метода reduce
 * }
 *
 * Справка о работе reduce
 * const initialValue = 0;
 * [1,2,3].reduce((accumulator, value) => accumulator + value, initialValue); // -> 6
 *
 * Результат работы предыдущей функции передается в следующую в качестве
 * аргумента accumulator. На итерации 0 - accumulator === initialValue.
 * Если initialValue не указан, то accumulator это 0 элемент массива
 */

// РЕШЕНИЕ
interface IMyArray<T> {
  [n: number]: T;
  map<U>(fn: (el: T) => U, index?: number, arr?: IMyArray<T>): IMyArray<U>;
  reduce<U>(
    fn: (total: void extends typeof initialValue ? T : U, current: T) => U,
    initialValue?: U
  ): void extends typeof initialValue ? T : U;
}

/*
 ВОПРОС:

 В процессе поиска решения решение нашел в `void extends typeof initialValue ? T : U`,
 Также работает и `null extends typeof initialValue ? T : U`,
 Не понимаю почему не рабтают такие варианты как:
 `typeof initialValue extends void ? T : U`
 `typeof initialValue extends null ? T : U`
 `typeof initialValue extends undefined ? T : U`
 `undefined extends typeof initialValue ? T : U`

 Пока в моем понимании это все должно вести себя в данном случае одинково

 В докуменатции нашел таблицу присваивания типов друг к другу (TS docs)[https://www.typescriptlang.org/docs/handbook/type-compatibility.html#any-unknown-object-void-undefined-null-and-never-assignability]
 По ней все типы могут быть присвоины сами себе, а undefined и null ведут себя схоже
 Это не применимо к сравнениям?
 Рассуждения ведутся с контектом того, что опциональное initialValue при отсутствии получает тип undefined
*/

const myArray: IMyArray<{ count: number }> = [{count: 1}, {count: 4}, {count: 3}, {count: 2}];

const reduceResult = myArray.reduce((total, current) => total + current.count, "0");
console.log(reduceResult);

// cant work with object[] without initial value
// const reduceResult1 = myArray.reduce((total, current) => total + current.count);
// console.log(reduceResult1);

const reduceResult2 = myArray.reduce(
  (total, current) => total + parseInt(`${current.count}`, 10),
  0
);
console.log(reduceResult2);

const myArrayStr: IMyArray<string> = ['1', '2', '3', '4'];
const reduceStrResult = myArrayStr.reduce((total, current) => total + current, "0");
const reduceStrResult1 = myArrayStr.reduce((total, current) => total + current);
const reduceStrResult2 = myArrayStr.reduce(
  (total, current) => total + parseInt(`${current}`, 10),
  0
);

const myArrayNum: IMyArray<number> = [1, 2, 3, 4];
const reduceNumResult = myArrayNum.reduce((total, current) => total + current, "0");
const reduceNumResult1 = myArrayNum.reduce((total, current) => total + current);
const reduceNumResult2 = myArrayNum.reduce(
  (total, current) => total + parseInt(`${current}`, 10),
  0
);


/* ПОПЫТКА №2

 Почему

 undefined extends U ? T : U
    не равно
 U extends undefined ? T : U

 Ниже два примера иллюстрирующих это

 В примере с IMyArray1, когда мы не используем начальное значение, total и результат reduce определяется верно
 В примере с IMyArray2, так же без начального значения, total и результат reduce -> unknown
   Как я понял total неопознан, так как условие "U extends undefined ? T : U" всегда ложно, но почему?
 */

interface IMyArray1<T> {
  [n: number]: T;
  reduce<U>(
    fn: (total: undefined extends U ? T : U, current: T) => U,
    initialValue?: U
  ): undefined extends U ? T : U;
}

const myArrayNum1: IMyArray1<number> = [1, 2, 3, 4];
const reduce1NumResult = myArrayNum1.reduce((total, current) => total + current);

interface IMyArray2<T> {
  [n: number]: T;
  reduce<U>(
    fn: (total: U extends undefined ? T : U, current: T) => U,
    initialValue?: U
  ): U extends undefined ? T : U;
}

const myArrayNum2: IMyArray2<number> = [1, 2, 3, 4];
// @ts-ignore
const reduce2NumResult = myArrayNum2.reduce((total, current) => total + current); // here total in unknown





/**
 * Task 4. Работа с MappedTypes
 *
 * interface IHomeTask {
 *     data: string;
 *     numericData: number;
 *     date: Date;
 *     externalData: {
 *         basis: number;
 *         value: string;
 *     }
 * }
 *
 * Стандартный generic Partial работает так же как Readonly,
 * только для внешних ключей.
 *
 * Напишите такой MyPartial, чтобы создание подобного объекта
 * стало возможным
 * const homeTask: MyPartial<IHomeTask> = {
 *     externalData: {
 *         value: 'win'
 *     }
 * }
 *
 * type MyPartial<T> = {
 *     [N in keyof T]: T[N] extends object ? MyPatial<T[N]> : T[N]
 * }
 */

// РЕШЕНИЕ
type MyPartial<T> = {
  [N in keyof T]?: T[N] extends object ? MyPartial<T[N]> : T[N];
}

interface IHomeTask {
  data: string;
  numericData: number;
  date: Date;
  externalData: {
    basis: number;
    value: string;
  }
}

const homeTask: IHomeTask = {
  externalData: {
    value: 'win',
    basis: 12,
  },
  data: '22.22.22',
  date: new Date(),
  numericData: 123,
}

const homeTaskPartial: MyPartial<IHomeTask> = {
  externalData: {
    value: 'win'
  }
}

console.log(typeof homeTask.data)
console.log(typeof homeTaskPartial.data)