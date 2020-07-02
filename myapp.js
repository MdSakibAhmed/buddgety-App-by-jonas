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
        this.parcantege = -1;

    };
    Expense.prototype.percantege = function (totalincome) {

        if (totalincome > 0) {
            this.parcantege = Math.round((this.value / totalincome) * 100)
        } else {
            this.parcantege = -1;

        }


    };
    Expense.prototype.getPercantege = function () {
        return this.parcantege;
    }

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
            inc: 0,

        },
        budgate: 0,
        parcentage: -1
    };
    var total = function (type) {
        var sume = 0;
        // if(type === 'inc'){
        Data.allItems[type].forEach(function (current) {

            sume += current.value
            
        });
        Data.total[type] = sume
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

        DeleteItem(type, Id) {
            var ids, index;
            // id = 6
            // Data.allItems[type][Id] // in this way it will not work bacuase Ids is not set  in order 0,1,2,3....
            // ids = [1,3,5,6]
            // index = 3
            ids = Data.allItems[type].map((current) => {
                return current.id;
            });
            // find index number of id from all Id we have
            index = ids.indexOf(Id)

            // If the Id is  not found in Ids , it will results -1

            if (index !== -1) {
                Data.allItems[type].splice(index, 1)
            }




        },

        calcaluteBudgate() {

            // sume all incomes and expenses
            total('exp');
            total('inc')
            // calcaluete the budgete : income - expeses

            Data.budgate = Data.total.inc - Data.total.exp


            if (Data.total.inc > 0) {
                // calcalute the parcentage of income we spant : income / expenses
                // round Mehtode converts floating inot  nearest intezer
                Data.parcentage = Math.round((Data.total.exp / Data.total.inc) * 100)

                // Expanse 100 , income 200 . so percentege is 100/200 = 50% 0.5 
            } else {
                Data.parcentage = -1;
            }

            // if(type === 'inc'){
            // Data.allItems[type].forEach(function (current, index, arr) {
            //     myIncome = 0
            //     myIncome += current.value
            //     Data.total[type] = myIncome
            // });

            // }
            // else if(type === 'exp'){
            // Data.allItems[type].forEach(function(current){
            //     myExpense = 0;
            //     myExpense += current.value;
            //     Data.total[type] = myExpense ;
            // });

            // }



        },

        calculatePercenteg() {
            /*
            income = 100;
            Expense and percentege
            a = 10/100
            b = 20/100
            c = 40/100

            a = 10%
            b = 20%
            c = 40%
            */
            Data.allItems.exp.forEach(function (current) {
                current.percantege(Data.total.inc)
            })

        },

        getPercantege() {

            var allpercen = Data.allItems.exp.map(current => {
                return current.getPercantege()
            })

            return allpercen;
        },


        getbudget() {
            return {
                income: Data.total.inc,
                expenses: Data.total.exp,
                budgete: Data.budgate,
                parcantege: Data.parcentage
            }
        },
        testing() {
            console.log(Data);

        }
    }

})();


// USER INTERFACE CONTROLER
let UiControler = (() => {


    // SOme code
    var Domstring = {
        inputType: '.add__type',
        inputDescription: '.add__description',
        inputValue: '.add__value',
        inputBtn: '.add__btn',
        expensesContainer: '.expenses__list',
        incomesContainer: '.income__list',
        allIncomes: ".budget__income--value",
        allExpenses: ".budget__expenses--value",
        totalBaddgate: ".budget__value",
        allExpParcentage: ".budget__expenses--percentage",
        container: ".container",
        itemParcantege: '.item__percentage',
         currentMonth:   ".budget__title--month"
    };

    var nodeListforEach = function (list, calback) {
        for (let i = 0; i < list.length; i++) {
            calback(list[i], i)


        }
    }

 
    var formeatNumber = (num, type) => {
        var numSplite, int, dec;
        // This rules are will be flowed in formatting number
        /*
         * convart number to absolute number
         * + or - before number
         * exactly tweo decimal poients
         * comma separating thousends 
         */
        num = Math.abs(num);
        num = num.toFixed(2);  
        numSplite = num.split('.');

         int = numSplite[0];
        int = parseInt(int)

        if (int.length > 3) {
            int = int.substr(0, int.length - 3) + ',' + int.substr(int.length - 3, 3); //input = 23511 , output = 23,511    
        }
        
        // Easy  and more diynamic way to comma separating with thousend and billion etc
         int = int.toLocaleString() 

         dec = numSplite[1]

       return (type === 'exp' ? '-' : '+') + int + '.' + dec;

        


    };

    return {

         currentMonth  (){
            var date,month,year;
            var monthNames = ["January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"]
  
             date = new Date();
    
            month = date.getMonth() ;
            year = date.getFullYear();
            console.log(typeof month);
            document.querySelector(Domstring.currentMonth).textContent = monthNames[month] +' '+ year;
    
    
    
        },
        getInput() {
            return {
                type: document.querySelector(Domstring.inputType).value,
                Description: document.querySelector(Domstring.inputDescription).value,
                // convert string to floating number
                value: parseFloat(document.querySelector(Domstring.inputValue).value)
            }
        },

        addListItem(obj, type, parcent) {
            let html, element, newHtml;
            if (type === 'inc') {
                element = Domstring.incomesContainer;
                html = '<div class="item clearfix" id="inc-%id%"><div class="item__description">%description%</div> <div class="right clearfix"><div class="item__value">%value%</div><div class="item__delete"> <button class="item__delete--btn"><i class="ion-ios-close-outline"></i> </button></div></div></div>'
            } else if (type === 'exp') {
                element = Domstring.expensesContainer;
                html = '<div class="item clearfix" id="exp-%id%"> <div class="item__description">%description%</div><div class="right clearfix"><div class="item__value">%value%</div><div class="item__percentage">21%</div><div class="item__delete"><button class="item__delete--btn"><i class="ion-ios-close-outline"></i></button></div></div></div>'
            }
            // Replace the placeholder with some actule data
            newHtml = html.replace('%id%', obj.id)
            newHtml = newHtml.replace('%description%', obj.descritption);
            newHtml = newHtml.replace('%value%', formeatNumber(obj.value, type));
            // newHtml = newHtml.replace('%21', parcent.parcantege)
            // Insert the HTML into the DOM
            document.querySelector(element).insertAdjacentHTML('beforeend', newHtml)




        },

        DeleteItem(Id) {
            var DeltItm;
            DeltItm = document.getElementById(Id)
            DeltItm.parentNode.removeChild(DeltItm)

        },
        allIncAndExp(total) {


            // var totaFields = document.querySelectorAll(Domstring.allIncomes + ',' + Domstring.allExpenses + ',' + Domstring.allExpParcentage); 
            // totalArr = Array.prototype.slice.call(totaFields);

            // totalArr.foEach(function (current) {


            // })




            document.querySelector(Domstring.allIncomes).textContent =  formeatNumber( total.income,'inc');
            document.querySelector(Domstring.allExpenses).textContent =   formeatNumber( total.expenses,'exp');
            if (total.parcantege > 0) {
                document.querySelector(Domstring.allExpParcentage).textContent = total.parcantege + '%#';

            } else {
                document.querySelector(Domstring.allExpParcentage).textContent = '---'
            }

            var type;
            total.budgete > 0 ? type = 'inc': type = 'exp';
            document.querySelector(Domstring.totalBaddgate).textContent =  formeatNumber(total.budgete, type);



        },

        addParcantage(parcantage) {
            var fields;
            fields = document.querySelectorAll(Domstring.itemParcantege);

           



            nodeListforEach(fields, function (current, index) {

                if (parcantage[index] > 0) {
                    current.textContent = parcantage[index] + '%';
                } else {
                    current.textContent = '---'

                }

            })

        },



        clearFields() {
            let fields, fieldsArr;
            fields = document.querySelectorAll(Domstring.inputDescription + ',' + Domstring.inputValue);
            // console.log(fields);
            // Convert NodeList into Array
            fieldsArr = Array.prototype.slice.call(fields);

            fieldsArr.forEach((current, index, array) => {
                // console.log(cur,index,array);
                current.value = "";
                fieldsArr[0].focus()
            });


        },

        cnangType  (){

            var fields = document.querySelectorAll(Domstring.inputType + ',' + Domstring.inputValue + ',' + Domstring.inputDescription);
            
            nodeListforEach(fields,function(current,index){
                current.classList.toggle('red-focus');
            })

document.querySelector(Domstring.inputBtn).classList.toggle('red')

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

        });

        document.querySelector(Dom.container).addEventListener('click', controlDeleteItem);

        // change Events to improbing UX
        document.querySelector(Dom.inputType).addEventListener('change', uicntr.cnangType);
    }
    var updateBudgete = function () {
        //     1 . calcalute budgteControler
        bugcntr.calcaluteBudgate()
        //     2. return the budgteControler
        var budget = bugcntr.getbudget();
        //     3 . Display the budgate on the UI
        uicntr.allIncAndExp(budget);


        //console.log(budget);
    }

    // Custome function
    var controAddItem = () => {
        // 1 . get filed input 
        var input, addNewItem;

        input = uicntr.getInput();


        if (input.Description !== "" && !isNaN(input.value) && input.value > 0 && isNaN(input.Description)) {
            // 2 . add the item to the budgete    controler

            addNewItem = bugcntr.addItem(input.type, input.Description, input.value);


            //console.log(addNewItem);
            // 3 . add the item to the UI

            uicntr.addListItem(addNewItem, input.type)
            // 4.clear the fields
            uicntr.clearFields()
        } else {
            alert("Please insert valied input type")
            uicntr.clearFields()
        }

        // 5 . Update the budgete on the Display 
        updateBudgete()

        // 6. calcalate and update the percantage
        updatePercantage()


    }
    var updatePercantage = () => {
        // 1. calcaulate the percantage
        bugcntr.calculatePercenteg();
        // 2. read the percantage from the budgate controler
        var percantage = bugcntr.getPercantege()


        // 3. Update the UI with new percantage
        //console.log(percantage);
        uicntr.addParcantage(percantage)



    }

    var controlDeleteItem = function (event) {
        var itemId, spliteId, type, ID;
        itemId = event.target.parentNode.parentNode.parentNode.parentNode.id;

        if (itemId) {
            spliteId = itemId.split('-');
            type = spliteId[0];


            // parsInt this mehode converts string to integer
            ID = parseInt(spliteId[1])
            //console.log(spliteId,type,ID);

            // 1 .Delete the Item from datastructure
            bugcntr.DeleteItem(type, ID);
            //console.log(bugcntr.testing());

            // 2. Delete the Item from the UI
            uicntr.DeleteItem(itemId)

            // 3. Update and show the new budgate

            updateBudgete()

            // calcalute and update the percantage

            updatePercantage()



        }

    }



    return {
        init() {
            console.log('Application has started ');

            // set allthings to 0
            uicntr.allIncAndExp({
                income: 0,
                expenses: 0,
                budgete: 0,
                parcantege: '---'
            })
            setupEventListner();
            uicntr.currentMonth()
        }
    }




})(budgteControler, UiControler)

console.log(AppControler.init());

// let amr = [];
// console.log(amr);
// Array.prototype.slice;
// var test = document.querySelectorAll('.add__type' + ',' + '.add__value');
// // console.log(Array.prototype.slice(test));
// console.log(test);
// Arr = Array.prototype.slice.call(test, 1);
// console.log(Arr);
// var rakib = [1, 2, 4];
// rakib.forEach(function (current) {
//     console.log(current.toString());
// })
// var sakib = rakib.slice();
//console.log(sakib);


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