// // Undestanding Project Arcitacuture

// // Module Pattarne 

// var budgteControler = function (){

// var x = 39;
// var u = 10;
// var add = function (b){
// return(x + b);
// };
// var addyoue = function (){
//     return x
//     }
//     //addyoue()


// return {
//     a : 'sakib',
//     u ,
//     PublicTest : function (c){
//         return (add(c));
//     },
//     xy  (){
//         return addyoue()

//     }
// }

// }

// var Uimodule = (function (){
// // some code 
// return {
//     b : 20
// }
// })()

// // How to access from a module to another module 

// var Controler = (function (bugtco, Umod){
// var x =  bugtco().PublicTest(13);
// var y = Umod.b
// return {
//     x ,
//     y}

// })(budgteControler,Uimodule)

// BudgeTe CONTROLER
let budgteControler = (() => {

    function Expense(id, descritption, value) {
        this.id = id;
        this.descritption = descritption;
        this.value = value;
    };

    // let exp1 = new Expense(1, 'rice' , 200);


    function Income(id, descritption, value) {
        this.id = id;
        this.descritption = descritption;
        this.value = value;
    };
    // let incom1 = new Income (2, 'car' , 300);

    // Data Structure 

    // var allIncome = [];
    // var allExpense = [];
    // var totalIncom = 0;
    // var totalExpense = 0;

    // Better way
    let Data = {
        allItems: {
            exp: [],
            inc: []
        },
        total: {
            exp: 0,
            inc: 0
        }

    };

    return {


        addItem(type, des, val) {
            var newItem, ID;
            // ID = lastId + 1 ;
            // Creat new id 
            if (Data.allItems[type].length > 0) {
                ID = Data.allItems[type][Data.allItems[type].length - 1].id + 1
            } else {
                ID = 0

            }


            // creat new item based on 'inc' or 'exp'
            if (type === 'exp') {
                newItem = new Expense(ID, des, val)

            } else if (type === 'inc') {
                newItem = new Income(ID, des, val)


            }
            // Push it into our datavstructure 
            Data.allItems[type].push(newItem);

            // return new element
            return newItem;


        },
        testing() {
            console.log(Data);

        }
    }

})()

// USER INTERFACE CONTROLER
let UiControler = (() => {
    // SOme code
    var Domstring = {
        inputType: '.add__type',
        inputDescription: '.add__description',
        inputValue: '.add__value',
        inputBtn: '.add__btn',
        expensesContainer: '.expenses__list',
        incomesContainer: '.income__list'
    }

    return {
        getInput() {
            return {
                type: document.querySelector(Domstring.inputType).value,
                Description: document.querySelector(Domstring.inputDescription).value,
                value: document.querySelector(Domstring.inputValue).value
            }
        },

        addListItem(obj, type) {
            let html, element, newHtml;
            if (type === 'inc') {
                element =  Domstring.incomesContainer;
                html = '<div class="item clearfix" id="income-%id%"><div class="item__description">%description%</div> <div class="right clearfix"><div class="item__value">%value%</div><div class="item__delete"> <button class="item__delete--btn"><i class="ion-ios-close-outline"></i> </button></div></div></div>'
            } else if (type === 'exp') {
                element = Domstring.expensesContainer;
                html = '<div class="item clearfix" id="expense-%id%"> <div class="item__description">%description%</div><div class="right clearfix"><div class="item__value">%value%</div><div class="item__percentage">21%</div><div class="item__delete"><button class="item__delete--btn"><i class="ion-ios-close-outline"></i></button></div></div></div>'
            }

            newHtml = html.replace('%id%', obj.id)
            newHtml = newHtml.replace('%description%', obj.descritption);
            newHtml = newHtml.replace('%value%', obj.value);

            document.querySelector(element).insertAdjacentHTML('beforeend', newHtml)




        },
        getDomstring() {

            return Domstring;

        }
    }
})()

// GLOBAL APP CONTROLER
let AppControler = ((bugcntr, uicntr) => {

    function setupEventListner() {
        var Dom = uicntr.getDomstring();
        document.querySelector(Dom.inputBtn).
        //addEventListener('click', () => {
        //     console.log(` I am clicked `);
        addEventListener('click', controAddItem

        );
        document.addEventListener('keypress', event => {
            //console.log(event);
            if (event.keyCode === 13 || event.keyCode === 13) {
                // console.log('Enter key was pressed');
                controAddItem()

            }

        })
    }


    // Custome function
    var controAddItem = () => {
        // 1 . get filed input 
        var input, addNewItem;

        input = uicntr.getInput()



        // 2 . add the item to the budgete    controler

        addNewItem = bugcntr.addItem(input.type, input.Description, input.value);


        console.log(addNewItem);
        // 3 . add the item to the UI

        uicntr.addListItem(addNewItem, input.type)
        // 4 . calcalate the budgate 
        // 5 . Update the budgete on the Display 


    }

    return {
        init() {
            console.log('Application has started ');
            setupEventListner()
        }
    }




})(budgteControler, UiControler)

console.log(AppControler.init());



// NEW KEYWORD PRACTICE
// NEW KEYWORD PRACTICE
// function Person(name) {
//     this.name = name

// }



// let p1 = new Person('abdullah');
// console.log(p1);


// function PersonOb(name) {
//  let p1 =   {

//     }
//     p1.name = name
//     return p1
// }
// console.log(PersonOb('sakib'));

// let p3 = {
//     name : 'rakib'
// }
// console.log(p3);