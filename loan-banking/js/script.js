// const { name } = require("browser-sync");

jQuery(document).ready(function () {

   //----Format Webp---------
   function testWebP(callback) {
      let webP = new Image();
      webP.onload = webP.onerror = function () {
         callback(webP.height == 2);
      };
      webP.src =
         'data:image/webp;base64,UklGRjoAAABXRUJQVlA4IC4AAACyAgCdASoCAAIALmk0mk0iIiIiIgBoSygABc6WWgAA/veff/0PP8bA//LwYAAA';
   }
   testWebP(function (support) {
      if (support == true) {
         document.querySelector('body').classList.add('webp');
      }
   });
});
// --------------меню бургер----------------

 let burger = document.querySelector('.burger'),
     nav = document.querySelector('.header__nav'),
     body = document.querySelector('body');

 
 burger.addEventListener  ('click', ()=> {
   burger.classList.toggle('active')
   nav.classList.toggle('active')
   body.classList.toggle('active')
 });
// -------------плавный скрол-----------------

let link = document.querySelectorAll('a[href*="#"]');

link.forEach(elem => {
   elem.addEventListener('click', event => {
      event.preventDefault()

      let id = elem.getAttribute('href');
      document.querySelector(id).scrollIntoView ({
         behavior: "smooth"         
      })    
      
   })
})

// ----------------гармошка аккардион-----------------

let faqHeader = document.querySelectorAll('.faq__header');

faqHeader.forEach ( header => {
   header.addEventListener ('click', function() {
      let wrapperActive = document.querySelectorAll ('.faq__text-wrapper.active');
      wrapperActive.forEach ( wrapp => {
         wrapp.classList.remove('active')
      })

      let parent = this.parentNode;
      let wrapper = parent.querySelector ('.faq__text-wrapper');
      wrapper.classList.toggle('active')
   
   })
  
})

  // ------------- Form ---------------------------

  let button = document.querySelector('#button'),
      backBatton = document.querySelector('.contact__prev'),
      content = document.querySelector('.form__content'),
      stepNum = document.querySelector('#progresNumber'),
      step = 1,

  data = {
     personalized: '',
     name: '',
     lastName: '',
     idNumber: '',
     dateBirth: '',
     score: '',
  };

const step_1 = `
<p class="form__title">
  Request your personalized loan-proposal
</p>
<div class="form__wrapper">
  <label for="radio1" class="form__radio-btn">
     <input class="form__radio-input" type="radio" name="personalized" id="radio1" data-attribute='<5k'>
     <span class="form__radio-text">Less than €5,000</span>
  </label>
  <label for="radio2" class="form__radio-btn">
     <input class="form__radio-input" type="radio" name="personalized" id="radio2" data-attribute='>5k'>
     <span class="form__radio-text">€5,000-€25,000</span>
  </label>
  <label for="radio3" class="form__radio-btn">
     <input class="form__radio-input" type="radio" name="personalized" id="radio3" data-attribute='>25k'>
     <span class="form__radio-text">More than €25,000</span>
  </label>
</div>   
`
const step_2 = `
<p class="form__title">
Fill the rows below to suits better loan-offer for you
</p>
<div class="form__wrapper">
  <input type="text" name='name' class="form__input" placeholder="First name">
  <input type="text" name='lastName' class="form__input" placeholder="Last name">
</div>
`

const step_3 = `
<p class="form__title">

</p>
<div class="form__wrapper">
  <input type="text" name='idNumber' class="form__input" placeholder="ID-number" data-attribute='idnumber'>
  <input type="text" name='dateBirth' class="form__input" placeholder="Date of birth" data-attribute='dateBirth'>
</div>
`

const step_4 = `
<p class="form__title">
Credit score
</p>
<div class="form__wrapper">
<label for="radio1" class="form__radio-btn">
   <input class="form__radio-input" type="radio" name="score" id="radio1" data-attribute='excellent'>
   <span class="form__radio-text"> Excellent (720-850)</span>
</label>
<label for="radio2" class="form__radio-btn"> 
   <input class="form__radio-input" type="radio" name="score" id="radio2" data-attribute='good'>
   <span class="form__radio-text"> Good (680-719)</span>
</label>
<label for="radio3" class="form__radio-btn">
   <input class="form__radio-input" type="radio" name="score" id="radio3" data-attribute='fair'>
   <span class="form__radio-text">Fair (640-679)</span>
</label>
<label for="radio4" class="form__radio-btn">
   <input class="form__radio-input" type="radio" name="score" id="radio4" data-attribute='poor'>
   <span class="form__radio-text">Poor (0-639)</span>
</label>
</div>
`

const step_5 = `
   <p class="form__title form__title_end " >
   Thank you for filling out the form! </p>
`

content.innerHTML = step_1;
stepNum.innerHTML = step;

// ф-ция первой формы. находим все кнопки с нужным именем. перебираем их
function radioChecked() {
   let radioInput = content.querySelectorAll('input[name="personalized"]');
   radioInput.forEach(input => {
      //и вешаем слуш.событий по клику, чекнутый инпут записать в массив данных
      input.addEventListener('click', function() { if (input.checked) {
         data.personalized = input.getAttribute('data-attribute');         
      } 
      })

   if (input.checked) {
      data.personalized = input.getAttribute('data-attribute');      
   } 
   if (data.personalized === input.getAttribute('data-attribute')) {
      input.setAttribute('checked', true)
   }
 
 }) 
}  
// ф-ция 4го стека. находим все кнопки с нужным именем. перебираем их
 function radioCheckedScore() {
   let radioInputScore = content.querySelectorAll('input[name="score"]');
   
   radioInputScore.forEach(input => {     

      input.addEventListener('click', function() { if (input.checked) {
         data.score = input.getAttribute('data-attribute');        
      } 
      })

   if (input.checked) {
      data.score = input.getAttribute('data-attribute');
    } 
  
 })   
}

/*ф-ция 2 и 3 шага . находим все поля для ввода. перебираем их
 и записываем их значения в массив data */
function inputVal() {
   let inputs = content.querySelectorAll('input[type = "text"]');
   inputs.forEach (input => {
      switch (input.getAttribute ('name')) {
         case 'name':
            data.name = input.value;
            break;
         case 'lastName':
            data.lastName = input.value;
            break;
         case 'idNumber':
            data.idNumber = input.value;
            break;
         case 'dateBirth':
            data.dateBirth = input.value;
            break;
      }       
    })  
}

//счетчик шага  вверх
function countUp() {
   ++step
   stepNum.innerHTML = step;
}
//счетчик шага вниз
function countDown() {
   --step
   stepNum.innerHTML = step;
}

//функция, кот отрисовывает степы вперед
function stepUp() {
   if (step === 1) {
      radioChecked();
      // Проверяем выбрана ли одна из radio button
      if (data.personalized.length !== 0) {
         content.innerHTML = step_2;
         countUp();
         backBatton.classList.toggle('disable')
      }
   } else if (step === 2) {
      inputVal();
      // Проверяем, заполнены ли данные
      if (data.name.length !== 0 && data.lastName.length !== 0) {
         content.innerHTML = step_3;
         countUp();        
      }
   } else if (step === 3) {
      inputVal();
      //Проверяем, заполнены ли данные
      if (data.idNumber.length !== 0 && data.dateBirth.length !== 0) {         
         content.innerHTML = step_4;
         countUp();
         }
   } else if (step === 4) {
      radioCheckedScore();
      // Проверяем выбрана ли одна из radio button
      if (data.score.length !== 0) {
         submitForm();
         content.innerHTML = step_5;  
         countUp();  
         console.log(data);             
      }   

      //на пятом степе убрала стрелку и кнопку
    } if (step===5){
    
      let noneBack = document.querySelectorAll ('.contact__prev');
          noneButton = document.querySelectorAll ('.form__button');
      // console.log( noneBack);
      noneBack.forEach(function(elem){
         elem.parentNode.removeChild(elem)
      })
      noneButton.forEach(function(elem){
         elem.parentNode.removeChild(elem)
      })

    }
}


//функция, кот отрисовывает степы назад
function stepDown() {
   switch (step) {
      case 2:
         content.innerHTML=step_1;  
         countDown(); 
         radioChecked();  
         backBatton.classList.toggle('disable');              
         break;
      case 3:
         content.innerHTML=step_2;  
         countDown();  
         inputVal();     
         break;
      case 4:
         content.innerHTML=step_3;  
         countDown(); 
         radioCheckedScore();     
         break;
               
   }
}
//по клику на кнопку далее вкл.ф-цию stepUp. 
// перед этим сделать ей дефолтное состояние
button.addEventListener('click', (e)=> {
   e.preventDefault();
   stepUp()
   
})
//по клику на стрелку назад вкл.ф-цию  stepDown. 
backBatton.addEventListener('click', ()=> {
   stepDown()
  
})

//отправка формы на сервер . ф. ассинхронная. 

let submitForm = async() =>{
   try {
      await fetch ('http://localhost:8000/posts', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json;charset=utf-8'
      },
         body: JSON.stringify(data)
      });
   } catch (e){
         console.log(error);
      }      
   }

  