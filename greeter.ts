class Student {
    fullName: String;
    constructor(public firstName, public middleInitial, public lastName) {
        this.fullName = firstName + " " + middleInitial + " " + lastName;
    }
}
interface Person {
    firstName: string;
    lastName: string;
}
function greeter(person: Person) {
    return "Hello, " + person.firstName + " " + person.lastName;
}
let user = new Student("Jane", "M.", "User");
console.log(greeter(user))

let decLiteral: number = 6;
let hexLiteral: number = 0xf00d;
// ES6 中的二进制表示法
let binaryLiteral: number = 0b1010;
// ES6 中的八进制表示法
let octalLiteral: number = 0o744;
let notANumber: number = NaN;
let infinityNumber: number = Infinity;
let myName: string = 'Tom';
let myAge: number = 25;
// 模板字符串
let sentence: string = `Hello, my name is ${myName}.I'll be ${myAge + 1} years old next month.`;

//JavaScript 没有空值（Void）的概念，在 TypeScript 中，可以用 void 表示没有任何返回值的函数：
function alertName(): void {
    alert('My name is Tom');
}
// alertName()

let unusable: void = undefined;
let u: undefined = undefined;
let n: null = null;

//任意值--任意值（Any）用来表示允许赋值为任意类型。
//如果是一个普通类型，在赋值过程中改变类型是不被允许的：任意值可以改变
let myFavoriteNumber: any = 'seven';
myFavoriteNumber = 7;

let anyThing:any = 'Ho'
console.log(anyThing.myName);
//未声明类型的变量
// 变量如果在声明的时候，未指定其类型，那么它会被识别为任意值类型：
//如果没有明确的指定类型，那么 TypeScript 会依照类型推论（Type Inference）的规则推断出一个类型
// let myFavoriteNumber = 'seven';
// myFavoriteNumber = 7; 报错
//上面等价于
// let myFavoriteNumber: string = 'seven';
// myFavoriteNumber = 7; 报错
//如果定义的时候没有赋值，不管之后有没有赋值，都会被推断成 any 类型而完全不被类型检查：

//联合类型
//联合类型（Union Types）表示取值可以为多种类型中的一种。
//联合类型使用 | 分隔每个类型
let myFavoriteNumber2: string | number;
myFavoriteNumber2 = 'seven';
myFavoriteNumber2 = 7;

//访问联合类型的属性或方法
//当 TypeScript 不确定一个联合类型的变量到底是哪个类型的时候，
// 我们只能访问此联合类型的所有类型里共有的属性或方法：
//toString是string和number共有的方法
function getString(something: string | number): string {
    return something.toString();
}
//联合类型的变量在被赋值的时候，会根据类型推论的规则推断出一个类型：
let myFavoriteNumber3: string | number;
myFavoriteNumber3 = 'seven';
console.log(myFavoriteNumber3.length); // 5
// myFavoriteNumber3 = 7; 已被推导为字符串
// console.log(myFavoriteNumber.length); // 编译时报错

//never类型表示的是那些永不存在的值的类型
// never类型是那些总是会抛出异常或根本就不会有返回值的函数表达式或箭头函数表达式的返回值类型
//never类型是任何类型的子类型，也可以赋值给任何类型
// 返回never的函数必须存在无法达到的终点
function error(message: string): never {
    throw new Error(message);
}

// 推断的返回值类型为never
function fail() {
    return error("Something failed");
}
// 返回never的函数必须存在无法达到的终点
function infiniteLoop(): never {
    while (true) {
    }
}

//数组的类型--在 TypeScript 中，数组类型有多种定义方式，比较灵活
//「类型 + 方括号」表示法
let fibonacci: number[] = [1, 1, 2, 3, 5]; //只能数值的类型

//数组泛型--数组泛型（Array Generic） Array<elemType> 来表示数组
let fibonacci2: Array<number> = [1, 1, 2, 3, 5];
//TypeScript具有ReadonlyArray<T>类型，它与Array<T>相似，只是把所有可变方法去掉了，
// 因此可以确保数组创建后再也不能被修改
let a10: number[] = [1, 2, 3, 4];
let ro: ReadonlyArray<number> = a10;
//用接口表示数组
//可索引的类型
//TypeScript支持两种索引签名：字符串和数字。 可以同时使用两种类型的索引，
// 但是数字索引的返回值必须是字符串索引返回值类型的子类型
interface NumberArray {
    [index: number]: number;
}
//NumberArray 表示：只要 index 的类型是 number，那么值的类型必须是 number
let fibonacci3: NumberArray = [1, 1, 2, 3, 5];
//any 在数组中的应用
let list: any[] = ['Xcat Liu', 25, { website: 'http://xcatliu.com' }];
interface StringArray {
    [index: number]: string;
}
let myArray: StringArray;
myArray = ["Bob", "Fred"];
let myStr: string = myArray[0];
//类数组--类数组（Array-like Object）不是数组类型，比如 arguments
//事实上常见的类数组都有自己的接口定义，如 IArguments, NodeList, HTMLCollection
function sum2() {
    let args: IArguments = arguments;
}
//元组 Tuple--元组类型允许表示一个已知元素数量和类型的数组，各元素的类型不必相同。
// 比如，你可以定义一对值分别为 string和number类型的元组
// Declare a tuple type
let x: [string, number];
// Initialize it
x = ['hello', 10]; // OK
// Initialize it incorrectly
// x = [10, 'hello']; // Error
// 当访问一个已知索引的元素，会得到正确的类型：
console.log(x[0].substr(1)); // OK
// console.log(x[1].substr(1)); // Error, 'number' does not have 'substr'
// 当访问一个越界的元素，会使用联合类型替代：
// x[3] = 'world'; // OK, 字符串可以赋值给(string | number)类型
// console.log(x[5].toString()); // OK, 'string' 和 'number' 都有 toString
// x[6] = true; // Error, 布尔不是(string | number)类型

//类型断言 类型断言（Type Assertion）可以用来手动指定一个值的类型。
//语法 <类型>值 或 值 as 类型
//类型断言不是类型转换，断言成一个联合类型中不存在的类型是不允许的
//当你在TypeScript里使用JSX时，只有 as语法断言是被允许的。
function getLength(something: string | number): number {
    if ((<string>something).length) {  //(something as string).length
        return (<string>something).length;
    } else {
        return something.toString().length;
    }
}
console.log('ho',getLength(123))

//对象的类型——接口 在TypeScript中，我们使用接口（Interfaces）来定义对象的类型。
//定义了一个接口 Personal，接着定义了一个变量 tom，它的类型是 Personal。
// 这样就约束了 tom 的形状必须和接口 Personal 一致。
interface Personal {
    name: string;
    age: number;
}
let tom: Personal = {
    name: 'Tom',
    age: 25
};
//定义的变量比接口少了一些属性是不允许的,多一些属性也是不允许的,必须一样,
// 可见，赋值的时候，变量的形状必须和接口的形状保持一致
// interface Person1 {
//     name: string;
//     age: number;
// }
// let tom2: Person1 = { 报错,不能比接口的属性少
//     name: 'Tom'
// };

//可选属性--有时我们希望不要完全匹配一个形状，那么可以用可选属性,在变量属性名后面加?
//仍然不允许添加未定义的属性
interface Person3 {
    name: string;
    age?: number; //可选属性
}
let tom3: Person3 = {
    name: 'Tom'
};
//任意属性--有时候我们希望一个接口允许有任意的属性,在接口定义[propName:string]:any
//一旦定义了任意属性，那么确定属性和可选属性的类型都必须是它的类型的子集
interface Person4 {
    name: string;
    age?: number;
    [propName: string]: any; //任意属性和允许任何类型
    // [propName: string]: string; 确定属性和可选属性的类型不是string的话会报错
}
let tom4: Person4 = {
    name: 'Tom',
    age: 26,
    gender: 'male'
};
//只读属性--有时候我们希望对象中的一些字段只能在创建的时候被赋值，那么可以用 readonly 定义只读属性
interface Person5 {
    readonly id: number; //只读属性
    name: string; //确定属性
    age?: number; //可选属性
    [propName: string]: any; //任意属性
}
let tom5: Person5 = {
    id: 89757,
    name: 'Tom',
    gender: 'male'
};

//readonly vs const
//最简单判断该用readonly还是const的方法是看要把它做为变量使用还是做为一个属性。
// 做为变量使用的话用 const，若做为属性则使用readonly

//额外的属性检查
interface SquareConfig {
    color?: string;
    width?: number;
}

function createSquare(config: SquareConfig): { color: string; area: number } {
    let newSquare = {color: "white", area: 100};
    // ...
    return newSquare
}
//error: 'colour' not expected in type 'SquareConfig'
// let mySquare = createSquare({ colour: "red", width: 100 });
//绕开这些检查非常简单。 最简便的方法是使用类型断言
let mySquare = createSquare({ width: 100, opacity: 0.5 } as SquareConfig);

//函数类型
//为了使用接口表示函数类型，我们需要给接口定义一个调用签名。 它就像是一个只有参数列表和返回值类型的函数定义。
// 参数列表里的每个参数都需要名字和类型
interface SearchFunc {
    (source:string,subString:string):boolean
}
let SearchFunc: SearchFunc;
//对于函数类型的类型检查来说，函数的参数名不需要与接口里定义的名字相匹配
SearchFunc = function(source: string, subString: string) {
    let result = source.search(subString);
    return result > -1;
}
let SearchFunc2 = <SearchFunc>function(source: string, subString: string) {
    let result = source.search(subString);
    return result > -1;
}
//可索引的类型
interface StringArrayF {
    [index: number]: string;
}
let myArrayF: StringArrayF;
myArrayF = ["Bob", "Fred"];
let myStrF: string = myArray[0];

class Animals {
    name: string;
}
class Dog extends Animals {
    breed: string;
}
// 错误：使用数值型的字符串索引，有时会得到完全不同的Animal!
interface NotOkays {
    // [x: number]: Animals;
    [x: string]: Dog;
}

//类类型
interface ClockInterface {
    currentTime: Date;
}
class Clock implements ClockInterface {
    currentTime: Date;
    constructor(h: number, m: number) { }
}
interface Itest {
    webName: string;
}
class Antzone implements Itest {
    webName: "蚂蚁部落";
    age:4;
    constructor() { }
}
//也可以在接口中描述一个方法，在类里实现它
interface ClockInterface2 {
    currentTime: Date;
    setTime(d: Date);
}
class Clock2 implements ClockInterface2 {
    currentTime: Date;
    setTime(d: Date) {
        this.currentTime = d;
    }
    constructor(h: number, m: number) { }
}
//类静态部分与实例部分的区别
interface ClockConstructor {
    new (hour: number, minute: number): ClockInterface3;
}
interface ClockInterface3 {
    tick();
}
function createClock(ctor: ClockConstructor, hour: number, minute: number): ClockInterface3 {
    return new ctor(hour, minute);
}
class DigitalClocks implements ClockInterface3 {
    constructor(h: number, m: number) { }
    tick() {
        console.log("beep beep");
    }
}
class AnalogClocke implements ClockInterface3 {
    constructor(h: number, m: number) { }
    tick() {
        console.log("tick tock");
    }
}
let digital = createClock(DigitalClocks, 12, 17);
let analog = createClock(AnalogClocke, 7, 32);
//继承接口
//和类一样，接口也可以相互继承。 这让我们能够从一个接口里复制成员到另一个接口里，
// 可以更灵活地将接口分割到可重用的模块里
interface Shape {
    color: string;
}
interface Square extends Shape {
    sideLength: number;
}
let square = <Square>{};
square.color = "blue";
square.sideLength = 10;
//一个接口可以继承多个接口，创建出多个接口的合成接口
interface Shape2 {
    color: string;
}

interface PenStroke {
    penWidth: number;
}

interface Square2 extends Shape2, PenStroke {
    sideLength: number;
}

let square2 = <Square2>{};
square2.color = "blue";
square2.sideLength = 10;
square2.penWidth = 5.0;
//混合类型---一个对象可以同时做为函数和对象使用，并带有额外的属性
//声明一个接口，如果只有(start: number): string一个成员，那么这个接口就是函数接口，同时还具有其他两个成员，
// 可以用来描述对象的属性和方法，这样就构成了一个混合接口
interface Counter {
    (start: number): string;
    interval: number;
    reset(): void;
}
//创建一个函数，它的返回值是Counter类型的
function getCounter(): Counter {
    //通过类型断言，将函数对象转换为Counter类型，转换后的对象不但实现了函数接口的描述，
    // 使之成为一个函数，还具有interval属性和reset()方法
    let counter = <Counter>function (start: number) { };
    counter.interval = 123;
    counter.reset = function () { };
    return counter;
}
let c = getCounter();
c(10);
c.reset();
c.interval = 5.0;
//接口继承类--当接口继承了一个类类型时，它会继承类的成员但不包括其实现
//接口同样会继承到类的private和protected成员
class Control {
    private state: any;
}
interface SelectableControl extends Control {
    select(): void;
}
class Button extends Control implements SelectableControl {
    select() { }
}
class TextBox extends Control {
    select() { }
}
// 错误：“Image”类型缺少“state”属性。
// class Image implements SelectableControl {
//     select() { }
// }
// class Location {
// }


//类
//在TypeScript里，成员都默认为 public。
//当成员被标记成 private时，它就不能在声明它的类的外部访问
//protected修饰符与 private修饰符的行为很相似，但有一点不同， protected成员在派生类中仍然可以访问
class Animal2 {
    name: string;
    constructor(theName: string) { this.name = theName; }
    move(distanceInMeters: number = 0) {
        console.log(`${this.name} moved ${distanceInMeters}m.`);
    }
}
class Snake extends Animal2 {
    constructor(name: string) { super(name); }
    move(distanceInMeters = 5) {
        console.log("Slithering...");
        super.move(distanceInMeters);
    }
}
class Horse extends Animal2 {
    constructor(name: string) { super(name); }
    move(distanceInMeters = 45) {
        console.log("Galloping...");
        super.move(distanceInMeters);
    }
}
let sam = new Snake("Sammy the Python");
let tomtom: Animal2 = new Horse("Tommy the Palomino");
sam.move();
tomtom.move(34);
//readonly修饰符--可以使用 readonly关键字将属性设置为只读的。 只读属性必须在声明时或构造函数里被初始化
class Octopus {
    readonly name: string;
    readonly numberOfLegs: number = 8;
    constructor (theName: string) {
        this.name = theName;
    }
}
let dad = new Octopus("Man with the 8 strong legs");
// dad.name = "Man with the 3-piece suit"; // 错误! name 是只读的.

//公共，私有与受保护的修饰符,默认为 public
class Animal3 {
    public name: string;
    public constructor(theName: string) { this.name = theName; }
    public move(distanceInMeters: number) {
        console.log(`${this.name} moved ${distanceInMeters}m.`);
    }
}
//理解 private--当成员被标记成 private时，它就不能在声明它的类的外部访问
class Animal4 {
    private name: string;
    constructor(theName: string) { this.name = theName; }
}
// new Animal4("Cat").name; // 错误: 'name' 是私有的.
//TypeScript使用的是结构性类型系统。 当我们比较两种不同的类型时，并不在乎它们从何处而来，
// 如果所有成员的类型都是兼容的，我们就认为它们的类型是兼容的

//理解 protected--protected修饰符与 private修饰符的行为很相似，但有一点不同，
// protected成员在派生类中仍然可以访问
class Persons {
    protected name: string;
    constructor(name: string) { this.name = name; }
}
class Employee extends Persons {
    private department: string;
    constructor(name: string, department: string) {
        super(name)
        this.department = department;
    }
    public getElevatorPitch() {
        return `Hello, my name is ${this.name} and I work in ${this.department}.`;
    }
}
let howard = new Employee("Howard", "Sales");
console.log(howard.getElevatorPitch());
// console.log(howard.name); // 错误
//构造函数也可以被标记成 protected。 这意味着这个类不能在包含它的类外被实例化，但是能被继承
class Personf {
    protected name: string;
    protected constructor(theName: string) { this.name = theName; }
}
// Employee 能够继承 Person
class Employee2 extends Personf {
    private department: string;
    constructor(name: string, department: string) {
        super(name);
        this.department = department;
    }
    public getElevatorPitch() {
        return `Hello, my name is ${this.name} and I work in ${this.department}.`;
    }
}
//存取器--TypeScript支持通过getters/setters来截取对对象成员的访问
//没有使用存取器的例子
class Employee3 {
    fullName: string;
}
let employee = new Employee3();
employee.fullName = "Bob Smith";
if (employee.fullName) {
    console.log(employee.fullName);
}
//使用存取器的例子
let passcode = "secret passcode";
class Employee4 {
    private _fullName: string;
    get fullName(): string {
        return this._fullName;
    }
    set fullName(newName: string) {
        if (passcode && passcode == "secret passcode") {
            this._fullName = newName;
        }
        else {
            console.log("Error: Unauthorized update of employee!");
        }
    }
}
let employee2 = new Employee4();
employee2.fullName = "Bob Smith";
if (employee2.fullName) {
    alert(employee2.fullName);
}
//静态属性--这些属性存在于类本身上面而不是类的实例上
class Grid {
    static origin = {x: 0, y: 0};
    calculateDistanceFromOrigin(point: {x: number; y: number;}) {
        //每个实例想要访问这个属性的时候，都要在 origin前面加上类名
        let xDist = (point.x - Grid.origin.x);
        let yDist = (point.y - Grid.origin.y);
        return Math.sqrt(xDist * xDist + yDist * yDist) / this.scale;
    }
    constructor (public scale: number) { }
}
let grid1 = new Grid(1.0);  // 1x scale
let grid2 = new Grid(5.0);  // 5x scale
console.log(grid1.calculateDistanceFromOrigin({x: 10, y: 10}));
console.log(grid2.calculateDistanceFromOrigin({x: 10, y: 10}));
//抽象类--抽象类做为其它派生类的基类使用。 它们一般不会直接被实例化。 不同于接口，
// 抽象类可以包含成员的实现细节。 abstract关键字是用于定义抽象类和在抽象类内部定义抽象方法
abstract class Animalss {
    abstract makeSound(): void;
    move(): void {
        console.log('roaming the earch...');
    }
}
//抽象类中的抽象方法不包含具体实现并且必须在派生类中实现。 抽象方法的语法与接口方法相似。
// 两者都是定义方法签名但不包含方法体。 然而，抽象方法必须包含 abstract关键字并且可以包含访问修饰符
abstract class Departments {
    constructor(public name: string) {
    }
    printName(): void {
        console.log('Department name: ' + this.name);
    }
    abstract printMeeting(): void; // 必须在派生类中实现
}
class AccountingDepartment extends Departments {
    constructor() {
        super('Accounting and Auditing'); // 在派生类的构造函数中必须调用 super()
    }
    printMeeting(): void {
        console.log('The Accounting Department meets each Monday at 10am.');
    }
    generateReports(): void {
        console.log('Generating accounting reports...');
    }
}
let department: Departments; // 允许创建一个对抽象类型的引用
// department = new Departmenst(); // 错误: 不能创建一个抽象类的实例
department = new AccountingDepartment(); // 允许对一个抽象子类进行实例化和赋值
department.printName();
department.printMeeting();
// department.generateReports(); // 错误: 方法在声明的抽象类中不存在,因为创建的是抽象类型的引用

//函数--TypeScript函数可以创建有名字的函数和匿名函数
//为函数定义类型
//函数的类型
function sum3(x: number, y: number): number {
    return x + y;
}
//函数表达式
//(x: number, y: number) => number 对mySum 添加类型
//TypeScript 的类型定义中，=> 用来表示函数的定义
let mySum: (x: number, y: number) => number = function (x: number, y: number): number {
    return x + y;
};
//用接口定义函数的形状
interface SearchFunc {
    (source: string, subString: string): boolean;
}
let mySearch: SearchFunc;
mySearch = function(source: string, subString: string) {
    return source.search(subString) !== -1;
}
//可选参数--可选参数必须接在必需参数后面
function buildName(firstName: string, lastName?: string):string {
    if (lastName) {
        return firstName + ' ' + lastName;
    } else {
        return firstName;
    }
}
let tomcat = buildName('Tom', 'Cat');
let tom6 = buildName('Tom');
//参数默认值
function buildName2(firstName: string, lastName: string = 'Cat') {
    return firstName + ' ' + lastName;
}
let tomcat2 = buildName2('Tom', 'Cat');
let tom7 = buildName2('Tom');
function push(array: any[], ...items: any[]) {
    items.forEach(function(item) {
        array.push(item);
    });
}
let a = [];
push(a, 1, 2, 3);

//重载--重载允许一个函数接受不同数量或类型的参数时
function reverse(x: number): number;
function reverse(x: string): string;
function reverse(x: number | string): number | string {
    if (typeof x === 'number') {
        return Number(x.toString().split('').reverse().join(''));
    } else if (typeof x === 'string') {
        return x.split('').reverse().join('');
    }
}

function add(x: number, y: number): number {
    return x + y;
}
let myAdd = function(x: number, y: number): number { return x + y; };
//书写完整函数类型--函数的类型只是由参数类型和返回值组成的
let myAdd2: (x: number, y: number) => number =
    function(x: number, y: number): number { return x + y; };
//推断类型
// myAdd has the full function type
let myAdd3 = function(x: number, y: number): number { return x + y; };
// The parameters `x` and `y` have the type number
let myAdd4: (baseValue: number, increment: number) => number =
    function(x, y) { return x + y; };
//可选参数和默认参数--TypeScript里的每个函数参数都是必须的
function buildNames(firstName: string, lastName: string) {
    return firstName + " " + lastName;
}
// let result1 = buildNames("Bob");                  // error, too few parameters
// let result2 = buildNames("Bob", "Adams", "Sr.");  // error, too many parameters
let result3 = buildNames("Bob", "Adams");         // ah, just right
//JavaScript里，每个参数都是可选的，可传可不传。 没传参的时候，它的值就是undefined。
// 在TypeScript里我们可以在参数名旁使用 ?实现可选参数的功能
//可选参数必须跟在必须参数后面
function buildName3(firstName: string, lastName?: string) {
    if (lastName)
        return firstName + " " + lastName;
    else
        return firstName;
}
let result4 = buildName3("Bob");  // works correctly now
// let result5 = buildName2("Bob", "Adams", "Sr.");  // error, too many parameters
let result6 = buildName3("Bob", "Adams");  // ah, just right
//在TypeScript里，我们也可以为参数提供一个默认值
//在所有必须参数后面的带默认初始化的参数都是可选的
//与普通可选参数不同的是，带默认值的参数不需要放在必须参数的后面
function buildName4(firstName: string, lastName = "Smith") {
    return firstName + " " + lastName;
}
let result7 = buildName4("Bob");                  // works correctly now, returns "Bob Smith"
let result8 = buildName4("Bob", undefined);       // still works, also returns "Bob Smith"
// let result9 = buildName4("Bob", "Adams", "Sr.");  // error, too many parameters
let result10 = buildName4("Bob", "Adams");         // ah, just right
//如果带默认值的参数出现在必须参数前面，用户必须明确的传入 undefined值来获得默认值
function buildName5(firstName = "Will", lastName: string) {
    return firstName + " " + lastName;
}
// let result11 = buildName5("Bob");                  // error, too few parameters
// let result12 = buildName5("Bob", "Adams", "Sr.");  // error, too many parameters
let result13 = buildName5("Bob", "Adams");         // okay and returns "Bob Adams"
let result14 = buildName5(undefined, "Adams");     // okay and returns "Will Adams"
//剩余参数--必要参数，默认参数和可选参数有个共同点：它们表示某一个参数
//在TypeScript里，你可以把所有参数收集到一个变量里
function buildName6(firstName: string, ...restOfName: string[]) {
    return firstName + " " + restOfName.join(" ");
}
let employeeName = buildName6("Joseph", "Samuel", "Lucas", "MacKinzie");
//这个省略号也会在带有剩余参数的函数类型定义上使用到
function buildName7(firstName: string, ...restOfName: string[]) {
    return firstName + " " + restOfName.join(" ");
}
let buildNameFun: (fname: string, ...rest: string[]) => string = buildName7;

//this参数--this参数是个假的参数，它出现在参数列表的最前面
function f(this: void) {
    // make sure `this` is unusable in this standalone function
}
//this参数在回调函数里
interface Card {
    suit: string;
    card: number;
}
interface Deck {
    suits: string[];
    cards: number[];
    createCardPicker(this: Deck): () => Card; //返回值是函数，返回的函数的返回值是Card类型
}
let deck: Deck = {
    suits: ["hearts", "spades", "clubs", "diamonds"],
    cards: Array(52),
    // NOTE: The function now explicitly specifies that its callee must be of type Deck
    //提供this参数，是Deck类型的
    createCardPicker: function(this: Deck) {
        return () => {
            let pickedCard = Math.floor(Math.random() * 52);
            let pickedSuit = Math.floor(pickedCard / 13);
            return {suit: this.suits[pickedSuit], card: pickedCard % 13};
        }
    }
}
let cardPicker = deck.createCardPicker();
let pickedCard = cardPicker();
alert("card: " + pickedCard.card + " of " + pickedCard.suit);

interface UIElement {
    addClickListener(onclick: (this: void, e: Event) => void): void;
}
class Handler {
    info: string;
    onClickBad(this: Handler, e: Event) {
        // oops, used this here. using this callback would crash at runtime
        // this.info = e.message;
    }
}
let h = new Handler();
// uiElement.addClickListener(h.onClickBad); // error!

//泛型--可以支持多种类型的数据
//使用any类型来定义函数可以接收任何类型的参数，这样就丢失了一些信息：传入的类型与返回的类型应该是相同的。
// 如果我们传入一个数字，我们只知道任何类型的值都有可能被返回，因此，我们需要一种方法使返回值的类型与传入参数的类型是相同的
function identity<T>(arg:T): T{
    return arg
}
let output = identity<string>("myString");
let output2 = identity("myString");
//使用泛型变量
function loggingIdentity<T>(arg: T[]): T[] {
    console.log(arg.length);  // Array has a .length, so no more error 标明是数组类型
    return arg;
}
function loggingIdentity2<T>(arg: Array<T>): Array<T> {
    console.log(arg.length);  // Array has a .length, so no more error
    return arg;
}
//泛型类型--泛型函数的类型与非泛型函数的类型没什么不同，只是有一个类型参数在最前面
let myIdentity: <T>(arg: T) => T = identity;
//我们也可以使用不同的泛型参数名，只要在数量上和使用方式上能对应上就可以
let myIdentity3: <U>(arg: U) => U = identity;
//还可以使用带有调用签名的对象字面量来定义泛型函数
let myIdentity4: { <T>(arg: T): T } = identity;
//泛型接口
interface GenericIdentityFn{
    <T>(arg: T): T
}
let myIdentity5: GenericIdentityFn = identity;
//把泛型参数当作整个接口的一个参数
interface GenericIdentityFn2<T> {
    (arg: T): T;
}
let myIdentity6: GenericIdentityFn2<number> = identity;
//除了泛型接口，我们还可以创建泛型类。 注意，无法创建泛型枚举和泛型命名空间
//泛型类--泛型类看上去与泛型接口差不多,泛型类使用（ <>）括起泛型类型，跟在类名后面
class GenericNumber<T>{
    zeroValue: T
    add: (x : T,y : T) => T
}
let myGenericNumber = new GenericNumber<number>();
myGenericNumber.zeroValue = 0;
myGenericNumber.add = function(x, y) { return x + y; };
//泛型约束
interface Lengthwise {
    length: number;
}
function loggingIdentity6<T extends Lengthwise>(arg: T): T {
    console.log(arg.length);  // Now we know it has a .length property, so no more error
    return arg;
}
// loggingIdentity6(3);  // Error, number doesn't have a .length property
//在泛型约束中使用类型参数--可以声明一个类型参数，且它被另一个类型参数所约束
function getProperty<T, K extends keyof T>(obj: T, key: K): T[K] {
    return obj[key]
}
let xx = { a: 1, b: 2, c: 3, d: 4 };
getProperty(xx, "a"); // okay
// getProperty(x, "m"); // error: Argument of type 'm' isn't assignable to 'a' | 'b' | 'c' | 'd'.
//在泛型里使用类类型
function create<T>(c: { new(): T; }): T {
    return new c();
}
//使用原型属性推断并约束构造函数与类实例的关系
class BeeKeeper {
    hasMask: boolean;
}
class ZooKeeper {
    nametag: string;
}
class Animales {
    numLegs: number;
}
class Bee extends Animales {
    keeper: BeeKeeper;
}
class Lion extends Animales {
    keeper: ZooKeeper;
}
function createInstance<A extends Animales>(c: new () => A): A {
    return new c();
}

createInstance(Lion).keeper.nametag;  // typechecks!
createInstance(Bee).keeper.hasMask;   // typechecks!

//枚举--使用枚举我们可以定义一些带名字的常量
//枚举（Enum）类型用于取值被限定在一定范围内的场景，比如一周只能有七天，颜色限定为红绿蓝等
enum Days {Sun, Mon, Tue, Wed, Thu, Fri, Sat}
//枚举成员会被赋值为从 0 开始递增的数字，同时也会对枚举值到枚举名进行反向映射
console.log(Days["Sun"] === 0); // true
console.log(Days["Mon"] === 1); // true
console.log(Days["Tue"] === 2); // true
console.log(Days["Sat"] === 6); // true
console.log(Days[0] === "Sun"); // true
console.log(Days[1] === "Mon"); // true
console.log(Days[2] === "Tue"); // true
console.log(Days[6] === "Sat"); // true

//给枚举项手动赋值
enum Days2 {Sun = 7, Mon = 1, Tue, Wed, Thu, Fri, Sat}
console.log(Days2["Sun"] === 7) // true
console.log(Days2["Mon"] === 1) // true
console.log(Days2["Tue"] === 2) // true
console.log(Days2["Sat"] === 6) // true
//手动赋值的枚举项也可以为小数或负数，此时后续未手动赋值的项的递增步长仍为 1
enum Days3 {Sun = 7, Mon = 1.5, Tue, Wed, Thu, Fri, Sat};
console.log(Days3["Sun"] === 7); // true
console.log(Days3["Mon"] === 1.5); // true
console.log(Days3["Tue"] === 2.5); // true
console.log(Days3["Sat"] === 6.5); // true
//数字枚举
enum Direction {
    Up = 1,
    Down,
    Left,
    Right
}
enum Responses {
    No = 0,
    Yes = 1,
}
function respond(recipient: string, message: Responses): void {
    // ...
}
respond("Princess Caroline", Responses.Yes)
function getSomeValue():number {
    return 1
}
//不带初始化器的枚举或者被放在第一的位置，或者被放在使用了数字常量或其它常量初始化了的枚举后面
enum E {
    A = getSomeValue(),
    // B, // error! 'A' is not constant-initialized, so 'B' needs an initializer
}
//字符串枚举
enum Directionf {
    Up = "UP",
    Down = "DOWN",
    Left = "LEFT",
    Right = "RIGHT",
}
//const枚举
const enum Enum {
    A = 1,
    B = A * 2
}
//外部枚举
declare enum Enum2 {
    A = 1,
    B,
    C = 2
}
//类型兼容
interface Empty<T> {
}
let xxx: Empty<number>;
let yyy: Empty<string>;
xxx = yyy;  // OK, because y matches structure of x
interface NotEmpty<T> {
    data: T;
}
let xxxx: NotEmpty<number>;
let yyyy: NotEmpty<string>;
// xxxx = yyyy;  // Error, because x and y are not compatible

//声明文件
// declare var 声明全局变量
// declare function 声明全局方法
// declare class 声明全局类
// declare enum 声明全局枚举类型
// declare namespace 声明（含有子属性的）全局对象
// interface 和 type 声明全局类型
// export 导出变量
// export namespace 导出（含有子属性的）对象
// export default ES6 默认导出
// export = commonjs 导出模块
// export as namespace UMD 库声明全局变量
// declare global 扩展全局变量
// declare module 扩展模块
/// <reference /> 三斜线指令

//什么是声明语句 假如我们想使用第三方库 jQuery，一种常见的方式是在 html 中通过 <script>
// 标签引入 jQuery，然后就可以使用全局变量 $ 或 jQuery 了,但是在 ts 中，编译器并不知道 $ 或 jQuery 是什么东西
//这时，我们需要使用 declare var 来定义它的类型
//declare var jQuery: (selector: string) => any;

//什么是声明文件 通常我们会把声明语句放到一个单独的文件（jQuery.d.ts）中，这就是声明文件
//声明文件必需以 .d.ts 为后缀
// src/jQuery.d.ts
// declare var jQuery: (selector: string) => any;
//使用 @types 统一管理第三方库的声明文件。
//npm install @types/jquery --save-dev 安装jquery声明模块

//declare var 是最简单的，如之前所学，它能够用来定义一个全局变量的类型。与其类似的，
// 还有 declare let 和 declare const，使用 let 与使用 var 没有什么区别：
declare let jQuery: (selector: string) => any; //声明一个jQuery函数，返回任意类型
//声明语句中只能定义类型，切勿在声明语句中定义具体的实现
//declare function --> declare function 用来定义全局函数的类型。
// jQuery 其实就是一个函数，所以也可以用 function 来定义：
// src/jQuery.d.ts
declare function jQuery2(selector: string): any;

//declare class 当全局变量是一个类的时候，我们用 declare class 来定义它的类型
// src/Animal.d.ts
declare class Animal {
    name: string;
    constructor(name: string);
    sayHi(): string;
}
//declare enum 使用 declare enum 定义的枚举类型也称作外部枚举（Ambient Enums）
// src/Directions.d.ts
declare enum Directions {
    Up,
    Down,
    Left,
    Right
}
let directions = [Directions.Up, Directions.Down, Directions.Left, Directions.Right];

//declare namespace --> namespace 是 ts 早期时为了解决模块化而创造的关键字，中文称为命名空间
//interface 和 type
//除了全局变量之外，可能有一些类型也希望能暴露出来。在类型声明文件中，
// 可以直接使用 interface 或 type 来声明一个全局的接口或类型
// src/jQuery.d.ts
interface AjaxSettings {
    method?: 'GET' | 'POST'
    data?: any;
}
declare namespace jQuery3 {
    function ajax(url: string, settings?: AjaxSettings): void;
}
let settings: AjaxSettings = {
    method: 'POST',
    data: {
        name: 'foo'
    }
};
jQuery3.ajax('/api/post_something', settings);
//防止命名冲突
// src/jQuery.d.ts

declare namespace jQuery4 {
    interface AjaxSettings {
        method?: 'GET' | 'POST'
        data?: any;
    }
    function ajax(url: string, settings?: AjaxSettings): void;
}
let settings2: jQuery4.AjaxSettings = {
    method: 'POST',
    data: {
        name: 'foo'
    }
};
jQuery4.ajax('/api/post_something', settings2);

//内置对象 内置对象是指根据标准在全局作用域（Global）上存在的对象。
// 这里的标准是指 ECMAScript 和其他环境（比如 DOM）的标准。Boolean、Error、Date、RegExp 等
//DOM 和 BOM 提供的内置对象有：
// Document、HTMLElement、Event、NodeList 等
let body: HTMLElement = document.body;
let allDiv: NodeList = document.querySelectorAll('div');
document.addEventListener('click', function(e: MouseEvent) {
    // Do something
});

//类型别名--类型别名用来给一个类型起个新名字
//类型别名常用于联合类型
type Name = string;
type NameResolver = () => string;
type NameOrResolver = Name | NameResolver;
function getName(n: NameOrResolver): Name {
    if (typeof n === 'string') {
        return n;
    } else {
        return n();
    }
}

//字符串字面量类型--字符串字面量类型用来约束取值只能是某几个字符串中的一个
type EventNames = 'click' | 'scroll' | 'mousemove';
function handleEvent(ele: Element, event: EventNames) {
    // do something
}

handleEvent(document.getElementById('hello'), 'scroll');  // 没问题
// handleEvent(document.getElementById('world'), 'dbclick'); // 报错，event 不能为 'dbclick'

//元组--数组合并了相同类型的对象，而元组（Tuple）合并了不同类型的对象
//定义一对值分别为 string 和 number 的元组
let tom2: [string, number] = ['Tom', 25];

let tomt: [string, number];
tomt = ['Tom', 25];
//当添加越界的元素时，它的类型会被限制为元组中每个类型的联合类型
tomt.push('male');
// Argument of type 'true' is not assignable to parameter of type 'string | number'.
// tomt.push(true);

