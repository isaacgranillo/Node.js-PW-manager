var person = {
	name: 'Isaac',
	age: 30
};

var personJSON = JSON.stringify(person);

console.log(personJSON);
console.log(typeof personJSON);

var personObject = JSON.parse(personJSON);

console.log(personObject.name);
console.log(typeof personObject);

var animal = '{"name": "Rex"}';

var animalObject = JSON.parse(animal)

console.log(typeof animalObject);

animalObject.age = 10;

console.log(animalObject.age)

animal = JSON.stringify(animalObject)

console.log(animal);
console.log(typeof animal)