let allMeals = []
let allCourses = []
let body = document.getElementById('body')
let header = document.getElementById('header')
let main = document.getElementById('main')
let cardContainer = document.querySelector('.card-container')
let cardContainer2 = document.querySelector('.card-container2')
let cardContainer5 = document.querySelector('.card-container5')
let searchSection = document.querySelector('.search-section')
let title = document.querySelector('.titleH1')
let titleP = document.querySelector('.titleP')


async function recipe() {
  try {
    let result = await fetch('meals.json')
    let resultCourse = await fetch('courses.json')
    let dataCourses = await resultCourse.json()
    let data = await result.json()
    allMeals = data.meals
    allCourses = dataCourses.courses
    displayMeals(allMeals)
    
  } catch (err) {
    console.error('Fetch error:', err)
  }
}
recipe()

function displayMeals(meals) {
  let cardContainer = document.querySelector('.card-container')
  cardContainer.textContent = ''
  searchSection.style.display = 'flex'

  meals.forEach(meal => {
    const mealCard = document.createElement('div')
    mealCard.classList.add('card')
    mealCard.style.border = 'none'

    mealCard.innerHTML = `
      <img class='food-img' src='${meal.strMealThumb}' alt='${meal.strMeal}' />
      <div class='recipe'>
        <h3 class='food-name'>${meal.strMeal}</h3>
        <p class='time'>${meal.strTime}</p>
        <p class='kkal'>${meal.strCalories}</p>
      </div>
    `

    mealCard.addEventListener('click', () => {
      let cardContainer2 = document.querySelector('.card-container2')
      cardContainer.textContent = ''
      cardContainer2.textContent = ''
      cardContainer5.textContent = ''
      body.style.backdropFilter = 'blur(7px)'

      let div = document.createElement('div')
      div.classList.add('card2')

      div.innerHTML = `
        <img class='meal-img' src="${meal.strMealThumb}" alt="">
        <div class='ingredients'>
        <p>Name: ${meal.strMeal}</p>
        <p>Category: ${meal.strCategory}</p>
        <p>Area: ${meal.strArea}</p>
        <p>Instructions: ${meal.strInstructions}</p>
        <p>Tags: ${meal.strTags}</p>
        <p>Will be ready in: ${meal.strTime}</p>
        <p>Calories: ${meal.strCalories}</p>
        </div>
        
      `

      cardContainer2.appendChild(div)
    })

    cardContainer.appendChild(mealCard)
  })
}

document.querySelector('.home-btn').addEventListener('click', () => {
  cardContainer.textContent = ''
  cardContainer2.textContent = ''
  cardContainer5.textContent = ''
  displayMeals(allMeals)
  title.textContent = 'Delicious food every day.'
  titleP.textContent =
    'Simple and unusual dishes - delicious recipes for every day!'
})

function searchMeals() {
  cardContainer.textContent = ''
  cardContainer2.textContent = ''
  cardContainer5.textContent = ''
  let searchValue = document.getElementById('search').value.toLowerCase()
  let foundMeals = allMeals.filter(meal =>
    meal.strMeal.toLowerCase().includes(searchValue)
  )
  if (foundMeals.length > 0) {
    displayMeals(foundMeals)
  } else if (searchValue === '') {
    recipe()
  } else {
    alert('Meal not found')
  }
}

document.querySelector('.mealsof').addEventListener('change', mealsOf)

function mealsOf() {
  let selectValue = document.querySelector('.mealsof').value.toLowerCase()
  cardContainer.textContent = ''
  cardContainer2.textContent = ''
  cardContainer5.textContent = ''
  title.textContent = 'Delicious food every day.'
  titleP.textContent =
    'Simple and unusual dishes - delicious recipes for every day!'
  let selectMeal = allMeals.filter(
    meal => meal.strArea.toLowerCase() === selectValue
  )
  if (selectMeal.length > 0) {
    displayMeals(selectMeal)
  } else if (selectValue === '') {
    recipe()
  } else {
    alert('Meal not found')
  }
}

document.querySelector('.courses').addEventListener('click', function buyCourses(){
  cardContainer.textContent = ''
  cardContainer2.textContent = ''
  cardContainer5.textContent = ''

  searchSection.style.display = 'none'
  body.style.backdropFilter = 'blur(5px)'

  title.textContent = 'Buy courses to master the art of cooking.'
  titleP.textContent = ''
  

  allCourses.forEach(course => {
    let div = document.createElement('div')
    div.classList.add('courseSection')
    div.innerHTML = `
    <h1 class='course-title'>${course.title}</h1>
    <p class='course-desc'>${course.description}</p>
    <p class='course-dur'>Trainnig time: <span>${course.duration}</span></p>
    <p class='course-level'>For: <span>${course.level}</span></p>
    <p class='course-topics'>Topics:  ${course.topics}</p>
    <button class='buy'>${'Buy'}</button>`
    cardContainer5.appendChild(div)

    div.querySelector('.buy').addEventListener('click', () => {
      cardContainer.textContent = ''
      cardContainer2.textContent = ''
      cardContainer5.textContent = ''

      let buyDiv = document.createElement('div')
      buyDiv.classList.add('buyDiv')
      buyDiv.innerHTML = `
        <img class='chefGirl' src="img/cute-chef-girl-cartoon-giving-thumbs-up-vector-removebg-preview.png" alt="">
        <h2>Thank you for your purchase!</h2>
        <p>You have successfully bought the course: <span>${course.title}</span></p>
        <p>We hope you enjoy your learning experience.</p>
        <button class='back-btn'>Back to Courses</button>
      `
      cardContainer5.appendChild(buyDiv)

      document.querySelector('.back-btn').addEventListener('click', () => {
        cardContainer5.textContent = ''
        buyCourses()   
      })
    })
  })
})


document.querySelector('.signUp').addEventListener('click', function () {
  let signupForm = document.getElementById('signup-form')
  if (signupForm.style.display === 'none') {
    signupForm.style.display = 'block'
  } else {
    signupForm.style.display = 'none'
  }
})



